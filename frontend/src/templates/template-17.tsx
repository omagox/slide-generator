import { useState } from "react";
import { useSlideGeneration } from "../contexts/SlideGenerationContext";
import { EditActions } from "../components/templateActionButtons";
import type { MixedContentProps } from "./types";
import { MdDelete, MdAddBox } from "react-icons/md";

type EditableMixedContentProps = Partial<MixedContentProps> & {
  slideIndex: number;
};

const defaults: MixedContentProps = {
  title: "Título padrão",
  topics: ["Tópico 1", "Tópico 2", "Tópico 3", "Tópico 4"],
  content: "Texto complementar padrão.",
  preview: false,
};

export default function Template17(props: EditableMixedContentProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const { title, topics, content, preview } = { ...defaults, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);
  const [draftContent, setDraftContent] = useState(content || "");

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#ef4444", "#f59e0b", "#10b981"];

  function handleSave() {
    setIsEditing(false);
    handleUpdateSlide(slideIndex, {
      title: draftTitle,
      topics: draftTopics,
      content: draftContent,
    });
  }

  const handleTopicChange = (index: number, value: string) => {
    const newTopics = [...draftTopics];
    newTopics[index] = value;
    setDraftTopics(newTopics);
  };

  const addTopic = () => {
    setDraftTopics([...draftTopics, "Novo Item"]);
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
          className="w-full text-3xl font-bold text-black mb-8 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
        />
      ) : (
        <h1 className="text-3xl font-bold text-black mb-8 text-center">
          {draftTitle}
        </h1>
      )}

      <div
        className={`grid gap-4 w-full ${
          draftTopics.length === 4
            ? "grid-cols-2 md:grid-cols-4"
            : `grid-cols-${draftTopics.length}`
        }`}
      >
        {draftTopics.map((topic, index) => (
          <div key={index} className="text-center group relative">
            {isEditing && draftTopics.length > 1 && (
              <button
                onClick={() => removeTopic(index)}
                className="absolute top-0 right-0 text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Remover item"
              >
                <MdDelete />
              </button>
            )}

            <div
              className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              <span className="text-white font-bold">{index + 1}</span>
            </div>
            {isEditing ? (
              <input
                value={topic}
                onChange={(e) => handleTopicChange(index, e.target.value)}
                className="w-full text-sm font-semibold text-gray-700 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
              />
            ) : (
              <h2 className="text-sm font-semibold text-gray-700">{topic}</h2>
            )}
          </div>
        ))}
      </div>

      {(draftContent || isEditing) && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg w-full">
          {isEditing ? (
            <textarea
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              className="w-full text-gray-600 text-center leading-relaxed outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
              rows={2}
              placeholder="Texto complementar..."
            />
          ) : (
            <p className="text-gray-600 text-center leading-relaxed">
              {draftContent}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
