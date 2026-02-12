import { useState } from "react";
import type { DetailedTopicsProps } from "./types";
import { EditActions } from "../components/templateActionButtons";

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

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#1277bc"];

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
        {draftTopics.slice(0, 4).map((topic, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div
              className="min-w-8 max-w-8 min-h-8 max-h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors[index] }}
            >
              <span className="text-white text-sm font-bold">
                {String.fromCharCode(65 + index)}
              </span>
            </div>

            <div className="w-full">
              {isEditing ? (
                <>
                  <input
                    value={topic.title}
                    onChange={(e) =>
                      handleTopicChange(index, "title", e.target.value)
                    }
                    className="text-lg font-semibold mb-1 w-full outline-none border border-transparent hover:border-gray-300"
                    style={{ color: colors[index] }}
                  />
                  <textarea
                    value={topic.content}
                    onChange={(e) =>
                      handleTopicChange(index, "content", e.target.value)
                    }
                    rows={1}
                    className="text-gray-600 w-full resize-none outline-none border border-transparent hover:border-gray-300"
                  />
                </>
              ) : (
                <>
                  <h2
                    className="text-lg font-semibold mb-1"
                    style={{ color: colors[index] }}
                  >
                    {topic.title}
                  </h2>
                  <p className="text-gray-600">{topic.content}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
