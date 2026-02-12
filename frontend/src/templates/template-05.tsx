import { useState } from "react";
import type { DetailedTopicsProps } from "./types";
import { EditActions } from "../components/templateActionButtons";

type EditableDetailedTopicsProps = Partial<DetailedTopicsProps> & {
  onSave?: (data: Pick<DetailedTopicsProps, "title" | "topics">) => void;
};

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

export default function Template05(props: EditableDetailedTopicsProps) {
  const { onSave, ...rest } = props;
  const { title, topics, preview } = { ...defaultValues, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);

  const colors = ["#1277bc", "#58a3a1", "#6b7280"];

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

      <div className="grid grid-cols-3 gap-6 w-full">
        {draftTopics.slice(0, 3).map((topic, index) => {
          const color = colors[index % colors.length];

          return (
            <div key={index} className="text-center">
              <div
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: color }}
              >
                <span className="text-white text-xl font-bold">
                  {index + 1}
                </span>
              </div>

              {isEditing ? (
                <input
                  value={topic.title}
                  onChange={(e) =>
                    handleTopicChange(index, "title", e.target.value)
                  }
                  className="text-lg font-semibold mb-2 text-center w-full outline-none border border-transparent hover:border-gray-300"
                  style={{ color }}
                />
              ) : (
                <h2 className="text-lg font-semibold mb-2" style={{ color }}>
                  {topic.title}
                </h2>
              )}

              {isEditing ? (
                <textarea
                  value={topic.content}
                  onChange={(e) =>
                    handleTopicChange(index, "content", e.target.value)
                  }
                  className="text-gray-600 text-sm text-center w-full resize-none outline-none border border-transparent hover:border-gray-300"
                  rows={3}
                />
              ) : (
                <p className="text-gray-600 text-sm">{topic.content}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
