'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { activities } from '@/content/site';
import { asset } from '@/lib/assets';
import { Reveal } from './Reveal';
import { GameModal, type GameId } from './Games';

export function Playground() {
  const [game, setGame] = useState<GameId | null>(null);
  const restore = useRef<HTMLElement | null>(null);
  const open = (id: GameId) => { restore.current = document.activeElement as HTMLElement | null; setGame(id); };
  const close = () => { setGame(null); window.setTimeout(() => restore.current?.focus(), 0); };
  useEffect(() => {
    if (!game) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [game]);

  return <section className="play-section" id="playground" aria-labelledby="play-heading">
    <div className="wrap wrap-wide">
      <Reveal><div className="play-head">
        <div>
          <h2 id="play-heading" className="display-xl glow-text">Whale Activities</h2>
          <p>What does a majestic golden inu-whale do all day?</p>
        </div>
        <Image src={asset('/images/whale-banner.png')} alt="WhaleCoin Inu golden coin banner" width={900} height={280} className="play-banner" />
      </div></Reveal>
      <div className="play-grid">
        {activities.map((item, index) => <Reveal key={item.id} delay={index * 90}><article className="play-card">
          <span className="play-emoji" aria-hidden="true">{item.emoji}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <div className="play-actions">
            <button type="button" onClick={() => open(item.id)}>{item.cta}</button>
            <span className="live-pill">live</span>
          </div>
        </article></Reveal>)}
      </div>
    </div>
    {game && <GameModal game={game} onClose={close} />}
  </section>;
}
