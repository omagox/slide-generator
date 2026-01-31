from enum import Enum
from pydantic import BaseModel, Field, model_validator
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
    question: Optional[OptionalQuestion] = None

class OptionalQuestion(BaseModel):
    statement: str
    options: list[str] = Field(..., max_length=4)
    correct_answer: int = Field(..., ge=0)
    slide_number: int

    @model_validator(mode='after')
    def correct_answer_in_range(self):
        if self.correct_answer >= len(self.options):
            raise ValueError('correct_answer deve ser índice válido em options')
        return self