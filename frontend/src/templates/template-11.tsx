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
  content: "Texto complementar padrão.",
  preview: false,
};

export default function Template11(props: EditableMixedContentProps) {
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

      <div className="grid grid-cols-3 gap-6">
        {draftTopics.slice(0, 3).map((topic, index) => (
          <div
            key={index}
            className="bg-gray-50 p-4 rounded-lg text-center border-t-4"
            style={{ borderTopColor: colors[index] }}
          >
            {isEditing ? (
              <input
                value={topic}
                onChange={(e) => handleTopicChange(index, e.target.value)}
                className="text-lg font-semibold text-center w-full outline-none border border-transparent hover:border-gray-300"
                style={{ color: colors[index] }}
              />
            ) : (
              <h2
                className="text-lg font-semibold mb-2"
                style={{ color: colors[index] }}
              >
                {topic}
              </h2>
            )}
          </div>
        ))}
      </div>

      {draftContent && (
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          {isEditing ? (
            <textarea
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              className="text-gray-600 text-center leading-relaxed w-full resize-none outline-none border border-transparent hover:border-gray-300"
              rows={3}
            />
          ) : (
            <p className="text-gray-600 text-center leading-relaxed">
              {draftContent}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
