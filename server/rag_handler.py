from typing import List, Dict
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import InMemoryVectorStore
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain
from pydantic import BaseModel
from settings import get_settings


class ChatMessage(BaseModel):
    message: str


class RAGHandler:
    def __init__(self):
        settings = get_settings()
        self.embeddings = OpenAIEmbeddings(openai_api_key=settings.openai_api_key)
        self.user_stores: Dict[str, InMemoryVectorStore] = {}
        self.user_memories: Dict[str, ConversationBufferMemory] = {}
        self.user_chains: Dict[str, ConversationalRetrievalChain] = {}
        self.user_sources: Dict[str, List[str]] = {}

    def _get_or_create_user_resources(self, user_id: str):
        if user_id not in self.user_stores:
            self.user_stores[user_id] = InMemoryVectorStore(self.embeddings)
            self.user_memories[user_id] = ConversationBufferMemory(
                memory_key="chat_history", return_messages=True
            )
            self.user_chains[user_id] = ConversationalRetrievalChain.from_llm(
                llm=ChatOpenAI(
                    model_name="gpt-4-turbo",
                    temperature=0.7,
                    openai_api_key=get_settings().openai_api_key,
                ),
                retriever=self.user_stores[user_id].as_retriever(),
                memory=self.user_memories[user_id],
            )

    async def chat(self, message: str, user_id: str) -> str:
        self._get_or_create_user_resources(user_id)
        response = await self.user_chains[user_id].ainvoke({"question": message})
        return response["answer"]

    def add_texts(self, texts: List[str], user_id: str, name: str) -> None:
        self._get_or_create_user_resources(user_id)
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=2000,
            chunk_overlap=300,
            separators=["\n\n", "\n", " ", ""],
        )
        if user_id not in self.user_sources:
            self.user_sources[user_id] = []

        self.user_sources[user_id].append(name)

        chunks = []
        for text in texts:
            doc_chunks = text_splitter.split_text(text)
            chunks.extend(doc_chunks)

        self.user_stores[user_id].add_texts(chunks)

    def get_sources(self, user_id: str) -> List[str]:
        return self.user_sources.get(user_id, [])
