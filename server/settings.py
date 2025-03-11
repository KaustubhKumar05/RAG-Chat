from functools import lru_cache
from typing import Optional
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    openai_api_key: Optional[str] = None


@lru_cache()
def get_settings() -> Settings:
    return Settings()
