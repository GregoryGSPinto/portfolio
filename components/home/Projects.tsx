'use client';

import { useHome } from './useHome';

function Tags({ items }: { items: readonly string[] }) {
  return (
    <ul className="pf-tags">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

const LINKS = {
  blackbelts: 'https://blackbeltv2.vercel.app',
  primalwod: 'https://primalwod.com.br',
  aura: 'https://aura-assistent.vercel.app',
} as const;

function Visit({ href, label, name }: { href: string; label: string; name: string }) {
  return (
    <a className="pf-visit" href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} ${name}`}>
      {label} {name} <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Projects() {
  const { c } = useHome();
  const p = c.projects;

  return (
    <section id="projetos" className="pf-sec">
      <div className="pf-wrap">
        <h2 className="pf-disp pf-h2" style={{ marginBottom: 48 }}>{p.title}</h2>

        <article className="pf-pj">
          <div className="pf-pl">
            <h3 className="pf-pt">Blackbelts</h3>
            <p className="pf-pd">{p.blackbelts.description}</p>
            <Tags items={p.blackbelts.tags} />
            <Visit href={LINKS.blackbelts} label={p.visit} name="Blackbelts" />
          </div>
          <div className="pf-pv">
            {p.blackbelts.rows.map((r) => (
              <div className="pf-kv" key={r.k}>
                <span className="pf-k">{r.k}</span>
                <span className="pf-v">{r.v}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="pf-pj">
          <div className="pf-pl">
            <h3 className="pf-pt">PrimalWOD</h3>
            <p className="pf-pd">{p.primalwod.description}</p>
            <Tags items={p.primalwod.tags} />
            <Visit href={LINKS.primalwod} label={p.visit} name="PrimalWOD" />
          </div>
          <div className="pf-pv">
            <div className="pf-wodbig" aria-hidden="true">
              <span>WOD<em>.</em></span>
            </div>
          </div>
        </article>

        <article className="pf-pj">
          <div className="pf-pl">
            <h3 className="pf-pt">Aura</h3>
            <p className="pf-pd">{p.aura.description}</p>
            <Tags items={p.aura.tags} />
            <Visit href={LINKS.aura} label={p.visit} name="Aura" />
          </div>
          <div className="pf-pv">
            <div className="pf-aura" role="img" aria-label={p.aura.aria}>
              <div className="pf-aura-top">
                <b>Aura</b>
                <span className="pf-stop">{p.aura.stop}</span>
              </div>
              {p.aura.levels.map((l, i) => (
                <div className="pf-lvl" key={l.id}>
                  <span className={`pf-lvl-id${i === 2 ? ' l3' : ''}`}>{l.id}</span>
                  <div className="pf-lvl-t">
                    <b>{l.title}</b>
                    <span>{l.sub}</span>
                  </div>
                  <span className={`pf-badge${i === 0 ? ' ok' : i === 2 ? ' l3' : ''}`}>{l.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="pf-pj">
          <div className="pf-pl">
            <h3 className="pf-pt" style={{ color: 'var(--mu)' }}>{p.clinics.title}</h3>
            <p className="pf-pd">{p.clinics.description}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
