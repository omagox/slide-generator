import os
from pathlib import Path
from dotenv import load_dotenv

GENERATOR_FOLDER = Path(__file__).resolve().parent
load_dotenv(GENERATOR_FOLDER.parent / "credentials.env")

GENERATOR_AGENT_CONFIG_PATH = GENERATOR_FOLDER / "agent_config.yaml"
FILL_TEMPLATES_CHUNK_SIZE = 5
SLIDE_INDEX_TITLE = 0
SLIDE_INDEX_AGENDA = 1

def get_env(key: str, default: str | None = None) -> str:
    value = os.getenv(key, default)
    if value is None or value == "":
        raise ValueError(f"Variável de ambiente obrigatória não configurada: {key}")
    return value

TAVILY_API_KEY = get_env("TAVILY_API_KEY")