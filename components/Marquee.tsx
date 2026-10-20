import { site, slogans } from '@/content/site';

export function Marquee() {
  return <div className="marquee" aria-label={`${site.name} slogans`}>
    <div className="marquee-track">
      {[0, 1].map(copy => <div className="marquee-set" key={copy} aria-hidden={copy === 1}>
        {slogans.map((line, index) => <span key={`${copy}-${index}`}>{line}<span className="marquee-gem" aria-hidden="true">✦</span></span>)}
      </div>)}
    </div>
  </div>;
}
