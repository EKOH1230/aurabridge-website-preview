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
        self.product_cards = []
        self.active_product = None

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        if tag in {"a", "link"}:
            self.links.append(attributes.get("href", ""))
        if tag in {"img", "script"}:
            self.links.append(attributes.get("src", ""))
        if tag == "img" and "alt" not in attributes:
            self.images_missing_alt += 1
        if tag == "article" and attributes.get("data-product-id"):
            self.active_product = {"id": attributes["data-product-id"], "image": None}
            self.product_cards.append(self.active_product)
        if tag == "img" and self.active_product is not None:
            self.active_product["image"] = (attributes.get("src"), attributes.get("alt"))
        if tag == "h1":
            self.h1_count += 1
        if tag == "title":
            self.title_count += 1
        if tag == "form":
            self.form_count += 1

    def handle_endtag(self, tag):
        if tag == "article":
            self.active_product = None


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
    if page.name == "products.html":
        if len(parser.product_cards) != 15:
            errors.append(f"products.html: expected 15 product cards, found {len(parser.product_cards)}")
        for card in parser.product_cards:
            if not card["image"] or not all(card["image"]):
                errors.append(f"products.html: {card['id']} has no product image with alt text")
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
