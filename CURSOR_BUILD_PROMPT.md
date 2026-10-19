# CURSOR PROMPT — BUILD & PERFECT THE WHALECOIN INU ($WINU) WEBSITE

You are a senior frontend engineer, motion designer, creative director, and QA lead. You are opening an existing **Next.js 15 App Router + React 19 + TypeScript** repository for **WhaleCoin Inu ($WINU)**. The project ZIP includes the full source files and all approved assets — do not treat this as a blank project or replace the existing implementation with generic boilerplate. Your job is to install dependencies, build, inspect, fix, polish and deliver a professional responsive meme website.

## 1. First inspect, then execute

Read, in order: `README.md`, `HELP.md`, `docs/REFERENCE_MAPPING.md`, `docs/QA_CHECKLIST.md`, `docs/asset-manifest.json`, `content/site.ts`, `app/page.tsx`, `app/globals.css`, `next.config.mjs`, then the relevant components. Inspect `package.json` and the real repository before editing. Preserve useful architecture, code, assets and intentional copy. Never remove a feature to make a build pass.

Check actual tool versions and installed dependencies. Run `npm install`, `npm run check`, `npm run build`. Resolve any errors instead of hand-waving them away. Do not report tests you did not run.

## 2. Brand and site mission

- Project: **WhaleCoin Inu**; ticker **$WINU**, uppercase consistently.
- Chain: **Ethereum Mainnet**.
- Brand premise: a cheeky, enormous gold whale that has the ears, eyes and personality of a Shiba Inu. Narration is funny, absurd, surreal, confident and classy, never investment-promissory.
- Brand tagline: **Too big to be an Inu. Too meme to be a whale.**
- Reference website: `https://thewhalecoin.xyz/`.
- APPROVED brand aesthetic: **luxury golden whale**, pale parchment/cream, Champagne gold, deep mahogany/near-black, editorial serif typography, vintage museum & alt-history themes.
- Crucial: the supplied reference ZIP contained **14 image files** but not reference HTML/CSS/JS. This repository already implements a premium visually matched *interpretation* of the image set. **Do not claim pixel-perfect fidelity until the reference's layout and behavior are verified through real screenshots/browser inspection**. If available to you, inspect the reference in-browser at desktop/tablet/mobile and refine section by section. If inaccessible, preserve the well-defined existing reconstruction and clearly disclose the limitation.
- User preference: an impressive, dramatic, single-page site; high-quality varied section motions, never a generic presale template.

## 3. Token facts — do not invent

The current source of truth is **`content/site.ts`**:
- Total supply **1,000,000,000 WINU**.
- Buy/sell tax **0%**.
- Liquidity pool burn: **planned** (not confirmed completed).
- Ownership renounce: **planned** (not confirmed completed).
- Contract address: **Coming Soon..** (`null` currently).
- Official X, Telegram, chart and DEX URLs: `null` (unknown).

When details become available, update one config object and display them in appropriate places. Never copy WHALE's Solana address or social links. Do not present burned LP, renounced ownership, verified contract, audit, liquidity, holders, volumes, price gains, guarantees, or DEX listing without authoritative proof. Disable actions that cannot yet function; use obvious `Coming Soon..` labels.

## 4. Exact current sections, anchors and visual choreography

The site MUST remain **one page** (`app/page.tsx`), with working same-page scroll navigation and these exact ordered sections:

**A. Header `#top`:** narrow fixed translucent nav; circular gold WINU logo, two-line WHALECOIN/INU lockup, desktop menu anchors `#story`, `#gallery`, `#coin`, `#how-to-buy`, join button to `#community`, compact accessible mobile menu. Smooth scroll with sticky-nav offset; Escape closes mobile menu.

**B. Hero:** massive asymmetric serif two-line `WHALE / COIN INU` title, whale cutout on right over golden concentric rings, bobbing gold tokens, stamp, subtle pointer-follow motion; warm beige premium gradients; short funny copy; primary button to origin, secondary to gallery. Must be powerful at 1440px but readable at 390px. Hero image: `public/branding/winu-mascot-transparent.png`.

**C. Animated slogan strip:** endlessly scrolling dark-maroon strip with short WINU slogans and ✳ separators; respect reduced-motion preference.

**D. The three-part origin narrative `#story`:** chapter 01 harbor discovery `lore-before.jpg`, chapter 02 rescue `lore-found.jpg`, chapter 03 accidental internet fame `lore-famous.jpg`. Use alternating image/text layouts, huge chapter numbers, subtle photo rotation, editorial headings, staggered intersection reveals. Preserve thoughtful humor and accessible alt text.

**E. Historical museum `#gallery`:** dark gallery room visual and serif heading; curatorial filters `All`, `High society`, `History`, `The future`; responsive 3-column (desktop), 2-column (mobile) thumbnails; modal viewer with art description, next/prev arrows, keyboard Escape and Left/Right, focus trap, return focus after close. Use ALL nine images: `whale-vogue.jpg`, `whale-monalisa.jpg`, `whale-samurai.jpg`, `whale-rushmore.jpg`, `whale-sistine.jpg`, `whale-titanic.jpg`, `whale-exchange.jpg`, `whale-trading.jpg`, `whale-iss.jpg`. The art is satire; never present scenes as actual historical events.

