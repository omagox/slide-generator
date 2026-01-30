import React from "react";
import type { DetailedTopicsProps } from "./types";

const defaultTopicItem = {
  title: "Título do tópico",
  content: "Conteúdo do tópico",
  additional: "",
};

const defaultDetailedTopicsProps: DetailedTopicsProps = {
  title: "Título padrão",
  topics: [defaultTopicItem],
  preview: false,
};

export default function Template39(props: Partial<DetailedTopicsProps>) {
  const { title, topics, preview } = {
    ...defaultDetailedTopicsProps,
    ...props,
  };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="w-full grid grid-cols-2 gap-6">
        {topics.slice(0, 4).map((topic, index) => {
          const colors = ["#1277bc", "#ab1551", "#6b7280", "#1277bc"];
          return (
            <div
              key={index}
              className="p-6 border-2 rounded-lg"
              style={{ borderColor: colors[index] }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: colors[index] }}
                >
                  {index + 1}
                </div>
                <h2
                  className="text-lg font-semibold"
                  style={{ color: colors[index] }}
                >
                  {topic.title}
                </h2>
              </div>
              <p className="text-gray-600 text-sm">{topic.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
