import type { DetailedTopicsProps } from "./types";

const defaultTopicItem = {
  title: "Título do tópico",
  content: "Conteúdo do tópico",
  additional: "",
};

const defaultDetailedTopicsProps: DetailedTopicsProps = {
  title: "Título padrão",
  topics: [defaultTopicItem, defaultTopicItem, defaultTopicItem],
  preview: false,
};

export default function Template37(props: Partial<DetailedTopicsProps>) {
  const { title, topics, preview } = {
    ...defaultDetailedTopicsProps,
    ...props,
    topics: props.topics?.length
      ? props.topics.map((topic) => ({ ...defaultTopicItem, ...topic }))
      : defaultDetailedTopicsProps.topics,
  };

  const colors = ["#1277bc", "#58a3a1", "#6b7280"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="space-y-3">
        {topics.slice(0, 3).map((topic, index) => (
          <div
            key={index}
            className="flex items-start space-x-6 py-2.5 px-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <h2
                className="text-xl font-semibold mb-1"
                style={{ color: colors[index] }}
              >
                {topic.title}
              </h2>
              <p className="text-gray-700 text-sm mb-1">{topic.content}</p>
              {topic.additional && (
                <p className="text-gray-500 text-xs italic">
                  {topic.additional}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
