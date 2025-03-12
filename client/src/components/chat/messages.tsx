import React, { memo, useRef, useEffect } from "react";
import useChatStore from "../../store";

export const ChatMessages = memo((): JSX.Element => {
  const { messages, fetchingResponse } = useChatStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, fetchingResponse]);

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-3 ${
              message.sender === "user"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-800"
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
      {fetchingResponse && (
        <div className="mt-4 bg-blue-50 p-3 w-fit">Thinking...</div>
      )}
      <div ref={bottomRef} className="h-1" />
    </div>
  );
});
