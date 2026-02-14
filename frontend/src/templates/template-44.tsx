import { useState } from "react";
import { EditActions } from "../components/templateActionButtons";
import type { TwoTopicsProps } from "./types";

const defaultTopicItem = {
  title: "Título do tópico",
  content: "Conteúdo do tópico",
};

const defaultTwoTopicsProps: TwoTopicsProps = {
  title: "Título padrão",
  topics: [defaultTopicItem, defaultTopicItem],
  preview: false,
};

type EditableProps = Partial<TwoTopicsProps> & {
  onSave?: (data: Pick<TwoTopicsProps, "title" | "topics">) => void;
};

export default function Template44(props: EditableProps) {
  const { onSave, ...rest } = props;
  const { title, topics, preview } = {
    ...defaultTwoTopicsProps,
    ...rest,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(
    topics.map((topic) => ({ ...defaultTopicItem, ...topic }))
  );

  const handleSave = () => {
    setIsEditing(false);
    onSave?.({
      title: draftTitle,
      topics: draftTopics,
    });
  };

  const updateTopic = (index: number, field: keyof typeof defaultTopicItem, value: string) => {
    const newTopics = [...draftTopics];
    newTopics[index] = { ...newTopics[index], [field]: value };
    setDraftTopics(newTopics);
  };

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

      <div className="flex items-center justify-between h-64">
        <div
          className="w-5/12 h-full bg-gray-50 rounded-lg p-6 border-l-4"
          style={{ borderLeftColor: "#1277bc" }}
        >
          {isEditing ? (
            <>
              <input
                value={draftTopics[0]?.title}
                onChange={(e) => updateTopic(0, "title", e.target.value)}
                className="w-full text-xl font-semibold mb-4 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                style={{ color: "#1277bc" }}
              />
              <textarea
                value={draftTopics[0]?.content}
                onChange={(e) => updateTopic(0, "content", e.target.value)}
                className="w-full text-gray-600 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                rows={4}
              />
            </>
          ) : (
            <>
              <h2
                className="text-xl font-semibold mb-4 text-center"
                style={{ color: "#1277bc" }}
              >
                {draftTopics[0]?.title}
              </h2>
              <p className="text-gray-600 text-center">{draftTopics[0]?.content}</p>
            </>
          )}
        </div>
        <div className="w-2/12 flex justify-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl"
            style={{ backgroundColor: "#58a3a1" }}
          >
            VS
          </div>
        </div>
        <div
          className="w-5/12 h-full bg-gray-50 rounded-lg p-6 border-l-4"
          style={{ borderLeftColor: "#58a3a1" }}
        >
          {isEditing ? (
            <>
              <input
                value={draftTopics[1]?.title}
                onChange={(e) => updateTopic(1, "title", e.target.value)}
                className="w-full text-xl font-semibold mb-4 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                style={{ color: "#58a3a1" }}
              />
              <textarea
                value={draftTopics[1]?.content}
                onChange={(e) => updateTopic(1, "content", e.target.value)}
                className="w-full text-gray-600 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                rows={4}
              />
            </>
          ) : (
            <>
              <h2
                className="text-xl font-semibold mb-4 text-center"
                style={{ color: "#58a3a1" }}
              >
                {draftTopics[1]?.title}
              </h2>
              <p className="text-gray-600 text-center">{draftTopics[1]?.content}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
