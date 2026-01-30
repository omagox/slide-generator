import React from "react";
import type { TwoTopicsProps } from "./types";

const defaults: TwoTopicsProps = {
  title: "Título padrão",
  topics: [
    { title: "Tópico 1", content: "Descrição do tópico 1" },
    { title: "Tópico 2", content: "Descrição do tópico 2" },
  ],
  preview: false,
};

export default function Template07(props: Partial<TwoTopicsProps>) {
  const { title, topics, preview } = { ...defaults, ...props };

  const colors = ["#1277bc", "#ab1551"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="space-y-6 w-full">
        {topics.slice(0, 2).map((topic, index) => (
          <div
            key={index}
            className="border-l-4 pl-6"
            style={{ borderLeftColor: colors[index] }}
          >
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: colors[index] }}
            >
              {topic.title}
            </h2>
            <p className="text-gray-600 mb-2">{topic.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
