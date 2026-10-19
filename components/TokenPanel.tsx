'use client';
import { useState } from 'react';
import { site } from '@/content/site';
import { Icon } from './Icons';
import { Reveal } from './Reveal';

const facts = [
  { label: 'Total supply', value: site.supply, note: 'WINU' },
  { label: 'Buy / sell tax', value: site.tax, note: 'No token tax' },
  { label: 'Liquidity', value: 'LP burn', note: site.liquidity.status === 'completed' ? 'Completed' : 'Planned — not verified' },
  { label: 'Ownership', value: 'Renounce', note: site.ownership.status === 'completed' ? 'Completed' : 'Planned — not verified' },
];

export function TokenPanel() {
  const [copied, setCopied] = useState(false);
  async function copyAddress() {
    if (!site.tokenAddress || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(site.tokenAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }
  return <section className="contract-section" id="coin" aria-labelledby="token-heading">
    <div className="wrap wrap-narrow">
      <Reveal><div className="contract-card">
        <div className="contract-head">
          <div>
            <p className="kicker">{site.chain}</p>
            <h2 id="token-heading" className="display-lg">Contract address</h2>
          </div>
          <div className="contract-eyes" aria-hidden="true"><Icon name="globe" size={28} /><Icon name="globe" size={28} /></div>
        </div>
        <div className="contract-row">
          <code>{site.tokenAddress ?? 'Coming Soon..'}</code>
          <button type="button" onClick={copyAddress} disabled={!site.tokenAddress} aria-live="polite" title={site.tokenAddress ? 'Copy contract address' : 'Contract address has not been published'}>
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <p className="contract-note">Always verify the address before buying. The whale is a whale, not financial advice. Liquidity burn and ownership renounce stay planned until there is on-chain proof.</p>
        <div className="fact-grid">
          {facts.map(fact => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong><small>{fact.note}</small></div>)}
        </div>
      </div></Reveal>
    </div>
  </section>;
}
