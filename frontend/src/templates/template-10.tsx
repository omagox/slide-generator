import { useState } from "react";
import type { MultipleTopicsProps } from "./types";
import { EditActions } from "../components/templateActionButtons";

type EditableMultipleTopicsProps = Partial<MultipleTopicsProps> & {
  onSave?: (data: Pick<MultipleTopicsProps, "title" | "topics">) => void;
};

const defaults: MultipleTopicsProps = {
  title: "Título padrão",
  topics: ["Tópico 1", "Tópico 2", "Tópico 3"],
  preview: false,
};

export default function Template10(props: EditableMultipleTopicsProps) {
  const { onSave, ...rest } = props;
  const { title, topics, preview } = { ...defaults, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);

  const colors = ["#1277bc", "#58a3a1", "#6b7280"];

  function handleTopicChange(index: number, value: string) {
    setDraftTopics((prev) =>
      prev.map((topic, i) => (i === index ? value : topic)),
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

      <div className="max-w-3xl mx-auto w-full">
        <div className="grid grid-cols-1 gap-4">
          {draftTopics.slice(0, 3).map((topic, index) => (
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

              {isEditing ? (
                <input
                  value={topic}
                  onChange={(e) => handleTopicChange(index, e.target.value)}
                  className="text-lg font-semibold text-gray-700 w-full outline-none border border-transparent hover:border-gray-300"
                />
              ) : (
                <h2 className="text-lg font-semibold text-gray-700">{topic}</h2>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
