import type { Slide, NormalizedSlide } from "../types/global";

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
    };
  });
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
  };

  const nextSlides = [...slides];
  nextSlides.splice(insertAfterIndex + 1, 0, newSlide);
  return nextSlides.map((slide, index) => ({ ...slide, id: index }));
}
