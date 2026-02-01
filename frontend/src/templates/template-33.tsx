import React from "react";
import { FiArrowRight } from "react-icons/fi";

import type { FormulaProps } from "./types";

const defaultVariable = { symbol: "x", meaning: "Significado da variável" };

const defaultFormulaProps: FormulaProps = {
  title: "Título padrão",
  formula: "a + b = c",
  variables: [defaultVariable],
  example: "Exemplo padrão da fórmula",
  preview: false,
};

export default function Template33(props: Partial<FormulaProps>) {
  const {
    title,
    formula,
    variables = [],
    example,
    preview,
  } = {
    ...defaultFormulaProps,
    ...props,
  };

  // Garante valores padrão para o array de variáveis
  const safeVariables = variables.length
    ? variables
    : defaultFormulaProps.variables;

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : undefined }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-5 text-center">
        {title}
      </h1>
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="text-center bg-gray-50 p-3 pt-2 rounded-lg">
          <h2 className="text-xl font-bold mb-2" style={{ color: "#1277bc" }}>
            Fórmula
          </h2>
          <div className="text-2xl font-mono font-bold text-black">
            {formula}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "#58a3a1" }}
            >
              Onde:
            </h3>
            <div className="space-y-2">
              {safeVariables.map((variable, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span
                    className="font-mono font-bold text-sm"
                    style={{ color: "#58a3a1" }}
                  >
                    {variable.symbol}
                  </span>
                  <FiArrowRight className="text-[#58a3a1]" />
                  <span className="text-gray-700 text-xs">
                    {variable.meaning}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {example && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3
                className="text-lg font-semibold mb-1"
                style={{ color: "#1277bc" }}
              >
                Exemplo
              </h3>
              <p className="text-gray-700 text-sm">{example}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
