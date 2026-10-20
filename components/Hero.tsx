'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { site } from '@/content/site';
import { asset } from '@/lib/assets';
import { copyText } from '@/lib/copy';

export function Hero() {
  const hero = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const label = site.tokenAddress ?? 'Coming Soon..';
  useEffect(() => {
    const root = hero.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return;
    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      root.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width - 0.5) * 14}px`);
      root.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height - 0.5) * 10}px`);
    };
    const onLeave = () => { root.style.setProperty('--mx', '0px'); root.style.setProperty('--my', '0px'); };
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    return () => { root.removeEventListener('pointermove', onMove); root.removeEventListener('pointerleave', onLeave); };
  }, []);

  function copyLabel() {
    void copyText(label).then(ok => {
      if (!ok) return;
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  }

  return <section ref={hero} className="hero" aria-labelledby="hero-title">
    <span className="spark spark-a" aria-hidden="true" />
    <span className="spark spark-b" aria-hidden="true" />
    <span className="spark spark-c" aria-hidden="true" />
    <div className="hero-inner">
      <div className="hero-coin-wrap">
        <div className="hero-glow" aria-hidden="true" />
        <Image className="hero-coin" src={asset('/branding/winu-logo-transparent.png')} alt="Whale Inu $WINU logo, a crowned golden whale with Shiba Inu ears" width={1024} height={1024} priority sizes="(max-width: 760px) 192px, 256px" />
      </div>
      <h1 id="hero-title">THE INTERNET&apos;S<br /><span>INU-WHALE.</span></h1>
      <p className="hero-lead">A cheeky, enormous gold whale with the ears, eyes, and personality of a Shiba Inu. Too big to be an Inu. Too meme to be a whale.</p>
      <div className="hero-ca">
        <button type="button" className="ca-pill" onClick={copyLabel} aria-live="polite">
          <code>{label}</code>
          <span className="ca-copy">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
    </div>
  </section>;
}
