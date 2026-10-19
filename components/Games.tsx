'use client';
import { useEffect, useRef, useState } from 'react';
import { asset } from '@/lib/assets';
import { Icon } from './Icons';

export type GameId = 'surf' | 'whack' | 'air';

const intro: Record<GameId, { title: string; blurb: string; cta: string; best: string }> = {
  surf: { title: 'Candle Surfer', blurb: 'Tap, click, or press space to swim. Surf the gap between red and green candles. Do not get wicked.', cta: 'Dive In', best: 'winu-surfer-best' },
  whack: { title: 'Whack-a-Rug', blurb: 'Rug-puller crabs sneak out of the reef. Bonk them (+1). Never bonk the golden whale (−3). 30 seconds.', cta: 'Grab the Mallet', best: 'winu-whack-best' },
  air: { title: 'Blowhole Airdrops', blurb: 'Drag the chest to catch coins (+1), pearls (+2) and gems (+3). It gets faster. Miss 3 and the tide takes you.', cta: 'Catch Treasure', best: 'winu-airdrop-best' },
};

function readBest(key: string) {
  try { return Number(localStorage.getItem(key) || 0); } catch { return 0; }
}
function writeBest(key: string, score: number) {
  const next = Math.max(readBest(key), score);
  try { localStorage.setItem(key, String(next)); } catch { /* private mode */ }
  return next;
}

