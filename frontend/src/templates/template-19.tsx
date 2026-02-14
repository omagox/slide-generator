import { useState } from "react";
import { EditActions } from "../components/templateActionButtons";
import type { ProcessProps } from "./types";
import { MdDelete, MdAddBox } from "react-icons/md";

type EditableProcessProps = Partial<ProcessProps> & {
  onSave?: (data: Pick<ProcessProps, "title" | "steps">) => void;
};

const defaults: ProcessProps = {
  title: "Título padrão",
  steps: [
    { title: "Passo 1", content: "Conteúdo do passo 1" },
    { title: "Passo 2", content: "Conteúdo do passo 2" },
    { title: "Passo 3", content: "Conteúdo do passo 3" },
    { title: "Passo 4", content: "Conteúdo do passo 4" },
    { title: "Passo 5", content: "Conteúdo do passo 5" },
  ],
  preview: false,
};

export default function Template19(props: EditableProcessProps) {
  const { onSave, ...rest } = props;
  const { title, steps, preview } = { ...defaults, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftSteps, setDraftSteps] = useState(steps);

  const colors = ["#1277bc", "#58a3a1", "#6b7280", "#ef4444", "#f59e0b", "#10b981"];

  function handleSave() {
    setIsEditing(false);
    onSave?.({ title: draftTitle, steps: draftSteps });
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
    setDraftSteps([...draftSteps, { title: "Novo Passo", content: "Novo conteúdo" }]);
  };

  const removeStep = (index: number) => {
    const newSteps = draftSteps.filter((_, i) => i !== index);
    setDraftSteps(newSteps);
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

      {isEditing && draftSteps.length < 6 && (
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

      <div className="max-w-3xl mx-auto space-y-3">
        {draftSteps.map((step, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 bg-gray-50 rounded-lg p-1 group relative"
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              <span className="text-white text-sm">{index + 1}</span>
            </div>
            <div className="flex-1 flex items-start gap-2">
              <div className="flex-1">
                {isEditing ? (
                  <>
                    <input
                      value={step.title}
                      onChange={(e) =>
                        handleStepChange(index, "title", e.target.value)
                      }
                      className="w-full font-semibold text-black outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                    />
                    <textarea
                      value={step.content}
                      onChange={(e) =>
                        handleStepChange(index, "content", e.target.value)
                      }
                      className="w-full text-gray-600 text-sm outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                      rows={1}
                    />
                  </>
                ) : (
                  <>
                    <h2 className="font-semibold text-black">{step.title}</h2>
                    <p className="text-gray-600 text-sm">{step.content}</p>
                  </>
                )}
              </div>

              {isEditing && draftSteps.length > 1 && (
                <button
                  onClick={() => removeStep(index)}
                  className="text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer mt-1"
                  title="Remover passo"
                >
                  <MdDelete />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
