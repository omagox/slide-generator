import React from "react";
import type { MixedContentProps } from "./types";

const defaults: MixedContentProps = {
  title: "Título padrão",
  topics: ["Tópico 1", "Tópico 2", "Tópico 3"],
  content: "Texto complementar padrão.",
  preview: false,
};

export default function Template11(props: Partial<MixedContentProps>) {
  const { title, topics, content, preview } = { ...defaults, ...props };

  const colors = ["#1277bc", "#58a3a1", "#6b7280"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {topics.slice(0, 3).map((topic, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg text-center border-t-4"
            style={{ borderTopColor: colors[index] }}
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
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-600 text-center leading-relaxed">{content}</p>
        </div>
      )}
    </div>
  );
}
