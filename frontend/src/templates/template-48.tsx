import React from "react";
import type { FormulaProps } from "./types";

export default function Template48({
  title,
  formula,
  variables,
  example,
  preview,
}: FormulaProps) {
  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div
            className="bg-gray-50 p-8 rounded-lg border-2"
            style={{ borderColor: "#1277bc" }}
          >
            <div className="text-5xl font-mono font-bold text-black mb-4">
              {formula}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: "#58a3a1" }}
              >
                <span className="text-sm">?</span>
              </div>
              <span style={{ color: "#58a3a1" }}>Variáveis</span>
            </h3>
            <div className="space-y-3">
              {variables.map((variable, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                >
                  <span
                    className="font-mono font-bold text-xl w-8"
                    style={{ color: "#58a3a1" }}
                  >
                    {variable.symbol}
                  </span>
                  <span className="text-gray-700">= {variable.meaning}</span>
                </div>
              ))}
            </div>
          </div>
          {example && (
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: "#1277bc" }}
                >
                  <span className="text-sm">!</span>
                </div>
                <span style={{ color: "#1277bc" }}>Exemplo</span>
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">{example}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
