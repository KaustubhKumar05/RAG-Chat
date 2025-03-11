import React, { useState } from "react";
import { Message } from "../../types";
import { ChatInput } from "./input";
import { ChatMessages } from "./messages";
import { SourcesButton } from "../nav/sources-cta";
import { SourcesModal } from "../nav/sources-modal";

export const ChatLayout = (): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState<boolean>(false);

  const handleSendMessage = async (content: string) => {
    if (!content) {
      return;
    }
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        content,
        sender: "user",
      },
    ]);
    const resp = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: content }),
    });
    console.log({ resp });
    if (!resp.ok) {
      throw Error("Could not get response from the model");
    }
    const data = await resp.json();
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        content: data.response,
        sender: "assistant",
      },
    ]);
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
