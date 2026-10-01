"""Check the static preview before publishing it."""

from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
PAGES = [ROOT / name for name in (
    "index.html", "about.html", "partnerships.html", "products.html", "contact.html"
)]


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.h1_count = 0
        self.title_count = 0
        self.form_count = 0
        self.images_missing_alt = 0

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag in {"a", "link"}:
            self.links.append(attributes.get("href", ""))
        if tag in {"img", "script"}:
            self.links.append(attributes.get("src", ""))
        if tag == "img" and "alt" not in attributes:
            self.images_missing_alt += 1
        if tag == "h1":
            self.h1_count += 1
        if tag == "title":
            self.title_count += 1
        if tag == "form":
            self.form_count += 1


errors = []
for page in PAGES:
    if not page.exists():
        errors.append(f"Missing page: {page.name}")
        continue
    parser = PageParser()
    parser.feed(page.read_text(encoding="utf-8"))
    if parser.h1_count != 1:
        errors.append(f"{page.name}: expected one h1, found {parser.h1_count}")
    if parser.title_count != 1:
        errors.append(f"{page.name}: expected one title, found {parser.title_count}")
    if parser.form_count:
        errors.append(f"{page.name}: unexpected live form")
    if parser.images_missing_alt:
        errors.append(f"{page.name}: image without alt text")
    for link in parser.links:
        if not link or link.startswith(("#", "http:", "https:", "mailto:")):
            continue
        target = page.parent / link.split("#", 1)[0]
        if not target.exists():
            errors.append(f"{page.name}: missing target {link}")

if errors:
    print("\n".join(errors))
    raise SystemExit(1)

print(f"Checked {len(PAGES)} pages: local links, assets, titles, headings, alt text, and forms are valid.")
