import { useState } from "react";
import { EditActions } from "../components/templateActionButtons";
import type { HighlightProps } from "./types";

type EditableHighlightProps = Partial<HighlightProps> & {
  onSave?: (data: Pick<HighlightProps, "title" | "topic">) => void;
};

const defaultHighlight: HighlightProps = {
  title: "Título padrão",
  topic: { title: "Tópico padrão", content: "Conteúdo padrão", highlight: "" },
  preview: false,
};

export default function Template26(props: EditableHighlightProps) {
  const { onSave, ...rest } = props;
  const { title, topic, preview } = { ...defaultHighlight, ...rest };

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
          className="w-full text-3xl font-bold text-black mb-8 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
        />
      ) : (
        <h1 className="text-3xl font-bold text-black mb-8 text-center">
          {draftTitle}
        </h1>
      )}

      <div className="flex justify-center w-full">
        <div className="max-w-2xl space-y-4 w-full">
          <div className="text-center mb-6">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: "#1277bc" }}
            >
              <span className="text-white text-2xl font-bold">!</span>
            </div>
            {isEditing ? (
              <input
                value={draftTopic.title}
                onChange={(e) => handleTopicChange("title", e.target.value)}
                className="w-full text-2xl font-semibold text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                style={{ color: "#1277bc" }}
              />
            ) : (
              <h2 className="text-2xl font-semibold" style={{ color: "#1277bc" }}>
                {draftTopic.title}
              </h2>
            )}
          </div>
          <div className="bg-gray-50 p-6 rounded-lg w-full">
            {isEditing ? (
              <>
                <textarea
                  value={draftTopic.content}
                  onChange={(e) => handleTopicChange("content", e.target.value)}
                  className="w-full text-gray-600 text-center leading-relaxed mb-4 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                  rows={3}
                />
                <div className="border-t pt-4">
                  <input
                    value={draftTopic.highlight || ""}
                    onChange={(e) =>
                      handleTopicChange("highlight", e.target.value)
                    }
                    className="w-full text-gray-500 text-sm text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                    placeholder="Destaque (opcional)..."
                  />
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-600 text-center leading-relaxed mb-4">
                  {draftTopic.content}
                </p>
                {draftTopic.highlight && (
                  <div className="border-t pt-4">
                    <p className="text-gray-500 text-sm text-center">
                      {draftTopic.highlight}
                    </p>
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
