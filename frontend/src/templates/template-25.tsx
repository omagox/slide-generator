import type { TopicsWithSubtopicsProps } from "./types";

const defaults: TopicsWithSubtopicsProps = {
  title: "Título padrão",
  topics: [
    { title: "Tópico 1", subtopics: ["Subtópico 1.1", "Subtópico 1.2"] },
    { title: "Tópico 2", subtopics: ["Subtópico 2.1", "Subtópico 2.2"] },
  ],
  preview: false,
};

export default function Template25(props: Partial<TopicsWithSubtopicsProps>) {
  const { title, topics, preview } = { ...defaults, ...props };
  const colors = ["#1277bc", "#58a3a1"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="max-w-3xl mx-auto space-y-4 w-full">
        {topics.slice(0, 2).map((topic, index) => (
          <div key={index}>
            <div className="flex items-start space-x-4 mb-1">
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
                <p key={subIndex} className="text-sm text-gray-600">
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
