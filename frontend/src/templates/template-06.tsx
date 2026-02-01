import React from "react";
import type { MultipleTopicsProps } from "./types";

const defaults: MultipleTopicsProps = {
  title: "Título padrão",
  topics: ["Tópico 1", "Tópico 2", "Tópico 3", "Tópico 4"],
  preview: false,
};

export default function Template06(props: Partial<MultipleTopicsProps>) {
  const { title, topics, preview } = { ...defaults, ...props };

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#1277bc"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="max-w-2xl mx-auto space-y-4 w-full">
        {topics.slice(0, 4).map((topic, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: colors[index] }}
            ></div>
            <h2 className="text-lg font-semibold text-gray-700">{topic}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
