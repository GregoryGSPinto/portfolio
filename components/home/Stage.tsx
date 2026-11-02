'use client';

import { useHome } from './useHome';

const MASCOT_COLORS = ['#FF8A5B', '#4FB3FF', '#7ED957', '#C792FF', '#FFC93C', '#FF6F91', '#3DD6C0', '#8E9BFF'];
const SWATCHES = ['#FF8A5B', '#4FB3FF', '#7ED957', '#C792FF'];
const SELECTED_SWATCH = 1;
const VIDEO_LINES = [
  ['84%', '48%'],
  ['72%', '40%'],
  ['90%', '56%'],
  ['78%', '44%'],
  ['66%', '52%'],
];

export default function Stage() {
  const { c } = useHome();
  const s = c.stage;

  return (
    <section className="pf-stage-sec">
      <div className="pf-wrap">
        <div className="pf-stage" role="img" aria-label={s.aria}>
          <div className="pf-win pf-rise">
            <div className="pf-side">
              <b>Blackbelts</b>
              <span className="on">{s.side[0]}</span>
              <span>{s.side[1]}</span>
              <span>
                {s.side[2]} <small>{s.soon}</small>
              </span>
            </div>
            <div className="pf-wmain">
              <div className="pf-wbar">
                <div className="pf-tabs">
                  <span className="on">{s.tabs[0]}</span>
                  <span>{s.tabs[1]}</span>
                  <span>{s.tabs[2]}</span>
                </div>
                <span className="pf-upbtn">{s.upload}</span>
              </div>
              <div className="pf-grid3">
                <div className="pf-up">
                  <b>{s.uploading}</b>
                  <span>{s.step}</span>
                  <div className="pf-bar"><i /></div>
                  <span>{s.tus}</span>
                </div>
                {VIDEO_LINES.map(([w1, w2], i) => (
                  <div className="pf-vid" key={i}>
                    <div className="pf-thumb">
                      <span>
                        <svg width="12" height="14" viewBox="0 0 12 14"><path d="M1 1 L11 7 L1 13 Z" fill="#1B1204" /></svg>
                      </span>
                    </div>
                    <div className="pf-line" style={{ width: w1 }} />
                    <div className="pf-line" style={{ width: w2 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pf-ph pf-rise pf-rise2">
            <div className="pf-ph-in">
              <span className="pf-ph-title">{s.mascot}</span>
              <div className="pf-mascots">
                {MASCOT_COLORS.map((color, i) => {
                  const round = i % 2 === 0;
                  const ear = {
                    background: color,
                    borderRadius: round ? '50%' : '0',
                    clipPath: round ? 'none' : 'polygon(50% 0, 100% 100%, 0 100%)',
                  };
                  return (
                    <div className="pf-m" key={color}>
                      <i className="ear l" style={ear} />
                      <i className="ear r" style={ear} />
                      <i className="face" style={{ background: color }} />
                      <i className="eye l" />
                      <i className="eye r" />
                    </div>
                  );
                })}
              </div>
              <span className="pf-ph-sub">{s.color}</span>
              <div className="pf-sw">
                {SWATCHES.map((color, i) => (
                  <i
                    key={color}
                    style={{
                      background: color,
                      border: i === SELECTED_SWATCH ? '3px solid #3B2A1A' : '3px solid transparent',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
