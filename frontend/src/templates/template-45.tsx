import { useState } from "react";
import { MdAddBox, MdDelete } from "react-icons/md";
import { EditActions } from "../components/templateActionButtons";
import type { ExampleProps } from "./types";

const defaultExampleItem = {
  title: "Título do exemplo",
  description: "Descrição do exemplo",
};

const defaultExampleProps: ExampleProps = {
  title: "Título padrão",
  concept: "Conceito Central",
  examples: [defaultExampleItem, defaultExampleItem],
  preview: false,
};

type EditableProps = Partial<ExampleProps> & {
  onSave?: (data: Pick<ExampleProps, "title" | "concept" | "examples">) => void;
};

export default function Template45(props: EditableProps) {
  const { onSave, ...rest } = props;
  const { title, concept, examples, preview } = {
    ...defaultExampleProps,
    ...rest,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftConcept, setDraftConcept] = useState(concept);
  const [draftExamples, setDraftExamples] = useState(
    examples.map((ex) => ({ ...defaultExampleItem, ...ex })),
  );

  const handleSave = () => {
    setIsEditing(false);
    onSave?.({
      title: draftTitle,
      concept: draftConcept,
      examples: draftExamples,
    });
  };

  const addExample = () => {
    setDraftExamples([...draftExamples, { ...defaultExampleItem }]);
  };

  const removeExample = (index: number) => {
    setDraftExamples(draftExamples.filter((_, i) => i !== index));
  };

  const updateExample = (
    index: number,
    field: keyof typeof defaultExampleItem,
    value: string,
  ) => {
    const newExamples = [...draftExamples];
    newExamples[index] = { ...newExamples[index], [field]: value };
    setDraftExamples(newExamples);
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
          className="w-full text-3xl font-bold text-black mb-6 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
        />
      ) : (
        <h1 className="text-3xl font-bold text-black mb-6 text-center">
          {draftTitle}
        </h1>
      )}

      <div className="text-center mb-8">
        {isEditing ? (
          <input
            value={draftConcept}
            onChange={(e) => setDraftConcept(e.target.value)}
            className="inline-block px-6 py-3 rounded-full text-white font-semibold text-lg text-center outline-none border border-transparent hover:border-gray-300 cursor-text"
            style={{ backgroundColor: "#1277bc" }}
          />
        ) : (
          <div
            className="inline-block px-6 py-3 rounded-full text-white font-semibold text-lg"
            style={{ backgroundColor: "#1277bc" }}
          >
            {draftConcept}
          </div>
        )}
      </div>

      {isEditing && draftExamples.length < 4 && (
        <button
          onClick={addExample}
          className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors cursor-pointer"
        >
          <MdAddBox />
          Adicionar novo item
        </button>
      )}

      <div className="grid grid-cols-2 gap-6">
        {draftExamples.slice(0, 4).map((example, index) => {
          const color = colors[index % colors.length];
          return (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-lg relative group"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                  style={{ backgroundColor: color }}
                >
                  {index + 1}
                </div>
                {isEditing ? (
                  <input
                    value={example.title}
                    onChange={(e) =>
                      updateExample(index, "title", e.target.value)
                    }
                    className="w-full text-lg font-semibold outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                    style={{ color: color }}
                  />
                ) : (
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: color }}
                  >
                    {example.title}
                  </h3>
                )}
              </div>
              {isEditing ? (
                <>
                  <textarea
                    value={example.description}
                    onChange={(e) =>
                      updateExample(index, "description", e.target.value)
                    }
                    className="w-full text-gray-600 text-sm outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent resize-none"
                    rows={2}
                  />
                  {draftExamples.length > 1 && (
                    <button
                      onClick={() => removeExample(index)}
                      className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <MdDelete />
                    </button>
                  )}
                </>
              ) : (
                <p className="text-gray-600 text-sm">{example.description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
