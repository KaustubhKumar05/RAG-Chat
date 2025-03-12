import React, { memo, useState } from "react";
import useChatStore from "../../store";
import { SourcesButton } from "./sources-cta";
import { SourcesModal } from "./sources-modal";
import { SourcesPopover } from "./sources-popover";
import { SourcesPopoverButton } from "./sources-popover-cta";

export const Nav = memo(() => {
  const { setIsSourceModalOpen } = useChatStore();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className="flex justify-end p-4 gap-2 bg-white border-b">
      <SourcesModal />
      <div className="flex flex-col items-center">
        <SourcesPopoverButton
          isOpen={isPopoverOpen}
          onClick={() => setIsPopoverOpen((prev) => !prev)}
        />
        <SourcesPopover
          onClose={() => setIsPopoverOpen(false)}
          isOpen={isPopoverOpen}
        />
      </div>
      <SourcesButton onClick={() => setIsSourceModalOpen(true)} />
    </div>
  );
});
