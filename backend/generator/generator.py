import json

from pydantic import ValidationError
from models.types import Slide, SlideTypeEnum, OptionalQuestion

from src.logger import logger

from generator.config import (
    TAVILY_API_KEY,
    GENERATOR_AGENT_CONFIG_PATH,
    FILL_TEMPLATES_CHUNK_SIZE,
    SLIDE_INDEX_TITLE,
    SLIDE_INDEX_AGENDA
)
from generator.utils import (
    read_yaml,
    extract_object_array,
    extract_dictionary,
    get_templates_descriptions,
    get_template_generation_content,
    get_templates_generation_content,
    get_templates_generation_image,
    get_filled_templates_titles,
    get_introduction_slide,
    get_agenda_slide,
    get_conclusion_slide,
    streaming_new_slide_event,
    streaming_optional_question_event,
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
        self.fill_templates_prompt: str = self.agent_config["fill_templates_prompt"]
        self.generate_option_question_prompt: str = self.agent_config["generate_option_question_prompt"]
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

    def generate_presentation_content(self, lesson_plan: str, class_topic: str, templates_description: str, number_of_slides: int) -> str:
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

    def generate_templates_content(self, slides_content: str, class_topic: str) -> str:
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

    def generate_one_template_content(self, slide_content: dict, class_topic: str) -> str:
        prompt = self.fill_one_template_prompt.format(
            class_topic=class_topic,
            slide_content=slide_content
        )

        messages = [
            SystemMessage(
                content="Você é um especialista em criação de apresentações. Você deve preencher os valores da propriedade 'generationTemplate' com as informações definidas da propriedade 'slideContent' do objeto."
            ),
            HumanMessage(content=prompt),
        ]

        response = self.llm.invoke(messages)

        return response.content

    def generate_optional_question(self, filled_templates: list[dict]) -> str:
        prompt = self.generate_option_question_prompt.format(
            filled_templates=filled_templates
        )

        messages = [
            SystemMessage(
                content="Você é um especialista em educação e pedagogo com experiência em ensino. A partir do [Conteúdo da Apresentação], você deve decidir se faz sentido colocar uma pergunta para testar o aprendizado dos alunos em relação ao tema."
            ),
            HumanMessage(content=prompt),
        ]

        response = self.llm.invoke(messages)

        return response.content

    def generate_presentation(self, lesson_plan: str, class_topic: str, number_of_slides: int) -> list[Slide]:
        templates_description = get_templates_descriptions()
        presentation_content = self.generate_presentation_content(lesson_plan, class_topic, templates_description, number_of_slides)
        presentation_content_array = extract_object_array(presentation_content)

        filled_templates = []
        for i in range(0, len(presentation_content_array), FILL_TEMPLATES_CHUNK_SIZE):
            templates_array_chunk = presentation_content_array[i:i + FILL_TEMPLATES_CHUNK_SIZE]

            templates_generation_content_chunk = get_templates_generation_content(templates_array_chunk, i)
            templates_generation_images_chunk = get_templates_generation_image(templates_array_chunk)
            
            logger.info("Filling presentation templates %s to %s.", i, i + FILL_TEMPLATES_CHUNK_SIZE)
            filled_templates_chunk = self.generate_templates_content(templates_generation_content_chunk, class_topic)
            filled_templates_chunk_json = extract_object_array(filled_templates_chunk)

            for idx, filled_template in enumerate(filled_templates_chunk_json):
                image = templates_generation_images_chunk[idx]
                if image is not None:
                    filled_template["image"] = image

            filled_templates.extend(filled_templates_chunk_json)
        
        logger.info("Adding mandatory slides (introduction, agenda and conclusion) to presentation...")
        templates_titles = get_filled_templates_titles(filled_templates)

        optional_question = self.generate_optional_question(filled_templates)
        optional_question_dict = extract_dictionary(optional_question)
        if optional_question_dict is not None:
            try:
                optional_question_dict = OptionalQuestion.model_validate(optional_question_dict).model_dump()
            except ValidationError as e:
                logger.warning("Error when validating optional question type: %s", e)
                optional_question_dict = None

        if optional_question_dict is not None:
            slide_index = optional_question_dict["slide_number"] - 1
            if 0 <= slide_index < len(filled_templates):
                filled_templates[slide_index]["question"] = optional_question_dict
            else:
                logger.warning(
                    "Optional question slide_number=%s out of range (filled_templates length=%s), skipping.",
                    optional_question_dict["slide_number"],
                    len(filled_templates),
                )

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
                },
                image=template.get("image"),
                question=template.get("question")
            )
            
            presentation.append(formatted_template)

        logger.info("Presentation generated!")
        return presentation

    def generate_presentation_stream(self, lesson_plan: str, class_topic: str, number_of_slides: int):
        yield from stream_introduction_slide(class_topic)

        templates_description = get_templates_descriptions()
        presentation_content = self.generate_presentation_content(lesson_plan, class_topic, templates_description, number_of_slides)
        presentation_content_array = extract_object_array(presentation_content)
        
        templates_titles = []
        filled_templates = []
        for idx, template in enumerate(presentation_content_array):
            logger.info("Filling presentation template %s.", idx + 1)
            
            template_generation_content = get_template_generation_content(template)
            template_generation_image = template.get("slideImage", None)

            filled_template = self.generate_one_template_content(template_generation_content, class_topic)
            filled_template_dict = extract_dictionary(filled_template)

            if filled_template_dict is None:
                logger.error("Failed to extract dictionary for slide %s, skipping.", idx + 1)
                continue

            templates_titles.append(filled_template_dict["generationTemplate"]["title"])
            filled_templates.append(filled_template_dict)

            new_slide_payload = Slide(
                type=SlideTypeEnum("content"),
                title=filled_template_dict["generationTemplate"]["title"],
                content={
                    "templateID": filled_template_dict["templateID"],
                    "templateContent": filled_template_dict["generationTemplate"]
                },
                image=template_generation_image,
                question=None
            )

            logger.info("Streaming slide %s.", idx + 1)
            yield streaming_new_slide_event(new_slide_payload)
        
        yield from stream_agenda_slide(templates_titles)
        yield from stream_conclusion_slide()

        optional_question = self.generate_optional_question(filled_templates)
        optional_question_dict = extract_dictionary(optional_question)
        if optional_question_dict is not None:
            try:
                optional_question_dict = OptionalQuestion.model_validate(optional_question_dict).model_dump()
            except ValidationError as e:
                logger.warning("Error when validating optional question type: %s", e)
                optional_question_dict = None

        if optional_question_dict is not None:
            yield streaming_optional_question_event(optional_question_dict)

        logger.info("Presentation generated!")