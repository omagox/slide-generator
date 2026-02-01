import yaml
import os
import json
import re
import ast

from typing import Any
from pathlib import Path

from src.logger import logger
from models.types import Slide, SlideTypeEnum

TEMPLATE_ID_TITLE = 1
TEMPLATE_ID_CONCLUSION = 1
TEMPLATE_ID_AGENDA = 29

def read_yaml(file_path: str) -> dict[str, Any]:
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"Arquivo de configuração não encontrado: {file_path}")

    with open(path, "r", encoding="utf-8") as file:
        data = yaml.safe_load(file)
        return data or {}

def extract_object_array(content: str):
    """
    Extrai um array de objetos que esteja dentro de um bloco:
    
    ```JSON
    [ ... ]
    ```

    Falha explicitamente se o bloco ou a estrutura estiverem inválidos.
    """
    
    match = re.search(
        r"```JSON\s*(.*?)\s*```",
        content,
        re.DOTALL | re.IGNORECASE
    )

    if not match:
        raise ValueError("Bloco ```JSON``` não encontrado.")

    json_block = match.group(1).strip()

    if not json_block.startswith('[') or not json_block.endswith(']'):
        raise ValueError("O bloco JSON não contém um array.")

    try:
        return json.loads(json_block)
    except json.JSONDecodeError as json_error:
        logger.warning(
            "Falha ao parsear como JSON (linha %s, coluna %s). Tentando Python literal.",
            json_error.lineno,
            json_error.colno
        )

    try:
        return ast.literal_eval(json_block)
    except (SyntaxError, ValueError) as ast_error:
        logger.error("Falha ao parsear bloco como JSON ou Python literal.")
        logger.error("Conteúdo do bloco:\n%s", json_block)

        raise ValueError(
            "Bloco ```JSON``` contém estrutura inválida."
        ) from ast_error


def extract_dictionary(content: str) -> dict[str, Any] | None:
    """
    Extrai um dicionário (objeto) que esteja dentro de um bloco:

    ```JSON
    { ... }
    ```

    Não falha se o bloco ou a estrutura estiverem inválidos, apenas retorna None.
    Aceita tanto JSON (aspas duplas) quanto literais Python (aspas simples).
    """
    match = re.search(
        r"```JSON\s*(.*?)\s*```",
        content,
        re.DOTALL | re.IGNORECASE
    )

    if not match:
        logger.info("Nenhum objeto encontrado...")
        return None

    json_block = match.group(1).strip()

    if not json_block.startswith('{') or not json_block.endswith('}'):
        logger.warning("Ocorreu um erro na extração do objeto...")
        return None

    try:
        return json.loads(json_block)
    except json.JSONDecodeError as json_error:
        logger.warning(
            "Falha ao parsear o objeto como JSON (linha %s, coluna %s). Tentando Python literal.",
            json_error.lineno,
            json_error.colno
        )

    try:
        result = ast.literal_eval(json_block)

        if not isinstance(result, dict):
            logger.warning("Ocorreu um erro na extração do objeto...")
            return None

        return result
    except (SyntaxError, ValueError) as ast_error:
        logger.warning("Ocorreu um erro na extração do objeto...")
        return None

def get_templates_descriptions() -> str:
    slides = []
    file_path = os.path.join(os.path.dirname(__file__), 'templates', 'slidesTemplates.json')

    with open(file_path, 'r', encoding='utf-8') as file:
        slides = json.load(file)
        
    return "\n".join(f"{slide['id']} - {slide['templateDescription']}" for slide in slides)

def get_templates_generation_content(templates_chunk: list[dict], start_slide_index: int) -> str:
    slidesTemplates = []
    generation_content_array = []
    file_path = os.path.join(os.path.dirname(__file__), 'templates', 'slidesTemplates.json')
    
    with open(file_path, 'r', encoding='utf-8') as file:
        slidesTemplates = json.load(file)

    slide_index = start_slide_index + 1
    for template in templates_chunk:
        template_generation_content = {
            "templateID": template["templateID"],
            "generationTemplate": {},
            "slideContent": template["slideContent"]
        }

        template = next((item for item in slidesTemplates if item["id"] == template["templateID"]), None)

        if template:
            template_generation_content["generationTemplate"] = template['templateProps']
            generation_content_array.append(template_generation_content)
            slide_index += 1

    generation_content_string_array = [str(item) for item in generation_content_array]
    generation_content = "\n".join(generation_content_string_array)
    return "[\n" +  generation_content + "\n]"

