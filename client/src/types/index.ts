export type Message = {
  id: string | number;
  content: string;
  sender: "user" | "assistant";
};

export type Source = {
  id: string;
  name: string;
  url: string;
};
