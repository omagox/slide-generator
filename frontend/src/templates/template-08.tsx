import { useState } from "react";
import { useSlideGeneration } from "../contexts/SlideGenerationContext";
import type { MixedContentProps } from "./types";
import { EditActions } from "../components/templateActionButtons";
import { MdDelete, MdAddBox } from "react-icons/md";

type EditableMixedContentProps = Partial<MixedContentProps> & {
  slideIndex: number;
};

const defaults: MixedContentProps = {
  title: "Título padrão",
  topics: ["Tópico 1", "Tópico 2", "Tópico 3"],
  content: "Texto complementar geral sobre os tópicos apresentados.",
  preview: false,
};

export default function Template08(props: EditableMixedContentProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const { title, topics, content, preview } = { ...defaults, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);
  const [draftContent, setDraftContent] = useState(content);

  const colors = [
    "#1277bc",
    "#58a3a1",
    "#6b7280",
    "#ef4444",
    "#f59e0b",
    "#10b981",
  ];

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
      content: draftContent,
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

      {isEditing && draftTopics.length < 8 && (
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

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          {draftTopics.map((topic, index) => (
            <div key={index} className="flex items-start space-x-3 group">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: colors[index % colors.length] }}
              >
                <span className="text-white text-xs">{index + 1}</span>
              </div>

              <div className="flex-1 flex items-center gap-2">
                {isEditing ? (
                  <input
                    value={topic}
                    onChange={(e) => handleTopicChange(index, e.target.value)}
                    className="text-lg font-semibold text-gray-700 w-full outline-none border border-transparent hover:border-gray-300 bg-transparent"
                  />
                ) : (
                  <h2 className="text-lg font-semibold text-gray-700">
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

        <div className="bg-gray-50 p-6 rounded-lg">
          {isEditing ? (
            <textarea
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              className="text-gray-600 leading-relaxed w-full h-full resize-none outline-none border border-transparent hover:border-gray-300 bg-transparent"
              rows={6}
            />
          ) : (
            <p className="text-gray-600 leading-relaxed">{draftContent}</p>
          )}
        </div>
      </div>
    </div>
  );
}
