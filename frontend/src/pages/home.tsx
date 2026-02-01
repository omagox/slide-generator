import { useState } from "react";

import type { SlideRequest } from "../types/global";

import { useSlideGeneration } from "../contexts/SlideGenerationContext";

const HomePage = () => {
  const {
    handleStreamingGeneration,
    handleDefaultGeneration,
    error,
    setError,
  } = useSlideGeneration();

  const [loading, setLoading] = useState(false);

  const [topic, setTopic] = useState("");
  const [grade, setGrade] = useState("");
  const [context, setContext] = useState("");
  const [nSlides, setNSlides] = useState(10);
  const [useStreaming, setUseStreaming] = useState(false);

  const handleSubmit = async () => {
    const request: SlideRequest = {
      topic: topic.trim(),
      grade: grade.trim(),
      context: context.trim() || undefined,
      n_slides: nSlides,
    };

    if (!request.topic) {
      setError("O tema da aula é obrigatório.");
      return;
    }
    if (!request.grade) {
      setError("O nível/ano dos alunos é obrigatório.");
      return;
    }
    if (!request.n_slides || request.n_slides < 1 || request.n_slides > 30) {
      setError("O número de slides deve ser entre 1 e 30.");
      return;
    }

    setError(null);
    setLoading(true);

    if (useStreaming) {
      handleStreamingGeneration(request);
    } else {
      await handleDefaultGeneration(request);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6">
        <h1 className="text-2xl font-semibold text-slate-800 text-center">
          Gerador de Apresentações
        </h1>

        <div>
          <label
            htmlFor="topic"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Tema da aula
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ex: Fotosíntese"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="grade"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Nível/ano dos alunos
          </label>
          <input
            id="grade"
            type="text"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            placeholder="Ex: 6º ano, Ensino Médio"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="context"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Instruções adicionais{" "}
            <span className="text-slate-400">(opcional)</span>
          </label>
          <textarea
            id="context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            rows={3}
            placeholder="Ex: Gostaria de um slide específico comparando X com Y"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none resize-none"
          />
        </div>

        <div>
          <label
            htmlFor="n_slides"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            Número de slides de conteúdo
          </label>
          <input
            id="n_slides"
            type="number"
            min={1}
            max={30}
            value={nSlides}
            onChange={(e) => setNSlides(Number(e.target.value))}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-400 focus:border-slate-400 outline-none"
          />
          <p className="mt-1 text-xs text-slate-500">Entre 1 e 30</p>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="streaming"
            type="checkbox"
            checked={useStreaming}
            onChange={(e) => setUseStreaming(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300"
          />
          <label htmlFor="streaming" className="text-sm text-slate-700">
            Gerar slides com streaming.
          </label>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full cursor-pointer py-3 px-4 bg-slate-800 text-white font-medium rounded-lg hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Gerando..." : "Gerar Apresentação"}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
