import { useState } from "react";
import { EditActions } from "../components/templateActionButtons";
import type { TimelineProps } from "./types";
import { MdDelete, MdAddBox } from "react-icons/md";

type EditableTimelineProps = Partial<TimelineProps> & {
  onSave?: (data: Pick<TimelineProps, "title" | "steps" | "content">) => void;
};

const defaults: TimelineProps = {
  title: "Título padrão",
  steps: [
    { title: "Etapa 1", description: "Descrição da etapa 1" },
    { title: "Etapa 2", description: "Descrição da etapa 2" },
    { title: "Etapa 3", description: "Descrição da etapa 3" },
  ],
  content: "Conteúdo complementar padrão.",
  preview: false,
};

export default function Template21(props: EditableTimelineProps) {
  const { onSave, ...rest } = props;
  const { title, steps, content, preview } = { ...defaults, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftSteps, setDraftSteps] = useState(steps);
  const [draftContent, setDraftContent] = useState(content || "");

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#ef4444", "#f59e0b", "#10b981"];

  function handleSave() {
    setIsEditing(false);
    onSave?.({
      title: draftTitle,
      steps: draftSteps,
      content: draftContent,
    });
  }

  const handleStepChange = (
    index: number,
    field: keyof (typeof steps)[0],
    value: string,
  ) => {
    const newSteps = [...draftSteps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setDraftSteps(newSteps);
  };

  const addStep = () => {
    setDraftSteps([...draftSteps, { title: "Nova Etapa", description: "Nova descrição" }]);
  };

  const removeStep = (index: number) => {
    const newSteps = draftSteps.filter((_, i) => i !== index);
    setDraftSteps(newSteps);
  };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="relative w-full aspect-video bg-white py-8 rounded-lg shadow-lg"
    >
      <EditActions
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
      />

      {isEditing && draftSteps.length < 5 && (
        <button
          onClick={addStep}
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

      <div className="flex justify-between items-center relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2"></div>
        {draftSteps.map((step, index) => (
          <div key={index} className="flex flex-col items-center z-10 flex-1 px-2 group relative">
            {isEditing && draftSteps.length > 1 && (
              <button
                onClick={() => removeStep(index)}
                className="absolute -top-4 right-2 text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Remover etapa"
              >
                <MdDelete />
              </button>
            )}

            <div
              className="w-4 h-4 rounded-full mb-2"
              style={{ backgroundColor: colors[index % colors.length] }}
            ></div>
            <div className="bg-white p-3 rounded shadow-md text-center w-full">
              {isEditing ? (
                <>
                  <input
                    value={step.title}
                    onChange={(e) =>
                      handleStepChange(index, "title", e.target.value)
                    }
                    className="w-full font-semibold text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                    style={{ color: colors[index % colors.length] }}
                  />
                  <textarea
                    value={step.description}
                    onChange={(e) =>
                      handleStepChange(index, "description", e.target.value)
                    }
                    className="w-full text-sm text-gray-600 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                    rows={2}
                  />
                </>
              ) : (
                <>
                  <h2 className="font-semibold" style={{ color: colors[index % colors.length] }}>
                    {step.title}
                  </h2>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {(draftContent || isEditing) && (
        <div className="mt-8 mx-8 bg-gray-50 p-4 rounded-lg">
          {isEditing ? (
            <textarea
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              className="w-full text-gray-600 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
              rows={2}
              placeholder="Conteúdo complementar..."
            />
          ) : (
            <p className="text-gray-600 text-center">{draftContent}</p>
          )}
        </div>
      )}
    </div>
  );
}
