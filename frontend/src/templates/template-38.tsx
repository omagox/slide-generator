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

export default function Template38(props: EditableProps) {
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
      className="relative w-full aspect-video bg-white p-8 rounded-lg shadow-lg overflow-hidden"
    >
      <EditActions
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
      />

      <div className="h-full flex items-center">
        <div className="w-1/3 flex justify-center">
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#1277bc" }}
          >
            <span className="text-white text-4xl">?</span>
          </div>
        </div>
        <div className="w-2/3 pl-8">
          {isEditing ? (
            <>
              <input
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                className="w-full text-3xl font-bold text-black mb-6 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
              />
              <textarea
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                className="w-full text-lg text-gray-600 leading-relaxed outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                rows={4}
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-black mb-6">{draftTitle}</h1>
              <p className="text-lg text-gray-600 leading-relaxed">{draftContent}</p>
            </>
          )}
          <div className="mt-6 flex space-x-4">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#1277bc" }}
            ></div>
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: "#58a3a1" }}
            ></div>
            <div className="w-4 h-4 rounded-full bg-gray-400"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
