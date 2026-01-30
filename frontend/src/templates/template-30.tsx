import React from "react";
import type { ExampleProps } from "./types";

const defaultExampleItem = {
  title: "Título do exemplo",
  description: "Descrição do exemplo",
};

const defaultExampleProps: ExampleProps = {
  title: "Título padrão",
  concept: "Conceito padrão",
  examples: [defaultExampleItem],
  preview: false,
};

export default function Template30(props: Partial<ExampleProps>) {
  const {
    title,
    concept,
    examples = [],
    preview,
  } = {
    ...defaultExampleProps,
    ...props,
  };

  const safeExamples = examples.map((ex) => ({ ...defaultExampleItem, ...ex }));

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : undefined }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-3 text-center">
        {title}
      </h1>
      <div className="text-center mb-4">
        <h2 className="text-sm font-semibold" style={{ color: "#757575" }}>
          {concept}
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {safeExamples.slice(0, 4).map((example, index) => (
          <div
            key={index}
            className="bg-gray-50 p-5 rounded-lg border-l-4"
            style={{ borderLeftColor: index % 2 === 0 ? "#1277bc" : "#ab1551" }}
          >
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: index % 2 === 0 ? "#1277bc" : "#ab1551" }}
            >
              Exemplo {index + 1}: {example.title}
            </h3>
            <p className="text-gray-600">{example.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
