'use client';
import { useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/assets';
import { Icon } from './Icons';

export type GameId = 'surf' | 'whack' | 'air';

const copy: Record<GameId, { title: string; blurb: string; cta: string }> = {
  surf: { title: 'Candle Surfer', blurb: 'Tap, click, or press space to swim. Surf the gap between red and green candles. Do not get wicked.', cta: 'Dive In' },
  whack: { title: 'Whack-a-Rug', blurb: 'Bonk the crabs. Leave the golden whale alone. You have thirty seconds.', cta: 'Grab the Mallet' },
  air: { title: 'Blowhole Airdrops', blurb: 'Drag or move the chest. Catch coins, pearls, and gems. Three misses and the tide wins.', cta: 'Catch Treasure' },
};

export function GameModal({ game, onClose }: { game: GameId; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [phase, setPhase] = useState<'intro' | 'play' | 'over'>('intro');
  const [score, setScore] = useState(0);
  useEffect(() => { setPhase('intro'); setScore(0); }, [game]);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === ' ' && phase !== 'play') event.preventDefault();
      if (event.key === 'Tab') {
        const nodes = Array.from(document.querySelectorAll<HTMLElement>('.game-dialog button, .game-dialog canvas'));
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, phase]);

  return <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="game-dialog" role="dialog" aria-modal="true" aria-label={`${copy[game].title} game`}>
      <button ref={closeRef} className="modal-close" type="button" onClick={onClose} aria-label="Close game"><Icon name="close" size={18} /></button>
      {phase === 'intro' && <div className="game-intro">
        <img src={asset('/branding/winu-logo-transparent.png')} alt="" width={112} height={112} />
        <h3>{copy[game].title}</h3>
        <p>{copy[game].blurb}</p>
        <button type="button" className="gold-btn" onClick={() => setPhase('play')}>{copy[game].cta}</button>
      </div>}
      {phase === 'play' && game === 'surf' && <CandleSurfer onEnd={value => { setScore(value); setPhase('over'); }} />}
      {phase === 'play' && game === 'whack' && <WhackRug onEnd={value => { setScore(value); setPhase('over'); }} />}
      {phase === 'play' && game === 'air' && <Airdrop onEnd={value => { setScore(value); setPhase('over'); }} />}
      {phase === 'over' && <div className="game-intro">
        <h3>Tide&apos;s out</h3>
        <p>Score {score}. The inu-whale is already asking for another round.</p>
        <button type="button" className="gold-btn" onClick={() => { setScore(0); setPhase('play'); }}>Play again</button>
      </div>}
    </div>
  </div>;
}

function useSprite() {
  const sprite = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const image = new Image();
    image.src = asset('/branding/winu-logo-transparent.png');
    sprite.current = image;
  }, []);
  return sprite;
}

