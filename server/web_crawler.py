from typing import List
from bs4 import BeautifulSoup
import requests
from urllib.parse import urljoin, urlparse
from models import WebPage


class WebCrawler:
    def __init__(self):
        self.visited_urls = set()

    def is_valid_url(self, url: str) -> bool:
        try:
            result = urlparse(url)
            return all([result.scheme, result.netloc])
        except ValueError:
            return False

    def extract_text(self, html_content: str) -> str:
        soup = BeautifulSoup(html_content, "html.parser")

        # Remove script and style elements
        for element in soup(["script", "style"]):
            element.decompose()

        # Get text and normalize whitespace
        text = " ".join(soup.stripped_strings)
        return text

    async def crawl(self, url: str, max_pages: int = 5) -> List[WebPage]:
        if not self.is_valid_url(url):
            raise ValueError(f"Invalid URL: {url}")

        pages = []
        queue = [(url, 0)]  # (url, depth) pairs
        self.visited_urls = set()

        while queue and len(pages) < max_pages:
            current_url, depth = queue.pop(0)
            if current_url in self.visited_urls:
                continue

            try:
                self.visited_urls.add(current_url)
                response = requests.get(current_url)
                response.raise_for_status()
                text_content = self.extract_text(response.text)
                pages.append(WebPage(url=current_url, content=text_content))

                # Only after processing the content, extract links for next level
                if len(pages) < max_pages:
                    soup = BeautifulSoup(response.text, "html.parser")
                    for link in soup.find_all("a"):
                        href = link.get("href")
                        if href:
                            absolute_url = urljoin(current_url, href)
                            if self.is_valid_url(absolute_url) and absolute_url not in self.visited_urls:
                                queue.append((absolute_url, depth + 1))

            except requests.RequestException as e:
                print("debug> crawling error:", e)
                continue

        return pages
