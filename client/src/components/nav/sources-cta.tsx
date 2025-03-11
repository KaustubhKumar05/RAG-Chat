import React from "react";
import { Plus } from "lucide-react";

interface SourcesButtonProps {
  onClick: () => void;
}

export const SourcesButton = ({ onClick }: SourcesButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
    >
      <Plus size={20} />
      Add Sources
    </button>
  );
};