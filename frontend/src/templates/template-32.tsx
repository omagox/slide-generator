import React from "react";
import type { CaseStudyProps } from "./types";

const defaultCaseStudyProps: CaseStudyProps = {
  title: "Título padrão",
  scenario: "Descrição do cenário padrão",
  questions: ["Questão 1", "Questão 2"],
  preview: false,
};

export default function Template32(props: Partial<CaseStudyProps>) {
  const {
    title,
    scenario,
    questions = [],
    preview,
  } = {
    ...defaultCaseStudyProps,
    ...props,
  };

  const safeQuestions = questions.length
    ? questions
    : defaultCaseStudyProps.questions;

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : undefined }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="space-y-6">
        <div
          className="bg-gray-50 p-6 rounded-lg border-l-4"
          style={{ borderLeftColor: "#1277bc" }}
        >
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "#1277bc" }}
          >
            Cenário
          </h2>
          <p className="text-gray-700 leading-relaxed">{scenario}</p>
        </div>
        <div>
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "#ab1551" }}
          >
            Questões para Análise
          </h2>
          <div className="space-y-3">
            {safeQuestions.map((question, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: "#ab1551" }}
                >
                  {index + 1}
                </div>
                <p className="text-gray-700">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
