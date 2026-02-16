import { useSlideGeneration } from "../contexts/SlideGenerationContext";
import { useState } from "react";
import { MdAddBox, MdDelete } from "react-icons/md";
import { EditActions } from "../components/templateActionButtons";
import type { CaseStudyProps } from "./types";

const defaultCaseStudyProps: CaseStudyProps = {
  title: "Título padrão",
  scenario: "Descrição do cenário padrão",
  questions: ["Questão 1", "Questão 2"],
  preview: false,
};

type EditableProps = Partial<CaseStudyProps> & {
  slideIndex: number;
};

export default function Template32(props: EditableProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const {
    title,
    scenario,
    questions = [],
    preview,
  } = {
    ...defaultCaseStudyProps,
    ...rest,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftScenario, setDraftScenario] = useState(scenario);
  const [draftQuestions, setDraftQuestions] = useState(
    questions.length ? [...questions] : [...defaultCaseStudyProps.questions]
  );

  const handleSave = () => {
    setIsEditing(false);
    handleUpdateSlide(slideIndex, {
      title: draftTitle,
      scenario: draftScenario,
      questions: draftQuestions,
    });
  };

  const addQuestion = () => {
    setDraftQuestions([...draftQuestions, "Nova questão"]);
  };

  const removeQuestion = (index: number) => {
    setDraftQuestions(draftQuestions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, value: string) => {
    const newQuestions = [...draftQuestions];
    newQuestions[index] = value;
    setDraftQuestions(newQuestions);
  };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : undefined }}
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
          className="w-full text-3xl font-bold text-black mb-8 text-center outline-none border border-transparent hover:border-gray-300 cursor-text"
        />
      ) : (
        <h1 className="text-3xl font-bold text-black mb-8 text-center">
          {draftTitle}
        </h1>
      )}

      <div className="space-y-6">
        <div
          className="bg-gray-50 p-6 rounded-lg border-l-4"
          style={{ borderLeftColor: "#1277bc" }}
        >
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "#1277bc" }}
          >
            Cenário
          </h2>
          {isEditing ? (
            <textarea
              value={draftScenario}
              onChange={(e) => setDraftScenario(e.target.value)}
              className="w-full text-gray-700 leading-relaxed outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
              rows={3}
            />
          ) : (
            <p className="text-gray-700 leading-relaxed">{draftScenario}</p>
          )}
        </div>

        <div className="relative">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "#58a3a1" }}
          >
            Questões para Análise
          </h2>
          {isEditing && draftQuestions.length < 3 && (
            <button
              onClick={addQuestion}
              className="absolute top-0 right-0 flex items-center gap-1.5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors cursor-pointer"
            >
              <MdAddBox />
              Adicionar questão
            </button>
          )}
          <div className="space-y-3">
            {draftQuestions.map((question, index) => (
              <div key={index} className="flex items-start space-x-3 group">
                <div
                  className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: "#58a3a1" }}
                >
                  {index + 1}
                </div>
                {isEditing ? (
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      value={question}
                      onChange={(e) => updateQuestion(index, e.target.value)}
                      className="flex-1 text-gray-700 outline-none border border-transparent hover:border-gray-300 cursor-text"
                    />
                    {draftQuestions.length > 1 && (
                      <button
                        onClick={() => removeQuestion(index)}
                        className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <MdDelete />
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-700">{question}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
