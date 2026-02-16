import { useSlideGeneration } from "../contexts/SlideGenerationContext";
import { useState } from "react";
import { MdAddBox, MdDelete } from "react-icons/md";
import { EditActions } from "../components/templateActionButtons";
import type { ProcessProps } from "./types";

const defaultStepItem = {
  title: "Título do passo",
  content: "Descrição do passo",
};

const defaultProcessProps: ProcessProps = {
  title: "Título padrão do processo",
  steps: [
    defaultStepItem,
    defaultStepItem,
    defaultStepItem,
    defaultStepItem,
    defaultStepItem,
  ],
  preview: false,
};

type EditableProps = Partial<ProcessProps> & {
  slideIndex: number;
};

export default function Template35(props: EditableProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
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

  const updateStep = (
    index: number,
    field: "title" | "content",
    value: string,
  ) => {
    const newSteps = [...draftSteps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setDraftSteps(newSteps);
  };

  const colors = [
    "#1277bc",
    "#58a3a1",
    "#6b7280",
    "#1277bc",
    "#58a3a1",
    "#6b7280",
  ];

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

      {isEditing && draftSteps.length < 5 && (
        <button
          onClick={addStep}
          className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors cursor-pointer"
        >
          <MdAddBox />
          Adicionar novo item
        </button>
      )}

      <div className="flex justify-between items-center relative w-full px-4">
        <div className="absolute top-[32px] left-8 right-8 h-2 bg-gray-200 transform -translate-y-1/2 rounded"></div>
        {draftSteps.slice(0, 5).map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center z-10 bg-white px-2 relative group"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 shrink-0"
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              {index + 1}
            </div>
            <div className="text-center max-w-32">
              {isEditing ? (
                <>
                  <input
                    value={step.title}
                    onChange={(e) => updateStep(index, "title", e.target.value)}
                    className="w-full font-semibold text-black mb-1 text-sm text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                  />
                  <textarea
                    value={step.content}
                    onChange={(e) =>
                      updateStep(index, "content", e.target.value)
                    }
                    className="w-full text-gray-600 text-xs text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                    rows={2}
                  />
                  {draftSteps.length > 1 && (
                    <button
                      onClick={() => removeStep(index)}
                      className="absolute -top-2 -right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer bg-white rounded-full shadow-sm p-0.5"
                    >
                      <MdDelete size={16} />
                    </button>
                  )}
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-black mb-2 text-sm">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-xs">{step.content}</p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
