import type { MultipleTopicsProps } from "./types";

const defaultMultipleTopicsProps: MultipleTopicsProps = {
  title: "Título padrão",
  topics: [
    "Tópico padrão",
    "Tópico padrão",
    "Tópico padrão",
    "Tópico padrão",
    "Tópico padrão",
    "Tópico padrão",
  ],
  preview: false,
};

export default function Template36(props: Partial<MultipleTopicsProps>) {
  const { title, topics, preview } = {
    ...defaultMultipleTopicsProps,
    ...props,
    topics: props.topics?.length
      ? props.topics.map((topic) => topic || "Tópico padrão")
      : defaultMultipleTopicsProps.topics,
  };

  const colors = ["#1277bc", "#58a3a1", "#6b7280"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : undefined }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {topics.slice(0, 6).map((topic, index) => (
          <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
            <div
              className="w-16 h-16 rounded-lg mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: colors[index % 3] }}
            >
              <span className="text-white text-2xl font-bold">{index + 1}</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-700">{topic}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
