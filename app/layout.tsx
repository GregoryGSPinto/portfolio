import type { Metadata, Viewport } from 'next';
import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { LangProvider } from '@/context/LangContext';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SkipLink from '@/components/layout/SkipLink';
import { PersonJsonLd, WebsiteJsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl, siteConfig } from '@/lib/site';
import './globals.css';
import './home.css';

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-barlow',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.shortTitle,
  title: {
    default: siteConfig.title,
    template: '%s | Gregory Guimarães',
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.legalName, url: siteConfig.links.linkedin }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  alternates: {
    canonical: absoluteUrl('/'),
    languages: {
      'pt-BR': absoluteUrl('/'),
      'en-US': absoluteUrl('/'),
    },
  },
  category: 'technology',
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: 'website',
    url: absoluteUrl('/'),
    locale: siteConfig.locale,
    alternateLocale: siteConfig.alternateLocale,
    siteName: siteConfig.shortTitle,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  other: {
    'format-detection': 'telephone=no, email=no, address=no',
    // The site ships its own PT/EN toggle; browser auto-translation rewrites text nodes
    // and makes React throw hydration/runtime errors (#418 / "Application error").
    google: 'notranslate',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0D0D10' },
    { media: '(prefers-color-scheme: light)', color: '#F3F1ED' },
  ],
};

// Light by default; only an explicit saved 'dark' switches. Must match ThemeContext.readTheme.
const themeScript = `
(function() {
  try {
    var dark = localStorage.getItem('theme-preference') === 'dark';
    document.documentElement.classList.add(dark ? 'dark' : 'light');
  } catch(e) { document.documentElement.classList.add('light'); }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      translate="no"
      suppressHydrationWarning
      className={`${barlowCondensed.variable} ${barlow.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <PersonJsonLd
          name={siteConfig.legalName}
          jobTitle="Founder & Solution Architect, Verdor"
          url={siteConfig.url}
          sameAs={[
            siteConfig.links.github,
            siteConfig.links.linkedin,
          ]}
          knowsAbout={[
            'Solution Architecture',
            'Domain-Driven Design',
            'AI/ML',
            'TypeScript',
            'React',
            'Next.js',
            'Node.js',
            'Python',
          ]}
        />
        <WebsiteJsonLd
          url={siteConfig.url}
          name={siteConfig.title}
          description={siteConfig.description}
        />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased font-body">
        <ThemeProvider>
          <LangProvider>
            <SkipLink />
            <Navbar />
            {children}
            <Footer />
          </LangProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
