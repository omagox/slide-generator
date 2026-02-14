import { useState } from "react";
import type { DetailedTopicsProps } from "./types";
import { EditActions } from "../components/templateActionButtons";
import { MdDelete, MdAddBox } from "react-icons/md";

type EditableDetailedTopicsProps = Partial<DetailedTopicsProps> & {
  onSave?: (data: Pick<DetailedTopicsProps, "title" | "topics">) => void;
};

const defaults: DetailedTopicsProps = {
  title: "Título padrão",
  topics: [
    { title: "Tópico A", content: "Conteúdo do tópico A" },
    { title: "Tópico B", content: "Conteúdo do tópico B" },
    { title: "Tópico C", content: "Conteúdo do tópico C" },
    { title: "Tópico D", content: "Conteúdo do tópico D" },
  ],
  preview: false,
};

export default function Template12(props: EditableDetailedTopicsProps) {
  const { onSave, ...rest } = props;
  const { title, topics, preview } = { ...defaults, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#ef4444", "#f59e0b", "#10b981"];

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

  function handleSave() {
    setIsEditing(false);
    onSave?.({
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

      <div className="max-w-2xl mx-auto space-y-4 w-full">
        {draftTopics.map((topic, index) => (
          <div key={index} className="flex items-start space-x-4 group relative">
            <div
              className="min-w-8 max-w-8 min-h-8 max-h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              <span className="text-white text-sm font-bold">
                {String.fromCharCode(65 + index)}
              </span>
            </div>

            <div className="w-full flex items-start gap-2">
              <div className="flex-1">
                {isEditing ? (
                  <>
                    <input
                      value={topic.title}
                      onChange={(e) =>
                        handleTopicChange(index, "title", e.target.value)
                      }
                      className="text-lg font-semibold mb-1 w-full outline-none border border-transparent hover:border-gray-300 bg-transparent"
                      style={{ color: colors[index % colors.length] }}
                    />
                    <textarea
                      value={topic.content}
                      onChange={(e) =>
                        handleTopicChange(index, "content", e.target.value)
                      }
                      rows={1}
                      className="text-gray-600 w-full resize-none outline-none border border-transparent hover:border-gray-300 bg-transparent"
                    />
                  </>
                ) : (
                  <>
                    <h2
                      className="text-lg font-semibold mb-1"
                      style={{ color: colors[index % colors.length] }}
                    >
                      {topic.title}
                    </h2>
                    <p className="text-gray-600">{topic.content}</p>
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
