import { useSlideGeneration } from "../contexts/SlideGenerationContext";

import { MdEdit, MdCheck } from "react-icons/md";

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
          className="p-1.5! text-sm bg-slate-800 text-white rounded-md cursor-pointer"
        >
          <MdEdit className="w-3! h-3! pb-px" />
        </button>
      ) : (
        <button
          onClick={onSave}
          className="p-1.5! text-sm bg-emerald-600 text-white rounded-md cursor-pointer"
        >
          <MdCheck className="w-3! h-3! pb-px" />
        </button>
      )}
    </div>
  );
}
