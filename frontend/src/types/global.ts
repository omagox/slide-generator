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
}