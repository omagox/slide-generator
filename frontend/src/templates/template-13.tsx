import type { DetailedTopicsProps } from "./types";

const defaults: DetailedTopicsProps = {
  title: "Título padrão",
  topics: [
    {
      title: "Tópico 1",
      content: "Conteúdo do tópico 1",
      additional: "Informação adicional 1",
    },
    {
      title: "Tópico 2",
      content: "Conteúdo do tópico 2",
      additional: "Informação adicional 2",
    },
  ],
  preview: false,
};

export default function Template13(props: Partial<DetailedTopicsProps>) {
  const { title, topics, preview } = { ...defaults, ...props };

  const colors = ["#1277bc", "#58a3a1"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="grid grid-cols-2 gap-8">
        {topics.slice(0, 2).map((topic, index) => (
          <div key={index}>
            <h2
              className="text-xl font-semibold mb-4"
              style={{ color: colors[index] }}
            >
              {topic.title}
            </h2>
            <p className="text-gray-600 mb-4">{topic.content}</p>
            {topic.additional && (
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-gray-500 text-sm">{topic.additional}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
