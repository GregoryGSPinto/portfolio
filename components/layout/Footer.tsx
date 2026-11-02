'use client';

import { siteConfig } from '@/lib/site';
import { useHome } from '@/components/home/useHome';

export default function Footer() {
  const { c } = useHome();

  return (
    <footer className="pf-footer">
      <div className="pf-wrap">
        <span>{c.footer.left}</span>
        <span>{c.footer.place}</span>
        <a href={siteConfig.links.repository} target="_blank" rel="noopener noreferrer">
          {c.footer.source}
        </a>
      </div>
    </footer>
  );
}
