import React from "react";
import type { TableProps } from "./types";

const defaults: TableProps = {
  title: "Título padrão",
  rows: [
    { topic: "Tópico 1", details: "Detalhes do tópico 1" },
    { topic: "Tópico 2", details: "Detalhes do tópico 2" },
    { topic: "Tópico 3", details: "Detalhes do tópico 3" },
  ],
  preview: false,
};

export default function Template15(props: Partial<TableProps>) {
  const { title, rows, preview } = { ...defaults, ...props };

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 text-left text-black font-semibold">
                  Tópico
                </th>
                <th
                  className="p-4 text-center font-semibold"
                  style={{ color: "#1277bc" }}
                >
                  Detalhes
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className={`border-t ${index % 2 === 1 ? "bg-gray-50" : ""}`}
                >
                  <td
                    className="p-4 font-semibold"
                    style={{ color: index % 2 === 0 ? "#1277bc" : "#58a3a1" }}
                  >
                    {row.topic}
                  </td>
                  <td className="p-4 text-center text-gray-600">
                    {row.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
