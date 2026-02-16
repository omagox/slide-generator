import { useSlideGeneration } from "../contexts/SlideGenerationContext";
import { useState } from "react";
import { MdAddBox, MdDelete } from "react-icons/md";
import { EditActions } from "../components/templateActionButtons";
import type { TimelineProps } from "./types";

const defaultStepItem = {
  title: "Título do passo",
  description: "Descrição do passo",
};

const defaultTimelineProps: TimelineProps = {
  title: "Título padrão",
  steps: [defaultStepItem, defaultStepItem, defaultStepItem],
  content: "Conteúdo adicional opcional",
  preview: false,
};

type EditableProps = Partial<TimelineProps> & {
  slideIndex: number;
};

export default function Template50(props: EditableProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const { title, steps, content, preview } = {
    ...defaultTimelineProps,
    ...rest,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftContent, setDraftContent] = useState(content || "");
  const [draftSteps, setDraftSteps] = useState(
    steps.map((step) => ({ ...defaultStepItem, ...step })),
  );

  const handleSave = () => {
    setIsEditing(false);
    handleUpdateSlide(slideIndex, {
      title: draftTitle,
      steps: draftSteps,
      content: draftContent,
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

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-300"></div>
          <div className="space-y-8">
            {draftSteps.slice(0, 4).map((step, index) => {
              const color = colors[index % colors.length];
              return (
                <div
                  key={index}
                  className="relative flex items-start space-x-6 group"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl relative z-10 shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-3 relative">
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
                          value={step.description}
                          onChange={(e) =>
                            updateStep(index, "description", e.target.value)
                          }
                          className="w-full text-gray-600 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                          rows={1}
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
                        <p className="text-gray-600">{step.description}</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {(draftContent || isEditing) && (
          <div className="mt-8 text-center bg-gray-50 p-4 rounded-lg">
            {isEditing ? (
              <input
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                placeholder="Conteúdo adicional..."
                className="w-full text-gray-600 italic text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
              />
            ) : (
              <p className="text-gray-600 italic">{draftContent}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
