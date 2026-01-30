import React from "react";
import type { DetailedTopicsProps } from "./types";

const defaults: DetailedTopicsProps = {
  title: "Título padrão",
  topics: [
    { title: "Tópico 1", content: "Conteúdo do Tópico 1" },
    { title: "Tópico 2", content: "Conteúdo do Tópico 2" },
    { title: "Tópico 3", content: "Conteúdo do Tópico 3" },
    { title: "Tópico 4", content: "Conteúdo do Tópico 4" },
  ],
  preview: false,
};

export default function Template23(props: Partial<DetailedTopicsProps>) {
  const { title, topics, preview } = { ...defaults, ...props };

  const colors = ["#1277bc", "#ab1551", "#6b7280", "#1277bc"];

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
              <span className="text-white text-sm">✓</span>
            </div>
            <div>
              <h2 className="font-semibold text-black mb-1">{topic.title}</h2>
              <p className="text-gray-600 text-sm">{topic.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
