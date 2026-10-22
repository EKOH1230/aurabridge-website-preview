# Website preview decisions

## 2026-10-01 — First build for family review

- Source: user's request to build the website and put it on GitHub for their father to review.
- Format: dependency-free English B2B static website with Home, About, Partnerships, Products, and Contact pages.
- Visual direction: blue, white, black, restrained red; temporary provided AuraBridge logo.
- Publishing boundary: only website code and its temporary logo, with no internal reference documents.
- Content boundary: product portfolio, exact services, company/legal details, and public contact information remain unconfirmed. Pages use explicit preview wording and placeholders.
- Functionality: no live form, analytics, CRM, or payment connection.

## Pending for review

- Confirm the final English positioning and page copy.
- Confirm what AuraBridge can actually offer partners, the availability and regional documentation of the four models now on the site, and permission for commercial use of factory images or detailed specifications.
- Confirm legal entity, privacy responsibility, public contact details, and final logo.
- Decide whether to keep this preview public after review.

## 2026-10-08 — Fifteen selected products added

- Source: user's request to publish the models listed in the Codex task “15款产品选择”; that task selected seven ObboMed air mattress systems and eight JingMeiRui personal care tools for a hospital and care institution B2B audience.
- Product names and model numbers were checked against the manufacturers' public websites. Each card links to a manufacturer page or range; ObboMed's public range is linked because a stable per-model URL was not verified.
- ObboMed models are described as air mattress systems, not bed frames. JingMeiRui tools are presented as personal care devices, without diagnosis or treatment claims.
- Product images, prices, purchase actions and AuraBridge sales claims remain absent until rights, supply, market documentation and commercial role are confirmed.
- The Products page now has three categories: seven air mattress systems, five scalp care tools and three facial care tools. The Home page points to the selection.

## 2026-10-08 — Manufacturer photos added for visual review

- The user reported that the product cards had no photos; the letter graphics were placeholders, not failed image requests.
- Images were matched to each model's public manufacturer listing and copied into `assets/product-images/` so the preview does not depend on the manufacturers' hotlink settings. Source page and image URLs are recorded in `docs/product-images.json`.
- ObboMed reuses its OB-3650 main image for OB-2650, OB-3600 and OB-3620. Their model-specific gallery images are used instead. ObboMed card links now open the exact model pages.
- Image use is for this review preview. Permission for commercial use and final product documentation remain pending; no certification, medical-effect or sales claims were added.

## 2026-10-20 — Four approved products replace the fifteen-model preview

- Source: founder's approval to show three beauty devices and the lowest-priced medical air mattress. Certification questions stay open.
- The products page and the home-page highlights showed the approved beauty devices first and the mattress last.
- Copy uses confirmed product details only. No prices, certification marks or treatment claims. KH-2307 is described for scalp care and essential-oil or serum application, without a reservoir volume. KH-2406 copy does not mention drugs or hair-growth claims.
- Photos are stored in `assets/product-images/` and listed in `docs/product-images.json`. The KH-2406 photo whose title contains 米诺 was not used. Unconfirmed millilitre labels on KH-2307 photos were covered, as was a line on the third photo about opening skin channels. Conflicting size callouts and a free-packaging line on the fourth KH-2307 photo were covered as well.
- Each card uses “Request a quote”, linking to the contact page. The contact channel itself is still unconfirmed.

## 2026-10-20 — Present the range as AuraBridge

- Founder approval on the product pull request: remove the supplier name from the site and replace internal-review wording with customer-facing copy.
- Beauty devices are presented as the AuraBridge range. ObboMed stays on the air mattress.
- Corner brand marks on the beauty-device photos were covered where they sat on a plain background.
- Visible preview, review, and draft labels were rewritten as wholesale B2B copy. Prices, certification claims, and treatment claims stay off the site.

## 2026-10-20 — Header logo redrawn

- The header used a low-resolution sketch of the bridge and the name, cropped inside a white box.
- It is now a transparent SVG: a heavier bridge icon, the AuraBridge name, and the same navy and red. The favicon uses the same bridge. The footer wordmark stays set in type.

## 2026-10-20 — Public contact details

- The footer and contact page name AuraBridge as a brand of Hong Kong Bright Bridge Group Co., Limited, with the Hong Kong address, phone, and public email.
- Quote buttons open a mailto to the public address. A cc address is included in those links and is not shown as text on the site.

## 2026-10-20 — Homepage products and back to top

- The homepage hero graphic (pale sphere, arch, and orbit lines) is replaced by a collage of the beauty-device photos already in the repository.
- A back-to-top button appears at the bottom-right after the page is scrolled. The footer links “AuraBridge is a brand of Bright Bridge Group” to brightbridgegroup.com.

## 2026-10-20 — Quote form above the footer

- Each page ends with a Request a quote form: name, email, optional company, product of interest, and message.
- There is no server. After the required fields pass, the form opens the visitor’s email app with a prefilled message. Social icons stay commented out until accounts exist.

## 2026-10-20 — Facial brush removed, original logo restored

- The facial cleansing brush is no longer on the site. The range is KH-2406, KH-2307 and OB-1600.
- The KH-2307 reservoir capacity is 3 ml, from the factory quote.
- The header uses the original sketch again, with thicker strokes so it stays readable at header size on light and dark backgrounds. The favicon keeps the original bridge and uses a heavier stroke.

## 2026-10-22 — KH-2406 factory photos

- KH-2406 uses six factory photos in `assets/products/kh-2406/`. The front render is the main image. The products page shows all six in the thumbnail strip.

## 2026-10-22 — Navigation order

- The header menu on every page is Home, Products, About, Partnerships, then Contact us.
- On the homepage, the product range comes before the about and partnership sections.

## 2026-10-22 — Product detail pages and foldable layout

- Each product has a detail page. Cards and images on the homepage and products page open that page. Quote and sample buttons open the on-page quote form with the model selected.
- KH-2307 reservoir capacity and weight are “Available on request” because the recorded figures conflict. Dimensions and the 0.25 mm tips stay. Carton quantities stay off the page.
- Supplier names and medical wording are removed from the public product copy. Compliance text is only “Documentation available on request.”
- Product grids are one column below 640px, two columns from 640px to 999px, and three columns from 1000px. Pages use viewport-fit=cover and safe-area insets. Tap targets are at least 44px. Product photos use srcset and sizes.

## 2026-10-22 — Gallery arrows

- Detail-page galleries have previous and next controls on the main photo. They loop, follow the selected thumbnail, and also respond to a horizontal swipe and the left and right keys while the gallery is focused. A product with one photo does not show the arrows.
