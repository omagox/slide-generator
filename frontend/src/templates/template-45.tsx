import React from "react";
import type { ExampleProps } from "./types";

export default function Template45({
  title,
  concept,
  examples,
  preview,
}: ExampleProps) {
  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-6 text-center">
        {title}
      </h1>
      <div className="text-center mb-8">
        <div
          className="inline-block px-6 py-3 rounded-full text-white font-semibold text-lg"
          style={{ backgroundColor: "#1277bc" }}
        >
          {concept}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {examples.slice(0, 4).map((example, index) => {
          const colors = ["#1277bc", "#58a3a1", "#6b7280", "#1277bc"];
          return (
            <div key={index} className="p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: colors[index] }}
                >
                  {index + 1}
                </div>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: colors[index] }}
                >
                  {example.title}
                </h3>
              </div>
              <p className="text-gray-600 text-sm">{example.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
