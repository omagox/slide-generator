import React from "react";
import type { TopicWithDetailsProps } from "./types";

const defaultTopicItem = {
  title: "Título do tópico",
  content: "Conteúdo do tópico",
  details: ["Detalhe 1", "Detalhe 2"],
};

const defaultTopicWithDetailsProps: TopicWithDetailsProps = {
  title: "Título padrão",
  topic: defaultTopicItem,
  preview: false,
};

export default function Template40(props: Partial<TopicWithDetailsProps>) {
  const { title, topic, preview } = {
    ...defaultTopicWithDetailsProps,
    ...props,
  };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 p-8 rounded-lg">
          <h2
            className="text-2xl font-bold mb-6 text-center"
            style={{ color: "#1277bc" }}
          >
            {topic.title}
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
            {topic.content}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {topic.details.map((detail, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-white rounded-lg"
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#58a3a1" : "#1277bc",
                  }}
                >
                  {index + 1}
                </div>
                <span className="text-gray-600">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
