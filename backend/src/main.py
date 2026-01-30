from fastapi import FastAPI, HTTPException

from models.types import SlideRequest, Slide
from generator.generator import SlideGenerator

from src.logger import logger

app = FastAPI(title="Slide Generator API")

slideGenerator = SlideGenerator()

GENERIC_ERROR_MESSAGE = "Ocorreu um erro durante a geração, tente novamente."

@app.get("/hello")
def hello_world():
    return "Olá!"

@app.post("/slide", response_model=list[Slide])
def generate_slides(request: SlideRequest):
    """
    Retorna o deck completo de slides de uma única vez.
    """
    try:
        lesson_plan = slideGenerator.generate_lesson_plan(request.topic, request.grade, request.context)
    except Exception as e:
        logger.exception("Error generating lesson plan: %s", e)
        raise HTTPException(status_code=500, detail=GENERIC_ERROR_MESSAGE)

    try:
        presentation = slideGenerator.generate_presentation(
            lesson_plan=lesson_plan,
            class_topic=request.topic,
            number_of_slides=request.n_slides
        )
    except ValueError as e:
        logger.warning("Validation error while generating the presentation: %s", e)
        raise HTTPException(status_code=422, detail=GENERIC_ERROR_MESSAGE)
    except Exception as e:
        logger.exception("Error generating presentation: %s", e)
        raise HTTPException(status_code=500, detail=GENERIC_ERROR_MESSAGE)

    return presentation
