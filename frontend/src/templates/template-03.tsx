import { useState } from "react";
import type { MultipleTopicsProps } from "./types";
import { EditActions } from "../components/templateActionButtons";

type EditableMultipleTopicsProps = Partial<MultipleTopicsProps> & {
  onSave?: (data: Pick<MultipleTopicsProps, "title" | "topics">) => void;
};

const defaultValues: MultipleTopicsProps = {
  title: "Título padrão",
  topics: ["Tópico 1", "Tópico 2", "Tópico 3", "Tópico 4", "Tópico 5"],
  preview: false,
};

export default function Template03(props: EditableMultipleTopicsProps) {
  const { onSave, ...rest } = props;
  const { title, topics, preview } = { ...defaultValues, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#1277bc", "#58a3a1"];

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
      className="relative w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <EditActions
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
      />

      {/* Título */}
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

      <div className="space-y-4">
        {draftTopics.slice(0, 5).map((topic, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index] }}
            />

            {isEditing ? (
              <input
                value={topic}
                onChange={(e) => handleTopicChange(index, e.target.value)}
                className="text-lg font-semibold w-full outline-none border border-transparent hover:border-gray-300"
                style={{ color: colors[index] }}
              />
            ) : (
              <h2
                className="text-lg font-semibold"
                style={{ color: colors[index] }}
              >
                {topic}
              </h2>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
