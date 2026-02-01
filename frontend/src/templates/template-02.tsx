import type { TwoTopicsProps } from "./types";

type SafeTwoTopicsProps = Partial<TwoTopicsProps>;

const defaultValues: TwoTopicsProps = {
  title: "Título padrão",
  topics: [
    { title: "Tópico 1", content: "Conteúdo do tópico 1" },
    { title: "Tópico 2", content: "Conteúdo do tópico 2" },
  ],
  preview: false,
};

export default function Template02(props: SafeTwoTopicsProps) {
  const { title, topics, preview } = { ...defaultValues, ...props };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="grid grid-cols-2 gap-8">
        <div
          className="bg-gray-50 p-6 rounded-lg border-l-4"
          style={{ borderLeftColor: "#1277bc" }}
        >
          <h2
            className="text-xl font-semibold mb-3"
            style={{ color: "#1277bc" }}
          >
            {topics[0]?.title}
          </h2>
          <p className="text-gray-600">{topics[0]?.content}</p>
        </div>
        <div
          className="bg-gray-50 p-6 rounded-lg border-l-4"
          style={{ borderLeftColor: "#58a3a1" }}
        >
          <h2
            className="text-xl font-semibold mb-3"
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
