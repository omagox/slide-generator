import { useState } from "react";
import { useSlideGeneration } from "../contexts/SlideGenerationContext";
import type { TwoTopicsProps } from "./types";
import { EditActions } from "../components/templateActionButtons";
import { MdDelete, MdAddBox } from "react-icons/md";

type EditableTwoTopicsProps = Partial<TwoTopicsProps> & {
  slideIndex: number;
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
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const { title, topics, preview } = { ...defaults, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#ef4444"];

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

  const addTopic = () => {
    setDraftTopics([
      ...draftTopics,
      { title: "Novo Tópico", content: "Nova descrição" },
    ]);
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
      className="relative w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center"
    >
      <EditActions
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
      />

      {isEditing && draftTopics.length < 4 && (
        <button
          onClick={addTopic}
          className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors cursor-pointer z-10"
        >
          <MdAddBox className="translate-y-px" />
          Adicionar novo item
        </button>
      )}

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
        {draftTopics.map((topic, index) => {
          const color = colors[index % colors.length];

          return (
            <div
              key={index}
              className="border-l-4 pl-6 group relative"
              style={{ borderLeftColor: color }}
            >
              {isEditing && draftTopics.length > 1 && (
                <button
                  onClick={() => removeTopic(index)}
                  className="absolute top-0 right-0 text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Remover tópico"
                >
                  <MdDelete />
                </button>
              )}

              {isEditing ? (
                <input
                  value={topic.title}
                  onChange={(e) =>
                    handleTopicChange(index, "title", e.target.value)
                  }
                  className="text-xl font-semibold mb-3 w-full outline-none border border-transparent hover:border-gray-300 bg-transparent"
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
                  className="text-gray-600 w-full resize-none outline-none border border-transparent hover:border-gray-300 bg-transparent"
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
