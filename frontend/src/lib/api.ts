import type { SlideRequest, Slide } from "../types/global";

const API_BASE =
  (import.meta.env.VITE_API_URL as string) || "http://localhost:8000";

export async function generateSlides(request: SlideRequest): Promise<Slide[]> {
  const response = await fetch(`${API_BASE}/slide`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(
      (detail?.detail as string) || `Erro ao gerar slides: ${response.status}`,
    );
  }

  return response.json();
}
