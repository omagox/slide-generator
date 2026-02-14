import { useState } from "react";
import { MdAddBox, MdDelete } from "react-icons/md";
import { EditActions } from "../components/templateActionButtons";
import type { TopicWithDetailsProps } from "./types";

const defaultTopicItem = {
  title: "Título do tópico",
  content: "Conteúdo do tópico",
  details: ["Detalhe 1", "Detalhe 2"],
};

const defaultTopicWithDetailsProps: TopicWithDetailsProps = {
  title: "Título padrão",
  topic: defaultTopicItem,
  preview: false,
};

type EditableProps = Partial<TopicWithDetailsProps> & {
  onSave?: (data: Pick<TopicWithDetailsProps, "title" | "topic">) => void;
};

export default function Template40(props: EditableProps) {
  const { onSave, ...rest } = props;
  const { title, topic, preview } = {
    ...defaultTopicWithDetailsProps,
    ...rest,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTopicTitle, setDraftTopicTitle] = useState(topic.title);
  const [draftTopicContent, setDraftTopicContent] = useState(topic.content);
  const [draftDetails, setDraftDetails] = useState([...topic.details]);

  const handleSave = () => {
    setIsEditing(false);
    onSave?.({
      title: draftTitle,
      topic: {
        title: draftTopicTitle,
        content: draftTopicContent,
        details: draftDetails,
      },
    });
  };

  const addDetail = () => {
    setDraftDetails([...draftDetails, "Novo detalhe"]);
  };

  const removeDetail = (index: number) => {
    setDraftDetails(draftDetails.filter((_, i) => i !== index));
  };

  const updateDetail = (index: number, value: string) => {
    const newDetails = [...draftDetails];
    newDetails[index] = value;
    setDraftDetails(newDetails);
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

      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-50 p-8 rounded-lg relative">
          {isEditing ? (
            <>
              <input
                value={draftTopicTitle}
                onChange={(e) => setDraftTopicTitle(e.target.value)}
                className="w-full text-2xl font-bold mb-6 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                style={{ color: "#1277bc" }}
              />
              <textarea
                value={draftTopicContent}
                onChange={(e) => setDraftTopicContent(e.target.value)}
                className="w-full text-lg text-gray-700 mb-6 text-center leading-relaxed outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                rows={2}
              />
            </>
          ) : (
            <>
              <h2
                className="text-2xl font-bold mb-6 text-center"
                style={{ color: "#1277bc" }}
              >
                {draftTopicTitle}
              </h2>
              <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
                {draftTopicContent}
              </p>
            </>
          )}

          <div className="grid grid-cols-2 gap-4">
            {draftDetails.map((detail, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-white rounded-lg group"
              >
                <div
                  className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-sm"
                  style={{
                    backgroundColor: index % 2 === 0 ? "#58a3a1" : "#1277bc",
                  }}
                >
                  {index + 1}
                </div>
                {isEditing ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      value={detail}
                      onChange={(e) => updateDetail(index, e.target.value)}
                      className="flex-1 text-gray-600 text-sm outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                    />
                    {draftDetails.length > 1 && (
                      <button
                        onClick={() => removeDetail(index)}
                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <MdDelete size={14} />
                      </button>
                    )}
                  </div>
                ) : (
                  <span className="text-gray-600">{detail}</span>
                )}
              </div>
            ))}
            {isEditing && draftDetails.length < 6 && (
              <button
                onClick={addDetail}
                className="flex items-center justify-center space-x-3 p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors cursor-pointer"
              >
                <MdAddBox />
                <span className="text-sm font-semibold">Adicionar novo item</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
