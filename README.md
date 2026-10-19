# WhaleCoin Inu ($WINU) — Next.js website

A single-page meme site for **WhaleCoin Inu ($WINU)** on **Ethereum Mainnet**. The layout, motion, and dark-gold ocean look follow the live reference at [thewhalecoin.xyz](https://thewhalecoin.xyz/). Copy, contract details, and social links are WINU's own. The reference token address and social accounts are not used.

## Start

Requires Node.js 20.9+ (recommended: Node 22).

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a static production build:

```bash
npm run check
npm run build
```

The static output is written to `out/` (`output: 'export'` in `next.config.mjs`). Serve it with `npm run preview`. Do not use `next start` for the exported site.

## Stack

- Next.js 15, App Router, TypeScript, React 19
- Hand-crafted CSS in `app/globals.css` (no Tailwind)
- Self-hosted display, sans, and mono fonts via `next/font`
- Gallery filters, accessible lightbox, keyboard navigation, three browser mini-games
- Static hosting with optional `NEXT_PUBLIC_BASE_PATH`

## Site sections

1. **Header** — `$WINU` mark, Lore, Gallery, Playground, Community, Contract. Join button goes to the community section until an official X URL exists.
2. **Hero** — floating coin, display headline, contract pill showing **Coming Soon..**
3. **Slogan strip** — scrolling `$WINU` lines. Stops when reduced motion is requested.
4. **Lore** — three chapters using `lore-before.jpg`, `lore-found.jpg`, `lore-famous.jpg`
5. **How to get in** — four Ethereum steps. No DEX link until a contract is official.
6. **Playground** — Candle Surfer, Whack-a-Rug, Blowhole Airdrops
7. **Contract** — address copy (disabled until a real address is set), supply, 0% tax, planned LP burn, planned ownership renounce
8. **Confirmed sightings** — nine scenes, era filters, keyboard lightbox
9. **Community** — X and Telegram stay labeled coming soon until URLs are set
10. **Footer** — mark, disclaimer, no live social links until configured

## Edit token details in one file

`content/site.ts` is the source of truth.

- Name: `WhaleCoin Inu` / ticker: `$WINU`
- Chain: Ethereum Mainnet
- Total supply: **1,000,000,000**
- Token tax: **0%**
- Liquidity burn / ownership renounce: **planned**, not completed
- Contract address: **Coming Soon..** (`null`)
- Social, chart, and trade links: `null` until provided

When a real checksummed mainnet address is ready, set `tokenAddress`. The copy button turns on by itself. Do not paste the reference project's address or social links.

## Assets

Images live in `public/images/` and `public/branding/`. Paths go through `asset()` in `lib/assets.ts` so a GitHub Pages base path still works. See `docs/asset-manifest.json` and `docs/REFERENCE_MAPPING.md`.

## Deploy

**GitHub Pages** for `JackMiller825/WINU` is set up in `.github/workflows/pages.yml`. A push to `main` builds with `NEXT_PUBLIC_BASE_PATH=/WINU` and publishes `out/`. The live URL is `https://jackmiller825.github.io/WINU/`.

**Local or custom-domain root:** leave `NEXT_PUBLIC_BASE_PATH` empty.

**Netlify:** build `npm run build`, publish `out`.

## Guardrails

- No fake prices, audits, DEX listings, burned LP, or renounced ownership.
- Do not insert the reference token's contract or social links.
- Gallery scenes are satire, not historical events.
- Motion respects `prefers-reduced-motion`.
- Keep `HELP.md` updated when a feature, setting, or workflow changes.
