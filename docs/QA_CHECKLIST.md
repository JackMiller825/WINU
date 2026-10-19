# UI/UX acceptance checklist

Reference inspected in-browser: https://thewhalecoin.xyz/ (desktop 1440). Section order matched: hero, slogan strip, lore, how to buy, playground, contract, gallery, community, footer. WINU keeps Ethereum facts and does not copy the reference contract or social accounts.

## Technical
- [x] `npm install` succeeds
- [x] `npm run check` passes
- [x] `npm run build` creates `out/`
- [x] No broken image requests on loaded story and hero art
- [x] Dev server compiled without a page exception
- [x] No X/Telegram/DEX links are fabricated
- [x] GitHub Pages workflow builds with `NEXT_PUBLIC_BASE_PATH=/WINU`

## Desktop 1440 x 900
- [x] Hero coin, headline, and Coming Soon pill are visible
- [x] Sticky nav anchors land with offset: Lore, Gallery, Playground, Community, Contract
- [x] Origin chapters alternate image and text
- [x] Gallery is 3 columns; filters change the count
- [x] Gallery modal opens, focuses close, and closes on Escape
- [x] Supply 1,000,000,000 and tax 0%; LP and ownership say planned
- [x] Copy stays disabled while the contract is null
- [x] Candle Surfer opens and draws; the other two games share that dialog

## Tablet and phone 768 / 390 / 360
- [x] No horizontal overflow
- [x] Mobile menu opens, lists the sections, and closes on Escape
- [x] Hero text stays readable
- [x] Lore stacks vertically on a phone width
- [x] Gallery is two columns on a phone width
- [x] Modal close button stays usable
- [x] Community cards say coming soon

## Accessibility and claims
- [x] Gallery dialog focuses the close button
- [ ] Tab trap and focus restore were not exercised key by key
- [x] Story and gallery controls expose scene descriptions
- [ ] Reduced motion was not toggled in the browser; the CSS rule is in place
- [x] No verified-security, profit, burn, or renounce claim without proof
- [x] `HELP.md` matches the current navigation and deploy path
