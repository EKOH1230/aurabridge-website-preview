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

- Source: founder's approval to show three beauty devices from the factory partner and the lowest-priced medical air mattress. Certification questions stay open.
- The products page and the home-page highlights now show only KF-2212, KH-2406, KH-2307 and OB-1600, with beauty devices first and the mattress last.
- Copy uses confirmed product details only. No prices, certification marks or treatment claims. KH-2307 is described for scalp care and essential-oil or serum application, without a reservoir volume. KH-2406 copy does not mention drugs or hair-growth claims.
- Photos are stored in `assets/product-images/` and listed in `docs/product-images.json`. The KH-2406 photo whose title contains 米诺 was not used. Unconfirmed millilitre labels on KH-2307 photos were covered, as was a line on the third photo about opening skin channels. Conflicting size callouts and a free-packaging line on the fourth KH-2307 photo were covered as well.
- Each card uses “Request a quote”, linking to the contact page. The contact channel itself is still unconfirmed.
