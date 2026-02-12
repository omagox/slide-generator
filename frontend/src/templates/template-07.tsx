import { useState } from "react";
import type { TwoTopicsProps } from "./types";
import { EditActions } from "../components/templateActionButtons";

type EditableTwoTopicsProps = Partial<TwoTopicsProps> & {
  onSave?: (data: Pick<TwoTopicsProps, "title" | "topics">) => void;
};

const defaults: TwoTopicsProps = {
  title: "Título padrão",
  topics: [
    { title: "Tópico 1", content: "Descrição do tópico 1" },
    { title: "Tópico 2", content: "Descrição do tópico 2" },
  ],
  preview: false,
};

export default function Template07(props: EditableTwoTopicsProps) {
  const { onSave, ...rest } = props;
  const { title, topics, preview } = { ...defaults, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);

  const colors = ["#1277bc", "#58a3a1"];

  function handleTopicChange(
    index: number,
    field: "title" | "content",
    value: string,
  ) {
    setDraftTopics((prev) =>
      prev.map((topic, i) =>
        i === index ? { ...topic, [field]: value } : topic,
      ),
    );
  }

  function handleSave() {
    setIsEditing(false);
    onSave?.({
      title: draftTitle,
      topics: draftTopics,
    });
  }

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="relative w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <EditActions
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
      />

      {isEditing ? (
        <input
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          className="text-3xl font-bold text-black mb-8 text-center w-full outline-none border border-transparent hover:border-gray-300"
        />
      ) : (
        <h1 className="text-3xl font-bold text-black mb-8 text-center">
          {draftTitle}
        </h1>
      )}

      <div className="space-y-6 w-full">
        {draftTopics.slice(0, 2).map((topic, index) => {
          const color = colors[index % colors.length];

          return (
            <div
              key={index}
              className="border-l-4 pl-6"
              style={{ borderLeftColor: color }}
            >
              {isEditing ? (
                <input
                  value={topic.title}
                  onChange={(e) =>
                    handleTopicChange(index, "title", e.target.value)
                  }
                  className="text-xl font-semibold mb-3 w-full outline-none border border-transparent hover:border-gray-300"
                  style={{ color }}
                />
              ) : (
                <h2 className="text-xl font-semibold mb-3" style={{ color }}>
                  {topic.title}
                </h2>
              )}

              {isEditing ? (
                <textarea
                  value={topic.content}
                  onChange={(e) =>
                    handleTopicChange(index, "content", e.target.value)
                  }
                  className="text-gray-600 w-full resize-none outline-none border border-transparent hover:border-gray-300"
                  rows={2}
                />
              ) : (
                <p className="text-gray-600 mb-2">{topic.content}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
