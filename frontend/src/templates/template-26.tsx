import React from "react";
import type { HighlightProps } from "./types";

const defaultHighlight: HighlightProps = {
  title: "Título padrão",
  topic: { title: "Tópico padrão", content: "Conteúdo padrão", highlight: "" },
  preview: false,
};

export default function Template26(props: Partial<HighlightProps>) {
  const { title, topic, preview } = { ...defaultHighlight, ...props };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="flex justify-center">
        <div className="max-w-2xl space-y-4">
          <div className="text-center mb-6">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: "#1277bc" }}
            >
              <span className="text-white text-2xl font-bold">!</span>
            </div>
            <h2 className="text-2xl font-semibold" style={{ color: "#1277bc" }}>
              {topic.title}
            </h2>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-600 text-center leading-relaxed mb-4">
              {topic.content}
            </p>
            {topic.highlight && (
              <div className="border-t pt-4">
                <p className="text-gray-500 text-sm text-center">
                  {topic.highlight}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
