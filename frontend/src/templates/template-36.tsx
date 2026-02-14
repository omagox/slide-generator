import { useState } from "react";
import { MdAddBox, MdDelete } from "react-icons/md";
import { EditActions } from "../components/templateActionButtons";
import type { MultipleTopicsProps } from "./types";

const defaultMultipleTopicsProps: MultipleTopicsProps = {
  title: "Título padrão",
  topics: [
    "Tópico padrão",
    "Tópico padrão",
    "Tópico padrão",
    "Tópico padrão",
    "Tópico padrão",
    "Tópico padrão",
  ],
  preview: false,
};

type EditableProps = Partial<MultipleTopicsProps> & {
  onSave?: (data: Pick<MultipleTopicsProps, "title" | "topics">) => void;
};

export default function Template36(props: EditableProps) {
  const { onSave, ...rest } = props;
  const { title, topics, preview } = {
    ...defaultMultipleTopicsProps,
    ...rest,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(
    topics.length ? [...topics] : [...defaultMultipleTopicsProps.topics],
  );

  const handleSave = () => {
    setIsEditing(false);
    onSave?.({
      title: draftTitle,
      topics: draftTopics,
    });
  };

  const addTopic = () => {
    setDraftTopics([...draftTopics, "Novo tópico"]);
  };

  const removeTopic = (index: number) => {
    setDraftTopics(draftTopics.filter((_, i) => i !== index));
  };

  const updateTopic = (index: number, value: string) => {
    const newTopics = [...draftTopics];
    newTopics[index] = value;
    setDraftTopics(newTopics);
  };

  const colors = ["#1277bc", "#58a3a1", "#6b7280"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : undefined }}
      className="relative w-full aspect-video bg-white p-8 rounded-lg shadow-lg overflow-hidden"
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
          className="w-full text-3xl font-bold text-black mb-8 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
        />
      ) : (
        <h1 className="text-3xl font-bold text-black mb-8 text-center">
          {draftTitle}
        </h1>
      )}

      {isEditing && draftTopics.length < 6 && (
        <button
          onClick={addTopic}
          className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors cursor-pointer"
        >
          <MdAddBox />
          Adicionar novo item
        </button>
      )}

      <div className="grid grid-cols-3 gap-6">
        {draftTopics.slice(0, 6).map((topic, index) => (
          <div
            key={index}
            className="text-center p-6 bg-gray-50 rounded-lg relative group"
          >
            <div
              className="w-16 h-16 rounded-lg mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: colors[index % 3] }}
            >
              <span className="text-white text-2xl font-bold">{index + 1}</span>
            </div>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <textarea
                  value={topic}
                  onChange={(e) => updateTopic(index, e.target.value)}
                  className="w-full text-lg font-semibold text-gray-700 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                  rows={2}
                />
                {draftTopics.length > 1 && (
                  <button
                    onClick={() => removeTopic(index)}
                    className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            ) : (
              <h2 className="text-lg font-semibold text-gray-700">{topic}</h2>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
