import { useState } from "react";
import type { MixedContentProps } from "./types";
import { EditActions } from "../components/templateActionButtons";

type EditableMixedContentProps = Partial<MixedContentProps> & {
  onSave?: (
    data: Pick<MixedContentProps, "title" | "topics" | "content">,
  ) => void;
};

const defaults: MixedContentProps = {
  title: "Título padrão",
  topics: ["Tópico 1", "Tópico 2", "Tópico 3"],
  content: "Texto complementar geral sobre os tópicos apresentados.",
  preview: false,
};

export default function Template08(props: EditableMixedContentProps) {
  const { onSave, ...rest } = props;
  const { title, topics, content, preview } = { ...defaults, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);
  const [draftContent, setDraftContent] = useState(content);

  const colors = ["#1277bc", "#58a3a1", "#6b7280"];

  function handleTopicChange(index: number, value: string) {
    setDraftTopics((prev) =>
      prev.map((topic, i) => (i === index ? value : topic)),
    );
  }

  function handleSave() {
    setIsEditing(false);
    onSave?.({
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
          {draftTopics.slice(0, 3).map((topic, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: colors[index] }}
              >
                <span className="text-white text-xs">{index + 1}</span>
              </div>

              {isEditing ? (
                <input
                  value={topic}
                  onChange={(e) => handleTopicChange(index, e.target.value)}
                  className="text-lg font-semibold text-gray-700 w-full outline-none border border-transparent hover:border-gray-300"
                />
              ) : (
                <h2 className="text-lg font-semibold text-gray-700">{topic}</h2>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          {isEditing ? (
            <textarea
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              className="text-gray-600 leading-relaxed w-full h-full resize-none outline-none border border-transparent hover:border-gray-300"
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
