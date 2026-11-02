'use client';

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, ReactNode } from 'react';
import { translations } from '@/lib/data/i18n';

export type Lang = 'pt' | 'en';
type TranslationTree = typeof translations.pt;

const STORAGE_KEY = 'lang';
const listeners = new Set<() => void>();

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (acc && typeof acc === 'object' && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return path; // fallback: return the key itself
  }, obj);
}

// Client-only source of truth. The server always renders 'pt' (getServerSnapshot),
// so the first client render matches the server HTML and React re-renders with the
// real preference after hydration instead of throwing hydration error #418.
function readLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'pt' || stored === 'en') return stored;
  } catch {
    // storage blocked: fall through to the browser language
  }
  return (navigator.language || '').startsWith('pt') ? 'pt' : 'en';
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener('storage', onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onChange);
  };
}

const getServerSnapshot = (): Lang => 'pt';

interface LangContextType {
  lang: Lang;
  toggleLang: () => void;
  t: TranslationTree;
}

const LangContext = createContext<LangContextType | undefined>(undefined);

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readLang, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  const toggleLang = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, readLang() === 'pt' ? 'en' : 'pt');
    } catch {
      // storage blocked: preference just won't persist
    }
    listeners.forEach((notify) => notify());
  }, []);

  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
}

export function useT(section?: string) {
  const { t, lang, toggleLang } = useLang();
  if (!section) return { t, lang, toggleLang };
  const sectionT = getNestedValue(t as unknown as Record<string, unknown>, section);
  return { t: sectionT, lang, toggleLang };
}
