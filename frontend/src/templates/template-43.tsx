import React from "react";
import type { ProcessProps } from "./types";

const defaultStepItem = {
  title: "Título do passo",
  content: "Descrição do passo",
};

const defaultProcessProps: ProcessProps = {
  title: "Título padrão",
  steps: [defaultStepItem, defaultStepItem, defaultStepItem, defaultStepItem],
  preview: false,
};

export default function Template43(props: Partial<ProcessProps>) {
  const { title, steps, preview } = {
    ...defaultProcessProps,
    ...props,
  };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="flex justify-center">
        <div className="space-y-6 max-w-2xl w-full">
          {steps.slice(0, 4).map((step, index) => {
            const colors = ["#1277bc", "#58a3a1", "#6b7280", "#1277bc"];
            return (
              <div key={index} className="flex items-center space-x-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: colors[index] }}
                >
                  {index + 1}
                </div>
                <div className="flex-1 p-4 bg-gray-50 rounded-lg">
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: colors[index] }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
