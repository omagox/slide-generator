// Template fixo utilizado especificamente para mostrar questões geradas

import { useSlideGeneration } from "../contexts/SlideGenerationContext";
import { useState } from "react";
import { MdAddBox, MdDelete } from "react-icons/md";
import { EditActions } from "../components/templateActionButtons";
import type { OptionalQuestionProps } from "./types";

type SafeOptionalQuestionProps = Partial<OptionalQuestionProps> & {
  slideIndex: number;
};

const defaultValues: OptionalQuestionProps = {
  statement: "Enunciado da questão",
  options: ["Opção A", "Opção B", "Opção C", "Opção D"],
  preview: false,
};

const MAX_OPTIONS = 4;
const OPTION_LETTERS = ["A", "B", "C", "D"];

export default function Template54(props: SafeOptionalQuestionProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const { statement, options, preview } = {
    ...defaultValues,
    ...rest,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftStatement, setDraftStatement] = useState(statement);
  const [draftOptions, setDraftOptions] = useState(
    options?.length ? [...options] : [...defaultValues.options],
  );

  const handleSave = () => {
    setIsEditing(false);
    handleUpdateSlide(slideIndex, {
      statement: draftStatement,
      options: draftOptions,
    });
  };

  const addOption = () => {
    if (draftOptions.length < MAX_OPTIONS) {
      setDraftOptions([
        ...draftOptions,
        `Nova opção ${OPTION_LETTERS[draftOptions.length]}`,
      ]);
    }
  };

  const removeOption = (index: number) => {
    if (draftOptions.length > 1) {
      setDraftOptions(draftOptions.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...draftOptions];
    newOptions[index] = value;
    setDraftOptions(newOptions);
  };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="relative w-full aspect-video bg-white p-8 rounded-lg shadow-lg flex flex-col overflow-hidden"
    >
      <EditActions
        isEditing={isEditing}
        onEdit={() => setIsEditing(true)}
        onSave={handleSave}
      />

      <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full">
        <span className="text-sm font-medium text-gray-500 mb-1">
          Atividade
        </span>

        {isEditing ? (
          <textarea
            value={draftStatement}
            onChange={(e) => setDraftStatement(e.target.value)}
            className="w-full text-2xl font-semibold text-black mb-4 leading-9 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
            rows={2}
          />
        ) : (
          <h2 className="text-2xl font-semibold text-black mb-4 leading-9">
            {draftStatement}
          </h2>
        )}

        <div className="relative">
          <ul className="space-y-3">
            {draftOptions.map((option, index) => (
              <li
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg border border-gray-200 group relative"
              >
                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-semibold text-gray-700 text-xs pb-0.5 shrink-0">
                  {OPTION_LETTERS[index]}
                </span>
                {isEditing ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="flex-1 text-gray-800 text-sm outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                    />
                    {draftOptions.length > 2 && (
                      <button
                        onClick={() => removeOption(index)}
                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Remover opção"
                      >
                        <MdDelete size={16} />
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-800 text-sm">{option}</p>
                )}
              </li>
            ))}
            {isEditing && draftOptions.length < MAX_OPTIONS && (
              <button
                onClick={addOption}
                className="flex items-center justify-center gap-2 p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors cursor-pointer"
              >
                <MdAddBox  />
                <span className="text-sm font-semibold">Adicionar nova alternativa</span>
              </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
