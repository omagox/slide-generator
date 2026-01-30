import React from "react";
import type { SingleTopicProps } from "./types";

const defaultSingleTopicProps: SingleTopicProps = {
  title: "Título padrão",
  content: "Conteúdo padrão do tópico",
  preview: false,
};

export default function Template34(props: Partial<SingleTopicProps>) {
  const { title, content, preview } = { ...defaultSingleTopicProps, ...props };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg shadow-lg"
    >
      <div className="h-full flex flex-col justify-center items-center text-center">
        <div className="mb-6">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: "#1277bc" }}
          >
            <span className="text-white text-3xl">📚</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-black mb-6">{title}</h1>
        <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
          {content}
        </p>
        <div
          className="mt-8 w-32 h-1 rounded"
          style={{ backgroundColor: "#ab1551" }}
        ></div>
      </div>
    </div>
  );
}
