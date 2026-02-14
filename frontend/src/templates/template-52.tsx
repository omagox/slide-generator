import { useState } from "react";
import { EditActions } from "../components/templateActionButtons";
import type { SingleTopicProps } from "./types";

const defaultSingleTopicProps: SingleTopicProps = {
  title: "Título padrão",
  content: "Conteúdo padrão",
  preview: false,
};

type EditableProps = Partial<SingleTopicProps> & {
  onSave?: (data: Pick<SingleTopicProps, "title" | "content">) => void;
};

export default function Template52(props: EditableProps) {
  const { onSave, ...rest } = props;
  const {
    title,
    content,
    preview,
  } = {
    ...defaultSingleTopicProps,
    ...rest,
  };

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
      className="relative w-full aspect-video bg-white p-8 rounded-lg shadow-lg overflow-hidden"
    >
      <EditActions
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
      />

      <div className="h-full flex items-center">
        <div className="w-1/3 flex justify-center">
          <div className="relative">
            <div
              className="w-40 h-40 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#1277bc" }}
            >
              <span className="text-white text-5xl">📖</span>
            </div>
          </div>
        </div>
        <div className="w-full pl-9">
          {isEditing ? (
            <>
              <input
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                className="w-full text-4xl font-bold text-black mb-8 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
              />
              <textarea
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                className="w-full text-lg text-gray-600 leading-relaxed outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                rows={5}
              />
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-black mb-8">{draftTitle}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{draftContent}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
