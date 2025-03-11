from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "RAG Chat API is running"}

@app.post("/chat")
async def chat():
    # TODO: Implement chat endpoint
    return {"message": "Chat endpoint"}

@app.post("/upload")
async def upload_source():
    # TODO: Implement source upload
    return {"message": "Upload endpoint"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)