export function GameModal({ game, onClose }: { game: GameId; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [phase, setPhase] = useState<'intro' | 'play' | 'over'>('intro');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  useEffect(() => { setPhase('intro'); setScore(0); setBest(readBest(intro[game].best)); }, [game]);
  useEffect(() => {
    if (phase !== 'play') closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (phase === 'play' && (event.key === ' ' || event.key.startsWith('Arrow'))) event.preventDefault();
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

  function finish(value: number) {
    setScore(value);
    setBest(writeBest(intro[game].best, value));
    setPhase('over');
  }

  return <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="game-dialog" role="dialog" aria-modal="true" aria-label={`${intro[game].title} game`} onMouseDown={event => event.stopPropagation()}>
      <button ref={closeRef} className="modal-close" type="button" onClick={onClose} aria-label="Close game"><Icon name="close" size={18} /></button>
      {phase === 'intro' && <div className="game-intro">
        <img src={asset('/branding/winu-logo-transparent.png')} alt="" width={112} height={112} />
        <h3>{intro[game].title}</h3>
        <p>{intro[game].blurb}</p>
        {best > 0 && <p className="game-best">Best: {best}</p>}
        <button type="button" className="gold-btn" onClick={() => setPhase('play')}>{intro[game].cta}</button>
      </div>}
      {phase === 'play' && game === 'surf' && <CandleSurfer onEnd={finish} />}
      {phase === 'play' && game === 'whack' && <WhackRug onEnd={finish} />}
      {phase === 'play' && game === 'air' && <Airdrop onEnd={finish} />}
      {phase === 'over' && <div className="game-intro">
        <h3>{score}</h3>
        <p>Best: {best}</p>
        <button type="button" className="gold-btn" onClick={() => setPhase('play')}>Play again</button>
      </div>}
    </div>
  </div>;
}

function hudFont(size: number) {
  const family = getComputedStyle(document.documentElement).getPropertyValue('--font-luckiest').trim();
  return `700 ${size}px ${family || 'sans-serif'}, sans-serif`;
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

const SURF_W = 480;
const SURF_H = 560;

function CandleSurfer({ onEnd }: { onEnd: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sprite = useSprite();
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const state = { y: SURF_H / 2, vy: 0, score: 0, frame: 0, alive: true, candles: [] as { x: number; gapY: number; passed: boolean }[] };
    const flap = () => { if (state.alive) state.vy = -4.8; };
    const onKey = (event: KeyboardEvent) => {
      if (event.code === 'Space' || event.code === 'ArrowUp') { event.preventDefault(); flap(); }
    };
    window.addEventListener('keydown', onKey);
    let raf = 0;
    const end = () => { if (!state.alive) return; state.alive = false; cancelAnimationFrame(raf); onEndRef.current(state.score); };
    const loop = () => {
      if (!state.alive) return;
      state.frame += 1;
      if (state.frame > 45) {
        state.vy = Math.min(state.vy + 0.18, 7);
        state.y += state.vy;
      } else state.y = SURF_H / 2 + Math.sin(state.frame / 8) * 6;
      const speed = Math.min(1.8 + state.score * 0.06, 3.2);
      if (state.frame % 110 === 50) {
        const spread = Math.min(90 + state.score * 40, SURF_H - 260);
        const gapY = Math.max(130, Math.min(SURF_H - 130, SURF_H / 2 + (Math.random() - 0.5) * spread));
        state.candles.push({ x: SURF_W + 64, gapY, passed: false });
      }
      for (const candle of state.candles) candle.x -= speed;
      state.candles = state.candles.filter(candle => candle.x > -64);
      const whaleX = 110;
      const radius = 22;
      if (state.y - radius < 0) { state.y = radius; state.vy = Math.max(state.vy, 0); }
      if (state.y + radius > SURF_H) return end();
      for (const candle of state.candles) {
        const top = candle.gapY - 100;
        const bottom = candle.gapY + 100;
        const overlaps = whaleX + radius > candle.x && whaleX - radius < candle.x + 64;
        if (overlaps && (state.y - radius < top || state.y + radius > bottom)) return end();
        if (!candle.passed && candle.x + 64 < whaleX - radius) { candle.passed = true; state.score += 1; }
      }
      ctx.clearRect(0, 0, SURF_W, SURF_H);
      const sky = ctx.createLinearGradient(0, 0, 0, SURF_H);
      sky.addColorStop(0, '#060b18');
      sky.addColorStop(1, '#0a1428');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, SURF_W, SURF_H);
      for (const candle of state.candles) {
        const top = candle.gapY - 100;
        const bottom = candle.gapY + 100;
        ctx.fillStyle = '#e3405b';
        ctx.fillRect(candle.x, 0, 64, top);
        ctx.fillRect(candle.x + 29, top, 6, 18);
        ctx.fillStyle = '#2ecc71';
        ctx.fillRect(candle.x, bottom, 64, SURF_H - bottom);
        ctx.fillRect(candle.x + 29, bottom - 18, 6, 18);
      }
      const img = sprite.current;
      ctx.save();
      ctx.translate(whaleX, state.y);
      ctx.rotate(Math.max(-0.3, Math.min(0.45, state.vy / 14)));
      if (img && img.complete && img.naturalWidth > 0) ctx.drawImage(img, -38, -38, 76, 76);
      else { ctx.fillStyle = '#ffbf00'; ctx.beginPath(); ctx.arc(0, 0, radius, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore();
      ctx.fillStyle = 'rgba(255, 215, 0, 0.95)';
      ctx.font = hudFont(40);
      ctx.textAlign = 'center';
      ctx.fillText(String(state.score), SURF_W / 2, 60);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    canvas.addEventListener('pointerdown', flap);
    return () => { state.alive = false; cancelAnimationFrame(raf); window.removeEventListener('keydown', onKey); canvas.removeEventListener('pointerdown', flap); };
  }, [sprite]);
  return <canvas ref={canvasRef} width={SURF_W} height={SURF_H} className="game-canvas" aria-label="Candle Surfer. Press space or tap to swim." />;
}

type Hole = { kind: 'none' | 'crab' | 'whale'; whacked: boolean };

function WhackRug({ onEnd }: { onEnd: (score: number) => void }) {
  const [holes, setHoles] = useState<Hole[]>(() => Array.from({ length: 9 }, () => ({ kind: 'none' as const, whacked: false })));
  const [score, setScore] = useState(0);
  const [left, setLeft] = useState(30);
  const [flash, setFlash] = useState<{ index: number; delta: number } | null>(null);
  const holesRef = useRef(holes);
  const scoreRef = useRef(0);
  const timers = useRef<number[]>([]);
  const generation = useRef(0);
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;
  holesRef.current = holes;

  function later(fn: () => void, ms: number) {
    const gen = generation.current;
    const id = window.setTimeout(() => { if (generation.current === gen) fn(); }, ms);
    timers.current.push(id);
  }
  function clearTimers() {
    timers.current.forEach(id => window.clearTimeout(id));
    timers.current = [];
  }

  useEffect(() => {
    let remain = 30;
    const tick = window.setInterval(() => {
      remain -= 1;
      setLeft(remain);
      if (remain <= 0) {
        window.clearInterval(tick);
        generation.current += 1;
        clearTimers();
        onEndRef.current(scoreRef.current);
      }
    }, 1000);
    let stopped = false;
    const pop = () => {
      if (stopped) return;
      const open = holesRef.current.map((hole, index) => hole.kind === 'none' ? index : -1).filter(index => index >= 0);
      if (open.length) {
        const index = open[Math.floor(Math.random() * open.length)];
        const kind = Math.random() < 0.75 ? 'crab' : 'whale';
        setHoles(current => current.map((hole, i) => i === index ? { kind, whacked: false } : hole));
        later(() => {
          setHoles(current => {
            if (current[index].kind === kind && !current[index].whacked) return current.map((hole, i) => i === index ? { kind: 'none', whacked: false } : hole);
            return current;
          });
        }, 650 + Math.random() * 500);
      }
      later(pop, 350 + Math.random() * 350);
    };
    pop();
    return () => { stopped = true; generation.current += 1; window.clearInterval(tick); clearTimers(); };
  }, []);

  function hit(index: number) {
    const hole = holesRef.current[index];
    if (!hole || hole.kind === 'none' || hole.whacked) return;
    const delta = hole.kind === 'crab' ? 1 : -3;
    setHoles(current => current.map((item, i) => i === index ? { ...item, whacked: true } : item));
    setScore(value => { const next = Math.max(0, value + delta); scoreRef.current = next; return next; });
    setFlash({ index, delta });
    later(() => setFlash(null), 400);
    later(() => setHoles(current => current.map((item, i) => i === index ? { kind: 'none', whacked: false } : item)), 200);
  }

  return <div className="whack">
    <div className="whack-hud"><span>Score {score}</span><span className={left <= 5 ? 'is-low' : ''}>{left}s</span></div>
    <div className="whack-grid">
      {holes.map((hole, index) => <button key={index} type="button" className="whack-hole" onClick={() => hit(index)} aria-label={hole.kind === 'crab' ? 'Bonk crab' : hole.kind === 'whale' ? 'That is the whale' : 'Empty hole'}>
        <span className={`whack-critter ${hole.kind !== 'none' && !hole.whacked ? 'is-up' : ''}`}>{hole.kind === 'crab' ? '🦀' : hole.kind === 'whale' ? '🐳' : ''}</span>
        {flash?.index === index && <em className={flash.delta > 0 ? 'is-plus' : 'is-minus'}>{flash.delta > 0 ? '+1' : '−3'}</em>}
      </button>)}
    </div>
  </div>;
}

const AIR_W = 480;
const AIR_H = 560;

function Airdrop({ onEnd }: { onEnd: (score: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const chestW = 96;
    const chestH = 72;
    type Kind = 'coin' | 'pearl' | 'gem';
    const points: Record<Kind, number> = { coin: 1, pearl: 2, gem: 3 };
    const sizes: Record<Kind, number> = { coin: 44, pearl: 42, gem: 38 };
    const state = {
      chestX: AIR_W / 2,
      targetX: AIR_W / 2,
      score: 0,
      misses: 0,
      elapsed: 0,
      nextSpawn: 50,
      alive: true,
      items: [] as { kind: Kind; x: number; y: number; vy: number; drift: number; wobble: number }[],
      bursts: [] as { x: number; y: number; text: string; color: string; age: number }[],
    };
    const toX = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return ((event.clientX - rect.left) / rect.width) * AIR_W;
    };
    const onDown = (event: PointerEvent) => { canvas.setPointerCapture(event.pointerId); state.targetX = toX(event); };
    const onMove = (event: PointerEvent) => { if (event.currentTarget === canvas && (event.buttons > 0 || canvas.hasPointerCapture(event.pointerId))) state.targetX = toX(event); };
    const onKey = (event: KeyboardEvent) => {
      if (event.code === 'ArrowLeft') { event.preventDefault(); state.targetX = Math.max(chestW / 2, state.targetX - 48); }
      if (event.code === 'ArrowRight') { event.preventDefault(); state.targetX = Math.min(AIR_W - chestW / 2, state.targetX + 48); }
    };
    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    window.addEventListener('keydown', onKey);
    let raf = 0;
    const end = () => { if (!state.alive) return; state.alive = false; cancelAnimationFrame(raf); onEndRef.current(state.score); };
    const drawGem = (size: number) => {
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(size / 2, 0);
      ctx.lineTo(0, size / 2);
      ctx.lineTo(-size / 2, 0);
      ctx.closePath();
      ctx.fill();
    };
    const loop = () => {
      if (!state.alive) return;
      state.elapsed += 1;
      const ramp = Math.min(state.elapsed / 3600, 1);
      const pace = 1 + ramp * 1.6;
      const gap = Math.round(95 - ramp * 50);
      state.chestX += (state.targetX - state.chestX) * 0.25;
      state.chestX = Math.max(chestW / 2, Math.min(AIR_W - chestW / 2, state.chestX));
      if (state.elapsed >= state.nextSpawn) {
        state.nextSpawn = state.elapsed + gap + Math.random() * 20;
        const roll = Math.random();
        const kind: Kind = roll < 0.55 ? 'coin' : roll < 0.85 ? 'pearl' : 'gem';
        state.items.push({ kind, x: 40 + Math.random() * (AIR_W - 80), y: -40, vy: pace * (0.85 + Math.random() * 0.4), drift: (Math.random() - 0.5) * 0.8, wobble: Math.random() * Math.PI * 2 });
      }
      const floor = AIR_H - chestH - 8;
      const kept = [];
      for (const item of state.items) {
        item.y += item.vy;
        item.wobble += 0.05;
        item.x += item.drift + Math.sin(item.wobble) * 0.6;
        const size = sizes[item.kind];
        if (item.x < size / 2) { item.x = size / 2; item.drift = Math.abs(item.drift); }
        if (item.x > AIR_W - size / 2) { item.x = AIR_W - size / 2; item.drift = -Math.abs(item.drift); }
        const caught = item.y + size / 2 >= floor && item.y + size / 2 <= floor + chestH * 0.7 && Math.abs(item.x - state.chestX) < chestW / 2 + size * 0.25;
        if (caught) {
          const gained = points[item.kind];
          state.score += gained;
          state.bursts.push({ x: item.x, y: floor - 10, text: `+${gained}`, color: '#ffd54a', age: 0 });
          continue;
        }
        if (item.y - size / 2 > AIR_H) {
          state.misses += 1;
          state.bursts.push({ x: item.x, y: AIR_H - 30, text: 'miss', color: '#ff5d73', age: 0 });
          if (state.misses >= 3) { end(); return; }
          continue;
        }
        kept.push(item);
      }
      state.items = kept;
      ctx.clearRect(0, 0, AIR_W, AIR_H);
      const sea = ctx.createLinearGradient(0, 0, 0, AIR_H);
      sea.addColorStop(0, '#06263c');
      sea.addColorStop(1, '#020a14');
      ctx.fillStyle = sea;
      ctx.fillRect(0, 0, AIR_W, AIR_H);
      for (const item of state.items) {
        const size = sizes[item.kind];
        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(Math.sin(item.wobble) * 0.15);
        if (item.kind === 'coin') { ctx.fillStyle = '#ffbf00'; ctx.beginPath(); ctx.arc(0, 0, size / 2, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = '#5a3b00'; ctx.font = '700 18px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('W', 0, 6); }
        else if (item.kind === 'pearl') { ctx.fillStyle = '#f4efe4'; ctx.beginPath(); ctx.arc(0, 0, size / 2, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.fillStyle = '#7ee0ff'; drawGem(size); }
        ctx.restore();
      }
      ctx.fillStyle = '#c9842a';
      ctx.beginPath();
      ctx.roundRect(state.chestX - chestW / 2, floor, chestW, chestH, 10);
      ctx.fill();
      ctx.fillStyle = '#ffbf00';
      ctx.fillRect(state.chestX - 16, floor + 28, 32, 22);
      state.bursts.forEach(burst => { burst.age += 1; });
      state.bursts = state.bursts.filter(burst => burst.age < 40);
      for (const burst of state.bursts) {
        ctx.globalAlpha = 1 - burst.age / 40;
        ctx.fillStyle = burst.color;
        ctx.font = hudFont(22);
        ctx.textAlign = 'center';
        ctx.fillText(burst.text, burst.x, burst.y - burst.age * 0.8);
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'rgba(255, 215, 0, 0.95)';
      ctx.font = hudFont(36);
      ctx.textAlign = 'left';
      ctx.fillText(String(state.score), 20, 48);
      for (let life = 0; life < 3; life += 1) {
        ctx.globalAlpha = life < 3 - state.misses ? 1 : 0.25;
        ctx.fillStyle = '#ff5d73';
        ctx.beginPath();
        const hx = AIR_W - 28 - life * 28;
        ctx.arc(hx - 6, 36, 6, 0, Math.PI * 2);
        ctx.arc(hx + 6, 36, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { state.alive = false; cancelAnimationFrame(raf); canvas.removeEventListener('pointerdown', onDown); canvas.removeEventListener('pointermove', onMove); window.removeEventListener('keydown', onKey); };
  }, []);
  return <canvas ref={canvasRef} width={AIR_W} height={AIR_H} className="game-canvas" aria-label="Blowhole Airdrops. Drag the chest or use the arrow keys." />;
}
