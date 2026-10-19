import { site } from '@/content/site';
import { Icon } from './Icons';
import { Reveal } from './Reveal';

function SocialCard({ label, title, body, href }: { label: string; title: string; body: string; href: string | null }) {
  const inner = <>
    <p className="kicker">{label}</p>
    <h3>{title}</h3>
    <div className="social-foot">
      <p>{body}</p>
      <Icon name="external" size={22} />
    </div>
  </>;
  if (!href) return <article className="social-card is-soon" aria-disabled="true">{inner}</article>;
  return <a className="social-card" href={href} target="_blank" rel="noopener noreferrer">{inner}</a>;
}

export function Community() {
  return <section className="community-section" id="community" aria-labelledby="community-heading">
    <div className="community-glow" aria-hidden="true" />
    <div className="wrap community-wrap">
      <Reveal><h2 id="community-heading" className="display-xl">Internet whales<br />belong together.</h2></Reveal>
      <div className="social-grid">
        <Reveal><SocialCard label={site.links.x ? 'Official X' : 'Coming soon'} title="Official X" body="Announcements, new art, and the occasional deep-dive update." href={site.links.x} /></Reveal>
        <Reveal delay={100}><SocialCard label={site.links.telegram ? 'Official Telegram' : 'Coming soon'} title="Telegram" body="The group chat for the pod. Come say bloop when the door opens." href={site.links.telegram} /></Reveal>
      </div>
    </div>
  </section>;
}
