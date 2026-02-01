import type { MultipleTopicsProps } from "./types";

const defaults: MultipleTopicsProps = {
  title: "Título padrão",
  topics: ["Tópico 1", "Tópico 2", "Tópico 3"],
  preview: false,
};

export default function Template10(props: Partial<MultipleTopicsProps>) {
  const { title, topics, preview } = { ...defaults, ...props };

  const colors = ["#1277bc", "#58a3a1", "#6b7280"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="max-w-3xl mx-auto w-full">
        <div className="grid grid-cols-1 gap-4">
          {topics.slice(0, 3).map((topic, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 p-4 border rounded-lg"
              style={{ borderColor: colors[index] }}
            >
              <div
                className="w-8 h-8 rounded border-2 flex items-center justify-center"
                style={{
                  borderColor: colors[index],
                  backgroundColor: colors[index],
                }}
              >
                <span className="text-white text-sm">✓</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-700">{topic}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
