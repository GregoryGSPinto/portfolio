'use client';

import Link from 'next/link';
import { useLang } from '@/context/LangContext';
import { useTheme } from '@/context/ThemeContext';
import { siteConfig } from '@/lib/site';
import { useHome } from '@/components/home/useHome';

function BrandMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
      <polygon points="2,4 9,4 16,22 16,28" fill="#FDE7B4" />
      <polygon points="9,4 14,4 16,10 16,22" fill="#C8820F" />
      <polygon points="30,4 23,4 16,22 16,28" fill="#FDE7B4" />
      <polygon points="23,4 18,4 16,10 16,22" fill="#7A4A08" />
    </svg>
  );
}

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" />
    </svg>
  );
}

function Tools({ className }: { className: string }) {
  const { toggleLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const { c } = useHome();
  const dark = theme === 'dark';

  return (
    <div className={className}>
      <button type="button" className="pf-tool" onClick={toggleLang} aria-label={c.nav.switchLang}>
        <span aria-hidden="true">{c.nav.langShort}</span>
      </button>
      <button
        type="button"
        className="pf-tool"
        onClick={toggleTheme}
        aria-label={dark ? c.nav.themeToLight : c.nav.themeToDark}
      >
        <ThemeIcon dark={dark} />
      </button>
    </div>
  );
}

export default function Navbar() {
  const { c } = useHome();

  return (
    <header className="pf-header">
      <div className="pf-pill">
        <Link href="/" className="pf-brand" aria-label={c.nav.home}>
          <BrandMark />
          <span>{c.hero.name}</span>
        </Link>
        <nav aria-label={c.nav.label} className="pf-nl">
          {c.nav.links.map((l) => (
            <Link key={l.id} href={`/#${l.id}`}>
              {l.label}
            </Link>
          ))}
        </nav>
        <Tools className="pf-tools pf-tools-desk" />
        <a className="pf-btn pf-cta" href={`mailto:${siteConfig.contactEmail}`}>
          {c.nav.cta}
        </a>
      </div>
      <div className="pf-mnav">
        <nav aria-label={c.nav.sectionsLabel} className="pf-mscroll">
          {c.nav.links.map((l) => (
            <Link key={l.id} href={`/#${l.id}`} className="pf-chip">
              {l.label}
            </Link>
          ))}
        </nav>
        <Tools className="pf-tools" />
      </div>
    </header>
  );
}
