'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/home/Hero';
import Capabilities from '@/components/home/Capabilities';
import Architecture from '@/components/home/Architecture';
import Decisions from '@/components/home/Decisions';
import Gallery from '@/components/home/Gallery';
import Projects from '@/components/home/Projects';
import Writing, { type PostTeaser } from '@/components/home/Writing';
import About from '@/components/home/About';
import Contact from '@/components/home/Contact';

const AIChatbot = dynamic(() => import('@/components/AIChatbot'), { ssr: false });

interface HomePageProps {
  chatEnabled: boolean;
  blogPosts: {
    pt: PostTeaser[];
    en: PostTeaser[];
  };
}

export default function HomePage({ blogPosts, chatEnabled }: HomePageProps) {

  return (
    <>
      <main id="main-content" className="pf-main">
        <Hero />
        <Capabilities />
        <Architecture />
        <Decisions />
        <Gallery />
        <Projects />
        <Writing posts={blogPosts} />
        <About />
        <Contact />
      </main>
      {chatEnabled ? <AIChatbot /> : null}
    </>
  );
}
