import { useState } from "react";
import { EditActions } from "../components/templateActionButtons";
import type { SingleTopicProps } from "./types";

const defaultSingleTopicProps: SingleTopicProps = {
  title: "Título padrão",
  content: "Conteúdo padrão do tópico",
  preview: false,
};

type EditableProps = Partial<SingleTopicProps> & {
  onSave?: (data: Pick<SingleTopicProps, "title" | "content">) => void;
};

export default function Template34(props: EditableProps) {
  const { onSave, ...rest } = props;
  const { title, content, preview } = { ...defaultSingleTopicProps, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftContent, setDraftContent] = useState(content);

  const handleSave = () => {
    setIsEditing(false);
    onSave?.({
      title: draftTitle,
      content: draftContent,
    });
  };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="relative w-full aspect-video bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg shadow-lg overflow-hidden"
    >
      <EditActions
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
      />

      <div className="h-full flex flex-col justify-center items-center text-center">
        <div className="mb-6">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: "#1277bc" }}
          >
            <span className="text-white text-3xl">📚</span>
          </div>
        </div>

        {isEditing ? (
          <>
            <input
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              className="w-full text-4xl font-bold text-black mb-6 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
            />
            <textarea
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              className="w-full text-xl text-gray-600 max-w-3xl leading-relaxed text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
              rows={3}
            />
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-black mb-6">{draftTitle}</h1>
            <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
              {draftContent}
            </p>
          </>
        )}

        <div
          className="mt-8 w-32 h-1 rounded"
          style={{ backgroundColor: "#58a3a1" }}
        ></div>
      </div>
    </div>
  );
}
