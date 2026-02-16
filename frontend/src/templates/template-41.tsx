import { useSlideGeneration } from "../contexts/SlideGenerationContext";
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
  steps: [defaultStepItem],
  preview: false,
};

type EditableProps = Partial<ProcessProps> & {
  slideIndex: number;
};

export default function Template41(props: EditableProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const { title, steps, preview } = {
    ...defaultProcessProps,
    ...rest,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftSteps, setDraftSteps] = useState(
    steps.map((step) => ({ ...defaultStepItem, ...step }))
  );

  const handleSave = () => {
    setIsEditing(false);
    handleUpdateSlide(slideIndex, {
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

  const updateStep = (index: number, field: keyof typeof defaultStepItem, value: string) => {
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

      <div className="grid grid-cols-3 gap-6 w-full">
        {draftSteps.slice(0, 3).map((step, index) => {
          const color = colors[index % colors.length];
          return (
            <div key={index} className="text-center relative group">
              <div
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl shrink-0"
                style={{ backgroundColor: color }}
              >
                {index + 1}
              </div>
              {isEditing ? (
                <>
                  <input
                    value={step.title}
                    onChange={(e) => updateStep(index, "title", e.target.value)}
                    className="w-full text-lg font-semibold mb-3 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                    style={{ color: color }}
                  />
                  <textarea
                    value={step.content}
                    onChange={(e) => updateStep(index, "content", e.target.value)}
                    className="w-full text-gray-600 text-sm text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                    rows={2}
                  />
                  <input
                    value={step.additional}
                    onChange={(e) => updateStep(index, "additional", e.target.value)}
                    placeholder="Adicional..."
                    className="w-full text-gray-500 text-xs mt-2 italic text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                  />
                  {draftSteps.length > 1 && (
                    <button
                      onClick={() => removeStep(index)}
                      className="absolute top-0 right-0 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <MdDelete />
                    </button>
                  )}
                </>
              ) : (
                <>
                  <h3
                    className="text-lg font-semibold mb-3"
                    style={{ color: color }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.content}</p>
                  {step.additional && (
                    <p className="text-gray-500 text-xs mt-2 italic">
                      {step.additional}
                    </p>
                  )}
                </>
              )}
            </div>
          );
        })}
        {isEditing && draftSteps.length < 3 && (
          <button
            onClick={addStep}
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors cursor-pointer"
          >
            <MdAddBox size={32} />
            <span className="mt-2 font-semibold">Adicionar novo item</span>
          </button>
        )}
      </div>
    </div>
  );
}
