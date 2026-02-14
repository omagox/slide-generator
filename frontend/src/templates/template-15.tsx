import { useState } from "react";
import { EditActions } from "../components/templateActionButtons";
import type { TableProps } from "./types";
import { MdDelete, MdAddBox } from "react-icons/md";

type EditableTableProps = Partial<TableProps> & {
  onSave?: (data: Pick<TableProps, "title" | "rows">) => void;
};

const defaults: TableProps = {
  title: "Título padrão",
  rows: [
    { topic: "Tópico 1", details: "Detalhes do tópico 1" },
    { topic: "Tópico 2", details: "Detalhes do tópico 2" },
    { topic: "Tópico 3", details: "Detalhes do tópico 3" },
  ],
  preview: false,
};

export default function Template15(props: EditableTableProps) {
  const { onSave, ...rest } = props;
  const { title, rows, preview } = { ...defaults, ...rest };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftRows, setDraftRows] = useState(rows);

  function handleSave() {
    setIsEditing(false);
    onSave?.({ title: draftTitle, rows: draftRows });
  }

  const handleRowChange = (
    index: number,
    field: keyof (typeof rows)[0],
    value: string,
  ) => {
    const newRows = [...draftRows];
    newRows[index] = { ...newRows[index], [field]: value };
    setDraftRows(newRows);
  };

  const addRow = () => {
    setDraftRows([...draftRows, { topic: "Novo Tópico", details: "Novos detalhes" }]);
  };

  const removeRow = (index: number) => {
    const newRows = draftRows.filter((_, i) => i !== index);
    setDraftRows(newRows);
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

      {isEditing && draftRows.length < 5 && (
        <button
          onClick={addRow}
          className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors cursor-pointer z-10"
        >
          <MdAddBox className="translate-y-px" />
          Adicionar novo item
        </button>
      )}

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

      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 text-left text-black font-semibold w-1/3">
                  Tópico
                </th>
                <th
                  className="p-4 text-center font-semibold"
                  style={{ color: "#1277bc" }}
                >
                  Detalhes
                </th>
                {isEditing && <th className="w-10"></th>}
              </tr>
            </thead>
            <tbody>
              {draftRows.map((row, index) => (
                <tr
                  key={index}
                  className={`border-t group ${index % 2 === 1 ? "bg-gray-50" : ""}`}
                >
                  <td
                    className="p-4 font-semibold"
                    style={{ color: index % 2 === 0 ? "#1277bc" : "#58a3a1" }}
                  >
                    {isEditing ? (
                      <input
                        value={row.topic}
                        onChange={(e) =>
                          handleRowChange(index, "topic", e.target.value)
                        }
                        className="w-full bg-transparent outline-none border border-transparent hover:border-gray-300 cursor-text"
                      />
                    ) : (
                      row.topic
                    )}
                  </td>
                  <td className="p-4 text-center text-gray-600">
                    {isEditing ? (
                      <textarea
                        value={row.details}
                        onChange={(e) =>
                          handleRowChange(index, "details", e.target.value)
                        }
                        className="w-full bg-transparent outline-none border border-transparent hover:border-gray-300 cursor-text resize-none text-center"
                        rows={1}
                      />
                    ) : (
                      row.details
                    )}
                  </td>
                  {isEditing && (
                    <td className="p-2 text-center">
                      {draftRows.length > 1 && (
                        <button
                          onClick={() => removeRow(index)}
                          className="text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          title="Remover item"
                        >
                          <MdDelete />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
