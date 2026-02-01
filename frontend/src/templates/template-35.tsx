import React from "react";
import type { ProcessProps } from "./types";

const defaultStepItem = {
  title: "Título do passo",
  content: "Descrição do passo",
};

const defaultProcessProps: ProcessProps = {
  title: "Título padrão do processo",
  steps: [defaultStepItem, defaultStepItem, defaultStepItem, defaultStepItem],
  preview: false,
};

export default function Template35(props: Partial<ProcessProps>) {
  const { title, steps, preview } = {
    ...defaultProcessProps,
    ...props,
    steps:
      props.steps?.map((step) => ({ ...defaultStepItem, ...step })) ||
      defaultProcessProps.steps,
  };

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#1277bc"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="flex justify-between items-center relative w-full">
        <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 transform -translate-y-1/2 rounded"></div>
        {steps.slice(0, 4).map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center z-10 bg-white px-4"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4"
              style={{ backgroundColor: colors[index] }}
            >
              {index + 1}
            </div>
            <div className="text-center max-w-32">
              <h3 className="font-semibold text-black mb-2 text-sm">
                {step.title}
              </h3>
              <p className="text-gray-600 text-xs">{step.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
