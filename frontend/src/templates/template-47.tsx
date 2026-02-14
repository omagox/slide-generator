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
  onSave?: (
    data: Pick<CaseStudyProps, "title" | "scenario" | "questions">,
  ) => void;
};

export default function Template47(props: EditableProps) {
  const { onSave, ...rest } = props;
  const { title, scenario, questions, preview } = {
    ...defaultCaseStudyProps,
    ...rest,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftScenario, setDraftScenario] = useState(scenario);
  const [draftQuestions, setDraftQuestions] = useState([...questions]);

  const handleSave = () => {
    setIsEditing(false);
    onSave?.({
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

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div
            className="bg-gray-50 p-6 rounded-lg border-l-4 h-full"
            style={{ borderLeftColor: "#1277bc" }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0"
                style={{ backgroundColor: "#1277bc" }}
              >
                <span className="text-xl">📖</span>
              </div>
              <h2
                className="text-xl font-semibold"
                style={{ color: "#1277bc" }}
              >
                Cenário
              </h2>
            </div>
            {isEditing ? (
              <textarea
                value={draftScenario}
                onChange={(e) => setDraftScenario(e.target.value)}
                className="w-full text-gray-700 leading-relaxed outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                rows={6}
              />
            ) : (
              <p className="text-gray-700 leading-relaxed">{draftScenario}</p>
            )}
          </div>
        </div>
        <div>
          <div
            className="bg-gray-50 p-6 rounded-lg border-l-4 space-y-4 h-full relative"
            style={{ borderLeftColor: "#58a3a1" }}
          >
            <div className="flex items-center justify-between">
              <h2
                className="text-xl font-semibold"
                style={{ color: "#58a3a1" }}
              >
                Questões
              </h2>
            </div>
            <div className="space-y-3">
              {draftQuestions.map((question, index) => (
                <div key={index} className="flex items-start space-x-2 group">
                  <div
                    className="min-w-5 max-w-5 min-h-5 max-h-5 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0"
                    style={{ backgroundColor: "#58a3a1" }}
                  >
                    {index + 1}
                  </div>
                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-1">
                      <textarea
                        value={question}
                        onChange={(e) => updateQuestion(index, e.target.value)}
                        className="flex-1 text-gray-700 text-sm outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                        rows={1}
                      />
                      {draftQuestions.length > 1 && (
                        <button
                          onClick={() => removeQuestion(index)}
                          className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <MdDelete size={14} />
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-700 text-sm">{question}</p>
                  )}
                </div>
              ))}
              {isEditing && draftQuestions.length < 4 && (
                <button
                  onClick={addQuestion}
                  className="flex items-center justify-center gap-2 p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors cursor-pointer"
                >
                  <MdAddBox />
                  <span className="text-sm font-semibold">Adicionar nova questão</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
