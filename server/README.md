# RAG Chat Server

This is the backend server for the RAG Chat application, built with FastAPI and uv.

## Setup

1. Create a virtual environment:
```bash
uv venv;
source .venv/bin/activate;
uv sync;
uvicorn main:app --reload