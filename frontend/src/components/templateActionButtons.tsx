type EditActionsProps = {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
};

export function EditActions({ isEditing, onEdit, onSave }: EditActionsProps) {
  return (
    <div className="absolute top-4 right-4 flex gap-2">
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
