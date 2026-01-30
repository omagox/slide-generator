import type { Slide } from "../types/global";

export function normalizeSlidesFromApi(slides: Slide[]): Array<{
    id: number;
    canvas: { templateID: number; generationTemplate: Record<string, unknown> };
  }> {
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