import type { TwoTopicsProps } from "./types";

const defaults: TwoTopicsProps = {
  title: "Título padrão",
  topics: [
    { title: "Tópico 1", content: "Conteúdo do tópico 1" },
    { title: "Tópico 2", content: "Conteúdo do tópico 2" },
  ],
  preview: false,
};

export default function Template18(props: Partial<TwoTopicsProps>) {
  const { title, topics, preview } = { ...defaults, ...props };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="flex items-center justify-between w-full">
        <div
          className="flex-1 bg-gray-50 p-6 rounded-lg border-l-4"
          style={{ borderLeftColor: "#1277bc" }}
        >
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "#1277bc" }}
          >
            {topics[0]?.title}
          </h2>
          <p className="text-gray-600">{topics[0]?.content}</p>
        </div>
        <div className="mx-8">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#58a3a1" }}
          >
            <span className="text-white text-xl">→</span>
          </div>
        </div>
        <div
          className="flex-1 bg-gray-50 p-6 rounded-lg border-l-4"
          style={{ borderLeftColor: "#58a3a1" }}
        >
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "#58a3a1" }}
          >
            {topics[1]?.title}
          </h2>
          <p className="text-gray-600">{topics[1]?.content}</p>
        </div>
      </div>
    </div>
  );
}
