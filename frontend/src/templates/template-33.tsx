import { useSlideGeneration } from "../contexts/SlideGenerationContext";
import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { MdAddBox, MdDelete } from "react-icons/md";
import { EditActions } from "../components/templateActionButtons";
import type { FormulaProps } from "./types";

const defaultVariable = { symbol: "x", meaning: "Significado da variável" };

const defaultFormulaProps: FormulaProps = {
  title: "Título padrão",
  formula: "a + b = c",
  variables: [defaultVariable],
  example: "Exemplo padrão da fórmula",
  preview: false,
};

type EditableProps = Partial<FormulaProps> & {
  slideIndex: number;
};

export default function Template33(props: EditableProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const {
    title,
    formula,
    variables = [],
    example,
    preview,
  } = {
    ...defaultFormulaProps,
    ...rest,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftFormula, setDraftFormula] = useState(formula);
  const [draftExample, setDraftExample] = useState(example || "");
  const [draftVariables, setDraftVariables] = useState(
    variables.length ? [...variables] : [...defaultFormulaProps.variables]
  );

  const handleSave = () => {
    setIsEditing(false);
    handleUpdateSlide(slideIndex, {
      title: draftTitle,
      formula: draftFormula,
      variables: draftVariables,
      example: draftExample,
    });
  };

  const addVariable = () => {
    setDraftVariables([...draftVariables, { symbol: "?", meaning: "Nova variável" }]);
  };

  const removeVariable = (index: number) => {
    setDraftVariables(draftVariables.filter((_, i) => i !== index));
  };

  const updateVariable = (index: number, field: "symbol" | "meaning", value: string) => {
    const newVariables = [...draftVariables];
    newVariables[index] = { ...newVariables[index], [field]: value };
    setDraftVariables(newVariables);
  };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : undefined }}
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
          className="w-full text-3xl font-bold text-black mb-5 text-center outline-none border border-transparent hover:border-gray-300 cursor-text"
        />
      ) : (
        <h1 className="text-3xl font-bold text-black mb-5 text-center">
          {draftTitle}
        </h1>
      )}

      <div className="max-w-4xl mx-auto space-y-4 w-full">
        <div className="text-center bg-gray-50 p-3 pt-2 rounded-lg">
          <h2 className="text-xl font-bold mb-2" style={{ color: "#1277bc" }}>
            Fórmula
          </h2>
          {isEditing ? (
            <input
              value={draftFormula}
              onChange={(e) => setDraftFormula(e.target.value)}
              className="w-full text-2xl font-mono font-bold text-black text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
            />
          ) : (
            <div className="text-2xl font-mono font-bold text-black">
              {draftFormula}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="relative">
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "#58a3a1" }}
            >
              Onde:
            </h3>
            {isEditing && draftVariables.length < 8 && (
              <button
                onClick={addVariable}
                className="absolute top-0 right-0 flex items-center gap-1.5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors cursor-pointer"
              >
                <MdAddBox />
                Adicionar novo item
              </button>
            )}
            <div className="space-y-2">
              {draftVariables.map((variable, index) => (
                <div key={index} className="flex items-center space-x-2 group">
                  {isEditing ? (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        value={variable.symbol}
                        onChange={(e) => updateVariable(index, "symbol", e.target.value)}
                        className="w-12 font-mono font-bold text-sm text-center outline-none border border-transparent hover:border-gray-300 cursor-text"
                        style={{ color: "#58a3a1" }}
                      />
                      <FiArrowRight className="text-[#58a3a1] shrink-0" />
                      <input
                        value={variable.meaning}
                        onChange={(e) => updateVariable(index, "meaning", e.target.value)}
                        className="flex-1 text-gray-700 text-xs outline-none border border-transparent hover:border-gray-300 cursor-text"
                      />
                      {draftVariables.length > 1 && (
                        <button
                          onClick={() => removeVariable(index)}
                          className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <MdDelete />
                        </button>
                      )}
                    </div>
                  ) : (
                    <>
                      <span
                        className="font-mono font-bold text-sm"
                        style={{ color: "#58a3a1" }}
                      >
                        {variable.symbol}
                      </span>
                      <FiArrowRight className="text-[#58a3a1]" />
                      <span className="text-gray-700 text-xs">
                        {variable.meaning}
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3
              className="text-lg font-semibold mb-1"
              style={{ color: "#1277bc" }}
            >
              Exemplo
            </h3>
            {isEditing ? (
              <textarea
                value={draftExample}
                onChange={(e) => setDraftExample(e.target.value)}
                className="w-full text-gray-700 text-sm outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                rows={4}
              />
            ) : (
              <p className="text-gray-700 text-sm">{draftExample}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
