import { useSlideGeneration } from "../contexts/SlideGenerationContext";
import { useState } from "react";
import { MdAddBox, MdDelete } from "react-icons/md";
import { EditActions } from "../components/templateActionButtons";
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

type EditableProps = Partial<ComparisonProps> & {
  slideIndex: number;
};

export default function Template31(props: EditableProps) {
  const { handleUpdateSlide } = useSlideGeneration();
  const { slideIndex, ...rest } = props;
  const {
    title,
    items = [],
    preview,
  } = {
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

  return (
    <div
      style={{ transform: preview ? "scale(0.3)" : undefined }}
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
          className="w-full text-3xl font-bold text-black mb-8 text-center outline-none border border-transparent hover:border-gray-300 cursor-text"
        />
      ) : (
        <h1 className="text-3xl font-bold text-black mb-8 text-center">
          {draftTitle}
        </h1>
      )}

      <div className="grid grid-cols-2 gap-8">
        {draftItems.slice(0, 2).map((item, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg relative group">
            {isEditing ? (
              <input
                value={item.title}
                onChange={(e) => updateItemTitle(index, e.target.value)}
                className="w-full text-xl font-semibold mb-4 text-center outline-none border border-transparent hover:border-gray-300 cursor-text"
                style={{ color: index === 0 ? "#1277bc" : "#58a3a1" }}
              />
            ) : (
              <h2
                className="text-xl font-semibold mb-4 text-center"
                style={{ color: index === 0 ? "#1277bc" : "#58a3a1" }}
              >
                {item.title}
              </h2>
            )}

            <div className="space-y-3">
              {item.characteristics.map((char, charIndex) => (
                <div key={charIndex} className="flex items-center space-x-3 group/char">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{
                      backgroundColor: index === 0 ? "#1277bc" : "#58a3a1",
                    }}
                  ></div>
                  {isEditing ? (
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        value={char}
                        onChange={(e) => updateCharacteristic(index, charIndex, e.target.value)}
                        className="flex-1 text-gray-700 outline-none border border-transparent hover:border-gray-300 cursor-text"
                      />
                      {item.characteristics.length > 1 && (
                        <button
                          onClick={() => removeCharacteristic(index, charIndex)}
                          className="text-red-500 opacity-0 group-hover/char:opacity-100 transition-opacity cursor-pointer"
                        >
                          <MdDelete />
                        </button>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-700">{char}</span>
                  )}
                </div>
              ))}
              {isEditing && item.characteristics.length < 6 && (
                <button
                  onClick={() => addCharacteristic(index)}
                  className="mt-2 flex items-center gap-1.5 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600 transition-colors cursor-pointer"
                >
                  <MdAddBox />
                  Adicionar novo item
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
