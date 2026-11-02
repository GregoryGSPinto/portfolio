'use client';

import Image from 'next/image';
import { useHome } from './useHome';

export default function About() {
  const { c } = useHome();
  const a = c.about;

  return (
    <section id="sobre" className="pf-sec">
      <div className="pf-wrap pf-about">
        <div className="pf-about-l">
          <h2 className="pf-disp pf-h2">{a.title}</h2>
          <p className="pf-big">{a.p1}</p>
          <p className="pf-lead">{a.p2}</p>
        </div>
        <div className="pf-about-r">
          <Image className="pf-photo" src="/images/gregory-photo.png" alt={a.photoAlt} width={144} height={144} sizes="144px" />
          {a.timeline.map((t) => (
            <div className="pf-row" key={t.name}>
              <div>
                <b>{t.name}</b>
                <span>{t.role}</span>
              </div>
              {t.note ? <span className="now">{t.note}</span> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
