import type { DetailedTopicsProps } from "./types";

type SafeDetailedTopicsProps = Partial<DetailedTopicsProps>;

const defaultValues: DetailedTopicsProps = {
  title: "Título padrão",
  topics: [
    {
      title: "Tópico 1",
      content: "Conteúdo padrão para o tópico 1.",
    },
    {
      title: "Tópico 2",
      content: "Conteúdo padrão para o tópico 2.",
    },
    {
      title: "Tópico 3",
      content: "Conteúdo padrão para o tópico 3.",
    },
  ],
  preview: false,
};

export default function Template05(props: SafeDetailedTopicsProps) {
  const { title, topics, preview } = { ...defaultValues, ...props };
  const colors = ["#1277bc", "#58a3a1", "#6b7280"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {topics.slice(0, 3).map((topic, index) => (
          <div key={index} className="text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: colors[index] }}
            >
              <span className="text-white text-xl font-bold">{index + 1}</span>
            </div>
            <h2
              className="text-lg font-semibold mb-2"
              style={{ color: colors[index] }}
            >
              {topic.title}
            </h2>
            <p className="text-gray-600 text-sm">{topic.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
