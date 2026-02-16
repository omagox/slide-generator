import { useState } from "react";
import { useSlideGeneration } from "../contexts/SlideGenerationContext";
import { EditActions } from "../components/templateActionButtons";
import type { TopicsWithSubtopicsProps } from "./types";
import { MdDelete, MdAddBox } from "react-icons/md";

type EditableTopicsWithSubtopicsProps = Partial<TopicsWithSubtopicsProps> & {
  slideIndex: number;
};

const defaults: TopicsWithSubtopicsProps = {
  title: "Título padrão",
  topics: [
    { title: "Tópico 1", subtopics: ["Subtópico 1.1", "Subtópico 1.2"] },
    { title: "Tópico 2", subtopics: ["Subtópico 2.1", "Subtópico 2.2"] },
  ],
  preview: false,
};

export default function Template25(props: EditableTopicsWithSubtopicsProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const { title, topics, preview } = { ...defaults, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#ef4444"];

  function handleSave() {
    setIsEditing(false);
    handleUpdateSlide(slideIndex, { title: draftTitle, topics: draftTopics });
  }

  const handleTopicChange = (index: number, value: string) => {
    const newTopics = [...draftTopics];
    newTopics[index] = { ...newTopics[index], title: value };
    setDraftTopics(newTopics);
  };

  const handleSubtopicChange = (
    topicIndex: number,
    subIndex: number,
    value: string,
  ) => {
    const newTopics = [...draftTopics];
    const newSubtopics = [...newTopics[topicIndex].subtopics];
    newSubtopics[subIndex] = value;
    newTopics[topicIndex] = {
      ...newTopics[topicIndex],
      subtopics: newSubtopics,
    };
    setDraftTopics(newTopics);
  };

  const addTopic = () => {
    setDraftTopics([
      ...draftTopics,
      { title: "Novo Tópico", subtopics: ["Novo Subtópico"] },
    ]);
  };

  const removeTopic = (index: number) => {
    const newTopics = draftTopics.filter((_, i) => i !== index);
    setDraftTopics(newTopics);
  };

  const addSubtopic = (topicIndex: number) => {
    const newTopics = [...draftTopics];
    newTopics[topicIndex] = {
      ...newTopics[topicIndex],
      subtopics: [...newTopics[topicIndex].subtopics, "Novo Subtópico"],
    };
    setDraftTopics(newTopics);
  };

  const removeSubtopic = (topicIndex: number, subIndex: number) => {
    const newTopics = [...draftTopics];
    newTopics[topicIndex] = {
      ...newTopics[topicIndex],
      subtopics: newTopics[topicIndex].subtopics.filter(
        (_, i) => i !== subIndex,
      ),
    };
    setDraftTopics(newTopics);
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

      {isEditing && draftTopics.length < 4 && (
        <button
          onClick={addTopic}
          className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors cursor-pointer z-10"
        >
          <MdAddBox className="translate-y-px" />
          Adicionar novo item
        </button>
      )}

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

      <div
        className={`max-w-3xl mx-auto space-y-4 w-full grid ${draftTopics.length > 2 ? "grid-cols-2 gap-x-8" : "grid-cols-1"}`}
      >
        {draftTopics.map((topic, index) => (
          <div key={index} className="group relative">
            {isEditing && draftTopics.length > 1 && (
              <button
                onClick={() => removeTopic(index)}
                className="absolute top-0 right-0 text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Remover tópico"
              >
                <MdDelete />
              </button>
            )}

            <div className="flex items-start space-x-4 mb-1">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0 mt-1"
                style={{ backgroundColor: colors[index % colors.length] }}
              >
                {index + 1}
              </div>
              <div className="flex-1 flex items-center gap-2">
                {isEditing ? (
                  <input
                    value={topic.title}
                    onChange={(e) => handleTopicChange(index, e.target.value)}
                    className="w-full text-xl font-semibold outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                    style={{ color: colors[index % colors.length] }}
                  />
                ) : (
                  <h2
                    className="text-xl font-semibold"
                    style={{ color: colors[index % colors.length] }}
                  >
                    {topic.title}
                  </h2>
                )}
              </div>
            </div>
            <div className="ml-12 space-y-2">
              {topic.subtopics.map((subtopic, subIndex) => (
                <div
                  key={subIndex}
                  className="flex items-start space-x-2 group/sub"
                >
                  <span className="text-gray-600 mt-0.5">•</span>
                  <div className="flex-1 flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <input
                          value={subtopic}
                          onChange={(e) =>
                            handleSubtopicChange(
                              index,
                              subIndex,
                              e.target.value,
                            )
                          }
                          className="w-full text-sm text-gray-600 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                        />
                        {topic.subtopics.length > 1 && (
                          <button
                            onClick={() => removeSubtopic(index, subIndex)}
                            className="text-red-400 hover:text-red-600 p-0.5 opacity-0 group-hover/sub:opacity-100 transition-opacity cursor-pointer"
                            title="Remover subtópico"
                          >
                            <MdDelete size={14} />
                          </button>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-gray-600">{subtopic}</p>
                    )}
                  </div>
                </div>
              ))}
              {isEditing && topic.subtopics.length < 3 && (
                <button
                  onClick={() => addSubtopic(index)}
                  className="flex items-center gap-1 text-[10px] text-blue-500 hover:text-blue-700 mt-1 cursor-pointer ml-4"
                >
                  <MdAddBox /> Adicionar subtópico
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
