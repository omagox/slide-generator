import { useState } from "react";
import { MdAddBox, MdDelete } from "react-icons/md";
import { EditActions } from "../components/templateActionButtons";
import type { ProcessProps } from "./types";

const defaultStepItem = {
  title: "Título do passo",
  content: "Descrição do passo",
  additional: "",
};

const defaultProcessProps: ProcessProps = {
  title: "Título padrão",
  steps: [defaultStepItem, defaultStepItem],
  preview: false,
};

type EditableProps = Partial<ProcessProps> & {
  onSave?: (data: Pick<ProcessProps, "title" | "steps">) => void;
};

export default function Template53(props: EditableProps) {
  const { onSave, ...rest } = props;
  const { title, steps, preview } = {
    ...defaultProcessProps,
    ...rest,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftSteps, setDraftSteps] = useState(
    steps.map((step) => ({ ...defaultStepItem, ...step })),
  );

  const handleSave = () => {
    setIsEditing(false);
    onSave?.({
      title: draftTitle,
      steps: draftSteps,
    });
  };

  const addStep = () => {
    setDraftSteps([...draftSteps, { ...defaultStepItem }]);
  };

  const removeStep = (index: number) => {
    setDraftSteps(draftSteps.filter((_, i) => i !== index));
  };

  const updateStep = (
    index: number,
    field: keyof typeof defaultStepItem,
    value: string,
  ) => {
    const newSteps = [...draftSteps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setDraftSteps(newSteps);
  };

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#1277bc"];

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="relative w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center overflow-hidden"
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

      {isEditing && draftSteps.length < 4 && (
        <button
          onClick={addStep}
          className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors cursor-pointer z-10"
        >
          <MdAddBox className="translate-y-px" />
          Adicionar novo item
        </button>
      )}

      <div className="grid grid-cols-2 gap-8 w-full max-w-5xl">
        {draftSteps.slice(0, 4).map((step, index) => {
          const color = colors[index % colors.length];
          return (
            <div
              key={index}
              className="flex items-center space-x-4 relative group"
            >
              <div
                className="w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold text-2xl shrink-0"
                style={{ backgroundColor: color }}
              >
                {index + 1}
              </div>
              <div className="flex-1 relative">
                {isEditing ? (
                  <>
                    <input
                      value={step.title}
                      onChange={(e) =>
                        updateStep(index, "title", e.target.value)
                      }
                      className="w-full text-lg font-semibold mb-1 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                      style={{ color: color }}
                    />
                    <textarea
                      value={step.content}
                      onChange={(e) =>
                        updateStep(index, "content", e.target.value)
                      }
                      className="w-full text-gray-600 text-sm outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                      rows={1}
                    />
                    <input
                      value={step.additional}
                      onChange={(e) =>
                        updateStep(index, "additional", e.target.value)
                      }
                      placeholder="Adicional..."
                      className="w-full text-gray-500 text-xs mt-1 italic outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                    />
                    {draftSteps.length > 1 && (
                      <button
                        onClick={() => removeStep(index)}
                        className="absolute top-0 right-0 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <MdDelete size={18} />
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <h3
                      className="text-lg font-semibold mb-2"
                      style={{ color: color }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{step.content}</p>
                    {step.additional && (
                      <p className="text-gray-500 text-xs mt-1 italic">
                        {step.additional}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
