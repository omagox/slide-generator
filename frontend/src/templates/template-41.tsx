import React from "react";
import type { ProcessProps } from "./types";

const defaultStepItem = {
  title: "Título do passo",
  content: "Descrição do passo",
  additional: "",
};

const defaultProcessProps: ProcessProps = {
  title: "Título padrão",
  steps: [defaultStepItem],
  preview: false,
};

export default function Template41(props: Partial<ProcessProps>) {
  const { title, steps, preview } = {
    ...defaultProcessProps,
    ...props,
  };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="grid grid-cols-3 gap-6 w-full">
        {steps.slice(0, 3).map((step, index) => {
          const colors = ["#1277bc", "#58a3a1", "#6b7280"];
          return (
            <div key={index} className="text-center">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl"
                style={{ backgroundColor: colors[index] }}
              >
                {index + 1}
              </div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: colors[index] }}
              >
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.content}</p>
              {step.additional && (
                <p className="text-gray-500 text-xs mt-2 italic">
                  {step.additional}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
