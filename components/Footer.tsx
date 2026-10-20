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
        {site.links.x ? <a href={site.links.x} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on X`}><Icon name="x" size={20} /></a> : <span aria-label="X"><Icon name="x" size={20} /></span>}
        {site.links.telegram ? <a href={site.links.telegram} target="_blank" rel="noopener noreferrer" aria-label={`${site.name} on Telegram`}><Icon name="telegram" size={20} /></a> : <span aria-label="Telegram"><Icon name="telegram" size={20} /></span>}
      </div>
    </div>
  </footer>;
}
