import { useState } from "react";
import type { TwoTopicsProps } from "./types";
import { EditActions } from "../components/templateActionButtons";

type EditableTwoTopicsProps = Partial<TwoTopicsProps> & {
  onSave?: (data: Pick<TwoTopicsProps, "title" | "topics">) => void;
};

const defaultValues: TwoTopicsProps = {
  title: "Título padrão",
  topics: [
    { title: "Tópico 1", content: "Conteúdo do tópico 1" },
    { title: "Tópico 2", content: "Conteúdo do tópico 2" },
  ],
  preview: false,
};

export default function Template02(props: EditableTwoTopicsProps) {
  const { onSave, ...rest } = props;
  const { preview, title, topics } = { ...defaultValues, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);

  function handleTopicChange(
    index: number,
    field: "title" | "content",
    value: string
  ) {
    setDraftTopics((prev) =>
      prev.map((topic, i) =>
        i === index ? { ...topic, [field]: value } : topic
      )
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

      <div className="grid grid-cols-2 gap-8 w-full">
        {draftTopics.map((topic, index) => {
          const accentColor = index === 0 ? "#1277bc" : "#58a3a1";

          return (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg border-l-4"
              style={{ borderLeftColor: accentColor }}
            >
              {isEditing ? (
                <input
                  value={topic.title}
                  onChange={(e) =>
                    handleTopicChange(index, "title", e.target.value)
                  }
                  className="text-xl font-semibold mb-3 w-full outline-none border border-transparent hover:border-gray-300"
                  style={{ color: accentColor }}
                />
              ) : (
                <h2
                  className="text-xl font-semibold mb-3"
                  style={{ color: accentColor }}
                >
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
                  rows={3}
                />
              ) : (
                <p className="text-gray-600">{topic.content}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
