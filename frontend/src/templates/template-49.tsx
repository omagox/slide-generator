import React from "react";
import type { AgendaProps } from "./types";

export default function Template49({ title, items, preview }: AgendaProps) {
  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: "#1277bc" }}
          >
            <span className="text-white text-2xl">📅</span>
          </div>
          <h2 className="text-xl font-semibold" style={{ color: "#1277bc" }}>
            Agenda da Aula
          </h2>
        </div>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center space-x-6 p-4 bg-gray-50 rounded-lg"
            >
              <div
                className="w-16 h-16 rounded-lg flex flex-col items-center justify-center text-white font-bold"
                style={{
                  backgroundColor: index % 2 === 0 ? "#1277bc" : "#ab1551",
                }}
              >
                <span className="text-xs">TEMPO</span>
                <span className="text-sm">{item.time}</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-black mb-1">
                  {item.topic}
                </h3>
                {item.description && (
                  <p className="text-gray-600 text-sm">{item.description}</p>
                )}
              </div>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold"
                style={{
                  backgroundColor: index % 2 === 0 ? "#ab1551" : "#1277bc",
                }}
              >
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
