import React from "react";
import type { TwoTopicsProps } from "./types";

const defaultTopicItem = {
  title: "Título do tópico",
  content: "Conteúdo do tópico",
};

const defaultTwoTopicsProps: TwoTopicsProps = {
  title: "Título padrão",
  topics: [defaultTopicItem, defaultTopicItem],
  preview: false,
};

export default function Template42(props: Partial<TwoTopicsProps>) {
  const { title, topics, preview } = {
    ...defaultTwoTopicsProps,
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
      <div className="h-full flex items-center">
        <div className="w-1/2 pr-4">
          <div
            className="bg-gray-50 p-6 rounded-lg border-t-4"
            style={{ borderTopColor: "#1277bc" }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: "#1277bc" }}
            >
              {topics[0].title}
            </h2>
            <p className="text-gray-600">{topics[0].content}</p>
          </div>
        </div>
        <div className="w-px h-32 bg-gray-300 mx-8"></div>
        <div className="w-1/2 pl-4">
          <div
            className="bg-gray-50 p-6 rounded-lg border-t-4"
            style={{ borderTopColor: "#58a3a1" }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: "#58a3a1" }}
            >
              {topics[1].title}
            </h2>
            <p className="text-gray-600">{topics[1].content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
