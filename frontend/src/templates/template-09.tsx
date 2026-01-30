import React from "react";
import type { TimelineProps } from "./types";

const defaults: TimelineProps = {
  title: "Título padrão",
  steps: [
    { title: "Etapa 1", description: "Descrição da etapa 1" },
    { title: "Etapa 2", description: "Descrição da etapa 2" },
    { title: "Etapa 3", description: "Descrição da etapa 3" },
  ],
  content: "Texto complementar explicando a linha do tempo.",
  preview: false,
};

export default function Template09(props: Partial<TimelineProps>) {
  const { title, steps, content, preview } = { ...defaults, ...props };

  const colors = ["#1277bc", "#ab1551", "#6b7280"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between items-center"
    >
      <h1 className="text-3xl font-bold text-black text-center">
        {title}
      </h1>
      <div className="flex justify-between items-start gap-4">
        {steps.slice(0, 3).map((step, index) => (
          <div key={index} className="flex-1 text-center">
            <div
              className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{ backgroundColor: colors[index] }}
            >
              <span className="text-white font-bold">{index + 1}</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-700">
              {step.title}
            </h2>
          </div>
        ))}
      </div>
      {content && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 text-center">{content}</p>
        </div>
      )}
    </div>
  );
}
