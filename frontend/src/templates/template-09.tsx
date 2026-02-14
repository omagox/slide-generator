import { useState } from "react";
import type { TimelineProps } from "./types";
import { EditActions } from "../components/templateActionButtons";
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
  content: "Texto complementar explicando a linha do tempo.",
  preview: false,
};

export default function Template09(props: EditableTimelineProps) {
  const { onSave, ...rest } = props;
  const { title, steps, content, preview } = { ...defaults, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftSteps, setDraftSteps] = useState(steps);
  const [draftContent, setDraftContent] = useState(content);

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#ef4444", "#f59e0b", "#10b981"];

  function handleStepChange(
    index: number,
    field: "title" | "description",
    value: string,
  ) {
    setDraftSteps((prev) =>
      prev.map((step, i) => (i === index ? { ...step, [field]: value } : step)),
    );
  }

  const addStep = () => {
    setDraftSteps([
      ...draftSteps,
      { title: "Nova Etapa", description: "Nova descrição" },
    ]);
  };

  const removeStep = (index: number) => {
    const newSteps = draftSteps.filter((_, i) => i !== index);
    setDraftSteps(newSteps);
  };

  function handleSave() {
    setIsEditing(false);
    onSave?.({
      title: draftTitle,
      steps: draftSteps,
      content: draftContent,
    });
  }

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="relative w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between items-center"
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
          className="text-3xl font-bold text-black text-center w-full outline-none border border-transparent hover:border-gray-300"
        />
      ) : (
        <h1 className="text-3xl font-bold text-black text-center">
          {draftTitle}
        </h1>
      )}

      <div className="flex justify-between items-start gap-4 w-full">
        {draftSteps.map((step, index) => (
          <div key={index} className="flex-1 text-center group relative">
            {isEditing && draftSteps.length > 1 && (
              <button
                onClick={() => removeStep(index)}
                className="absolute -top-2 right-0 text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Remover etapa"
              >
                <MdDelete />
              </button>
            )}

            <div
              className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              <span className="text-white font-bold">{index + 1}</span>
            </div>

            {isEditing ? (
              <>
                <input
                  value={step.title}
                  onChange={(e) =>
                    handleStepChange(index, "title", e.target.value)
                  }
                  className="text-lg font-semibold text-gray-700 w-full text-center outline-none border border-transparent hover:border-gray-300 mb-1 bg-transparent"
                />
                <textarea
                  value={step.description}
                  onChange={(e) =>
                    handleStepChange(index, "description", e.target.value)
                  }
                  rows={2}
                  className="text-sm text-gray-600 w-full text-center resize-none outline-none border border-transparent hover:border-gray-300 bg-transparent"
                />
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-gray-700">
                  {step.title}
                </h2>
                <p className="text-sm text-gray-600">{step.description}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {(draftContent || isEditing) && (
        <div className="bg-gray-50 p-4 rounded-lg w-full">
          {isEditing ? (
            <textarea
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              rows={3}
              className="text-gray-600 text-center w-full resize-none outline-none border border-transparent hover:border-gray-300 bg-transparent"
            />
          ) : (
            <p className="text-gray-600 text-center">{draftContent}</p>
          )}
        </div>
      )}
    </div>
  );
}
