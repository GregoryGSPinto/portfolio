'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import { productShows, type ProductShow } from '@/lib/data/produtos';
import { useHome } from './useHome';

const INTERVAL_MS = 4000;
const SWIPE_MIN_PX = 40;

// The server (and the first client render) assume motion is allowed; the real preference is
// applied right after hydration, so nothing differs between server and client markup.
const reducedQuery = '(prefers-reduced-motion: reduce)';
const subscribeReduced = (onChange: () => void) => {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};
const getReduced = () => window.matchMedia(reducedQuery).matches;
const getReducedServer = () => false;

function Arrow({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === 'prev' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
    </svg>
  );
}

function Slideshow({ show }: { show: ProductShow }) {
  const { c, lang } = useHome();
  const g = c.gallery;
  const info = g.products[show.id];
  const total = show.slides.length;

  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [inView, setInView] = useState(false);
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, getReducedServer);

  const rootRef = useRef<HTMLElement>(null);
  const swipeStart = useRef<number | null>(null);

  const running = !userPaused && !hover && !focus && inView && !reduced;
  const go = (n: number) => setIndex(((n % total) + total) % total);

  // Only animate while on screen. The timer restarts after every change, manual or automatic.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % total), INTERVAL_MS);
    return () => window.clearTimeout(id);
  }, [running, index, total]);

  const current = show.slides[index];
  const text = current.text[lang];
  const slideLabel = (n: number, label: string) =>
    g.slideOf.replace('{n}', String(n)).replace('{total}', String(total)).replace('{label}', label);

  return (
    <section
      ref={rootRef}
      className="pf-ps"
      aria-roledescription="carousel"
      aria-label={`${g.region} ${show.name}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocus(false);
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(index - 1);
        if (e.key === 'ArrowRight') go(index + 1);
      }}
    >
      <div className="pf-ps-head">
        <div className="pf-ps-top">
          <h3 className="pf-ps-name">{show.name}</h3>
        {reduced ? null : (
            <button
              type="button"
              className="pf-tool"
              onClick={() => setUserPaused((p) => !p)}
              aria-label={userPaused ? g.play : g.pause}
              aria-pressed={userPaused}
            >
              {userPaused ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" /></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z" /></svg>
              )}
            </button>
        )}
        </div>
        <p className="pf-ps-tag">{info.tagline}</p>
        <p className="pf-ps-foot">{info.footnote}</p>
      </div>

      <div
        className="pf-ps-stage"
        onPointerDown={(e) => {
          swipeStart.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (swipeStart.current === null) return;
          const dx = e.clientX - swipeStart.current;
          swipeStart.current = null;
          if (Math.abs(dx) >= SWIPE_MIN_PX) go(index + (dx < 0 ? 1 : -1));
        }}
        onPointerCancel={() => {
          swipeStart.current = null;
        }}
      >
        {show.slides.map((slide, i) => {
          const active = i === index;
          const t = slide.text[lang];
          return (
            <div
              key={slide.id}
              className={`pf-ps-slide${active ? ' on' : ''}`}
              data-has-mobile={slide.mobile ? 'true' : 'false'}
              data-has-desktop={slide.desktop ? 'true' : 'false'}
              aria-hidden={!active}
              inert={!active}
            >
              {slide.desktop ? (
                <div className="pf-ps-d" style={{ aspectRatio: `${slide.desktop.width} / ${slide.desktop.height}` }}>
                  <Image
                    src={slide.desktop.src}
                    alt={t.altDesktop ?? t.label}
                    width={slide.desktop.width}
                    height={slide.desktop.height}
                    sizes="(max-width: 1000px) 92vw, 640px"
                    priority={i === 0}
                  />
                </div>
              ) : null}
              {slide.mobile ? (
                <div className="pf-ps-m" style={{ aspectRatio: `${slide.mobile.width} / ${slide.mobile.height}` }}>
                  <Image
                    src={slide.mobile.src}
                    alt={t.altMobile ?? t.label}
                    width={slide.mobile.width}
                    height={slide.mobile.height}
                    sizes="(max-width: 760px) 70vw, 220px"
                    priority={i === 0}
                  />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="pf-ps-bottom">
        <div className="pf-ps-cap" aria-live={running ? 'off' : 'polite'}>
          <span className="pf-ps-label">{text.label}</span>
          <p>{text.caption}</p>
          {current.demo ? <span className="pf-ps-demo">{g.demo}</span> : null}
        </div>

        <div className="pf-ps-ctrl">
          <button type="button" className="pf-tool" onClick={() => go(index - 1)} aria-label={g.prev}>
            <Arrow dir="prev" />
          </button>
          <div className="pf-ps-dots">
            {show.slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                className="pf-ps-dot"
                onClick={() => go(i)}
                aria-label={slideLabel(i + 1, slide.text[lang].label)}
                aria-current={i === index ? 'true' : undefined}
              >
                <span aria-hidden="true" />
              </button>
            ))}
          </div>
          <button type="button" className="pf-tool" onClick={() => go(index + 1)} aria-label={g.next}>
            <Arrow dir="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Gallery() {
  const { c } = useHome();
  const g = c.gallery;

  return (
    <section id="telas" className="pf-sec">
      <div className="pf-wrap">
        <div className="pf-head">
          <h2 className="pf-disp pf-h2">{g.title}</h2>
          <p className="pf-lead">{g.lead}</p>
        </div>
        <div className="pf-ps-list">
          {productShows.map((show) => (
            <Slideshow key={show.id} show={show} />
          ))}
        </div>
      </div>
    </section>
  );
}
