import { useState } from "react";
import { EditActions } from "../components/templateActionButtons";
import type { ExampleProps } from "./types";

import { MdDelete, MdAddBox } from "react-icons/md";

type EditableExampleProps = Partial<ExampleProps> & {
  onSave?: (data: Pick<ExampleProps, "title" | "concept" | "examples">) => void;
};

const defaultExampleItem = {
  title: "Título do exemplo",
  description: "Descrição do exemplo",
};

const defaultExampleProps: ExampleProps = {
  title: "Título padrão",
  concept: "Conceito padrão",
  examples: [defaultExampleItem],
  preview: false,
};

export default function Template30(props: EditableExampleProps) {
  const { onSave, ...rest } = props;
  const {
    title,
    concept,
    examples = [],
    preview,
  } = {
    ...defaultExampleProps,
    ...rest,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftConcept, setDraftConcept] = useState(concept);
  const [draftExamples, setDraftExamples] = useState(
    examples.map((ex) => ({ ...defaultExampleItem, ...ex })),
  );

  function handleSave() {
    setIsEditing(false);
    onSave?.({
      title: draftTitle,
      concept: draftConcept,
      examples: draftExamples,
    });
  }

  const handleExampleChange = (
    index: number,
    field: keyof typeof defaultExampleItem,
    value: string,
  ) => {
    const newExamples = [...draftExamples];
    newExamples[index] = { ...newExamples[index], [field]: value };
    setDraftExamples(newExamples);
  };

  const addExample = () => {
    setDraftExamples([...draftExamples, { ...defaultExampleItem }]);
  };

  const removeExample = (index: number) => {
    const newExamples = draftExamples.filter((_, i) => i !== index);
    setDraftExamples(newExamples);
  };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : undefined }}
      className="relative w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
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
          className="w-full text-3xl font-bold text-black mb-3 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
        />
      ) : (
        <h1 className="text-3xl font-bold text-black mb-3 text-center">
          {draftTitle}
        </h1>
      )}

      <div className="text-center mb-4">
        {isEditing ? (
          <input
            value={draftConcept}
            onChange={(e) => setDraftConcept(e.target.value)}
            className="w-full text-sm font-semibold text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
            style={{ color: "#757575" }}
          />
        ) : (
          <h2 className="text-sm font-semibold" style={{ color: "#757575" }}>
            {draftConcept}
          </h2>
        )}
      </div>

      {isEditing && draftExamples.length < 4 && (
        <button
          onClick={addExample}
          className="absolute top-2 left-2  flex items-center gap-1.5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors cursor-pointer"
        >
          <MdAddBox className="translate-y-px" />
          Adicionar novo exemplo
        </button>
      )}

      <div className="grid grid-cols-2 gap-4">
        {draftExamples.slice(0, 4).map((example, index) => (
          <div
            key={index}
            className="relative bg-gray-50 p-5 rounded-lg border-l-4 group"
            style={{ borderLeftColor: index % 2 === 0 ? "#1277bc" : "#58a3a1" }}
          >
            {isEditing && draftExamples.length > 1 && (
              <button
                onClick={() => removeExample(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Remover exemplo"
              >
                <MdDelete />
              </button>
            )}
            {isEditing ? (
              <>
                <input
                  value={example.title}
                  onChange={(e) =>
                    handleExampleChange(index, "title", e.target.value)
                  }
                  className="w-full text-lg font-semibold mb-3 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                  style={{ color: index % 2 === 0 ? "#1277bc" : "#58a3a1" }}
                />
                <textarea
                  value={example.description}
                  onChange={(e) =>
                    handleExampleChange(index, "description", e.target.value)
                  }
                  className="w-full text-gray-600 outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                  rows={2}
                />
              </>
            ) : (
              <>
                <h3
                  className="text-lg font-semibold mb-3"
                  style={{ color: index % 2 === 0 ? "#1277bc" : "#58a3a1" }}
                >
                  Exemplo {index + 1}: {example.title}
                </h3>
                <p className="text-gray-600">{example.description}</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
