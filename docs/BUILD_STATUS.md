# Verification status (2026-10-19)

Commands run in this workspace:

- `npm install` — succeeded (Next.js 15.5.28, React 19)
- `npm run check` — passed (TypeScript, 19 assets, 12 scenes, section anchors)
- `npm run build` — passed, static export in `out/`

Browser checks against the local dev server, compared with https://thewhalecoin.xyz/:

- Desktop 1440 and 1280: hero, lore, nav, and contract pill match the dark-gold reference. No horizontal overflow. Join button stays inside the header.
- 768, 390, and 360: no horizontal overflow. At 390 the menu opens and Escape closes it.
- Gallery filter "The future" leaves 2 sightings. Lightbox opens, focuses Close, and Escape dismisses it.
- Copy stays disabled while the contract is `Coming Soon..`.
- Candle Surfer opens and draws a playfield. Whack-a-Rug and Blowhole Airdrops use the same dialog shell.

Not claimed: a full scored round of every game, Safari, or Firefox. GitHub Pages goes live only after `main` is pushed and the Pages workflow runs.
