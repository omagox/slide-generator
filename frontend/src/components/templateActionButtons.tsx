import { useSlideGeneration } from "../contexts/SlideGenerationContext";

type EditActionsProps = {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
};

export function EditActions({ isEditing, onEdit, onSave }: EditActionsProps) {
  const { isFullscreen } = useSlideGeneration();

  if (isFullscreen) return null;

  return (
    <div className="absolute top-2 right-2 flex gap-2">
      {!isEditing ? (
        <button
          onClick={onEdit}
          className="px-3 py-1 text-sm bg-slate-800 text-white rounded-md"
        >
          Editar
        </button>
      ) : (
        <button
          onClick={onSave}
          className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-md"
        >
          Salvar
        </button>
      )}
    </div>
  );
}
