import type { TimelineProps } from "./types";

const defaults: TimelineProps = {
  title: "Título padrão",
  steps: [
    { title: "Etapa 1", description: "Descrição da etapa 1" },
    { title: "Etapa 2", description: "Descrição da etapa 2" },
    { title: "Etapa 3", description: "Descrição da etapa 3" },
  ],
  content: "Conteúdo complementar padrão.",
  preview: false,
};

export default function Template21(props: Partial<TimelineProps>) {
  const { title, steps, content, preview } = { ...defaults, ...props };

  const colors = ["#1277bc", "#58a3a1", "#6b7280"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2"></div>
        {steps.slice(0, 3).map((step, index) => (
          <div key={index} className="flex flex-col items-center z-10">
            <div
              className="w-4 h-4 rounded-full mb-2"
              style={{ backgroundColor: colors[index] }}
            ></div>
            <div className="bg-white p-3 rounded shadow-md text-center">
              <h2 className="font-semibold" style={{ color: colors[index] }}>
                {step.title}
              </h2>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      {content && (
        <div className="mt-8 bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 text-center">{content}</p>
        </div>
      )}
    </div>
  );
}
