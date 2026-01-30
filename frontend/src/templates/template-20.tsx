import React from "react";
import type { DetailedTopicsProps } from "./types";

const defaults: DetailedTopicsProps = {
  title: "Título padrão",
  topics: [
    { title: "Tópico A", content: "Conteúdo do Tópico A" },
    { title: "Tópico B", content: "Conteúdo do Tópico B" },
    { title: "Tópico C", content: "Conteúdo do Tópico C" },
  ],
  preview: false,
};

export default function Template20(props: Partial<DetailedTopicsProps>) {
  const { title, topics, preview } = { ...defaults, ...props };

  const colors = ["#1277bc", "#ab1551", "#6b7280"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="grid grid-cols-3 gap-6 w-full">
        {topics.slice(0, 3).map((topic, index) => (
          <div key={index} className="text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: colors[index] }}
            >
              <span className="text-white text-xl">
                {String.fromCharCode(65 + index)}
              </span>
            </div>
            <h2
              className="text-lg font-semibold mb-2"
              style={{ color: colors[index] }}
            >
              {topic.title}
            </h2>
            <p className="text-gray-600 text-sm">{topic.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
