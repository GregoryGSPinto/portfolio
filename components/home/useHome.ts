'use client';

import { useLang } from '@/context/LangContext';
import { homeCopy } from '@/lib/data/home';

export function useHome() {
  const { lang } = useLang();
  return { lang, c: homeCopy[lang] };
}
