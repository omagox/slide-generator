import { useState } from "react";
import { useSlideGeneration } from "../contexts/SlideGenerationContext";
import { EditActions } from "../components/templateActionButtons";
import type { LearningObjectivesProps } from "./types";
import { MdDelete, MdAddBox } from "react-icons/md";

type EditableLearningObjectivesProps = Partial<LearningObjectivesProps> & {
  slideIndex: number;
};

const defaultLearningObjectives: LearningObjectivesProps = {
  title: "Título padrão",
  objectives: ["Objetivo 1", "Objetivo 2", "Objetivo 3", "Objetivo 4"],
  preview: false,
};

export default function Template27(props: EditableLearningObjectivesProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const { title, objectives, preview } = {
    ...defaultLearningObjectives,
    ...rest,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftObjectives, setDraftObjectives] = useState(objectives);

  function handleSave() {
    setIsEditing(false);
    handleUpdateSlide(slideIndex, {
      title: draftTitle,
      objectives: draftObjectives,
    });
  }

  const handleObjectiveChange = (index: number, value: string) => {
    const newObjectives = [...draftObjectives];
    newObjectives[index] = value;
    setDraftObjectives(newObjectives);
  };

  const addObjective = () => {
    setDraftObjectives([...draftObjectives, "Novo Objetivo"]);
  };

  const removeObjective = (index: number) => {
    const newObjectives = draftObjectives.filter((_, i) => i !== index);
    setDraftObjectives(newObjectives);
  };

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

      {isEditing && draftObjectives.length < 4 && (
        <button
          onClick={addObjective}
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

      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-6" style={{ color: "#1277bc" }}>
          Objetivos de Aprendizagem
        </h2>
        <div className="space-y-6">
          {draftObjectives.map((objective, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 bg-gray-50 rounded-lg p-2 group"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0 mt-1"
                style={{
                  backgroundColor: index % 2 === 0 ? "#1277bc" : "#58a3a1",
                }}
              >
                {index + 1}
              </div>
              <div className="flex-1 flex items-start gap-2">
                {isEditing ? (
                  <textarea
                    value={objective}
                    onChange={(e) =>
                      handleObjectiveChange(index, e.target.value)
                    }
                    className="w-full text-gray-700 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                    rows={2}
                  />
                ) : (
                  <p className="text-gray-700 translate-y-1">{objective}</p>
                )}

                {isEditing && draftObjectives.length > 1 && (
                  <button
                    onClick={() => removeObjective(index)}
                    className="text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer mt-1"
                    title="Remover item"
                  >
                    <MdDelete />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
