import React from "react";
import type { LearningObjectivesProps } from "./types";

const defaultLearningObjectives: LearningObjectivesProps = {
  title: "Título padrão",
  objectives: ["Objetivo 1", "Objetivo 2"],
  preview: false,
};

export default function Template27(props: Partial<LearningObjectivesProps>) {
  const { title, objectives, preview } = {
    ...defaultLearningObjectives,
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
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-6" style={{ color: "#1277bc" }}>
          Objetivos de Aprendizagem
        </h2>
        <div className="space-y-6">
          {objectives.map((objective, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 bg-gray-50 rounded-lg"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                style={{
                  backgroundColor: index % 2 === 0 ? "#1277bc" : "#ab1551",
                }}
              >
                {index + 1}
              </div>
              <p className="text-gray-700 translate-y-1">{objective}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
