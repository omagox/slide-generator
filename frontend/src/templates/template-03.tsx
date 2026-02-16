import { useState } from "react";
import { useSlideGeneration } from "../contexts/SlideGenerationContext";
import type { MultipleTopicsProps } from "./types";
import { EditActions } from "../components/templateActionButtons";
import { MdDelete, MdAddBox } from "react-icons/md";

type EditableMultipleTopicsProps = Partial<MultipleTopicsProps> & {
  slideIndex: number;
};

const defaultValues: MultipleTopicsProps = {
  title: "Título padrão",
  topics: ["Tópico 1", "Tópico 2", "Tópico 3", "Tópico 4", "Tópico 5"],
  preview: false,
};

export default function Template03(props: EditableMultipleTopicsProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const { title, topics, preview } = { ...defaultValues, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#1277bc", "#58a3a1", "#6b7280", "#1277bc", "#58a3a1", "#6b7280", "#1277bc", "#58a3a1", "#6b7280", "#1277bc", "#58a3a1", "#6b7280", "#1277bc"];

  function handleTopicChange(index: number, value: string) {
    setDraftTopics((prev) =>
      prev.map((topic, i) => (i === index ? value : topic)),
    );
  }

  const addTopic = () => {
    setDraftTopics([...draftTopics, "Novo Item"]);
  };

  const removeTopic = (index: number) => {
    const newTopics = draftTopics.filter((_, i) => i !== index);
    setDraftTopics(newTopics);
  };

  function handleSave() {
    setIsEditing(false);
    handleUpdateSlide(slideIndex, {
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

      {isEditing && draftTopics.length < 7 && (
        <button
          onClick={addTopic}
          className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors cursor-pointer z-10"
        >
          <MdAddBox className="translate-y-px" />
          Adicionar novo item
        </button>
      )}

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
        {draftTopics.map((topic, index) => (
          <div key={index} className="flex items-center space-x-4 group">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />

            <div className="flex-1 flex items-center gap-2">
              {isEditing ? (
                <input
                  value={topic}
                  onChange={(e) => handleTopicChange(index, e.target.value)}
                  className="text-lg font-semibold w-full outline-none border border-transparent hover:border-gray-300"
                  style={{ color: colors[index % colors.length] }}
                />
              ) : (
                <h2
                  className="text-lg font-semibold"
                  style={{ color: colors[index % colors.length] }}
                >
                  {topic}
                </h2>
              )}

              {isEditing && draftTopics.length > 1 && (
                <button
                  onClick={() => removeTopic(index)}
                  className="text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Remover item"
                >
                  <MdDelete />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
