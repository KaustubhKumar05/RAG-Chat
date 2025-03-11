from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from rag_handler import RAGHandler
from web_crawler import WebCrawler
from models import ChatMessage, SourceURL

app = FastAPI()
rag = RAGHandler()
crawler = WebCrawler()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Add env var here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "RAG Chat API is running"}


@app.post("/chat")
async def chat(message: ChatMessage):
    try:
        response = await rag.chat(message.message)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/upload")
async def upload_source(source: SourceURL):
    try:
        pages = await crawler.crawl(source.url, source.max_pages)
        texts = [page.content for page in pages]
        rag.add_texts(texts)
        return {
            "message": f"Successfully processed {len(texts)} pages",
            "urls": [page.url for page in pages],
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
