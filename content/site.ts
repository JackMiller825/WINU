/** Edit this file only to update factual token details or links across the site. */
export const site = {
  name: 'WhaleCoin Inu',
  symbol: 'WINU',
  ticker: '$WINU',
  chain: 'Ethereum Mainnet',
  tokenAddress: null as `0x${string}` | null,
  supply: '1,000,000,000',
  tax: '0%',
  liquidity: { status: 'planned' as 'planned' | 'completed', proofUrl: null as string | null },
  ownership: { status: 'planned' as 'planned' | 'completed', proofUrl: null as string | null },
  links: {
    x: null as string | null,
    telegram: null as string | null,
    dexscreener: null as string | null,
    dextools: null as string | null,
    uniswap: null as string | null,
    etherscan: null as string | null,
  },
  disclaimer: 'A community meme project. Nothing here is a promise of returns or financial advice.',
} as const;

export const slogans = [
  '$WINU',
  'TOO BIG TO BE AN INU',
  '$WINU',
  'TOO MEME TO BE A WHALE',
  '$WINU',
  'GOLDEN EARS. OCEAN SIZE.',
  '$WINU',
  'MEMES ONLY. NO PROMISES.',
] as const;

export const buySteps = [
  { num: '01', title: 'Get a wallet', body: 'Install a self-custody Ethereum wallet you control. It takes a couple of minutes. Keep the recovery phrase offline and private.' },
  { num: '02', title: 'Load up ETH', body: 'Buy ETH on an exchange you trust and send it to that wallet. Leave extra for gas. This project is Ethereum Mainnet only.' },
  { num: '03', title: 'Verify the contract', body: 'The official $WINU address is not published yet. When it appears here, check it yourself. Never trust an address pasted by a stranger.' },
  { num: '04', title: 'Then consider a swap', body: 'Only after the official address is confirmed, use a DEX you understand. Read slippage and approvals. This is a meme, not a plan.' },
] as const;

export const activities = [
  { id: 'surf' as const, emoji: '🕯️', title: 'Candle Surfer', cta: 'Dive In', body: 'Flap through the gap between red and green candles. One touch of a wick and it is over. How far can the inu-whale swim?' },
  { id: 'whack' as const, emoji: '🦀', title: 'Whack-a-Rug', cta: 'Grab the Mallet', body: 'Rug-puller crabs crawl out of the reef. Bonk them for points — bonk the golden whale and you pay dearly.' },
  { id: 'air' as const, emoji: '🌊', title: 'Blowhole Airdrops', cta: 'Catch Treasure', body: 'Treasure rains into the deep. Drag your chest to catch coins, pearls and gems as it gets faster. Miss 3 and it is over.' },
] as const;

/** Preserve source asset filenames so site updates can be made by swapping public/images files. */
export const timeline = [
  { number: '01', kicker: '01 — Before', title: 'He was not born a leviathan.', description: 'No launch plan. No marketing team. No engineered origin story. Just a small golden inu-whale, a quiet tide pool at the edge of the harbor, and a very ordinary afternoon.', image: 'lore-before.jpg', alt: 'A golden Inu-whale sits in shallow water near a harbor at sunset.' },
  { number: '02', kicker: '02 — Found', title: 'He was found. Lifted. Loved.', description: 'Someone stopped. Someone stayed. Nobody asked why it had dog ears. The internet had a more important question — whether it could fetch.', image: 'lore-found.jpg', alt: 'A small smiling golden Inu-whale is gently held above the ocean in human hands.' },
  { number: '03', kicker: '03 — Now', title: 'Quietly becoming a very large meme.', description: 'One picture at a time, he found a home in a much bigger ocean. He has no idea. He is napping on the refresh button.', image: 'lore-famous.jpg', alt: 'A smiling golden whale-dog sits at a computer displaying its own pictures.' },
] as const;

export type GalleryCategory = 'All' | 'High society' | 'History' | 'The future';
export const galleryCategories: GalleryCategory[] = ['All', 'High society', 'History', 'The future'];
export const gallery: {
  image: string;
  title: string;
  era: string;
  description: string;
  category: Exclude<GalleryCategory, 'All'>;
  alt: string;
}[] = [
  { image: 'whale-titanic.jpg', title: 'The Unsinkable Meme', era: 'THE VOYAGE', description: 'The only passenger whose carry-on was an entire ocean. This is an alternate-history meme, naturally.', category: 'History', alt: 'A smiling golden Inu-whale poses on the prow of a grand ocean liner.' },
  { image: 'whale-monalisa.jpg', title: 'The Inu Lisa', era: 'THE RENAISSANCE', description: 'Art historians still disagree about the smile. We think somebody mentioned snacks.', category: 'History', alt: 'A golden Inu-whale in a Renaissance painting with hands folded.' },
  { image: 'whale-trading.jpg', title: 'Professional Chart Watcher', era: 'THE MIDNIGHT SHIFT', description: 'Six monitors, twelve candlesticks, and one very determined fin hovering over refresh.', category: 'The future', alt: 'A gold Inu-whale watches glowing charts on a bank of trading monitors.' },
  { image: 'whale-rushmore.jpg', title: 'Mount WINUmore', era: 'THE MONUMENT', description: 'They needed four faces. The whale had plenty of personality to go around.', category: 'History', alt: 'Giant Inu-whale faces carved into a mountain.' },
  { image: 'whale-samurai.jpg', title: 'The Golden Ronin', era: 'THE EDO PERIOD', description: 'A noble warrior with the discipline of a samurai and the attention span of a puppy.', category: 'History', alt: 'A golden Inu-whale in samurai armor standing near a snowy gate.' },
  { image: 'whale-exchange.jpg', title: 'Opening Bell', era: 'THE MARKETS', description: 'The trading floor had seen bulls and bears. It had never prepared for a whale that barks.', category: 'High society', alt: 'A golden Inu-whale stands on a crowded stock exchange trading floor.' },
  { image: 'whale-vogue.jpg', title: 'The Cover Star', era: 'THE STYLE ISSUE', description: 'A string of pearls, a magazine cover, and absolutely no idea what fashion week is.', category: 'High society', alt: 'A golden Inu-whale wearing pearls on a fashion magazine cover.' },
  { image: 'whale-iss.jpg', title: 'One Small Step for Inu', era: 'THE ORBITAL ERA', description: 'The mission was to study zero gravity. The astronaut insisted on bringing an entire swimming pool.', category: 'The future', alt: 'A smiling golden Inu-whale floats through a space station overlooking Earth.' },
  { image: 'whale-sistine.jpg', title: 'The Creation of WINU', era: 'THE MASTERPIECE', description: 'A very dramatic ceiling for a creature that still chases imaginary tennis balls.', category: 'History', alt: 'An ornate Renaissance ceiling fresco depicts a golden Inu-whale.' },
];
