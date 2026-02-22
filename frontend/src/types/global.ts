export type SlideType = "title" | "agenda" | "content" | "conclusion";

export interface SlideRequest {
  topic: string;
  grade: string;
  context?: string;
  n_slides: number;
}

export interface Slide {
  type: SlideType;
  title: string;
  content: Record<string, unknown>;
}

export interface OptionalQuestion {
  statement: string;
  options: string[];
  correct_answer: number;
  slide_number?: number;
}

export type NormalizedSlide = {
  id: number;
  canvas: { templateID: number; generationTemplate: Record<string, unknown> };
};

export interface AddSlideModalInfo {
  insertAfterIndex?: number;
}

export interface AddSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSlide: (templateId: number) => void;
}