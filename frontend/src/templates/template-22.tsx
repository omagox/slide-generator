import type { DetailedTopicsProps } from "./types";

const defaults: DetailedTopicsProps = {
  title: "Título padrão",
  topics: [
    { title: "Tópico 1", content: "Conteúdo do Tópico 1" },
    { title: "Tópico 2", content: "Conteúdo do Tópico 2" },
  ],
  preview: false,
};

export default function Template22(props: Partial<DetailedTopicsProps>) {
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
      <div className="grid grid-cols-2 gap-8 w-full">
        {topics.slice(0, 2).map((topic, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-lg border-t-4"
            style={{ borderTopColor: colors[index] }}
          >
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: colors[index] }}
            >
              {topic.title}
            </h2>
            <p className="text-gray-600 mb-3">{topic.content}</p>
            {topic.additional && (
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">• {topic.additional}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
