import React, { memo, useRef } from "react";
import { Send } from "lucide-react";
import useChatStore from "../../store";

export const ChatInput = memo((): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setMessages, fetchingResponse, setFetchingResponse, sourceList } =
    useChatStore();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const message = inputRef.current?.value || "";
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
    if (message.trim()) {
      const content = message.trim();
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
      setFetchingResponse(true);
      const resp = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      });

      if (!resp.ok) {
        throw Error("Could not get response from the model");
      }
      const data = await resp.json();
      setFetchingResponse(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          content: data.response,
          sender: "assistant",
        },
      ]);
    }
  };

  return (
    <form onSubmit={async (e) => await handleSubmit(e)} className="flex gap-2">
      <div className="flex-1">
        <input
          type="text"
          ref={inputRef}
          disabled={fetchingResponse}
          className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
          placeholder="Type your message..."
        />
      </div>
      <button
        disabled={fetchingResponse}
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        <Send size={20} />
      </button>
    </form>
  );
});
