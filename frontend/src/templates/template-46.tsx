import React from "react";
import type { ComparisonProps } from "./types";

export default function Template46({ title, items, preview }: ComparisonProps) {
  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="flex justify-center">
        <div className="max-w-5xl w-full">
          <div className="grid grid-cols-3 gap-8">
            {items.slice(0, 3).map((item, index) => {
              const colors = ["#1277bc", "#ab1551", "#6b7280"];
              return (
                <div key={index} className="text-center">
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: colors[index] }}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <h2
                    className="text-xl font-semibold mb-4"
                    style={{ color: colors[index] }}
                  >
                    {item.title}
                  </h2>
                  <div className="space-y-2">
                    {item.characteristics.map((char, charIndex) => (
                      <div
                        key={charIndex}
                        className="p-2 bg-gray-50 rounded text-sm text-gray-700"
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
