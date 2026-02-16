import { useState } from "react";

import { useSlideGeneration } from "../contexts/SlideGenerationContext";

import type { SingleTopicProps } from "./types";

import { EditActions } from "../components/templateActionButtons";

type EditableSingleTopicProps = Partial<SingleTopicProps> & {
  slideIndex: number;
};

const defaultValues: SingleTopicProps = {
  title: "Título padrão",
  content: "Conteúdo padrão",
  preview: false,
};

export default function Template01(props: EditableSingleTopicProps) {
  const { handleUpdateSlide } = useSlideGeneration();

  const { slideIndex, ...rest } = props;
  const { preview, title, content } = { ...defaultValues, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftContent, setDraftContent] = useState(content);

  function handleSave() {
    setIsEditing(false);

    handleUpdateSlide(slideIndex, {
      title: draftTitle,
      content: draftContent,
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
          className="text-3xl font-bold text-black mb-4 text-center w-full outline-none border border-transparent hover:border-gray-300 cursor-text"
        />
      ) : (
        <h1 className="text-3xl font-bold text-black mb-4 text-center">
          {draftTitle}
        </h1>
      )}

      {isEditing ? (
        <textarea
          value={draftContent}
          onChange={(e) => setDraftContent(e.target.value)}
          className="text-lg text-gray-600 text-center w-full max-w-3xl mx-auto leading-relaxed resize-none outline-none border border-transparent hover:border-gray-300 cursor-text"
        />
      ) : (
        <p className="text-lg text-gray-600 text-center w-full max-w-3xl mx-auto leading-relaxed">
          {draftContent}
        </p>
      )}
    </div>
  );
}
