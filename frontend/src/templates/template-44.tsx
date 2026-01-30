import React from "react";
import type { TwoTopicsProps } from "./types";

export default function Template44({ title, topics, preview }: TwoTopicsProps) {
  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : "" }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="flex items-center justify-between h-64">
        <div
          className="w-5/12 h-full bg-gray-50 rounded-lg p-6 border-l-4"
          style={{ borderLeftColor: "#1277bc" }}
        >
          <h2
            className="text-xl font-semibold mb-4 text-center"
            style={{ color: "#1277bc" }}
          >
            {topics[0]?.title}
          </h2>
          <p className="text-gray-600 text-center">{topics[0]?.content}</p>
        </div>
        <div className="w-2/12 flex justify-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl"
            style={{ backgroundColor: "#ab1551" }}
          >
            VS
          </div>
        </div>
        <div
          className="w-5/12 h-full bg-gray-50 rounded-lg p-6 border-l-4"
          style={{ borderLeftColor: "#ab1551" }}
        >
          <h2
            className="text-xl font-semibold mb-4 text-center"
            style={{ color: "#ab1551" }}
          >
            {topics[1]?.title}
          </h2>
          <p className="text-gray-600 text-center">{topics[1]?.content}</p>
        </div>
      </div>
    </div>
  );
}
