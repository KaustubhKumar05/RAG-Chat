import { useCallback } from "react";
import { Message, Source } from "../types";

export const useRAG = () => {
  // Add sources
  // Send message
  // Get message
  // Get crawling status

  const sendMessage = useCallback(() => async(message: Message) => {
    const resp = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message.content }),
      });
      if(!resp.ok){
        // error toast, remove last message
      }
  }, []);
  const getStreamedResponse = useCallback(() => () => {}, []);
  const addSource = useCallback(() => (sources: Source[]) => {}, []);

  return {};
};
