import type { MixedContentProps } from "./types";

const defaults: MixedContentProps = {
  title: "Título padrão",
  topics: ["Tópico 1", "Tópico 2", "Tópico 3"],
  content: "Texto complementar padrão.",
  preview: false,
};

export default function Template14(props: Partial<MixedContentProps>) {
  const { title, topics, content, preview } = { ...defaults, ...props };

  const colors = ["#1277bc", "#58a3a1", "#6b7280"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="flex flex-col items-center space-y-4">
        {topics.slice(0, 3).map((topic, index) => (
          <div
            key={index}
            className="h-16 flex items-center justify-center rounded text-white font-semibold"
            style={{
              backgroundColor: colors[index],
              width: `${8 + index * 4}rem`,
            }}
          >
            {topic}
          </div>
        ))}
        {content && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg max-w-2xl">
            <p className="text-gray-600 text-center">{content}</p>
          </div>
        )}
      </div>
    </div>
  );
}
