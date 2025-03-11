import React, { useState } from "react";
import { Message } from "../../types";
import { ChatInput } from "./input";
import { ChatMessages } from "./messages";
import { SourcesButton } from "../nav/sources-cta";
import { SourcesModal } from "../nav/sources-modal";

export const ChatLayout = (): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState<boolean>(false);

  const handleSendMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        content,
        sender: "user",
      },
    ]);
    // TODO: Implement actual LLM call here
  };

  const handleAddSources = (files: File[], links: string[]) => {
    // TODO: Implement source handling
    setIsSourcesModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex justify-end p-4 bg-white border-b">
        <SourcesButton onClick={() => setIsSourcesModalOpen(true)} />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <ChatMessages messages={messages} />
      </div>
      <div className="p-4 bg-white border-t">
        <ChatInput onSend={handleSendMessage} />
      </div>
      <SourcesModal
        isOpen={isSourcesModalOpen}
        onClose={() => setIsSourcesModalOpen(false)}
        onSubmit={handleAddSources}
      />
    </div>
  );
};
