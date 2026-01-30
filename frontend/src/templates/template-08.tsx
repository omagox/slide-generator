import React from "react";
import type { MixedContentProps } from "./types";

const defaults: MixedContentProps = {
  title: "Título padrão",
  topics: ["Tópico 1", "Tópico 2", "Tópico 3"],
  content: "Texto complementar geral sobre os tópicos apresentados.",
  preview: false,
};

export default function Template08(props: Partial<MixedContentProps>) {
  const { title, topics, content, preview } = { ...defaults, ...props };

  const colors = ["#1277bc", "#ab1551", "#6b7280"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          {topics.slice(0, 3).map((topic, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors[index] }}
              >
                <span className="text-white text-xs">{index + 1}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-700">{topic}</h2>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-600 leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}
