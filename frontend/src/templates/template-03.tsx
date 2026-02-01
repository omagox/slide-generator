import type { MultipleTopicsProps } from "./types";

type SafeMultipleTopicsProps = Partial<MultipleTopicsProps>;

const defaultValues: MultipleTopicsProps = {
  title: "Título padrão",
  topics: ["Tópico 1", "Tópico 2", "Tópico 3", "Tópico 4", "Tópico 5"],
  preview: false,
};

export default function Template03(props: SafeMultipleTopicsProps) {
  const { title, topics, preview } = { ...defaultValues, ...props };
  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#1277bc", "#58a3a1"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="space-y-4">
        {topics.slice(0, 5).map((topic, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index] }}
            ></div>
            <h2
              className="text-lg font-semibold"
              style={{ color: colors[index] }}
            >
              {topic}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
