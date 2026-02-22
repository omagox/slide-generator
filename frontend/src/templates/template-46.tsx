import { useSlideGeneration } from "../contexts/SlideGenerationContext";
import { useState } from "react";
import { MdAddBox, MdDelete } from "react-icons/md";
import { EditActions } from "../components/templateActionButtons";
import type { ComparisonProps } from "./types";

const defaultComparisonItem = {
  title: "Título do item",
  characteristics: ["Característica 1", "Característica 2", "Característica 3"],
};

const defaultComparisonProps: ComparisonProps = {
  title: "Título padrão",
  items: [defaultComparisonItem, defaultComparisonItem, defaultComparisonItem],
  preview: false,
};

type EditableProps = Partial<ComparisonProps> & {
  slideIndex: number;
};

export default function Template46(props: EditableProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const { title, items, preview } = {
    ...defaultComparisonProps,
    ...rest,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftItems, setDraftItems] = useState(
    items.map((item) => ({
      ...defaultComparisonItem,
      ...item,
      characteristics: item.characteristics?.length
        ? [...item.characteristics]
        : [...defaultComparisonItem.characteristics],
    }))
  );

  const handleSave = () => {
    setIsEditing(false);
    handleUpdateSlide(slideIndex, {
      title: draftTitle,
      items: draftItems,
    });
  };

  const addCharacteristic = (itemIndex: number) => {
    const newItems = [...draftItems];
    newItems[itemIndex].characteristics.push("Nova característica");
    setDraftItems(newItems);
  };

  const removeCharacteristic = (itemIndex: number, charIndex: number) => {
    const newItems = [...draftItems];
    newItems[itemIndex].characteristics = newItems[itemIndex].characteristics.filter(
      (_, i) => i !== charIndex
    );
    setDraftItems(newItems);
  };

  const updateCharacteristic = (itemIndex: number, charIndex: number, value: string) => {
    const newItems = [...draftItems];
    newItems[itemIndex].characteristics[charIndex] = value;
    setDraftItems(newItems);
  };

  const updateItemTitle = (itemIndex: number, value: string) => {
    const newItems = [...draftItems];
    newItems[itemIndex].title = value;
    setDraftItems(newItems);
  };

  const colors = ["#1277bc", "#58a3a1", "#6b7280"];

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

      <div className="flex justify-center">
        <div className="max-w-5xl w-full">
          <div className="grid grid-cols-3 gap-8">
            {draftItems.slice(0, 3).map((item, index) => {
              const color = colors[index % colors.length];
              return (
                <div key={index} className="text-center relative group">
                  <div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl shrink-0"
                    style={{ backgroundColor: color }}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  {isEditing ? (
                    <input
                      value={item.title}
                      onChange={(e) => updateItemTitle(index, e.target.value)}
                      className="w-full text-xl font-semibold mb-4 text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                      style={{ color: color }}
                    />
                  ) : (
                    <h2
                      className="text-xl font-semibold mb-4"
                      style={{ color: color }}
                    >
                      {item.title}
                    </h2>
                  )}
                  <div className="space-y-2">
                    {item.characteristics.map((char, charIndex) => (
                      <div
                        key={charIndex}
                        className="p-2 bg-gray-50 rounded text-sm text-gray-700 flex items-center gap-2 group/char"
                      >
                        {isEditing ? (
                          <>
                            <input
                              value={char}
                              onChange={(e) => updateCharacteristic(index, charIndex, e.target.value)}
                              className="flex-1 text-sm text-center outline-none border border-transparent hover:border-gray-300 cursor-text bg-transparent"
                            />
                            {item.characteristics.length > 1 && (
                              <button
                                onClick={() => removeCharacteristic(index, charIndex)}
                                className="text-red-500 opacity-0 group-hover/char:opacity-100 transition-opacity cursor-pointer"
                              >
                                <MdDelete size={14} />
                              </button>
                            )}
                          </>
                        ) : (
                          <span className="w-full">{char}</span>
                        )}
                      </div>
                    ))}
                    {isEditing && item.characteristics.length < 5 && (
                      <button
                        onClick={() => addCharacteristic(index)}
                        className="mt-2 flex items-center justify-center gap-1.5 w-full py-1 border border-dashed border-gray-300 rounded text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors cursor-pointer text-xs"
                      >
                        <MdAddBox />
                        Adicionar novo item
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
