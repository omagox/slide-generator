from enum import Enum
from pydantic import BaseModel, Field
from typing import Optional

class SlideTypeEnum(str, Enum):
    TITLE = "title"
    AGENDA = "agenda"
    CONTENT = "content"
    CONCLUSION = "conclusion"

class SlideRequest(BaseModel):
    topic: str
    grade: str
    context: Optional[str] = ""
    n_slides: int = Field(ge=1, le=30, description="Número de slides de conteúdo (1 a 30)")

class Slide(BaseModel):
    type: SlideTypeEnum
    title: str
    content: dict
    image: Optional[str] = None