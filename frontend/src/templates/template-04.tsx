import { useState } from "react";
import type { TopicsWithSubtopicsProps } from "./types";
import { EditActions } from "../components/templateActionButtons";

type EditableTopicsWithSubtopicsProps = Partial<TopicsWithSubtopicsProps> & {
  onSave?: (data: Pick<TopicsWithSubtopicsProps, "title" | "topics">) => void;
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
  const { onSave, ...rest } = props;
  const { title, topics, preview } = { ...defaultValues, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopics, setDraftTopics] = useState(topics);

  const colors = ["#1277bc", "#58a3a1"];

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

  function handleSave() {
    setIsEditing(false);
    onSave?.({
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
            <div key={index}>
              <div className="flex items-center space-x-4 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: color }}
                >
                  {index + 1}
                </div>

                {isEditing ? (
                  <input
                    value={topic.title}
                    onChange={(e) =>
                      handleTopicTitleChange(index, e.target.value)
                    }
                    className="text-md font-semibold w-full outline-none border border-transparent hover:border-gray-300"
                    style={{ color }}
                  />
                ) : (
                  <h2 className="text-md font-semibold" style={{ color }}>
                    {topic.title}
                  </h2>
                )}
              </div>

              <div className="ml-12 space-y-1 text-xs">
                {topic.subtopics.map((subtopic, subIndex) =>
                  isEditing ? (
                    <input
                      key={subIndex}
                      value={subtopic}
                      onChange={(e) =>
                        handleSubtopicChange(index, subIndex, e.target.value)
                      }
                      className="block w-full text-gray-600 outline-none border border-transparent hover:border-gray-300"
                    />
                  ) : (
                    <p key={subIndex} className="text-gray-600">
                      • {subtopic}
                    </p>
                  ),
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
