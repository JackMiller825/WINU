'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { site } from '@/content/site';
import { asset } from '@/lib/assets';
import { Icon } from './Icons';

const nav = [
  { name: 'Lore', href: '#story' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Playground', href: '#playground' },
  { name: 'Community', href: '#community' },
  { name: 'Contract', href: '#coin' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const cta = site.links.x ? (
    <a className="nav-cta" href={site.links.x} target="_blank" rel="noopener noreferrer">
      <span className="cta-long">Follow on X</span><span className="cta-short">Follow</span>
    </a>
  ) : (
    <a className="nav-cta" href="#community" onClick={() => setOpen(false)}>
      <span className="cta-long">Join the pod</span><span className="cta-short">Join</span>
    </a>
  );

  return <header className="site-header" id="top">
    <div className="nav-shell">
      <a className="brand" href="#top" aria-label={`${site.name}, back to top`} onClick={() => setOpen(false)}>
        <Image src={asset('/branding/winu-logo-transparent.png')} alt="" width={40} height={40} className="brand-mark" priority />
        <span className="brand-word">{site.ticker}</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {nav.map(item => <a href={item.href} key={item.href}>{item.name}</a>)}
      </nav>
      <div className="nav-end">
        {cta}
        <button type="button" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(value => !value)}>
          <Icon name={open ? 'close' : 'menu'} size={24} />
        </button>
      </div>
    </div>
    <nav id="mobile-nav" className={`mobile-nav ${open ? 'is-open' : ''}`} aria-label="Mobile navigation" hidden={!open}>
      {nav.map(item => <a href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.name}</a>)}
    </nav>
  </header>;
}
