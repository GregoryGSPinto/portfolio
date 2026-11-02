'use client';

import { siteConfig } from '@/lib/site';
import { useHome } from './useHome';

export default function Contact() {
  const { c } = useHome();
  const whatsapp = `${siteConfig.links.whatsapp}?text=${encodeURIComponent(c.contact.whatsappText)}`;

  return (
    <section id="contato" className="pf-sec pf-contact-sec">
      <div className="pf-wrap">
        <div className="pf-gold">
          <h2 className="pf-disp">{c.contact.title}</h2>
          <div className="pf-gold-links">
            <a className="pf-btn pf-btn-ink" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
            <a className="pf-btn pf-btn-outline" href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a className="pf-btn pf-btn-outline" href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="pf-btn pf-btn-outline" href={siteConfig.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </section>
  );
}