function CandleSurfer({ onEnd }: { onEnd: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sprite = useSprite();
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 480;
    let height = 560;
    const fit = () => {
      width = Math.min(480, canvas.parentElement?.clientWidth || 480);
      height = Math.round(width * 1.15);
      canvas.width = width;
      canvas.height = height;
    };
    fit();
    let y = height * 0.45;
    let v = 0;
    let score = 0;
    let alive = true;
    const gap = () => Math.max(148, height * 0.28);
    const pipes: { x: number; gapY: number; scored: boolean }[] = [{ x: width + 40, gapY: height * 0.45, scored: false }];
    const flap = () => { if (alive) v = reduce ? -5 : -7.2; };
    const onKey = (event: KeyboardEvent) => { if (event.code === 'Space' || event.key === ' ') { event.preventDefault(); flap(); } };
    window.addEventListener('keydown', onKey);
    canvas.addEventListener('pointerdown', flap);
    let raf = 0;
    const loop = () => {
      v += reduce ? 0.22 : 0.34;
      y += v;
      const speed = reduce ? 1.6 : 2.5 + Math.min(score, 20) * 0.05;
      if (pipes[pipes.length - 1].x < width - 230) pipes.push({ x: width + 30, gapY: 90 + Math.random() * (height - gap() - 160), scored: false });
      for (const pipe of pipes) pipe.x -= speed;
      while (pipes.length && pipes[0].x < -80) pipes.shift();
      const whaleX = width * 0.22;
      const radius = 22;
      if (y < radius || y > height - radius) alive = false;
      for (const pipe of pipes) {
        const g = gap();
        const hitX = whaleX + radius > pipe.x && whaleX - radius < pipe.x + 58;
        const hitY = y - radius < pipe.gapY || y + radius > pipe.gapY + g;
        if (hitX && hitY) alive = false;
        if (!pipe.scored && pipe.x + 58 < whaleX) { pipe.scored = true; score += 1; }
      }
      ctx.clearRect(0, 0, width, height);
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#07101f');
      gradient.addColorStop(1, '#03060d');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      for (const pipe of pipes) {
        const g = gap();
        ctx.fillStyle = '#c23b3b';
        ctx.fillRect(pipe.x, 0, 58, pipe.gapY - 8);
        ctx.fillStyle = '#1f8a4c';
        ctx.fillRect(pipe.x, pipe.gapY + g + 8, 58, height);
        ctx.fillStyle = '#ffbf00';
        ctx.fillRect(pipe.x + 24, pipe.gapY - 22, 6, 16);
        ctx.fillRect(pipe.x + 24, pipe.gapY + g + 8, 6, 16);
      }
      const img = sprite.current;
      if (img && img.complete) ctx.drawImage(img, whaleX - 28, y - 28, 56, 56);
      else { ctx.fillStyle = '#ffbf00'; ctx.beginPath(); ctx.arc(whaleX, y, radius, 0, Math.PI * 2); ctx.fill(); }
      ctx.fillStyle = '#fff2cc';
      ctx.font = '700 18px Outfit, sans-serif';
      ctx.fillText(String(score), 18, 32);
      if (!alive) { cancelAnimationFrame(raf); onEndRef.current(score); return; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { alive = false; cancelAnimationFrame(raf); window.removeEventListener('keydown', onKey); canvas.removeEventListener('pointerdown', flap); };
  }, [sprite]);
  return <canvas ref={canvasRef} className="game-canvas" aria-label="Candle Surfer playfield. Press space or tap to swim." />;
}

function WhackRug({ onEnd }: { onEnd: (score: number) => void }) {
  const [holes, setHoles] = useState<(null | 'crab' | 'whale')[]>(Array(9).fill(null));
  const [score, setScore] = useState(0);
  const [left, setLeft] = useState(30);
  const scoreRef = useRef(0);
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;
  useEffect(() => {
    const started = Date.now();
    let ended = false;
    const pop = window.setInterval(() => {
      setHoles(Array.from({ length: 9 }, () => (Math.random() > 0.55 ? (Math.random() > 0.78 ? 'whale' : 'crab') : null)));
    }, 850);
    const clock = window.setInterval(() => {
      const remain = Math.max(0, 30 - Math.floor((Date.now() - started) / 1000));
      setLeft(remain);
      if (remain === 0 && !ended) {
        ended = true;
        window.clearInterval(pop);
        window.clearInterval(clock);
        onEndRef.current(scoreRef.current);
      }
    }, 250);
    return () => { ended = true; window.clearInterval(pop); window.clearInterval(clock); };
  }, []);
  function hit(kind: 'crab' | 'whale', index: number) {
    setHoles(current => current.map((hole, i) => i === index ? null : hole));
    setScore(value => {
      const next = Math.max(0, value + (kind === 'crab' ? 10 : -15));
      scoreRef.current = next;
      return next;
    });
  }
  return <div className="whack">
    <div className="whack-hud"><span>Score {score}</span><span>{left}s</span></div>
    <div className="whack-grid">
      {holes.map((hole, index) => <button key={index} type="button" className={`whack-hole ${hole ? 'is-up' : ''}`} onClick={() => hole && hit(hole, index)} aria-label={hole === 'crab' ? 'Bonk crab' : hole === 'whale' ? 'That is the whale' : 'Empty hole'}>
        <span>{hole === 'crab' ? '🦀' : hole === 'whale' ? '🐳' : ''}</span>
      </button>)}
    </div>
  </div>;
}

function Airdrop({ onEnd }: { onEnd: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = Math.min(480, canvas.parentElement?.clientWidth || 480);
    let height = Math.round(width * 1.15);
    canvas.width = width;
    canvas.height = height;
    let chest = width / 2;
    let score = 0;
    let misses = 0;
    let alive = true;
    const loot = ['coin', 'pearl', 'gem'] as const;
    type Drop = { x: number; y: number; kind: typeof loot[number]; vy: number };
    const drops: Drop[] = [];
    const move = (clientX: number) => {
      const rect = canvas.getBoundingClientRect();
      chest = ((clientX - rect.left) / rect.width) * width;
    };
    const onPointer = (event: PointerEvent) => move(event.clientX);
    canvas.addEventListener('pointerdown', onPointer);
    canvas.addEventListener('pointermove', onPointer);
    let raf = 0;
    let tick = 0;
    const loop = () => {
      tick += 1;
      const pace = 1 + Math.min(score, 40) * 0.03;
      if (tick % Math.max(18, 46 - score) === 0) drops.push({ x: 24 + Math.random() * (width - 48), y: -16, kind: loot[Math.floor(Math.random() * 3)], vy: (1.6 + Math.random()) * pace });
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#07101f';
      ctx.fillRect(0, 0, width, height);
      for (let i = drops.length - 1; i >= 0; i -= 1) {
        const drop = drops[i];
        drop.y += drop.vy;
        const caught = drop.y > height - 56 && Math.abs(drop.x - chest) < 42;
        if (caught) { score += drop.kind === 'gem' ? 5 : drop.kind === 'pearl' ? 3 : 1; drops.splice(i, 1); continue; }
        if (drop.y > height) { misses += 1; drops.splice(i, 1); if (misses >= 3) alive = false; continue; }
        ctx.font = '22px serif';
        ctx.fillText(drop.kind === 'gem' ? '💎' : drop.kind === 'pearl' ? '🫧' : '🪙', drop.x - 11, drop.y);
      }
      ctx.fillStyle = '#ffbf00';
      ctx.beginPath();
      ctx.roundRect(chest - 36, height - 42, 72, 26, 8);
      ctx.fill();
      ctx.fillStyle = '#fff2cc';
      ctx.font = '700 16px Outfit, sans-serif';
      ctx.fillText(`${score}   misses ${misses}/3`, 16, 28);
      if (!alive) { cancelAnimationFrame(raf); onEndRef.current(score); return; }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { alive = false; cancelAnimationFrame(raf); canvas.removeEventListener('pointerdown', onPointer); canvas.removeEventListener('pointermove', onPointer); };
  }, []);
  return <canvas ref={canvasRef} className="game-canvas" aria-label="Blowhole Airdrops. Move the chest to catch falling treasure." />;
}
