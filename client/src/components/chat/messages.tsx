import React from "react";
import { Message } from "../../types";


interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps): JSX.Element => {
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
    </div>
  );
};
