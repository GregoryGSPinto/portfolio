'use client';

import { useHome } from './useHome';

export default function Capabilities() {
  const { c } = useHome();

  return (
    <section className="pf-caps-sec" aria-labelledby="capacidades">
      <div className="pf-wrap">
        <h2 id="capacidades" className="pf-sr">{c.capabilities.heading}</h2>
        <div className="pf-caps">
          {c.capabilities.items.map((item) => (
            <div className="pf-cap" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
