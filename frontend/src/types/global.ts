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
  image?: string | null;
  question?: OptionalQuestion;
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
  image?: string | null;
  question?: OptionalQuestion | null;
};

export interface AddSlideModalInfo {
  image?: string | null;
  question?: OptionalQuestion | null;
  insertAfterIndex?: number;
}

export interface AddSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  slide: AddSlideModalInfo | null;
  onAddSlide: (templateId: number) => void;
}