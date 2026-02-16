import { useSlideGeneration } from "../contexts/SlideGenerationContext";
import { useState } from "react";
import { MdAddBox, MdDelete } from "react-icons/md";
import { EditActions } from "../components/templateActionButtons";
import type { DetailedTopicsProps } from "./types";

const defaultTopicItem = {
  title: "Título do tópico",
  content: "Conteúdo do tópico",
  additional: "",
};

const defaultDetailedTopicsProps: DetailedTopicsProps = {
  title: "Título padrão",
  topics: [defaultTopicItem, defaultTopicItem, defaultTopicItem],
  preview: false,
};

type EditableProps = Partial<DetailedTopicsProps> & {
  slideIndex: number;
};

export default function Template37(props: EditableProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const { title, topics, preview } = {
    ...defaultDetailedTopicsProps,
    ...rest,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(
    topics.map((topic) => ({ ...defaultTopicItem, ...topic }))
  );

  const handleSave = () => {
    setIsEditing(false);
    handleUpdateSlide(slideIndex, {
      title: draftTitle,
      topics: draftTopics,
    });
  };

  const addTopic = () => {
    setDraftTopics([...draftTopics, { ...defaultTopicItem }]);
  };

  const removeTopic = (index: number) => {
    setDraftTopics(draftTopics.filter((_, i) => i !== index));
  };

  const updateTopic = (index: number, field: keyof typeof defaultTopicItem, value: string) => {
    const newTopics = [...draftTopics];
    newTopics[index] = { ...newTopics[index], [field]: value };
    setDraftTopics(newTopics);
  };

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#1277bc", "#58a3a1"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
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

      <div className="space-y-3">
        {draftTopics.slice(0, 4).map((topic, index) => (
          <div
            key={index}
            className="flex items-start space-x-6 py-2.5 px-4 bg-gray-50 rounded-lg relative group"
          >
            <div className="flex-1">
              {isEditing ? (
                <>
                  <input
                    value={topic.title}
                    onChange={(e) => updateTopic(index, "title", e.target.value)}
                    className="w-full text-xl font-semibold mb-1 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                    style={{ color: colors[index % colors.length] }}
                  />
                  <textarea
                    value={topic.content}
                    onChange={(e) => updateTopic(index, "content", e.target.value)}
                    className="w-full text-gray-700 text-sm mb-1 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                    rows={1}
                  />
                  <input
                    value={topic.additional}
                    onChange={(e) => updateTopic(index, "additional", e.target.value)}
                    placeholder="Informação adicional (opcional)"
                    className="w-full text-gray-500 text-xs italic outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                  />
                  {draftTopics.length > 1 && (
                    <button
                      onClick={() => removeTopic(index)}
                      className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <MdDelete />
                    </button>
                  )}
                </>
              ) : (
                <>
                  <h2
                    className="text-xl font-semibold mb-1"
                    style={{ color: colors[index % colors.length] }}
                  >
                    {topic.title}
                  </h2>
                  <p className="text-gray-700 text-sm mb-1">{topic.content}</p>
                  {topic.additional && (
                    <p className="text-gray-500 text-xs italic">
                      {topic.additional}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
        {isEditing && draftTopics.length < 3 && (
          <button
            onClick={addTopic}
            className="w-full flex items-center justify-center py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors cursor-pointer gap-2"
          >
            <MdAddBox />
            <span className="text-sm font-semibold">Adicionar novo item</span>
          </button>
        )}
      </div>
    </div>
  );
}
