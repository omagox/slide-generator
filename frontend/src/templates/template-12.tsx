import React from "react";
import type { DetailedTopicsProps } from "./types";

const defaults: DetailedTopicsProps = {
  title: "Título padrão",
  topics: [
    { title: "Tópico A", content: "Conteúdo do tópico A" },
    { title: "Tópico B", content: "Conteúdo do tópico B" },
    { title: "Tópico C", content: "Conteúdo do tópico C" },
    { title: "Tópico D", content: "Conteúdo do tópico D" },
  ],
  preview: false,
};

export default function Template12(props: Partial<DetailedTopicsProps>) {
  const { title, topics, preview } = { ...defaults, ...props };

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#1277bc"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="max-w-2xl mx-auto space-y-4 w-full">
        {topics.slice(0, 4).map((topic, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div
              className="min-w-8 max-w-8 min-h-8 max-h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors[index] }}
            >
              <span className="text-white text-sm font-bold">
                {String.fromCharCode(65 + index)}
              </span>
            </div>
            <div>
              <h2
                className="text-lg font-semibold mb-1"
                style={{ color: colors[index] }}
              >
                {topic.title}
              </h2>
              <p className="text-gray-600">{topic.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
