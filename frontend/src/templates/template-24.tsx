import React from "react";
import type { MixedContentProps } from "./types";

const defaults: MixedContentProps = {
  title: "Título padrão",
  topics: [
    "Tópico 1",
    "Tópico 2",
    "Tópico 3",
    "Tópico 4",
    "Tópico 5",
    "Tópico 6",
  ],
  content: "Conteúdo complementar padrão.",
  preview: false,
};

export default function Template24(props: Partial<MixedContentProps>) {
  const { title, topics, content, preview } = { ...defaults, ...props };

  const colors = [
    "#1277bc",
    "#ab1551",
    "#6b7280",
    "#1277bc",
    "#ab1551",
    "#6b7280",
  ];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="grid grid-cols-3 gap-4 w-full">
        {topics.slice(0, 6).map((topic, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg text-center border-l-4 flex items-center justify-center"
            style={{ borderLeftColor: colors[index] }}
          >
            <h2
              className="text-lg font-semibold mb-2"
              style={{ color: colors[index] }}
            >
              {topic}
            </h2>
          </div>
        ))}
      </div>
      {content && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600 text-center">{content}</p>
        </div>
      )}
    </div>
  );
}
