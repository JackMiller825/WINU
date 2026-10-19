import { buySteps, site } from '@/content/site';
import { Reveal } from './Reveal';

export function HowToBuy() {
  return <section className="how-section" id="how-to-buy" aria-labelledby="how-heading">
    <div className="wrap">
      <Reveal><div className="center-head">
        <h2 id="how-heading" className="display-lg glow-text">How to get in</h2>
        <p>Four steps between you and the pod. Ethereum Mainnet. No invented buy links.</p>
      </div></Reveal>
      <div className="step-grid">
        {buySteps.map((step, index) => <Reveal key={step.num} delay={index * 80}><article className="step-card">
          <p className="step-num">{step.num}</p>
          <h3>{step.title}</h3>
          <p>{step.body}</p>
        </article></Reveal>)}
      </div>
      <p className="how-note">Official contract: <strong>{site.tokenAddress ?? 'Coming Soon..'}</strong></p>
    </div>
  </section>;
}
