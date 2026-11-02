'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useHome } from './useHome';

const SIZES = '(max-width: 1000px) 88vw, 880px';

export default function Gallery() {
  const { c } = useHome();
  const g = c.gallery;
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector('article');
    if (!track || !card) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: dir * (card.getBoundingClientRect().width + 16), behavior: reduce ? 'auto' : 'smooth' });
  };

  const [bb, aluno, aura, wod] = g.slides;

  return (
    <section id="telas" className="pf-sec">
      <div className="pf-wrap pf-gal-head">
        <div>
          <h2 className="pf-disp pf-h2">{g.title}</h2>
          <p className="pf-lead">{g.lead}</p>
        </div>
        <div className="pf-gal-nav">
          <button type="button" className="pf-tool" onClick={() => scrollByCard(-1)} aria-label={g.prev}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className="pf-tool" onClick={() => scrollByCard(1)} aria-label={g.next}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <div ref={trackRef} className="pf-track" role="region" aria-label={g.region} tabIndex={0}>
        <article className="pf-slide">
          <Image className="pf-shot" src="/images/home/bb-landing.jpg" alt={bb.alt} width={1440} height={580} sizes={SIZES} style={{ background: '#0D0D10' }} />
          <Body slide={bb} />
        </article>

        <article className="pf-slide">
          <div className="pf-shot-phone">
            <Image src="/images/home/bb-app-aluno.jpg" alt={aluno.alt} width={340} height={570} sizes="(max-width: 600px) 40vw, 250px" />
          </div>
          <Body slide={aluno} />
        </article>

        <article className="pf-slide">
          <Image className="pf-shot" src="/images/home/aura.jpg" alt={aura.alt} width={1104} height={256} sizes={SIZES} style={{ background: '#0A1220' }} />
          <Body slide={aura} />
        </article>

        <article className="pf-slide dark">
          <div className="pf-wodbox" role="img" aria-label={wod.alt}>
            <span aria-hidden="true">WOD.</span>
          </div>
          <Body slide={wod} />
        </article>
      </div>
    </section>
  );
}

function Body({ slide }: { slide: { name: string; tagline: string; bullets: readonly string[]; footnote: string } }) {
  return (
    <div className="pf-sbody">
      <div className="pf-stitle">
        <b>{slide.name}</b>
        <span>{slide.tagline}</span>
      </div>
      <ul className="pf-slist">
        {slide.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <span className="pf-sfoot">{slide.footnote}</span>
    </div>
  );
}
