import { useState } from "react";
import type { AddSlideModalProps } from "../types/global";
import componentsMap from "../templates/templatesMap";

const AddSlideModal = ({
  isOpen,
  onClose,
  onAddSlide,
}: AddSlideModalProps) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(
    null,
  );

  if (!isOpen) return null;

  const templates = Object.keys(componentsMap)
    .sort((a, b) => {
      const idA = parseInt(a.replace("Template", ""));
      const idB = parseInt(b.replace("Template", ""));
      return idA - idB;
    });

  const handleConfirm = () => {
    if (selectedTemplateId) {
      onAddSlide(selectedTemplateId);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-10000 flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-slide-modal-title"
    >
      <div
        className="bg-white rounded-xl shadow-md p-6 max-w-5xl w-full mx-4 border border-slate-300 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="add-slide-modal-title"
          className="text-2xl font-semibold text-slate-800 mb-4"
        >
          Adicionar novo slide
        </h2>
        <p className="text-slate-700 mb-4">
          Selecione um template para adicionar:
        </p>

        <div className="flex-1 overflow-y-auto min-h-0 pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((key) => {
              const id = parseInt(key.replace("Template", ""));
              const Component = componentsMap[key];
              const isSelected = selectedTemplateId === id;

              return (
                <div
                  key={key}
                  className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                    isSelected
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => setSelectedTemplateId(id)}
                >
                  <div className="aspect-video bg-gray-50 relative overflow-hidden">
                    <div
                      className="absolute inset-0 origin-top-left"
                      style={{
                        transform: "scale(0.25)",
                        width: "400%",
                        height: "400%",
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center p-8">
                        <div className="w-full max-w-5xl aspect-video bg-white shadow-sm flex items-center justify-center">
                           <Component />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
          <button
            type="button"
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors cursor-pointer"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={!selectedTemplateId}
            className={`px-4 py-2 rounded-lg font-medium text-white transition-colors cursor-pointer ${
              selectedTemplateId
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-slate-300 cursor-not-allowed"
            }`}
            onClick={handleConfirm}
          >
            Adicionar Slide
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSlideModal;
