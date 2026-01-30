import React from "react";
import type { DetailedTopicsProps } from "./types";

const defaultTopicItem = {
  title: "Título do tópico",
  content: "Conteúdo do tópico",
  additional: "",
};

const defaultDetailedTopicsProps: DetailedTopicsProps = {
  title: "Título padrão",
  topics: [defaultTopicItem, defaultTopicItem, defaultTopicItem],
  preview: false,
};

export default function Template37(props: Partial<DetailedTopicsProps>) {
  const { title, topics, preview } = {
    ...defaultDetailedTopicsProps,
    ...props,
    topics: props.topics?.length
      ? props.topics.map((topic) => ({ ...defaultTopicItem, ...topic }))
      : defaultDetailedTopicsProps.topics,
  };

  const colors = ["#1277bc", "#ab1551", "#6b7280"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="space-y-6">
        {topics.slice(0, 3).map((topic, index) => (
          <div
            key={index}
            className="flex items-start space-x-6 p-6 bg-gray-50 rounded-lg"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: colors[index] }}
            >
              <span className="text-2xl">•</span>
            </div>
            <div className="flex-1">
              <h2
                className="text-xl font-semibold mb-3"
                style={{ color: colors[index] }}
              >
                {topic.title}
              </h2>
              <p className="text-gray-700 mb-2">{topic.content}</p>
              {topic.additional && (
                <p className="text-gray-500 text-sm italic">
                  {topic.additional}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
