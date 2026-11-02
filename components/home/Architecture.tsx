'use client';

import { useHome } from './useHome';

// Diagram coordinates (px) come from the approved design: 1040 x 460 canvas.
const NODES = [
  { key: 'web', x: 0, y: 100, h: 88 },
  { key: 'mobile', x: 0, y: 276, h: 88 },
  { key: 'app', x: 280, y: 188, h: 104 },
  { key: 'auth', x: 560, y: 100, h: 88 },
  { key: 'db', x: 560, y: 276, h: 88, adr: 'ADR-01' },
  { key: 'video', x: 840, y: 100, h: 88, adr: 'ADR-03' },
  { key: 'pay', x: 840, y: 276, h: 88, adr: 'ADR-02' },
] as const;

const ADR_BY_NODE: Record<string, string | undefined> = {
  db: 'ADR-01',
  video: 'ADR-03',
  pay: 'ADR-02',
};

const EDGES = [
  'M200 144H240V240H279',
  'M200 320H240V240',
  'M480 240H520',
  'M520 144V320',
  'M520 144H559',
  'M520 320H559',
  'M380 188V64H940V99',
  'M380 292V400H940V369',
];
const ARROWS = [0, 4, 5, 6, 7];

const MOBILE_GROUPS = [
  { group: 'clients', keys: ['web', 'mobile'] },
  { group: 'app', keys: ['app'] },
  { group: 'data', keys: ['auth', 'db'] },
  { group: 'external', keys: ['video', 'pay'] },
] as const;

export default function Architecture() {
  const { c } = useHome();
  const a = c.architecture;

  return (
    <section id="arquitetura" className="pf-sec">
      <div className="pf-wrap">
        <div className="pf-head">
          <h2 className="pf-disp pf-h2">{a.title}</h2>
          <p className="pf-lead">{a.lead}</p>
        </div>
        <div className="pf-panel">
          <div className="pf-scroll">
            <div className="pf-dsk" role="img" aria-label={a.diagramLabel}>
              <svg width="1040" height="460" viewBox="0 0 1040 460" aria-hidden="true">
                <defs>
                  <marker id="pf-arrow" orient="auto" markerWidth="5" markerHeight="5" refX="2" refY="2" overflow="visible">
                    <path d="M0 0 L4 2 L0 4 Z" fill="#8B8D96" stroke="none" />
                  </marker>
                </defs>
                {EDGES.map((d, i) => (
                  <path key={d} d={d} markerEnd={ARROWS.includes(i) ? 'url(#pf-arrow)' : undefined} />
                ))}
              </svg>
              {NODES.map((n) => {
                const node = a.nodes[n.key];
                const adr = 'adr' in n ? n.adr : null;
                return (
                  <div
                    key={n.key}
                    className={`pf-node${adr ? ' hi' : ''}`}
                    style={{ left: n.x, top: n.y, height: n.h }}
                  >
                    <span>
                      <b>{node.name}</b>
                      <small>{node.sub}</small>
                      {adr ? <small className="ref">{adr}</small> : null}
                    </span>
                  </div>
                );
              })}
              <div className="pf-edge" style={{ left: 568, top: 36, width: 184 }}>{a.edgeUpload}</div>
              <div className="pf-edge" style={{ left: 610, top: 412, width: 100 }}>{a.edgeCharges}</div>
            </div>
          </div>
          <div className="pf-dmob" role="group" aria-label={a.diagramLabel}>
            {MOBILE_GROUPS.map((g, gi) => (
              <div key={g.group} style={{ display: 'contents' }}>
                {gi > 0 ? <span className="pf-dn" aria-hidden="true">↓</span> : null}
                <span className="pf-mh">{a.groups[g.group]}</span>
                {g.keys.map((key) => {
                  const node = a.nodes[key];
                  const adr = ADR_BY_NODE[key];
                  return (
                    <div key={key} className={`pf-mb${adr ? ' hi' : ''}`}>
                      <b>{node.name}</b>
                      <small>{node.sub}</small>
                      {adr ? <small className="ref">{adr}</small> : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
