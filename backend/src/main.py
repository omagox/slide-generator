import os
import time 

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse

from models.types import SlideRequest, Slide
from generator.generator import SlideGenerator

from src.logger import logger

app = FastAPI(title="Slide Generator API")

cors_origins: list[str] = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

slideGenerator = SlideGenerator()

GENERIC_ERROR_MESSAGE: str = "Ocorreu um erro durante a geração, tente novamente."

@app.post("/slide", response_model=list[Slide])
def generate_slides(request: SlideRequest):
    """
    Endpoint que retorna o deck completo de slides de uma única vez.
    """
    try:
        lesson_plan: str = slideGenerator.generate_lesson_plan(request.topic, request.grade, request.context)
    except Exception as e:
        logger.exception("Error generating lesson plan: %s", e)
        raise HTTPException(status_code=500, detail=GENERIC_ERROR_MESSAGE)

    try:
        presentation: list[Slide] = slideGenerator.generate_presentation(
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

@app.post("/streaming")
def streaming_slides(request: SlideRequest) -> StreamingResponse:
    """
    Endpoint que faz o streaming dos slides.
    """
    try:
        lesson_plan: str = slideGenerator.generate_lesson_plan(request.topic, request.grade, request.context)
    except Exception as e:
        logger.exception("Error generating lesson plan: %s", e)
        raise HTTPException(status_code=500, detail=GENERIC_ERROR_MESSAGE)

    generator = slideGenerator.generate_presentation_stream(
        lesson_plan=lesson_plan,
        class_topic=request.topic,
        number_of_slides=request.n_slides
    )

    return StreamingResponse(generator, media_type="text/plain")