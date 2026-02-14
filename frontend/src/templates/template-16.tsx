import { useState } from "react";
import { EditActions } from "../components/templateActionButtons";
import type { HighlightProps } from "./types";

type EditableHighlightProps = Partial<HighlightProps> & {
  onSave?: (data: Pick<HighlightProps, "title" | "topic">) => void;
};

const defaults: HighlightProps = {
  title: "Título padrão",
  topic: {
    title: "Tópico padrão",
    content: "Conteúdo padrão do tópico",
    highlight: "Destaque padrão",
  },
  preview: false,
};

export default function Template16(props: EditableHighlightProps) {
  const { onSave, ...rest } = props;
  const { title, topic, preview } = { ...defaults, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopic, setDraftTopic] = useState(topic);

  function handleSave() {
    setIsEditing(false);
    onSave?.({ title: draftTitle, topic: draftTopic });
  }

  const handleTopicChange = (field: keyof typeof topic, value: string) => {
    setDraftTopic((prev) => ({ ...prev, [field]: value }));
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

      {isEditing ? (
        <input
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          className="w-full text-3xl font-bold text-black mb-8 text-center outline-none border border-transparent hover:border-gray-300 cursor-text"
        />
      ) : (
        <h1 className="text-3xl font-bold text-black mb-8 text-center">
          {draftTitle}
        </h1>
      )}

      <div className="flex justify-center w-full">
        <div className="space-y-6 w-full max-w-md">
          <div className="text-center">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: "#1277bc" }}
            >
              <span className="text-white text-xl">★</span>
            </div>

            {isEditing ? (
              <>
                <input
                  value={draftTopic.title}
                  onChange={(e) => handleTopicChange("title", e.target.value)}
                  className="w-full text-xl font-semibold mb-3 text-center outline-none border border-transparent hover:border-gray-300 cursor-text"
                  style={{ color: "#1277bc" }}
                />
                <textarea
                  value={draftTopic.content}
                  onChange={(e) => handleTopicChange("content", e.target.value)}
                  className="w-full text-gray-600 text-center outline-none border border-transparent hover:border-gray-300 cursor-text resize-none"
                  rows={3}
                />
                <div className="mt-4 bg-gray-50 p-3 rounded">
                  <input
                    value={draftTopic.highlight || ""}
                    onChange={(e) =>
                      handleTopicChange("highlight", e.target.value)
                    }
                    className="w-full text-gray-500 text-sm text-center bg-transparent outline-none border border-transparent hover:border-gray-300 cursor-text"
                    placeholder="Destaque..."
                  />
                </div>
              </>
            ) : (
              <>
                <h2
                  className="text-xl font-semibold mb-3"
                  style={{ color: "#1277bc" }}
                >
                  {draftTopic.title}
                </h2>
                <p className="text-gray-600">{draftTopic.content}</p>
                {draftTopic.highlight && (
                  <div className="mt-4 bg-gray-50 p-3 rounded">
                    <p className="text-gray-500 text-sm">{draftTopic.highlight}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
