import React from "react";
import type { TimelineProps } from "./types";

export default function Template50({
  title,
  steps,
  content,
  preview,
}: TimelineProps) {
  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-300"></div>
          <div className="space-y-8">
            {steps.slice(0, 4).map((step, index) => {
              const colors = ["#1277bc", "#ab1551", "#6b7280", "#1277bc"];
              return (
                <div
                  key={index}
                  className="relative flex items-start space-x-6"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10"
                    style={{ backgroundColor: colors[index] }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-3">
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: colors[index] }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {content && (
          <div className="mt-8 text-center bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 italic">{content}</p>
          </div>
        )}
      </div>
    </div>
  );
}
