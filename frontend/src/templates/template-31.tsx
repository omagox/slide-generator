import React from "react";
import type { ComparisonProps } from "./types";

const defaultComparisonItem = {
  title: "Título do item",
  characteristics: ["Característica 1", "Característica 2"],
};

const defaultComparisonProps: ComparisonProps = {
  title: "Título padrão",
  items: [defaultComparisonItem, defaultComparisonItem],
  preview: false,
};

export default function Template31(props: Partial<ComparisonProps>) {
  const {
    title,
    items = [],
    preview,
  } = {
    ...defaultComparisonProps,
    ...props,
  };

  const safeItems = items.map((item) => ({
    ...defaultComparisonItem,
    ...item,
    characteristics: item.characteristics?.length
      ? item.characteristics
      : defaultComparisonItem.characteristics,
  }));

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : undefined }}
      className="w-full aspect-video bg-white p-8 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        {title}
      </h1>
      <div className="grid grid-cols-2 gap-8">
        {safeItems.slice(0, 2).map((item, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg">
            <h2
              className="text-xl font-semibold mb-4 text-center"
              style={{ color: index === 0 ? "#1277bc" : "#58a3a1" }}
            >
              {item.title}
            </h2>
            <div className="space-y-3">
              {item.characteristics.map((char, charIndex) => (
                <div key={charIndex} className="flex items-center space-x-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: index === 0 ? "#1277bc" : "#58a3a1",
                    }}
                  ></div>
                  <span className="text-gray-700">{char}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
