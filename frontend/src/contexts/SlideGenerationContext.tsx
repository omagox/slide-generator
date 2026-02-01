import React, {
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

import type { SlideRequest, Slide } from "../types/global";

import { generateSlides, generateSlidesStream } from "../lib/api";
import { useNavigate } from "react-router-dom";

interface SlideGenerationContextType {
  slides: Slide[];
  handleStreamingGeneration: (request: SlideRequest) => Promise<void>;
  handleDefaultGeneration: (request: SlideRequest) => Promise<void>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  generationProgress: {
    message: string;
    progress: number;
  } | null;
}

const SlideGenerationContext = createContext<SlideGenerationContextType | null>(
  null,
);

export const SlideGenerationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const navigate = useNavigate();

  const [slides, setSlides] = useState<Slide[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [generationProgress, setGenerationProgress] = useState<{
    message: string;
    progress: number;
  } | null>(null);

  const readerRef = useRef<ReadableStreamDefaultReader | null>(null);

  const reset = () => {
    readerRef.current?.cancel();
    readerRef.current = null;
    setSlides([]);
  };

  const handleStreamingGeneration = async (request: SlideRequest) => {
    reset();

    setGenerationProgress({
      message: "Iniciando geração dos slides...",
      progress: 0,
    });

    let currentStep = 0;
    let totalSteps = request.n_slides + 3;

    try {
      let firstSlideReceived = false;
      for await (const chunk of generateSlidesStream(request)) {
        if (chunk.type == "slide") {
          if (chunk.content.type === "agenda") {
            setSlides((prev) => {
              const updatedSlides = [...prev];
              updatedSlides.splice(1, 0, chunk.content);
              return updatedSlides;
            });
          } else {
            setSlides((prev) => [...prev, chunk.content]);
          }
        }

        if (chunk.type == "question") {
          // It is necessary to add +2 because the question numbering does not count the introduction, agenda, and conclusion slides.
          const slideIndex =
            (chunk.content.slide_number ?? slides.length) - 1 + 2;
          setSlides((prevSlides) => {
            if (slideIndex < 0 || slideIndex >= prevSlides.length)
              return prevSlides;

            const updatedSlides = [...prevSlides];
            updatedSlides[slideIndex] = {
              ...updatedSlides[slideIndex],
              question: chunk.content,
            };
            return updatedSlides;
          });
        }

        if (!firstSlideReceived) {
          firstSlideReceived = true;
          navigate("/presentation");
        }

        currentStep += 1;

        if (currentStep == totalSteps) {
          setGenerationProgress({
            message: "Finalizando...",
            progress: 98,
          });
        } else {
          const safeCurrentStep = Math.max(1, currentStep);

          setGenerationProgress({
            message: `Passo ${safeCurrentStep} de ${totalSteps}`,
            progress: Math.min(
              100,
              Math.max(0, (safeCurrentStep / totalSteps) * 100),
            ),
          });
        }
      }
    } catch (err) {
      setError(
        "Ocorreu um erro ao gerar os slides. Por favor, tente novamente.",
      );
      navigate("/");
      console.error(err);
    } finally {
      setGenerationProgress({
        message: `Geração concluída!`,
        progress: 100,
      });
      setTimeout(() => {
        setGenerationProgress(null);
      }, 3500);
    }
  };

  const handleDefaultGeneration = async (request: SlideRequest) => {
    reset();

    try {
      const response = await generateSlides(request);
      setSlides(response);
      navigate("/presentation");
    } catch (err) {
      setError(
        "Ocorreu um erro ao gerar os slides. Por favor, tente novamente.",
      );
      console.error(err);
    }
  };

  return (
    <SlideGenerationContext.Provider
      value={{
        slides,
        handleStreamingGeneration,
        handleDefaultGeneration,
        error,
        setError,
        generationProgress,
      }}
    >
      {children}
    </SlideGenerationContext.Provider>
  );
};

export const useSlideGeneration = () => {
  const ctx = useContext(SlideGenerationContext);
  if (!ctx) {
    throw new Error(
      "useSlideGeneration must be used within a SlideGenerationProvider",
    );
  }
  return ctx;
};
