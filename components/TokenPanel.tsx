'use client';
import { useState } from 'react';
import { site } from '@/content/site';
import { copyText } from '@/lib/copy';
import { Reveal } from './Reveal';

export function TokenPanel() {
  const [copied, setCopied] = useState(false);
  const label = site.tokenAddress ?? 'Coming Soon..';
  function copyAddress() {
    void copyText(label).then(ok => {
      if (!ok) return;
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    });
  }
  return <section className="contract-section" id="coin" aria-labelledby="token-heading">
    <div className="wrap wrap-narrow">
      <Reveal><div className="contract-card">
        <div className="contract-head">
          <div>
            <p className="kicker">{site.chain}</p>
            <h2 id="token-heading" className="display-lg">Contract address</h2>
          </div>
        </div>
        <div className="contract-row">
          <code>{label}</code>
          <button type="button" onClick={copyAddress} aria-live="polite">
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div></Reveal>
    </div>
  </section>;
}
