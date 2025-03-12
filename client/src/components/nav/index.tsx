import React, { memo } from "react";
import useChatStore from "../../store";
import { SourcesButton } from "./sources-cta";
import { SourcesModal } from "./sources-modal";

export const Nav = memo(() => {
  const { setIsSourceModalOpen } = useChatStore();
  return (
    <div className="flex justify-end p-4 bg-white border-b">
      <SourcesModal />
      <SourcesButton onClick={() => setIsSourceModalOpen(true)} />
    </div>
  );
});
