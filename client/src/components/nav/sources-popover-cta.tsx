import React from "react";
import useChatStore from "../../store";
import { Info } from "lucide-react";

export const SourcesPopoverButton = ({
  onClick,
  isOpen,
}: {
  onClick: () => void;
  isOpen: boolean;
}) => {
  const { sourceList } = useChatStore();
  const noSourcesPresent = sourceList.length === 0;
  return (
    <button
      onClick={onClick}
      disabled={noSourcesPresent || isOpen}
      className="px-4 py-2 text-sm disabled:cursor-not-allowed flex items-center gap-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
    >
      <Info size={20} />
      {noSourcesPresent ? "No Sources Added" : "View Sources"}
    </button>
  );
};
