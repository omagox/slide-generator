import type { Slide, OptionalQuestion, NormalizedSlide } from "../types/global";

const QUESTION_SLIDE_TEMPLATE = 54

export function normalizeSlidesFromApi(slides: Slide[]): NormalizedSlide[] {
  return slides.map((slide, index) => {
    const content = slide.content as {
      templateID?: number;
      templateContent?: Record<string, unknown>;
    };
    const templateID = content?.templateID ?? 1;
    const generationTemplate = content?.templateContent ?? {
      title: slide.title,
    };

    return {
      id: index,
      canvas: { templateID, generationTemplate },
      image: slide.image ?? null,
      question: slide.question ?? null,
    };
  });
}

export function addQuestionSlide(
  slides: NormalizedSlide[],
  question: OptionalQuestion,
  insertAfterIndex: number,
): NormalizedSlide[] {
  const nextSlides = slides.map((slide, i) => {
    if (i === insertAfterIndex) {
      return { ...slide, question: null };
    }
    return slide;
  });

  const newSlide: NormalizedSlide = {
    id: insertAfterIndex + 1,
    canvas: {
      templateID: QUESTION_SLIDE_TEMPLATE,
      generationTemplate: {
        statement: question.statement,
        options: question.options,
        correct_answer: question.correct_answer,
      },
    },
    image: null,
    question: null,
  };

  nextSlides.splice(insertAfterIndex + 1, 0, newSlide);
  return nextSlides.map((slide, index) => ({ ...slide, id: index }));
}

export function addGenericSlide(
  slides: NormalizedSlide[],
  templateID: number,
  insertAfterIndex: number,
): NormalizedSlide[] {
  const newSlide: NormalizedSlide = {
    id: insertAfterIndex + 1,
    canvas: {
      templateID,
      generationTemplate: {},
    },
    image: null,
    question: null,
  };

  const nextSlides = [...slides];
  nextSlides.splice(insertAfterIndex + 1, 0, newSlide);
  return nextSlides.map((slide, index) => ({ ...slide, id: index }));
}
