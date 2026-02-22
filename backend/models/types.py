from enum import Enum
from pydantic import BaseModel, Field, model_validator
from typing import Optional, Any

class SlideTypeEnum(str, Enum):
    TITLE = "title"
    AGENDA = "agenda"
    CONTENT = "content"
    CONCLUSION = "conclusion"

class SlideContent(BaseModel):
    templateID: int = Field(..., description="ID of the chosen template for the slide")
    templateContent: dict[str, Any] = Field(..., description="Slide content in the format of the chosen template")

class SlideRequest(BaseModel):
    topic: str = Field(..., min_length=1, description="Presentation main topic")
    grade: str = Field(..., min_length=1, description="Education level")
    context: Optional[str] = Field(default="", description="Additional comments for generation")
    n_slides: int = Field(ge=1, le=30, description="Number of content slides (1 to 30)")

class OptionalQuestion(BaseModel):
    statement: str = Field(..., min_length=1, description="Question statement")
    options: list[str] = Field(..., min_length=2, max_length=4, description="Answer options")
    correct_answer: int = Field(..., ge=1, description="Correct answer number")
    slide_number: int = Field(..., ge=1, description="Slide number where the question will be shown")

    @model_validator(mode='after')
    def correct_answer_in_range(self):
        if not (1 <= self.correct_answer <= len(self.options)):
            raise ValueError('correct_answer must be between 1 and the number of options (inclusive)')
        return self

class Slide(BaseModel):
    type: SlideTypeEnum
    title: str = Field(..., min_length=1, description="Slide title")
    content: SlideContent