**F. The coin `#coin`:** large golden coin illustration `whale-coin.png` next to the 2x2 information grid, 1B supply, 0% tax, LP burn planned, ownership renounce planned. Contract field `Coming Soon..` until CA is set. Copy button activates only with real official CA and provides success feedback. Never fake success.

**G. The captain's field guide `#how-to-buy`:** four clear Ethereum-oriented steps — wallet setup, ETH & gas, independently verify official CA, then consider a trusted DEX and understand slippage/risks. No DEX/trade links before official confirmation. Elegant giant numeral rows, not generic crypto card widgets.

**H. Community `#community`:** full-bleed golden background, oversized serif invitation, floating big mascot, credible X and Telegram CTAs shown as disabled/coming soon until URL provided.

**I. Footer:** circular logo and section navigation, risk disclaimer, copyright. No bogus socials.

## 5. Asset directory and exact filenames

Use only project-provided files. Image URLs must come through `asset()` in `lib/assets.ts` to preserve optional GitHub Pages `NEXT_PUBLIC_BASE_PATH` support.

**Brand assets**:
- `public/branding/winu-logo-transparent.png` — 1024x1024, real alpha outside circular logo
- `public/branding/winu-mascot-transparent.png` — 1024x1024, alpha
- `public/branding/winu-banner-1500x500.png` — social 3:1
- `public/branding/winu-telegram-1100x520.png` — TG graphic

**Direct replacements of reference filenames**:
- `public/images/lore-before.jpg`
- `public/images/lore-found.jpg`
- `public/images/lore-famous.jpg`
- `public/images/whale-coin.png`
- `public/images/whale-banner.png`
- `public/images/whale-vogue.jpg`
- `public/images/whale-monalisa.jpg`
- `public/images/whale-samurai.jpg`
- `public/images/whale-rushmore.jpg`
- `public/images/whale-sistine.jpg`
- `public/images/whale-titanic.jpg`
- `public/images/whale-exchange.jpg`
- `public/images/whale-trading.jpg`
- `public/images/whale-iss.jpg`

Retain crop ratios and matching scene content. No auto-generated random images, no low-res stock photos, no missing files, no generic placeholders. Keep high-fidelity original golden mascot across scenes. Inspect transparent PNG alpha at edges. Avoid distortion using correct object-fit.

## 6. Engineering and quality

Use the established Next.js architecture, component boundaries and `content/site.ts`; don't install a large UI framework merely to change spacing. CSS variables in `app/globals.css` are the design system. Add React client components only where needed. All animations should be intentional, performant, and clearly different across major sections, with reduced-motion support. Prefer CSS transforms and IntersectionObserver to heavy scroll handlers. No hydration mismatch, no unbounded event listeners, no memory leaks, no fake charts or chain data. Keep image loading optimized: hero priority, gallery lazy. Keep `output: 'export'`, `images.unoptimized: true`, and optional base path intact.

Make accessibility first-class: meaningful image descriptions, keyboard navigability, high contrast, labeled icon controls, trap and restore focus in gallery modal, no inaccessible empty links. Test Safari/Firefox compatibility if available. No XSS/prerender errors, no cross-project addresses or contract placeholders deceptively styled as live.

## 7. Visual acceptance workflow

Run at least these viewport checks: 1440x900, 1280x800, 768x1024, 390x844, 360x740. Capture screenshots and compare each section to the intended golden editorial identity. If the reference website is accessible, do a side-by-side screenshot audit, identify mismatches in section order/spacing/image placement/animation style, and systematically close them. Work in order from header to footer; do not abandon assets or flatten the story to make implementation easier.

Verify:
- anchor clicks and fixed-header offsets;
- mobile menu open/close and focus;
- keyboard gallery navigation, overlay closing and filter counts;
- copy address disabled until true CA; then clipboard interaction with confirmation;
- no broken images, no horizontal overflow;
- brand name/ticker uppercase consistency;
- use only accurate on-chain claims;
- social and external links only after confirmation;
- `npm run check` and `npm run build` pass.

## 8. Help synchronization is mandatory

Whenever you modify navigation, visual features, configuration values, gallery behavior, links, or deploy behavior, update **`HELP.md`** and relevant `docs/QA_CHECKLIST.md` and `README.md`. Work is not complete if documentation is out of sync. Keep `docs/asset-manifest.json` aligned whenever asset files change.

## 9. Deliverable

Finish the complete working codebase in-place. Return a concise report: implemented features, files changed, tests actually executed, remaining verification steps, screenshots and any limitations of reference inspection. Do not stop after a design outline; implement and verify. Do not ask for approvals between sections unless a genuine blocker prevents progress.
