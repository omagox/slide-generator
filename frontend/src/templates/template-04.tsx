import { useState } from "react";
import { useSlideGeneration } from "../contexts/SlideGenerationContext";
import type { TopicsWithSubtopicsProps } from "./types";
import { EditActions } from "../components/templateActionButtons";
import { MdDelete, MdAddBox } from "react-icons/md";

type EditableTopicsWithSubtopicsProps = Partial<TopicsWithSubtopicsProps> & {
  slideIndex: number;
};

const defaultValues: TopicsWithSubtopicsProps = {
  title: "Título padrão",
  topics: [
    { title: "Tópico 1", subtopics: ["Subtópico 1-1", "Subtópico 1-2"] },
    { title: "Tópico 2", subtopics: ["Subtópico 2-1", "Subtópico 2-2"] },
    { title: "Tópico 3", subtopics: ["Subtópico 3-1", "Subtópico 3-2"] },
    { title: "Tópico 4", subtopics: ["Subtópico 4-1", "Subtópico 4-2"] },
  ],
  preview: false,
};

export default function Template04(props: EditableTopicsWithSubtopicsProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const { title, topics, preview } = { ...defaultValues, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#ef4444"];

  function handleTopicTitleChange(index: number, value: string) {
    setDraftTopics((prev) =>
      prev.map((topic, i) =>
        i === index ? { ...topic, title: value } : topic,
      ),
    );
  }

  function handleSubtopicChange(
    topicIndex: number,
    subIndex: number,
    value: string,
  ) {
    setDraftTopics((prev) =>
      prev.map((topic, i) =>
        i === topicIndex
          ? {
              ...topic,
              subtopics: topic.subtopics.map((sub, j) =>
                j === subIndex ? value : sub,
              ),
            }
          : topic,
      ),
    );
  }

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
    setDraftTopics((prev) =>
      prev.map((topic, i) =>
        i === topicIndex
          ? { ...topic, subtopics: [...topic.subtopics, "Novo Subtópico"] }
          : topic,
      ),
    );
  };

  const removeSubtopic = (topicIndex: number, subIndex: number) => {
    setDraftTopics((prev) =>
      prev.map((topic, i) =>
        i === topicIndex
          ? {
              ...topic,
              subtopics: topic.subtopics.filter((_, j) => j !== subIndex),
            }
          : topic,
      ),
    );
  };

  function handleSave() {
    setIsEditing(false);
    handleUpdateSlide(slideIndex, {
      title: draftTitle,
      topics: draftTopics,
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
          className="text-3xl font-bold text-black mb-7 text-center w-full outline-none border border-transparent hover:border-gray-300"
        />
      ) : (
        <h1 className="text-3xl font-bold text-black mb-7 text-center">
          {draftTitle}
        </h1>
      )}

      <div className="space-y-5">
        {draftTopics.map((topic, index) => {
          const color = colors[index % colors.length];

          return (
            <div key={index} className="group relative">
              <div className="flex items-center space-x-4 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                  style={{ backgroundColor: color }}
                >
                  {index + 1}
                </div>

                <div className="flex-1 flex items-center gap-2">
                  {isEditing ? (
                    <input
                      value={topic.title}
                      onChange={(e) =>
                        handleTopicTitleChange(index, e.target.value)
                      }
                      className="text-md font-semibold w-full outline-none border border-transparent hover:border-gray-300 bg-transparent"
                      style={{ color }}
                    />
                  ) : (
                    <h2 className="text-md font-semibold" style={{ color }}>
                      {topic.title}
                    </h2>
                  )}

                  {isEditing && draftTopics.length > 1 && (
                    <button
                      onClick={() => removeTopic(index)}
                      className="text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      title="Remover tópico"
                    >
                      <MdDelete />
                    </button>
                  )}
                </div>
              </div>

              <div className="ml-12 space-y-1 text-xs">
                {topic.subtopics.map((subtopic, subIndex) => (
                  <div
                    key={subIndex}
                    className="flex items-center gap-2 group/sub"
                  >
                    {isEditing ? (
                      <div className="flex-1 flex items-center gap-2">
                        <span className="text-gray-400">•</span>
                        <input
                          value={subtopic}
                          onChange={(e) =>
                            handleSubtopicChange(
                              index,
                              subIndex,
                              e.target.value,
                            )
                          }
                          className="flex-1 text-gray-600 outline-none border border-transparent hover:border-gray-300 bg-transparent"
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
                      </div>
                    ) : (
                      <p className="text-gray-600">• {subtopic}</p>
                    )}
                  </div>
                ))}
                {isEditing && topic.subtopics.length < 2 && (
                  <button
                    onClick={() => addSubtopic(index)}
                    className="flex items-center gap-1 text-[10px] text-blue-500 hover:text-blue-700 mt-1 cursor-pointer"
                  >
                    <MdAddBox /> Adicionar subtópico
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
