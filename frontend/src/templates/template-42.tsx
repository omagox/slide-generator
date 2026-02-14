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

export default function Template42(props: EditableProps) {
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

      <div className="h-full flex items-center">
        <div className="w-1/2 pr-4">
          <div
            className="bg-gray-50 p-6 rounded-lg border-t-4"
            style={{ borderTopColor: "#1277bc" }}
          >
            {isEditing ? (
              <>
                <input
                  value={draftTopics[0].title}
                  onChange={(e) => updateTopic(0, "title", e.target.value)}
                  className="w-full text-xl font-semibold mb-4 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                  style={{ color: "#1277bc" }}
                />
                <textarea
                  value={draftTopics[0].content}
                  onChange={(e) => updateTopic(0, "content", e.target.value)}
                  className="w-full text-gray-600 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                  rows={3}
                />
              </>
            ) : (
              <>
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#1277bc" }}
                >
                  {draftTopics[0].title}
                </h2>
                <p className="text-gray-600">{draftTopics[0].content}</p>
              </>
            )}
          </div>
        </div>
        <div className="w-px h-32 bg-gray-300 mx-8"></div>
        <div className="w-1/2 pl-4">
          <div
            className="bg-gray-50 p-6 rounded-lg border-t-4"
            style={{ borderTopColor: "#58a3a1" }}
          >
            {isEditing ? (
              <>
                <input
                  value={draftTopics[1].title}
                  onChange={(e) => updateTopic(1, "title", e.target.value)}
                  className="w-full text-xl font-semibold mb-4 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                  style={{ color: "#58a3a1" }}
                />
                <textarea
                  value={draftTopics[1].content}
                  onChange={(e) => updateTopic(1, "content", e.target.value)}
                  className="w-full text-gray-600 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                  rows={3}
                />
              </>
            ) : (
              <>
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#58a3a1" }}
                >
                  {draftTopics[1].title}
                </h2>
                <p className="text-gray-600">{draftTopics[1].content}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
