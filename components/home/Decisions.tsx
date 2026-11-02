'use client';

import { useHome } from './useHome';

export default function Decisions() {
  const { c } = useHome();
  const d = c.adr;

  return (
    <section id="decisoes" className="pf-sec">
      <div className="pf-wrap">
        <div className="pf-head">
          <h2 className="pf-disp pf-h2">{d.title}</h2>
          <p className="pf-lead">{d.lead}</p>
        </div>
        {d.items.map((item) => (
          <article className="pf-adr" key={item.id}>
            <div className="pf-al">
              <span className="pf-aid">{item.id}</span>
              <h3 className="pf-at">{item.title}</h3>
            </div>
            <div className="pf-ar">
              <div className="pf-kv">
                <span className="pf-k">{d.labels.context}</span>
                <span className="pf-v">{item.context}</span>
              </div>
              <div className="pf-kv">
                <span className="pf-k">{d.labels.decision}</span>
                <span className="pf-v">{item.decision}</span>
              </div>
              {item.id === 'ADR-04' ? (
                <ul className="pf-lv" aria-label={d.levelsLabel}>
                  {d.levels.map((l) => (
                    <li key={l.id}>
                      <b>{l.id}</b>
                      <span>{l.name}</span>
                      <span>{l.scope}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="pf-kv">
                <span className="pf-k">{d.labels.consequence}</span>
                <span className="pf-v">{item.consequence}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
