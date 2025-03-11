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
        try:
            response = requests.get(url)
            response.raise_for_status()

            text_content = self.extract_text(response.text)
            pages.append(WebPage(url=url, content=text_content))

            # Extract and follow links if needed
            if len(pages) < max_pages:
                soup = BeautifulSoup(response.text, "html.parser")
                for link in soup.find_all("a"):
                    if len(pages) >= max_pages:
                        break

                    href = link.get("href")
                    if href:
                        absolute_url = urljoin(url, href)
                        if (
                            self.is_valid_url(absolute_url)
                            and absolute_url not in self.visited_urls
                        ):
                            self.visited_urls.add(absolute_url)
                            try:
                                sub_response = requests.get(absolute_url)
                                sub_response.raise_for_status()
                                text_content = self.extract_text(sub_response.text)
                                pages.append(
                                    WebPage(url=absolute_url, content=text_content)
                                )
                            except requests.RequestException:
                                continue

        except requests.RequestException as e:
            raise Exception(f"Error crawling {url}: {str(e)}")

        return pages
