import type { Metadata, Viewport } from 'next';
import { Luckiest_Guy, Outfit, Space_Mono } from 'next/font/google';
import './globals.css';
import { site } from '@/content/site';
import { asset } from '@/lib/assets';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });
const display = Luckiest_Guy({ subsets: ['latin'], weight: '400', variable: '--font-luckiest', display: 'swap' });
const mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space', display: 'swap' });

const url = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  title: `${site.name} (${site.ticker}) | The Internet's Inu-Whale`,
  description: 'Too big to be an Inu. Too meme to be a whale. A golden whale with Shiba ears, illustrated lore, and the $WINU community on Ethereum.',
  applicationName: site.name,
  metadataBase: url ? new URL(url) : undefined,
  openGraph: { title: `${site.name} · ${site.ticker}`, description: 'Too big to be an Inu. Too meme to be a whale.', type: 'website', images: [{ url: asset('/branding/winu-banner-1500x500.png'), width: 1500, height: 500 }] },
  twitter: { card: 'summary_large_image', title: `${site.name} · ${site.ticker}`, images: [asset('/branding/winu-banner-1500x500.png')] },
};
export const viewport: Viewport = { themeColor: '#040811', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${outfit.variable} ${display.variable} ${mono.variable}`}><body>{children}</body></html>;
}
