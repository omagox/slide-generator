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
  topics: [defaultTopicItem],
  preview: false,
};

type EditableProps = Partial<DetailedTopicsProps> & {
  onSave?: (data: Pick<DetailedTopicsProps, "title" | "topics">) => void;
};

export default function Template39(props: EditableProps) {
  const { onSave, ...rest } = props;
  const { title, topics, preview } = {
    ...defaultDetailedTopicsProps,
    ...rest,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(
    topics.map((topic) => ({ ...defaultTopicItem, ...topic })),
  );

  const handleSave = () => {
    setIsEditing(false);
    onSave?.({
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

  const updateTopic = (
    index: number,
    field: keyof typeof defaultTopicItem,
    value: string,
  ) => {
    const newTopics = [...draftTopics];
    newTopics[index] = { ...newTopics[index], [field]: value };
    setDraftTopics(newTopics);
  };

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#1277bc"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="relative w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center overflow-hidden"
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

      {isEditing && draftTopics.length < 4 && (
        <button
          onClick={addTopic}
          className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors cursor-pointer"
        >
          <MdAddBox />
          Adicionar novo item
        </button>
      )}

      <div className="w-full grid grid-cols-2 gap-6">
        {draftTopics.slice(0, 4).map((topic, index) => {
          const color = colors[index % colors.length];
          return (
            <div
              key={index}
              className="p-6 border-2 rounded-lg relative group"
              style={{ borderColor: color }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                  style={{ backgroundColor: color }}
                >
                  {index + 1}
                </div>
                {isEditing ? (
                  <input
                    value={topic.title}
                    onChange={(e) =>
                      updateTopic(index, "title", e.target.value)
                    }
                    className="w-full text-lg font-semibold outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                    style={{ color: color }}
                  />
                ) : (
                  <h2
                    className="text-lg font-semibold"
                    style={{ color: color }}
                  >
                    {topic.title}
                  </h2>
                )}
              </div>
              {isEditing ? (
                <textarea
                  value={topic.content}
                  onChange={(e) =>
                    updateTopic(index, "content", e.target.value)
                  }
                  className="w-full text-gray-600 text-sm outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                  rows={2}
                />
              ) : (
                <p className="text-gray-600 text-sm">{topic.content}</p>
              )}
              {isEditing && draftTopics.length > 1 && (
                <button
                  onClick={() => removeTopic(index)}
                  className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <MdDelete />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
