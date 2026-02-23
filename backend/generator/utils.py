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
        raise FileNotFoundError(f"Configuration file not found: {file_path}")

    with open(path, "r", encoding="utf-8") as file:
        data = yaml.safe_load(file)
        return data or {}

def extract_object_array(content: str):
    """
    Extracts an array of objects from a block:

    ```JSON
    [ ... ]
    ```

    Explicitly fails if the block or structure is invalid.
    """

    match = re.search(
        r"```JSON\s*(.*?)\s*```",
        content,
        re.DOTALL | re.IGNORECASE
    )

    if not match:
        raise ValueError("Block ```JSON``` not found.")

    json_block = match.group(1).strip()

    if not json_block.startswith('[') or not json_block.endswith(']'):
        raise ValueError("The JSON block does not contain an array.")

    try:
        return json.loads(json_block)
    except json.JSONDecodeError as json_error:
        logger.warning(
            "Failed to parse as JSON (line %s, column %s). Trying Python literal.",
            json_error.lineno,
            json_error.colno
        )

    try:
        return ast.literal_eval(json_block)
    except (SyntaxError, ValueError) as ast_error:
        logger.error("Failed to parse block as JSON or Python literal.")
        logger.error("Block content:\n%s", json_block)

        raise ValueError(
            "Block ```JSON``` contains invalid structure."
        ) from ast_error


def extract_dictionary(content: str) -> dict[str, Any] | None:
    """
    Extracts a dictionary (object) from a block:

    ```JSON
    { ... }
    ```

    Does not fail if the block or structure is invalid, just returns None.
    Accepts both JSON (double quotes) and Python literals (single quotes).
    """
    match = re.search(
        r"```JSON\s*(.*?)\s*```",
        content,
        re.DOTALL | re.IGNORECASE
    )

    if not match:
        logger.info("No object found...")
        return None

    json_block = match.group(1).strip()

    if not json_block.startswith('{') or not json_block.endswith('}'):
        logger.warning("Error extracting object...")
        return None

    try:
        return json.loads(json_block)
    except json.JSONDecodeError as json_error:
        logger.warning(
            "Failed to parse object as JSON (line %s, column %s). Trying Python literal.",
            json_error.lineno,
            json_error.colno
        )

    try:
        result = ast.literal_eval(json_block)

        if not isinstance(result, dict):
            logger.warning("Error extracting object...")
            return None

        return result
    except (SyntaxError, ValueError) as ast_error:
        logger.warning("Error extracting object...")
        return None

def get_templates_descriptions() -> str:
    slides = []
    file_path = os.path.join(os.path.dirname(__file__), 'templates', 'slidesTemplates.json')

    with open(file_path, 'r', encoding='utf-8') as file:
        slides = json.load(file)
        
    return "\n".join(f"{slide['id']} - {slide['templateDescription']}" for slide in slides)

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
        }
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
        }
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
        }
    )
    
    yield streaming_new_slide_event(conslusion_slide_payload)