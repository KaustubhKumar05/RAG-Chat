from typing import List
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
        self.vector_store = InMemoryVectorStore(self.embeddings)

        self.memory = ConversationBufferMemory(
            memory_key="chat_history", return_messages=True
        )

        self.chain = ConversationalRetrievalChain.from_llm(
            llm=ChatOpenAI(
                model_name="gpt-4-turbo",
                temperature=0.7,
                openai_api_key=settings.openai_api_key,
            ),
            retriever=self.vector_store.as_retriever(),
            memory=self.memory,
        )

    async def chat(self, message: str) -> str:
        response = await self.chain.ainvoke({"question": message})
        return response["answer"]

    def add_texts(self, texts: List[str]) -> None:
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=2000,
            chunk_overlap=300,
            separators=["\n\n", "\n", " ", ""],
        )

        chunks = []
        for text in texts:
            doc_chunks = text_splitter.split_text(text)
            chunks.extend(doc_chunks)

        self.vector_store.add_texts(chunks)
