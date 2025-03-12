from pydantic import BaseModel
from typing import Optional

class WebPage(BaseModel):
    url: str
    content: str


class ChatMessage(BaseModel):
    message: str


class SourceURL(BaseModel):
    name: str
    link: str
    max_pages: Optional[int] = 5
