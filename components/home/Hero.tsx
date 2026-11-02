'use client';

import { useHome } from './useHome';

export default function Hero() {
  const { c } = useHome();
  const h = c.hero;

  return (
    <section id="topo" className="pf-hero">
      <div className="pf-wrap">
        <div className="pf-seal-row">
          <div className="pf-seal" aria-hidden="true">GG</div>
          <div className="pf-seal-name">
            <b>{h.name}</b>
            <span>{h.role}</span>
          </div>
        </div>
        <h1 className="pf-disp pf-h1">{h.title}</h1>
        <div className="pf-hero-body">
          <div className="pf-hero-main">
            <p>{h.lead}</p>
            <div className="pf-actions">
              <a className="pf-btn pf-btn-gold" href="#arquitetura">{h.primary}</a>
              <a className="pf-btn pf-btn-line" href="#projetos">{h.secondary}</a>
            </div>
          </div>
          <dl className="pf-facts">
            {h.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
