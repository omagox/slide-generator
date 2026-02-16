import { useState } from "react";
import { useSlideGeneration } from "../contexts/SlideGenerationContext";
import { EditActions } from "../components/templateActionButtons";
import type { TwoTopicsProps } from "./types";
import { MdDelete, MdAddBox } from "react-icons/md";

type EditableTwoTopicsProps = Partial<TwoTopicsProps> & {
  slideIndex: number;
};

const defaults: TwoTopicsProps = {
  title: "Título padrão",
  topics: [
    { title: "Tópico 1", content: "Conteúdo do tópico 1" },
    { title: "Tópico 2", content: "Conteúdo do tópico 2" },
  ],
  preview: false,
};

export default function Template18(props: EditableTwoTopicsProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const { title, topics, preview } = { ...defaults, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#ef4444"];

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
      { title: "Novo Tópico", content: "Novo conteúdo" },
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

      {isEditing && draftTopics.length < 3 && (
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

      <div className="flex items-center justify-between w-full gap-4">
        {draftTopics.map((topic, index) => (
          <div key={index} className="flex flex-1 items-center group relative">
            <div
              className="flex-1 bg-gray-50 p-6 rounded-lg border-l-4"
              style={{ borderLeftColor: colors[index % colors.length] }}
            >
              {isEditing && draftTopics.length > 1 && (
                <button
                  onClick={() => removeTopic(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  title="Remover tópico"
                >
                  <MdDelete />
                </button>
              )}

              {isEditing ? (
                <>
                  <input
                    value={topic.title}
                    onChange={(e) =>
                      handleTopicChange(index, "title", e.target.value)
                    }
                    className="w-full text-xl font-semibold mb-4 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                    style={{ color: colors[index % colors.length] }}
                  />
                  <textarea
                    value={topic.content}
                    onChange={(e) =>
                      handleTopicChange(index, "content", e.target.value)
                    }
                    className="w-full text-gray-600 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                    rows={3}
                  />
                </>
              ) : (
                <>
                  <h2
                    className="text-xl font-semibold mb-4"
                    style={{ color: colors[index % colors.length] }}
                  >
                    {topic.title}
                  </h2>
                  <p className="text-gray-600">{topic.content}</p>
                </>
              )}
            </div>
            {index < draftTopics.length - 1 && (
              <div className="mx-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#58a3a1" }}
                >
                  <span className="text-white text-lg">→</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
