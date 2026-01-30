import json

from models.types import Slide, SlideTypeEnum

from src.logger import logger

from generator.config import (
    GENERATOR_FOLDER,
    TAVILY_API_KEY,
    GENERATOR_AGENT_CONFIG_PATH,
    FILL_TEMPLATES_CHUNK_SIZE,
    SLIDE_INDEX_TITLE,
    SLIDE_INDEX_AGENDA
)
from generator.utils import (
    read_yaml,
    extract_object_array,
    get_templates_descriptions,
    get_templates_generation_content,
    get_templates_generation_image,
    get_filled_templates_titles,
    adding_static_slides_to_presentation
)

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage

from tavily import TavilyClient

class SlideGenerator:
    def __init__(self):
        logger.info("Initializing SlideGenerator...")
        self.agent_config = read_yaml(str(GENERATOR_AGENT_CONFIG_PATH))

        self.lesson_plan_prompt = self.agent_config["lesson_plan_prompt"]
        self.generate_presentation_prompt = self.agent_config["generate_presentation_prompt"]
        self.fill_templates_prompt = self.agent_config["fill_templates_prompt"]

        self.llm = ChatGoogleGenerativeAI(
            model=self.agent_config["llm_config"]["model"],
            temperature=self.agent_config["llm_config"]["temperature"],
        )

        self.tavilyClient = TavilyClient(TAVILY_API_KEY)
        logger.info("SlideGenerator initialized!")

    def generate_lesson_plan(self, class_topic, class_grade, class_additional_instructions) -> str:
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

    def generate_presentation_content(self, lesson_plan, class_topic, templates_description, number_of_slides) -> str:
        logger.info("Generating the presentation content...")
        prompt = self.generate_presentation_prompt.format(
            class_topic=class_topic,
            lesson_plan=lesson_plan,
            templates_description=templates_description,
            number_of_slides=number_of_slides
        )

        messages = [
            SystemMessage(
                content="Você é um especialista em criação de apresentações. A partir do plano de aula recebido, divida o conteúdo em slides para uma apresentação e gere um JSON."
            ),
            HumanMessage(content=prompt),
        ]

        response = self.llm.invoke(messages)

        return response.content

    def get_filled_templates(self, slides_content, class_topic) -> str:
        prompt = self.fill_templates_prompt.format(
            class_topic=class_topic,
            slides_content=slides_content
        )

        messages = [
            SystemMessage(
                content="Você é um especialista em criação de apresentações. Você deve preencher os valores do objeto com o conteúdo dos slides."
            ),
            HumanMessage(content=prompt),
        ]

        response = self.llm.invoke(messages)

        return response.content

    def get_static_slides_info(self, class_topic, templates_titles) -> tuple[str, str, list[str]]:
        presentation_intro_title = class_topic
        presentation_intro_description = f"Apresentação sobre {class_topic}"
        presentation_agenda = templates_titles

        return presentation_intro_title, presentation_intro_description, presentation_agenda

    def generate_presentation(self, lesson_plan, class_topic, number_of_slides) -> list[Slide]:
        templates_description = get_templates_descriptions()
        presentation_content = self.generate_presentation_content(lesson_plan, class_topic, templates_description, number_of_slides)
        presentation_content_array = extract_object_array(presentation_content)

        filled_templates = []
        for i in range(0, len(presentation_content_array), FILL_TEMPLATES_CHUNK_SIZE):
            templates_array_chunk = presentation_content_array[i:i + FILL_TEMPLATES_CHUNK_SIZE]

            templates_generation_content_chunk = get_templates_generation_content(templates_array_chunk, i)
            templates_generation_images_chunk = get_templates_generation_image(templates_array_chunk)
            
            logger.info("Filling presentation templates %s to %s.", i, i + FILL_TEMPLATES_CHUNK_SIZE)
            filled_templates_chunk = self.get_filled_templates(templates_generation_content_chunk, class_topic)
            filled_templates_chunk_json = extract_object_array(filled_templates_chunk)

            for idx, filled_template in enumerate(filled_templates_chunk_json):
                image = templates_generation_images_chunk[idx]
                if image is not None:
                    filled_template["image"] = image

            filled_templates.extend(filled_templates_chunk_json)
        
        logger.info("Adding mandatory slides (introduction, agenda and conclusion) to presentation...")
        templates_titles = get_filled_templates_titles(filled_templates)
        presentation_intro_title, presentation_intro_description, presentation_agenda = self.get_static_slides_info(class_topic, templates_titles)
        filled_templates = adding_static_slides_to_presentation(filled_templates, presentation_intro_title, presentation_intro_description, presentation_agenda)

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
                },
                image=template.get("image")
            )
            
            presentation.append(formatted_template)

        with open(GENERATOR_FOLDER.parent / "presentation.json", "w", encoding="utf-8") as f:
            json.dump([s.model_dump() for s in presentation], f, ensure_ascii=False, indent=2)

        return presentation
