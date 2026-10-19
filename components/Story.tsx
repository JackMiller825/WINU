import Image from 'next/image';
import { timeline } from '@/content/site';
import { asset } from '@/lib/assets';
import { Reveal } from './Reveal';

export function Story() {
  return <section className="story-section" id="story" aria-labelledby="story-heading">
    <div className="wrap wrap-story">
      <Reveal><h2 id="story-heading" className="display-xl">Every legend<br />starts somewhere.</h2></Reveal>
      <div className="story-list">
        {timeline.map((scene, index) => <Reveal key={scene.number}><article className={`story-row ${index % 2 === 1 ? 'story-flip' : ''}`}>
          <div className="story-copy">
            <p className="kicker">{scene.kicker}</p>
            <h3>{scene.title}</h3>
            <p>{scene.description}</p>
          </div>
          <div className={`story-frame ${index === 1 ? 'story-frame-lift' : ''}`}>
            <Image src={asset(`/images/${scene.image}`)} alt={scene.alt} width={1024} height={1280} sizes="(max-width: 780px) 92vw, 420px" />
          </div>
        </article></Reveal>)}
      </div>
    </div>
  </section>;
}