def get_templates_generation_image(templates_chunk: list[dict]) -> list[str | None]:
    generation_images_array = []

    for template in templates_chunk:
        generation_images_array.append(template.get("slideImage", None))

    return generation_images_array

def get_filled_templates_titles(filled_templates: list[dict]) -> list[str]:
    titles = []
    
    for template in filled_templates:
        generation_template = template.get("generationTemplate", {})
        title = generation_template.get("title")
        if title:
            titles.append(title)

    return titles

def get_introduction_slide(presentation_intro_title: str, presentation_intro_description: str) -> dict:
    return {
        'templateID': TEMPLATE_ID_TITLE,
        'generationTemplate': {
            'title': presentation_intro_title,
            'content': presentation_intro_description
        }
    }

def get_agenda_slide(agenda_topics: list[str]) -> dict:
    return {
        'templateID': TEMPLATE_ID_AGENDA,
        'generationTemplate': {
            'title': 'Roteiro da Aula',
            'topics': agenda_topics
        }
    }

def get_conclusion_slide() -> dict:
    return {
        'templateID': TEMPLATE_ID_CONCLUSION,
        'generationTemplate': {
            'title': 'Fim...',
            'content': 'Até a próxima aula!'
        }
    }

### STREAMING AUXILIARY FUNCTIONS ###

def get_template_generation_content(template: dict) -> dict:
    slidesTemplates = []
    file_path = os.path.join(os.path.dirname(__file__), 'templates', 'slidesTemplates.json')

    template_generation_content = {
        "templateID": template["templateID"],
        "generationTemplate": {},
        "slideContent": template["slideContent"]
    }

    with open(file_path, 'r', encoding='utf-8') as file:
        slidesTemplates = json.load(file)

    template = next((item for item in slidesTemplates if item["id"] == template["templateID"]), None)

    if template:
        template_generation_content["generationTemplate"] = template['templateProps']

    return template_generation_content

def streaming_optional_question_event(data: dict) -> str:
    if hasattr(data, "model_dump"):
        data = data.model_dump()

    return f"|OPTIONAL_QUESTION: {json.dumps(data, ensure_ascii=False)}|\n"

def streaming_new_slide_event(data: dict) -> str:
    if hasattr(data, "model_dump"):
        data = data.model_dump()

    return f"|NEW_SLIDE: {json.dumps(data, ensure_ascii=False)}|\n"
    
def stream_introduction_slide(class_topic):
    introduction_slide = get_introduction_slide(class_topic, f"Apresentação sobre {class_topic}")

    introduction_slide_payload = Slide(
        type=SlideTypeEnum("title"),
        title=introduction_slide["generationTemplate"]["title"],
        content={
            "templateID": introduction_slide["templateID"],
            "templateContent": introduction_slide["generationTemplate"]
        },
        image=None,
        question=None
    )
    
    yield streaming_new_slide_event(introduction_slide_payload)

def stream_agenda_slide(agenda_topics):
    agenda_slide = get_agenda_slide(agenda_topics)

    agenda_slide_payload = Slide(
        type=SlideTypeEnum("agenda"),
        title=agenda_slide["generationTemplate"]["title"],
        content={
            "templateID": agenda_slide["templateID"],
            "templateContent": agenda_slide["generationTemplate"]
        },
        image=None,
        question=None
    )
    
    yield streaming_new_slide_event(agenda_slide_payload)

def stream_conclusion_slide():
    conslusion_slide = get_conclusion_slide()

    conslusion_slide_payload = Slide(
        type=SlideTypeEnum("conclusion"),
        title=conslusion_slide["generationTemplate"]["title"],
        content={
            "templateID": conslusion_slide["templateID"],
            "templateContent": conslusion_slide["generationTemplate"]
        },
        image=None,
        question=None
    )
    
    yield streaming_new_slide_event(conslusion_slide_payload)