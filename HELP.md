# WhaleCoin Inu — Website Help

## What the site does

This one-page site tells a fictional meme story for WhaleCoin Inu ($WINU), shows a gallery of satirical scenes, lists planned token facts, and includes three small browser games. It is styled after the dark-gold ocean layout of the reference site, with WINU's own facts.

## Navigation

- **Lore**, **Gallery**, **Playground**, **Community**, and **Contract** scroll to those sections. The fixed header offset is included.
- On a narrow screen, use the menu button. Choose a link or press **Escape** to close it.
- The `$WINU` mark returns to the top.
- **Join the pod** scrolls to Community until an official X URL is set in `content/site.ts`.

## Image museum

- Filter with **All**, **High society**, **History**, or **The future**.
- Open an artwork for the larger image and its fictional caption.
- **Left/Right** or Previous/Next moves between pieces. **Escape** or a click outside closes the viewer and returns focus.

## Playground

- **Candle Surfer** — press Space, click, or tap to swim between candles.
- **Whack-a-Rug** — bonk crabs for points. Hitting the whale costs points. Thirty seconds.
- **Blowhole Airdrops** — move the chest to catch treasure. Three misses ends the round.
- **Escape** closes a game.

## Token information

- The contract shows **Coming Soon..** until `site.tokenAddress` is a real address.
- Copy stays disabled until then, and it never reports success without a clipboard write.
- Supply is 1,000,000,000. Tax is 0%. LP burn and ownership renounce are **planned**.
- No price, volume, or profit claims are shown.

## Official links

X and Telegram stay labeled **coming soon** until `site.links.x` and `site.links.telegram` are set. Do not paste the reference site's accounts. Confirmed links open in a new tab with `rel="noopener noreferrer"`.

## Maintenance workflow

1. Edit `content/site.ts` for token facts, official links, scene captions, slogans, and buy steps.
2. Replace artwork in `public/images/` or `public/branding/` and keep filenames when possible.
3. Edit `app/globals.css` and `components/*.tsx` for UI changes.
4. Update this file, `README.md`, and `docs/QA_CHECKLIST.md` when navigation, games, links, or deploy behavior change.
5. Run `npm run check` and `npm run build`.
6. Push `main`. GitHub Actions publishes to `https://jackmiller825.github.io/WINU/`.

## Typical fixes

**Images broken on GitHub Pages:** the Pages workflow must build with `NEXT_PUBLIC_BASE_PATH=/WINU`. A root custom domain should use an empty base path.

**Copy button disabled:** `site.tokenAddress` is still `null`.

**X/Telegram say coming soon:** those URLs are still `null`.

**Pages output folder:** static export is `out/`, not `dist/` or `build/`.

**Animations missing:** the OS or browser may have `prefers-reduced-motion` on. The site honors that.
