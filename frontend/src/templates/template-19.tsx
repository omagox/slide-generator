import type { ProcessProps } from "./types";

const defaults: ProcessProps = {
  title: "Título padrão",
  steps: [
    { title: "Passo 1", content: "Conteúdo do passo 1" },
    { title: "Passo 2", content: "Conteúdo do passo 2" },
    { title: "Passo 3", content: "Conteúdo do passo 3" },
    { title: "Passo 4", content: "Conteúdo do passo 4" },
    { title: "Passo 5", content: "Conteúdo do passo 5" },
  ],
  preview: false,
};

export default function Template19(props: Partial<ProcessProps>) {
  const { title, steps, preview } = { ...defaults, ...props };

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#1277bc", "#58a3a1"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="max-w-3xl mx-auto space-y-3">
        {steps.slice(0, 5).map((step, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 bg-gray-50 rounded-lg p-1"
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors[index] }}
            >
              <span className="text-white text-sm">{index + 1}</span>
            </div>
            <div>
              <h2 className="font-semibold text-black">{step.title}</h2>
              <p className="text-gray-600 text-sm">{step.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
