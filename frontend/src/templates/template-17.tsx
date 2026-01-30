import React from "react";
import type { MixedContentProps } from "./types";

const defaults: MixedContentProps = {
  title: "Título padrão",
  topics: ["Tópico 1", "Tópico 2", "Tópico 3", "Tópico 4"],
  content: "Texto complementar padrão.",
  preview: false,
};

export default function Template17(props: Partial<MixedContentProps>) {
  const { title, topics, content, preview } = { ...defaults, ...props };

  const colors = ["#1277bc", "#ab1551", "#6b7280", "#1277bc"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="grid grid-cols-4 gap-4 w-full">
        {topics.slice(0, 4).map((topic, index) => (
          <div key={index} className="text-center">
            <div
              className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{ backgroundColor: colors[index] }}
            >
              <span className="text-white font-bold">{index + 1}</span>
            </div>
            <h2 className="text-sm font-semibold text-gray-700">{topic}</h2>
          </div>
        ))}
      </div>
      {content && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-600 text-center leading-relaxed">{content}</p>
        </div>
      )}
    </div>
  );
}
