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

  hideActionButtons: boolean;
  setHideActionButtons: React.Dispatch<React.SetStateAction<boolean>>;

  handleAddSlide: (templateId: number, insertAfterIndex: number) => void;
  handleUpdateSlide: (id: number, data: Record<string, unknown>) => void;
}

const SlideGenerationContext = createContext<SlideGenerationContextType | null>(
  null,
);

export const SlideGenerationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const navigate = useNavigate();

  const [hideActionButtons, setHideActionButtons] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([
    {
      type: "title",
      title: "Movimentos Literários Brasileiros",
      content: {
        templateID: 1,
        templateContent: {
          title: "Movimentos Literários Brasileiros",
          content: "Apresentação sobre Movimentos Literários Brasileiros",
        },
      },
    },
    {
      type: "agenda",
      title: "Roteiro da Aula",
      content: {
        templateID: 29,
        templateContent: {
          title: "Roteiro da Aula",
          topics: [
            "Movimentos Literários Brasileiros: Uma Jornada Histórica",
            "As Grandes Eras da Literatura Brasileira",
            "Era Colonial: Primeiras Vozes do Brasil",
            "Romantismo: A Busca pela Identidade Nacional",
            "Romantismo: Duas Faces da Expressão",
            "O Fim do Século XIX: Razão, Ciência e Forma",
            "Entre o Misticismo e a Realidade Social",
            "Modernismo: A Revolução da Arte Brasileira",
            "Pós-Modernismo e o Legado Literário",
          ],
        },
      },
    },
    {
      type: "content",
      title: "Movimentos Literários Brasileiros: Uma Jornada Histórica",
      content: {
        templateID: 27,
        templateContent: {
          title: "Movimentos Literários Brasileiros: Uma Jornada Histórica",
          objectives: [
            "Compreender a evolução da literatura brasileira em seu contexto histórico.",
            "Identificar as características principais e autores de cada movimento literário.",
            "Analisar a relação intrínseca entre literatura, sociedade e cultura no Brasil.",
            "Reconhecer a importância dos movimentos literários para a formação da identidade nacional.",
          ],
        },
      },
    },
    {
      type: "content",
      title: "As Grandes Eras da Literatura Brasileira",
      content: {
        templateID: 25,
        templateContent: {
          title: "As Grandes Eras da Literatura Brasileira",
          topics: [
            {
              title: "Era Colonial (1500-1808)",
              subtopics: [
                "Início da colonização e formação cultural.",
                "Literatura de registro, catequese e adaptação.",
              ],
            },
            {
              title: "Era Nacional (a partir de 1836)",
              subtopics: [
                "Busca por identidade e autonomia literária.",
                "Diversidade de estilos e temáticas nacionais.",
              ],
            },
          ],
        },
      },
    },
    {
      type: "content",
      title: "Era Colonial: Primeiras Vozes do Brasil",
      content: {
        templateID: 46,
        templateContent: {
          title: "Era Colonial: Primeiras Vozes do Brasil",
          items: [
            {
              title: "Quinhentismo (1500-1601)",
              characteristics: [
                "Literatura de informação e catequese.",
                "Registro da terra e do nativo.",
                "Autores: Pero Vaz de Caminha, Pe. José de Anchieta.",
              ],
            },
            {
              title: "Barroco (1601-1768)",
              characteristics: [
                "Dualismo, contraste e rebuscamento.",
                "Conceptismo (jogo de ideias) e Cultismo (jogo de palavras).",
                "Autores: Gregório de Matos, Pe. Antônio Vieira.",
              ],
            },
            {
              title: "Arcadismo (1768-1808)",
              characteristics: [
                "Simplicidade, bucolismo (fugere urbem).",
                "Carpe Diem (aproveitar o dia), Inutilia Truncat (cortar o inútil).",
                "Autores: Cláudio Manuel da Costa, Tomás Antônio Gonzaga.",
              ],
            },
          ],
        },
      },
    },
    {
      type: "content",
      title: "Romantismo: A Busca pela Identidade Nacional",
      content: {
        templateID: 40,
        templateContent: {
          title: "Romantismo: A Busca pela Identidade Nacional",
          topic: {
            title: "Romantismo Brasileiro (1836-1881)",
            content:
              "Movimento que marcou a busca por uma identidade literária própria após a Independência, valorizando o subjetivismo, o sentimentalismo e o nacionalismo como pilares da expressão artística.",
            details: [
              "**Contexto:** Independência do Brasil, formação da nação e busca por símbolos.",
              "**Características Gerais:** Subjetivismo, sentimentalismo, idealização do amor e da natureza, nacionalismo.",
              "**Primeira Geração (Nacionalista/Indianista):** Exaltação da natureza brasileira e do índio como herói nacional.",
              "**Autores e Obras:** Gonçalves Dias (Canção do Exílio, I-Juca-Pirama), José de Alencar (O Guarani, Iracema).",
            ],
          },
        },
      },
    },
    {
      type: "content",
      title: "Romantismo: Duas Faces da Expressão",
      content: {
        templateID: 42,
        templateContent: {
          title: "Romantismo: Duas Faces da Expressão",
          topics: [
            {
              title: "Segunda Geração (Ultrarromântica/Mal do Século)",
              content:
                "Marcada pelo egocentrismo, pessimismo, tédio, idealização da morte e do amor inatingível. Uma visão melancólica e angustiada da existência. Autores: Álvares de Azevedo (Lira dos Vinte Anos, Noite na Taverna), Casimiro de Abreu.",
            },
            {
              title: "Terceira Geração (Condoreira/Social)",
              content:
                "Caracterizada pelo engajamento social e político, com temas como abolicionismo e republicanismo. Poesia grandiosa, oratória e de denúncia social. Autor: Castro Alves (O Navio Negreiro, Os Escravos).",
            },
          ],
        },
      },
    },
    {
      type: "content",
      title: "O Fim do Século XIX: Razão, Ciência e Forma",
      content: {
        templateID: 46,
        templateContent: {
          title: "O Fim do Século XIX: Razão, Ciência e Forma",
          items: [
            {
              title: "Realismo (1881-1893)",
              characteristics: [
                "Objetividade, crítica social e análise psicológica.",
                "Anti-romantismo, linguagem direta e concisa.",
                "Autor: Machado de Assis (Memórias Póstumas de Brás Cubas, Dom Casmurro).",
              ],
            },
            {
              title: "Naturalismo (1881-1893)",
              characteristics: [
                "Determinismo (meio, raça, momento) e zoomorfismo.",
                "Foco em patologias sociais e descrições detalhadas.",
                "Autor: Aluísio Azevedo (O Mulato, O Cortiço).",
              ],
            },
            {
              title: "Parnasianismo (1881-1893)",
              characteristics: [
                '"Arte pela arte", culto à forma e à perfeição.',
                "Objetividade, descritivismo, vocabulário rebuscado, preferência por sonetos.",
                "Autores: Olavo Bilac, Alberto de Oliveira, Raimundo Correia (Tríade Parnasiana).",
              ],
            },
          ],
        },
      },
    },
    {
      type: "content",
      title: "Entre o Misticismo e a Realidade Social",
      content: {
        templateID: 42,
        templateContent: {
          title: "Entre o Misticismo e a Realidade Social",
          topics: [
            {
              title: "Simbolismo (1893-1922)",
              content:
                "Reação ao materialismo e cientificismo, valorizando o subjetivismo, misticismo, espiritualidade e a musicalidade da linguagem. Uso de sinestesia, aliteração e sugestão. Autores: Cruz e Sousa (Missal, Broquéis), Alphonsus de Guimarães.",
            },
            {
              title: "Pré-Modernismo (1902-1922)",
              content:
                "Período de transição que denunciava problemas sociais e regionais do Brasil. Ruptura com o academicismo, linguagem mais simples e personagens marginalizadas. Autores: Euclides da Cunha (Os Sertões), Lima Barreto (Triste Fim de Policarpo Quaresma), Monteiro Lobato (Urupês).",
            },
          ],
        },
      },
    },
    {
      type: "content",
      title: "Modernismo: A Revolução da Arte Brasileira",
      content: {
        templateID: 46,
        templateContent: {
          title: "Modernismo: A Revolução da Arte Brasileira",
          items: [
            {
              title: "Primeira Fase (1922-1930)",
              characteristics: [
                "Fase Heroica: Ruptura radical com o passado.",
                "Nacionalismo crítico, humor, ironia e liberdade formal.",
                "Autores: Oswald de Andrade (Manifesto Antropofágico), Mário de Andrade (Macunaíma).",
              ],
            },
            {
              title: "Segunda Fase (1930-1945)",
              characteristics: [
                "Fase de Consolidação: Amadurecimento temático.",
                "Temáticas sociais, psicológicas e regionalistas.",
                "Autores: Carlos Drummond de Andrade, Graciliano Ramos (Vidas Secas), Rachel de Queiroz.",
              ],
            },
            {
              title: "Terceira Fase (1945-1960)",
              characteristics: [
                "Geração de 45: Retorno a formas mais tradicionais, rigor estético.",
                "Experimentalismo linguístico, aprofundamento filosófico.",
                "Autores: João Cabral de Melo Neto, Clarice Lispector (A Hora da Estrela), Guimarães Rosa (Grande Sertão: Veredas).",
              ],
            },
          ],
        },
      },
    },
    {
      type: "content",
      title: "Pós-Modernismo e o Legado Literário",
      content: {
        templateID: 1,
        templateContent: {
          title: "Pós-Modernismo e o Legado Literário",
          content:
            "A partir dos anos 1960/70, o Pós-Modernismo reflete a pluralidade e a complexidade do mundo contemporâneo, com diversidade de estilos, intertextualidade e experimentalismo. A literatura brasileira continua a evoluir, dialogando com o passado e abrindo novos caminhos para a expressão artística. Compreender esses movimentos é essencial para valorizar a riqueza e a profundidade de nossa cultura e identidade.",
        },
      },
    },
    {
      type: "conclusion",
      title: "Fim...",
      content: {
        templateID: 1,
        templateContent: {
          title: "Fim...",
          content: "Até a próxima aula!",
        },
      },
    },
  ]);
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
    const totalSteps = request.n_slides + 3;

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

  const handleUpdateSlide = (
    slideIndex: number,
    data: Record<string, unknown>,
  ) => {
    setSlides((prev) => {
      const nextSlides = [...prev];
      const updatedSlide = { ...nextSlides[slideIndex] };

      if (data.title && typeof data.title === "string") {
        updatedSlide.title = data.title;
      }

      updatedSlide.content.templateContent = data;

      nextSlides[slideIndex] = updatedSlide;
      return nextSlides;
    });
  };

  const handleAddSlide = (templateId: number, insertAfterIndex: number) => {
    const newSlide: Slide = {
      type: "content",
      title: "Título padrão",
      content: {
        templateID: templateId,
        templateContent: {},
      },
    };

    setSlides((prev) => {
      const nextSlides = [...prev];
      nextSlides.splice(insertAfterIndex + 1, 0, newSlide);
      return nextSlides;
    });
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
        hideActionButtons,
        setHideActionButtons,
        handleAddSlide,
        handleUpdateSlide,
      }}
    >
      {children}
    </SlideGenerationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSlideGeneration = () => {
  const ctx = useContext(SlideGenerationContext);
  if (!ctx) {
    throw new Error(
      "useSlideGeneration must be used within a SlideGenerationProvider",
    );
  }
  return ctx;
};
