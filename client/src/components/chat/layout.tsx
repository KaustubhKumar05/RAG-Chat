import React from "react";
import { ChatInput } from "./input";
import { ChatMessages } from "./messages";
import { Nav } from "../nav";

export const ChatLayout = (): JSX.Element => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Nav />
      <div className="flex-1 overflow-y-auto p-4">
        <ChatMessages />
      </div>
      <div className="p-4 bg-white border-t">
        <ChatInput />
      </div>
    </div>
  );
};
