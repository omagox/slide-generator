import React from "react";
import type { ProcessProps } from "./types";

export default function Template53({ title, steps, preview }: ProcessProps) {
  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="grid grid-cols-2 gap-8">
        {steps.slice(0, 4).map((step, index) => {
          const colors = ["#1277bc", "#ab1551", "#6b7280", "#1277bc"];
          return (
            <div key={index} className="flex items-center space-x-4">
              <div
                className="w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold text-2xl"
                style={{ backgroundColor: colors[index] }}
              >
                {index + 1}
              </div>
              <div className="flex-1">
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ color: colors[index] }}
                >
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm">{step.content}</p>
                {step.additional && (
                  <p className="text-gray-500 text-xs mt-1 italic">
                    {step.additional}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
