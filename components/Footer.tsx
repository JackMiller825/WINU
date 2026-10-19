import Image from 'next/image';
import { site } from '@/content/site';
import { asset } from '@/lib/assets';
import { Icon } from './Icons';

export function Footer() {
  return <footer className="site-footer">
    <div className="wrap footer-row">
      <a className="footer-brand" href="#top">
        <Image src={asset('/branding/winu-logo-transparent.png')} alt="" width={32} height={32} />
        <span>{site.ticker}</span>
      </a>
      <p>© {new Date().getFullYear()} {site.name}. Built for the deep.<br className="footer-break" /> Not financial advice. Memes only.</p>
      <div className="footer-socials">
        {site.links.x ? <a href={site.links.x} target="_blank" rel="noopener noreferrer" aria-label="WhaleCoin Inu on X"><Icon name="globe" size={20} /></a> : <span className="footer-social-soon" aria-label="X coming soon" title="X coming soon"><Icon name="globe" size={20} /></span>}
        {site.links.telegram ? <a href={site.links.telegram} target="_blank" rel="noopener noreferrer" aria-label="WhaleCoin Inu on Telegram"><Icon name="external" size={20} /></a> : <span className="footer-social-soon" aria-label="Telegram coming soon" title="Telegram coming soon"><Icon name="external" size={20} /></span>}
      </div>
    </div>
  </footer>;
}
