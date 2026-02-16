import { useState } from "react";
import { useSlideGeneration } from "../contexts/SlideGenerationContext";

import type { AgendaProps } from "./types";

import { EditActions } from "../components/templateActionButtons";

import { MdDelete, MdAddBox  } from "react-icons/md";

type EditableAgendaProps = Partial<AgendaProps> & {
  slideIndex: number;
};

const defaultAgendaProps: AgendaProps = {
  title: "Agenda Padrão",
  topics: ["Padrão"],
  preview: false,
};

export default function Template29(props: EditableAgendaProps) {
  const { handleUpdateSlide } = useSlideGeneration();

  const { slideIndex, ...rest } = props;
  const { title, topics, preview } = { ...defaultAgendaProps, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);

  function handleSave() {
    setIsEditing(false);

    handleUpdateSlide(slideIndex, {
      title: draftTitle,
      topics: draftTopics,
    });
  }

  const handleTopicChange = (index: number, value: string) => {
    const newTopics = [...draftTopics];
    newTopics[index] = value;
    setDraftTopics(newTopics);
  };

  const addTopic = () => {
    setDraftTopics([...draftTopics, "Novo Item"]);
  };

  const removeTopic = (index: number) => {
    const newTopics = draftTopics.filter((_, i) => i !== index);
    setDraftTopics(newTopics);
  };

  const renderTopic = (item: string, index: number) => (
    <div
      key={index}
      className="flex items-center px-4 pb-2 pt-2.5 bg-gray-50 rounded-lg group"
    >
      <div className="flex-1 flex items-center">
        <span className="text-xs font-semibold text-black mr-1">
          {index + 1}.
        </span>
        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              value={item}
              onChange={(e) => handleTopicChange(index, e.target.value)}
              className="flex-1 text-xs font-semibold text-black outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
            />
            {isEditing && draftTopics.length > 1 && (
              <button
                onClick={() => removeTopic(index)}
                className="text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Remover item"
              >
                <MdDelete />
              </button>
            )}
          </div>
        ) : (
          <h3 className="text-xs font-semibold text-black">{item}</h3>
        )}
      </div>
    </div>
  );

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
          className="w-full text-3xl font-bold text-black mb-8 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
        />
      ) : (
        <h1 className="text-3xl font-bold text-black mb-8 text-center">
          {draftTitle}
        </h1>
      )}

      <div className="max-w-4xl mx-auto">
        {isEditing && draftTopics.length < 16 && (
          <button
            onClick={addTopic}
            className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors cursor-pointer"
          >
            <MdAddBox className="translate-y-px"/>
            Adicionar novo item
          </button>
        )}
        {draftTopics.length > 8 ? (
          <div className="grid grid-cols-2 gap-x-6">
            <div className="space-y-2">
              {draftTopics.slice(0, 8).map((item, index) => renderTopic(item, index))}
            </div>
            <div className="space-y-2">
              {draftTopics.slice(8).map((item, index) => renderTopic(item, index + 8))}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {draftTopics.map((item, index) => renderTopic(item, index))}
          </div>
        )}
      </div>
    </div>
  );
}
