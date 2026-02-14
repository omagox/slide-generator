import { useState } from "react";
import { EditActions } from "../components/templateActionButtons";
import type { DetailedTopicsProps } from "./types";
import { MdDelete, MdAddBox } from "react-icons/md";

type EditableDetailedTopicsProps = Partial<DetailedTopicsProps> & {
  onSave?: (data: Pick<DetailedTopicsProps, "title" | "topics">) => void;
};

const defaults: DetailedTopicsProps = {
  title: "Título padrão",
  topics: [
    { title: "Tópico 1", content: "Conteúdo do Tópico 1" },
    { title: "Tópico 2", content: "Conteúdo do Tópico 2" },
    { title: "Tópico 3", content: "Conteúdo do Tópico 3" },
    { title: "Tópico 4", content: "Conteúdo do Tópico 4" },
  ],
  preview: false,
};

export default function Template23(props: EditableDetailedTopicsProps) {
  const { onSave, ...rest } = props;
  const { title, topics, preview } = { ...defaults, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#ef4444", "#f59e0b", "#10b981"];

  function handleSave() {
    setIsEditing(false);
    onSave?.({ title: draftTitle, topics: draftTopics });
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

      {isEditing && draftTopics.length < 5 && (
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

      <div className="max-w-2xl mx-auto space-y-4 w-full">
        {draftTopics.map((topic, index) => (
          <div key={index} className="flex items-start space-x-4 group relative">
            <div
              className="min-w-8 max-w-8 min-h-8 max-h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              <span className="text-white text-sm">✓</span>
            </div>
            <div className="flex-1 flex items-start gap-2">
              <div className="flex-1">
                {isEditing ? (
                  <>
                    <input
                      value={topic.title}
                      onChange={(e) =>
                        handleTopicChange(index, "title", e.target.value)
                      }
                      className="w-full font-semibold text-black mb-1 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                    />
                    <textarea
                      value={topic.content}
                      onChange={(e) =>
                        handleTopicChange(index, "content", e.target.value)
                      }
                      className="w-full text-gray-600 text-sm outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                      rows={1}
                    />
                  </>
                ) : (
                  <>
                    <h2 className="font-semibold text-black mb-1">{topic.title}</h2>
                    <p className="text-gray-600 text-sm">{topic.content}</p>
                  </>
                )}
              </div>

              {isEditing && draftTopics.length > 1 && (
                <button
                  onClick={() => removeTopic(index)}
                  className="text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer mt-1"
                  title="Remover tópico"
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
