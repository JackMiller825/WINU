'use client';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { gallery, galleryCategories, type GalleryCategory } from '@/content/site';
import { asset } from '@/lib/assets';
import { Icon } from './Icons';
import { Reveal } from './Reveal';

export function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory>('All');
  const [selected, setSelected] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const openArtwork = (index: number) => { restoreFocus.current = document.activeElement as HTMLElement | null; setSelected(index); };
  const closeArtwork = useCallback(() => { setSelected(null); window.setTimeout(() => restoreFocus.current?.focus(), 0); }, []);
  const selectedItem = selected === null ? null : gallery[selected];
  const filtered = gallery.map((item, index) => ({ ...item, index })).filter(item => filter === 'All' || item.category === filter);
  const next = useCallback((step: number) => setSelected(current => current === null ? null : (current + step + gallery.length) % gallery.length), []);
  useEffect(() => {
    if (selected === null) return;
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeArtwork();
      if (event.key === 'ArrowRight') next(1);
      if (event.key === 'ArrowLeft') next(-1);
      if (event.key === 'Tab') {
        const focusables = Array.from(document.querySelectorAll<HTMLButtonElement>('.gallery-dialog button:not([disabled])'));
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (focusables.length && event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (focusables.length && !event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prevOverflow; document.removeEventListener('keydown', onKey); };
  }, [selected, next, closeArtwork]);

  return <section className="gallery-section" id="gallery" aria-labelledby="gallery-heading">
    <div className="wrap wrap-wide">
      <Reveal><div className="center-head">
        <h2 id="gallery-heading" className="display-lg">Confirmed Sightings</h2>
        <p>The golden inu-whale spotted in the wild. Every scene is satire, not history.</p>
      </div></Reveal>
      <div className="gallery-toolbar" role="group" aria-label="Filter gallery by era">
        {galleryCategories.map(cat => <button className={filter === cat ? 'is-active' : ''} type="button" aria-pressed={filter === cat} key={cat} onClick={() => setFilter(cat)}>{cat}</button>)}
        <span className="gallery-count">{String(filtered.length).padStart(2, '0')} sightings</span>
      </div>
      <div className="gallery-grid">
        {filtered.map((item, i) => <Reveal key={item.image} delay={(i % 3) * 80}><button type="button" className="gallery-card" onClick={() => openArtwork(item.index)} aria-label={`Open artwork: ${item.title}`}>
          <Image src={asset(`/images/${item.image}`)} alt={item.alt} width={1024} height={1365} sizes="(max-width: 700px) 46vw, 30vw" loading="lazy" />
          <span className="gallery-shade">{item.title}</span>
        </button></Reveal>)}
      </div>
    </div>
    {selectedItem && <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) closeArtwork(); }}>
      <div className="gallery-dialog" role="dialog" aria-modal="true" aria-label={`${selectedItem.title} art details`}>
        <button ref={closeButton} className="modal-close" type="button" onClick={closeArtwork} aria-label="Close artwork"><Icon name="close" size={20} /></button>
        <div className="modal-art"><Image src={asset(`/images/${selectedItem.image}`)} alt={selectedItem.alt} width={1024} height={1024} sizes="(max-width: 760px) 92vw, 420px" /></div>
        <div className="modal-info">
          <p className="kicker">{selectedItem.era}</p>
          <h3>{selectedItem.title}</h3>
          <p>{selectedItem.description}</p>
          <div className="modal-controls">
            <button type="button" onClick={() => next(-1)} aria-label="Previous artwork">Previous</button>
            <span>{String(selected! + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span>
            <button type="button" onClick={() => next(1)} aria-label="Next artwork">Next</button>
          </div>
        </div>
      </div>
    </div>}
  </section>;
}
