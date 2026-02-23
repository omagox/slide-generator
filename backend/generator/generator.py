import json
from time import sleep

from pydantic import ValidationError
from models.types import (
    Slide, 
    SlideTypeEnum, 
    PresentationContent
)
from models.templates import TEMPLATE_MODELS

from src.logger import logger

from generator.config import (
    TAVILY_API_KEY,
    GENERATOR_AGENT_CONFIG_PATH,
    SLIDE_INDEX_TITLE,
    SLIDE_INDEX_AGENDA
)
from generator.utils import (
    read_yaml,
    get_templates_descriptions,
    get_filled_templates_titles,
    get_introduction_slide,
    get_agenda_slide,
    get_conclusion_slide,
    streaming_new_slide_event,
    stream_introduction_slide,
    stream_agenda_slide,
    stream_conclusion_slide
)

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage

from tavily import TavilyClient

class SlideGenerator:
    def __init__(self):
        logger.info("Initializing SlideGenerator...")
        self.agent_config = read_yaml(str(GENERATOR_AGENT_CONFIG_PATH))

        self.lesson_plan_prompt: str = self.agent_config["lesson_plan_prompt"]
        self.generate_presentation_prompt: str = self.agent_config["generate_presentation_prompt"]
        self.fill_one_template_prompt: str = self.agent_config["fill_one_template_prompt"]

        self.llm = ChatGoogleGenerativeAI(
            model=self.agent_config["llm_config"]["model"],
            temperature=self.agent_config["llm_config"]["temperature"],
        )

        self.tavilyClient = TavilyClient(TAVILY_API_KEY)
        logger.info("SlideGenerator initialized!")

    def generate_lesson_plan(self, class_topic: str, class_grade: str, class_additional_instructions: str) -> str:
        logger.info("Generating lesson plan...")
        auxiliary_web_content = self.tavilyClient.search(
            query=f"Preciso dar uma aula sobre o assunto '{class_topic}' para alunos do nível '{class_grade}', quero que você me traga uma lista de tópicos que são importantes referentes a esse assunto.",
            search_depth="advanced"
        )

        prompt = self.lesson_plan_prompt.format(
            class_topic=class_topic,
            class_grade=class_grade,
            class_additional_instructions=class_additional_instructions,
            auxiliary_web_content=auxiliary_web_content
        )

        messages = [
            SystemMessage(
                content="Você é um especialista em educação e pedagogo com experiência em ensino. A partir das informações sobre a aula, gere um plano de aula detalhado, em tópicos, para um professor."
            ),
            HumanMessage(content=prompt),
        ]

        response = self.llm.invoke(messages)

        return response.content

    def generate_presentation_content(self, lesson_plan: str, class_topic: str, templates_description: str, number_of_slides: int) -> list:
        logger.info("Generating the presentation content...")
        prompt = self.generate_presentation_prompt.format(
            class_topic=class_topic,
            lesson_plan=lesson_plan,
            templates_description=templates_description,
            number_of_slides=number_of_slides
        )

        messages = [
            SystemMessage(
                content="Você é um especialista em criação de apresentações. A partir do plano de aula recebido, divida o conteúdo em slides para uma apresentação."
            ),
            HumanMessage(content=prompt),
        ]

        response = self.llm.with_structured_output(PresentationContent).invoke(messages)

        return [slide.model_dump() for slide in response.slides]

    def generate_templates_content(self, slides_content: list[dict], class_topic: str) -> list[dict]:
        filled_templates = []
        
        for slide in slides_content:
            try:
                filled = self.generate_one_template_content(slide, class_topic)
                filled_templates.append(filled)
            except Exception as e:
                logger.error(f"Error generating template content for slide {slide.get('templateID')}: {e}")
                continue

        return filled_templates

    def generate_one_template_content(self, slide_info: dict, class_topic: str) -> dict:
        template_id = slide_info.get("templateID")
        slide_content = slide_info.get("slideContent", slide_info)
        
        TargetModel = TEMPLATE_MODELS.get(template_id)

        if not TargetModel:
            logger.error(f"Model not found for template {template_id}")
            raise ValueError(f"Model not found for template {template_id}")

        prompt = self.fill_one_template_prompt.format(
            class_topic=class_topic,
            slide_content=slide_content
        )

        messages = [
            SystemMessage(
                content="Você é um especialista em criação de apresentações. Estruture o conteúdo recebido para o formato do template solicitado."
            ),
            HumanMessage(content=prompt),
        ]

        response = self.llm.with_structured_output(TargetModel).invoke(messages)

        return {
            "templateID": template_id,
            "generationTemplate": response.model_dump()
        }

    def generate_presentation(self, lesson_plan: str, class_topic: str, number_of_slides: int) -> list[Slide]:
        templates_description = get_templates_descriptions()
        presentation_content_array = self.generate_presentation_content(lesson_plan, class_topic, templates_description, number_of_slides)

        logger.info("Filling presentation templates...")
        
        filled_templates = self.generate_templates_content(presentation_content_array, class_topic)
        
        logger.info("Adding mandatory slides (introduction, agenda and conclusion) to presentation...")

        templates_titles = get_filled_templates_titles(filled_templates)

        introduction_slide = get_introduction_slide(class_topic, f"Apresentação sobre {class_topic}")
        agenda_slide = get_agenda_slide(templates_titles)
        conclusion_slide = get_conclusion_slide()
        filled_templates = [introduction_slide, agenda_slide] + filled_templates + [conclusion_slide]

        presentation = []
        for idx, template in enumerate(filled_templates):

            if idx == SLIDE_INDEX_TITLE:
                template_type = "title"
            elif idx == SLIDE_INDEX_AGENDA:
                template_type = "agenda"
            elif idx == len(filled_templates) - 1:
                template_type = "conclusion"
            else:
                template_type = "content"

            formatted_template = Slide(
                type=SlideTypeEnum(template_type),
                title=template["generationTemplate"]["title"],
                content={
                    "templateID": template["templateID"],
                    "templateContent": template["generationTemplate"]
                }
            )
            
            presentation.append(formatted_template)

        logger.info("Presentation generated!")
        return presentation

    def generate_presentation_stream(self, lesson_plan: str, class_topic: str, number_of_slides: int):
        yield from stream_introduction_slide(class_topic)

        templates_description = get_templates_descriptions()
        presentation_content_array = self.generate_presentation_content(lesson_plan, class_topic, templates_description, number_of_slides)
        
        templates_titles = []
        filled_templates = []
        for idx, template in enumerate(presentation_content_array):
            logger.info("Filling presentation template %s.", idx + 1)
            
            filled_template_dict = self.generate_one_template_content(template, class_topic)

            templates_titles.append(filled_template_dict["generationTemplate"]["title"])
            filled_templates.append(filled_template_dict)

            new_slide_payload = Slide(
                type=SlideTypeEnum("content"),
                title=filled_template_dict["generationTemplate"]["title"],
                content={
                    "templateID": filled_template_dict["templateID"],
                    "templateContent": filled_template_dict["generationTemplate"]
                }
            )

            logger.info("Streaming slide %s.", idx + 1)
            yield streaming_new_slide_event(new_slide_payload)
        
        yield from stream_agenda_slide(templates_titles)
        yield from stream_conclusion_slide()

        logger.info("Presentation generated!")