import { useState } from "react";
import { EditActions } from "../components/templateActionButtons";
import type { DefinitionProps } from "./types";
import { MdDelete, MdAddBox } from "react-icons/md";

type EditableDefinitionProps = Partial<DefinitionProps> & {
  onSave?: (data: Pick<DefinitionProps, "title" | "term" | "definition" | "examples">) => void;
};

const defaultDefinitionProps: DefinitionProps = {
  title: "Título padrão",
  term: "Termo padrão",
  definition: "Definição padrão",
  examples: ["Exemplo 1", "Exemplo 2"],
  preview: false,
};

export default function Template28(props: EditableDefinitionProps) {
  const { onSave, ...rest } = props;
  const { title, term, definition, examples, preview } = {
    ...defaultDefinitionProps,
    ...rest,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftTerm, setDraftTerm] = useState(term);
  const [draftDefinition, setDraftDefinition] = useState(definition);
  const [draftExamples, setDraftExamples] = useState(examples || []);

  function handleSave() {
    setIsEditing(false);
    onSave?.({
      title: draftTitle,
      term: draftTerm,
      definition: draftDefinition,
      examples: draftExamples,
    });
  }

  const handleExampleChange = (index: number, value: string) => {
    const newExamples = [...draftExamples];
    newExamples[index] = value;
    setDraftExamples(newExamples);
  };

  const addExample = () => {
    setDraftExamples([...draftExamples, "Novo Exemplo"]);
  };

  const removeExample = (index: number) => {
    const newExamples = draftExamples.filter((_, i) => i !== index);
    setDraftExamples(newExamples);
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

      {isEditing && draftExamples.length < 3 && (
        <button
          onClick={addExample}
          className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors cursor-pointer z-10"
        >
          <MdAddBox className="translate-y-px" />
          Adicionar novo exemplo
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

      <div className="max-w-4xl mx-auto">
        <div
          className="bg-gray-50 p-8 rounded-lg border-l-4"
          style={{ borderLeftColor: "#1277bc" }}
        >
          {isEditing ? (
            <>
              <input
                value={draftTerm}
                onChange={(e) => setDraftTerm(e.target.value)}
                className="w-full text-2xl font-bold mb-2 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                style={{ color: "#1277bc" }}
              />
              <textarea
                value={draftDefinition}
                onChange={(e) => setDraftDefinition(e.target.value)}
                className="w-full text-lg text-gray-700 mb-4 leading-relaxed outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                rows={3}
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2" style={{ color: "#1277bc" }}>
                {draftTerm}
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                {draftDefinition}
              </p>
            </>
          )}

          {(draftExamples.length > 0 || isEditing) && (
            <div>
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: "#58a3a1" }}
              >
                Exemplos:
              </h3>
              <ul className="space-y-2">
                {draftExamples.map((example, index) => (
                  <li key={index} className="flex items-center space-x-2 group">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "#58a3a1" }}
                    ></div>
                    <div className="flex-1 flex items-center gap-2">
                      {isEditing ? (
                        <input
                          value={example}
                          onChange={(e) => handleExampleChange(index, e.target.value)}
                          className="w-full text-gray-600 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                        />
                      ) : (
                        <span className="text-gray-600">{example}</span>
                      )}

                      {isEditing && draftExamples.length > 1 && (
                        <button
                          onClick={() => removeExample(index)}
                          className="text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          title="Remover item"
                        >
                          <MdDelete />
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
