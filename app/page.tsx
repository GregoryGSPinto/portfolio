import { getAllPosts } from '@/lib/blog';
import HomePage from '@/components/HomePage';

export default function Home() {
  // Server-side flag: the chat widget only exists when CHAT_ENABLED is exactly "true".
  const chatEnabled = process.env.CHAT_ENABLED === 'true';
  const ptPosts = getAllPosts('pt').slice(0, 3);
  const enPosts = getAllPosts('en').slice(0, 3);

  return (
    <HomePage
      chatEnabled={chatEnabled}
      blogPosts={{
        pt: ptPosts.map(({ slug, title, description, date, tags, readingTime }) => ({
          slug, title, description, date, tags, readingTime,
        })),
        en: enPosts.map(({ slug, title, description, date, tags, readingTime }) => ({
          slug, title, description, date, tags, readingTime,
        })),
      }}
    />
  );
}
