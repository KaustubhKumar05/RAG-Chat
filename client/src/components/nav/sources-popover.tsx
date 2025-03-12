import React, { useRef } from "react";
import useChatStore from "../../store";
import useClickOutside from "../../hooks/useClickOutside";

export const SourcesPopover = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { sourceList } = useChatStore();
  const popoverRef = useRef<HTMLDivElement>(null);

  useClickOutside(popoverRef, () => {
    if (isOpen) {
      onClose();
    }
  });

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="absolute mt-2 top-14 min-w-44 p-4 bg-white rounded-lg shadow-lg border"
    >
      <div className="flex flex-col gap-2">
        {sourceList.map((source, index) => (
          <div key={index} className="text-sm text-gray-600 capitalize">
            {source}
          </div>
        ))}
      </div>
    </div>
  );
};
