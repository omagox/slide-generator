import React from "react";
import type { SingleTopicProps } from "./types";

const defaultSingleTopicProps: SingleTopicProps = {
  title: "Título padrão",
  content: "Conteúdo padrão",
  preview: false,
};

export default function Template38(props: Partial<SingleTopicProps>) {
  const { title, content, preview } = { ...defaultSingleTopicProps, ...props };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <div className="h-full flex items-center">
        <div className="w-1/3 flex justify-center">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#1277bc" }}
          >
            <span className="text-white text-4xl">?</span>
          </div>
        </div>
        <div className="w-2/3 pl-8">
          <h1 className="text-3xl font-bold text-black mb-6">{title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{content}</p>
          <div className="mt-6 flex space-x-4">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#1277bc" }}
            ></div>
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#58a3a1" }}
            ></div>
            <div className="w-4 h-4 rounded-full bg-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
