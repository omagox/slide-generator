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
  steps: [defaultStepItem, defaultStepItem],
  preview: false,
};

type EditableProps = Partial<ProcessProps> & {
  slideIndex: number;
};

export default function Template51(props: EditableProps) {
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

      {isEditing && draftSteps.length < 3 && (
        <button
          onClick={addStep}
          className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors cursor-pointer"
        >
          <MdAddBox />
          Adicionar novo item
        </button>
      )}

      <div className="flex justify-center h-[calc(100%-100px)] custom-scrollbar">
        <div className="space-y-6 max-w-3xl w-full">
          {draftSteps.slice(0, 4).map((step, index) => {
            const color = colors[index % colors.length];
            return (
              <div
                key={index}
                className="flex items-start space-x-6 relative group"
              >
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: color }}
                  >
                    {index + 1}
                  </div>
                  {index < draftSteps.length - 1 && index < 3 && (
                    <div
                      className="w-1 h-12 mt-2"
                      style={{ backgroundColor: color }}
                    ></div>
                  )}
                </div>
                <div className="flex-1 pt-2 relative">
                  {isEditing ? (
                    <>
                      <input
                        value={step.title}
                        onChange={(e) =>
                          updateStep(index, "title", e.target.value)
                        }
                        className="w-full text-lg font-semibold mb-2 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                        style={{ color: color }}
                      />
                      <textarea
                        value={step.content}
                        onChange={(e) =>
                          updateStep(index, "content", e.target.value)
                        }
                        className="w-full text-gray-600 mb-2 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                        rows={1}
                      />
                      <input
                        value={step.additional}
                        onChange={(e) =>
                          updateStep(index, "additional", e.target.value)
                        }
                        placeholder="Adicional..."
                        className="w-full text-gray-500 text-sm italic outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
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
                      <p className="text-gray-600 mb-2">{step.content}</p>
                      {step.additional && (
                        <p className="text-gray-500 text-sm italic">
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
    </div>
  );
}
