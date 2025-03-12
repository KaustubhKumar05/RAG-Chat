import { create } from "zustand";
import { Message, Source } from "../types";

type ChatStore = {
  messages: Message[];
  setMessages: (messages: Message[] | ((prev: Message[]) => Message[])) => void;
  sources: Source[];
  setSources: (sources: Source[]) => void;
  isSourceModalOpen: boolean;
  setIsSourceModalOpen: (open: boolean) => void;
  fetchingResponse: boolean;
  setFetchingResponse: (fetching: boolean) => void;
};

const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  setMessages: (newMessages: Message[] | ((prev: Message[]) => Message[])) =>
    set((state) => ({
      messages: typeof newMessages === 'function' ? newMessages(state.messages) : newMessages
    })),
  sources: [],
  setSources: (newSources: Source[]) => set({ sources: newSources }),
  isSourceModalOpen: false,
  setIsSourceModalOpen: (open: boolean) => set({ isSourceModalOpen: open }),
  fetchingResponse: false,
  setFetchingResponse: (fetching: boolean) => set({ fetchingResponse: fetching }),
}));

export default useChatStore;
