import React from "react";
import type { TopicsWithSubtopicsProps } from "./types";

type SafeTopicsWithSubtopicsProps = Partial<TopicsWithSubtopicsProps>;

const defaultValues: TopicsWithSubtopicsProps = {
  title: "Título padrão",
  topics: [
    { title: "Tópico 1", subtopics: ["Subtópico 1-1", "Subtópico 1-2"] },
    { title: "Tópico 2", subtopics: ["Subtópico 2-1", "Subtópico 2-2"] },
    { title: "Tópico 3", subtopics: ["Subtópico 3-1", "Subtópico 3-2"] },
    { title: "Tópico 4", subtopics: ["Subtópico 4-1", "Subtópico 4-2"] },
  ],
  preview: false,
};

export default function Template04(props: SafeTopicsWithSubtopicsProps) {
  const { title, topics, preview } = { ...defaultValues, ...props };
  const colors = ["#1277bc", "#ab1551"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="space-y-6">
        {topics.map((topic, index) => (
          <div key={index}>
            <div className="flex items-start space-x-4 mb-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: colors[index] }}
              >
                {index + 1}
              </div>
              <h2
                className="text-xl font-semibold"
                style={{ color: colors[index] }}
              >
                {topic.title}
              </h2>
            </div>
            <div className="ml-12 space-y-2">
              {topic.subtopics.map((subtopic, subIndex) => (
                <p key={subIndex} className="text-gray-600">
                  • {subtopic}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
