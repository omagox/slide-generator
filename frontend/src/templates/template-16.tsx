import React from "react";
import type { HighlightProps } from "./types";

const defaults: HighlightProps = {
  title: "Título padrão",
  topic: {
    title: "Tópico padrão",
    content: "Conteúdo padrão do tópico",
    highlight: "Destaque padrão",
  },
  preview: false,
};

export default function Template16(props: Partial<HighlightProps>) {
  const { title, topic, preview } = { ...defaults, ...props };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="flex justify-center">
        <div className="space-y-6">
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: "#1277bc" }}
            >
              <span className="text-white text-xl">★</span>
            </div>
            <h2
              className="text-xl font-semibold mb-3"
              style={{ color: "#1277bc" }}
            >
              {topic.title}
            </h2>
            <p className="text-gray-600 max-w-md">{topic.content}</p>
            {topic.highlight && (
              <div className="mt-4 bg-gray-50 p-3 rounded">
                <p className="text-gray-500 text-sm">{topic.highlight}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
