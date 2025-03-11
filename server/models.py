from pydantic import BaseModel


class WebPage(BaseModel):
    url: str
    content: str


class ChatMessage(BaseModel):
    message: str


class SourceURL(BaseModel):
    url: str
    max_pages: int = 5
