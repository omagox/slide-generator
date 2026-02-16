import { useState } from "react";
import { useSlideGeneration } from "../contexts/SlideGenerationContext";
import { EditActions } from "../components/templateActionButtons";
import type { DetailedTopicsProps } from "./types";
import { MdDelete, MdAddBox } from "react-icons/md";

type EditableDetailedTopicsProps = Partial<DetailedTopicsProps> & {
  slideIndex: number;
};

const defaults: DetailedTopicsProps = {
  title: "Título padrão",
  topics: [
    { title: "Tópico A", content: "Conteúdo do Tópico A" },
    { title: "Tópico B", content: "Conteúdo do Tópico B" },
    { title: "Tópico C", content: "Conteúdo do Tópico C" },
  ],
  preview: false,
};

export default function Template20(props: EditableDetailedTopicsProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const { title, topics, preview } = { ...defaults, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#ef4444", "#f59e0b", "#10b981"];

  function handleSave() {
    setIsEditing(false);
    handleUpdateSlide(slideIndex, { title: draftTitle, topics: draftTopics });
  }

  const handleTopicChange = (
    index: number,
    field: keyof (typeof topics)[0],
    value: string,
  ) => {
    const newTopics = [...draftTopics];
    newTopics[index] = { ...newTopics[index], [field]: value };
    setDraftTopics(newTopics);
  };

  const addTopic = () => {
    setDraftTopics([
      ...draftTopics,
      {
        title: `Tópico ${String.fromCharCode(65 + draftTopics.length)}`,
        content: "Novo conteúdo",
      },
    ]);
  };

  const removeTopic = (index: number) => {
    const newTopics = draftTopics.filter((_, i) => i !== index);
    setDraftTopics(newTopics);
  };

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

      {isEditing && draftTopics.length < 6 && (
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
          className="w-full text-3xl font-bold text-black mb-8 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
        />
      ) : (
        <h1 className="text-3xl font-bold text-black mb-8 text-center">
          {draftTitle}
        </h1>
      )}

      <div
        className={`grid ${draftTopics.length > 3 ? "grid-cols-3 grid-rows-2" : "grid-cols-3"} gap-6 w-full`}
      >
        {draftTopics.map((topic, index) => (
          <div key={index} className="text-center group relative">
            {isEditing && draftTopics.length > 1 && (
              <button
                onClick={() => removeTopic(index)}
                className="absolute top-0 right-0 text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Remover tópico"
              >
                <MdDelete />
              </button>
            )}

            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              <span className="text-white text-xl">
                {String.fromCharCode(65 + index)}
              </span>
            </div>
            {isEditing ? (
              <>
                <input
                  value={topic.title}
                  onChange={(e) =>
                    handleTopicChange(index, "title", e.target.value)
                  }
                  className="w-full text-lg font-semibold mb-2 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                  style={{ color: colors[index % colors.length] }}
                />
                <textarea
                  value={topic.content}
                  onChange={(e) =>
                    handleTopicChange(index, "content", e.target.value)
                  }
                  className="w-full text-gray-600 text-sm text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                  rows={3}
                />
              </>
            ) : (
              <>
                <h2
                  className="text-lg font-semibold mb-2"
                  style={{ color: colors[index % colors.length] }}
                >
                  {topic.title}
                </h2>
                <p className="text-gray-600 text-sm">{topic.content}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
