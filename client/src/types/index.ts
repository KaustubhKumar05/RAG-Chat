export type Message = {
  id: string | number;
  content: string;
  sender: "user" | "assistant";
  // TODO handle images and such
  attachments?: string[]
};

export type Source = {
  id: string;
  name: string;
  url: string;
};
