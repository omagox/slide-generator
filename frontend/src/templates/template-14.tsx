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
  topics: ["Tópico 1", "Tópico 2", "Tópico 3"],
  content: "Texto complementar padrão.",
  preview: false,
};

export default function Template14(props: EditableMixedContentProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const { title, topics, content, preview } = { ...defaults, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);
  const [draftContent, setDraftContent] = useState(content || "");

  const colors = [
    "#1277bc",
    "#58a3a1",
    "#6b7280",
    "#ef4444",
    "#f59e0b",
    "#10b981",
  ];

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
      className="relative w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
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

      <div className="flex flex-col items-center space-y-4">
        {draftTopics.map((topic, index) => (
          <div className="flex items-center gap-2">
            <div
              key={index}
              className="h-16 flex items-center justify-center rounded text-white font-semibold overflow-hidden group relative"
              style={{
                backgroundColor: colors[index % colors.length],
                width: `${8 + (index % 6) * 4}rem`,
              }}
            >
              {isEditing ? (
                <div className="flex-1 flex items-center gap-2 px-2">
                  <input
                    value={topic}
                    onChange={(e) => handleTopicChange(index, e.target.value)}
                    className="w-full bg-transparent text-center outline-none border border-transparent hover:border-white/30 cursor-text"
                  />
                </div>
              ) : (
                topic
              )}
            </div>
            {isEditing && draftTopics.length > 1 && (
              <button
                onClick={() => removeTopic(index)}
                className="text-red-500 hover:text-red-700 p-1 transition-opacity cursor-pointer"
                title="Remover item"
              >
                <MdDelete />
              </button>
            )}
          </div>
        ))}

        {(draftContent || isEditing) && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg w-full max-w-2xl">
            {isEditing ? (
              <textarea
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                className="w-full text-gray-600 text-center bg-transparent outline-none border border-transparent hover:border-gray-300 cursor-text resize-none"
                rows={3}
                placeholder="Texto complementar..."
              />
            ) : (
              <p className="text-gray-600 text-center">{draftContent}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
