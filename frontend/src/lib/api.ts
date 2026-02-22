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

export async function* generateSlidesStream(
  request: SlideRequest,
): AsyncGenerator<{ type: "slide"; content: Slide }> {
  const response = await fetch("http://localhost:8000/streaming", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok || !response.body) {
    let detail = "";
    try {
      const data = await response.json();
      detail = data?.detail;
    } catch {}

    throw new Error(
      detail || `Erro ao gerar slides (streaming): ${response.status}`,
    );
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const chunks = buffer.split("|");

    for (const chunk of chunks) {
      if (chunk.startsWith("NEW_SLIDE:")) {
        const json = chunk.replace("NEW_SLIDE:", "").trim();
        const slide: Slide = JSON.parse(json);
        yield { type: "slide", content: slide };
      }
    }

    buffer = chunks[chunks.length - 1];
  }
}
