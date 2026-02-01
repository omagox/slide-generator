import type { AddSlideModalProps } from "../types/global";

const AddSlideModal = ({
  isOpen,
  onClose,
  slide,
  handleAddQuestionSlide,
  handleAddImageSlide,
}: AddSlideModalProps) => {
  if (!isOpen) return null;

  const hasQuestion = slide?.question != null;
  const hasImage = slide?.image != null && slide.image !== "";

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-slide-modal-title"
    >
      <div
        className="bg-white rounded-xl shadow-md p-6 max-w-sm w-full mx-4 border border-slate-300"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="add-slide-modal-title"
          className="text-2xl font-semibold text-slate-800 mb-4"
        >
          Adicionar slide
        </h2>
        <p className="text-slate-700 text mb-4">
          Quais das opções abaixo você deseja adicionar como novo slide?
        </p>
        <div className="flex flex-col gap-2">
          {hasQuestion && (
            <button
              type="button"
              className="py-2.5 px-4 cursor-pointer rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors outline-none"
              onClick={handleAddQuestionSlide}
            >
              Slide de questão
            </button>
          )}
          {hasImage && (
            <button
              type="button"
              disabled
              className="py-2.5 px-4 cursor-not-allowed opacity-40 rounded-lg bg-slate-800 text-white font-medium focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors outline-none"
              onClick={handleAddImageSlide}
            >
              Slide de imagem (Indisponível)
            </button>
          )}
        </div>
        <hr className="text-gray-200 mt-4"/>
        <button
          type="button"
          className="mt-4 w-full py-2 cursor-pointer rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors outline-none"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default AddSlideModal;
