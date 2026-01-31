import yaml
import os
import json
import re
import ast

from typing import Any
from pathlib import Path

from src.logger import logger

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


def extract_object_dict(content: str) -> dict[str, Any] | None:
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
        logger.info("Nenhuma questão para adicionar...")
        return None

    json_block = match.group(1).strip()

    if not json_block.startswith('{') or not json_block.endswith('}'):
        logger.warning("Ocorreu um erro na extração da questão...")
        return None

    try:
        return json.loads(json_block)
    except json.JSONDecodeError as json_error:
        logger.warning(
            "Falha ao parsear a questão como JSON (linha %s, coluna %s). Tentando Python literal.",
            json_error.lineno,
            json_error.colno
        )

    try:
        result = ast.literal_eval(json_block)

        if not isinstance(result, dict):
            logger.warning("Ocorreu um erro na extração da questão...")
            return None

        return result
    except (SyntaxError, ValueError) as ast_error:
        logger.warning("Ocorreu um erro na extração da questão...")
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

def adding_static_slides_to_presentation(
    filled_templates: list[dict],
    presentation_intro_title: str,
    presentation_intro_description: str,
    presentation_agenda: list[str]
) -> list[dict]:
    title_slide = {
        'templateID': TEMPLATE_ID_TITLE,
        'generationTemplate': {
            'title': presentation_intro_title,
            'content': presentation_intro_description
        }
    }
    
    agenda_slide = {
        'templateID': TEMPLATE_ID_AGENDA,
        'generationTemplate': {
            'title': 'Roteiro da Aula',
            'topics': presentation_agenda
        }
    }
    
    final_slide = {
        'templateID': TEMPLATE_ID_CONCLUSION,
        'generationTemplate': {
            'title': 'Fim...',
            'content': 'Até a próxima aula!'
        }
    }

    return [title_slide, agenda_slide] + filled_templates + [final_slide]