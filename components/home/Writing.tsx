'use client';

import Link from 'next/link';
import { useHome } from './useHome';

export interface PostTeaser {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
}

export default function Writing({ posts }: { posts: { pt: PostTeaser[]; en: PostTeaser[] } }) {
  const { c, lang } = useHome();
  const post = posts[lang][0];
  if (!post) return null;

  const minutes = post.readingTime.match(/\d+/)?.[0];
  // UTC on purpose: the server and every browser timezone must print the same day (React #418).
  const date = new Date(post.date).toLocaleDateString(lang === 'pt' ? 'pt-BR' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

  return (
    <section id="escrita" className="pf-sec">
      <div className="pf-wrap">
        <div className="pf-head">
          <h2 className="pf-disp pf-h2">{c.writing.title}</h2>
          <p className="pf-lead">{c.writing.lead}</p>
        </div>
        <article className="pf-post">
          <div className="pf-post-main">
            <span className="pf-post-meta">
              <time dateTime={post.date}>{date}</time>
              {minutes ? ` · ${minutes} ${c.writing.minRead}` : null}
            </span>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
          </div>
          <div className="pf-post-act">
            <Link className="pf-btn pf-btn-gold" href={`/blog/${post.slug}`}>{c.writing.read}</Link>
          </div>
        </article>
      </div>
    </section>
  );
}
