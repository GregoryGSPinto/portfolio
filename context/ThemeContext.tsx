'use client';

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const STORAGE_KEY = 'theme-preference';
const listeners = new Set<() => void>();

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Light is the default. Anything other than an explicit 'dark' (including the legacy
// 'system' value) resolves to light, matching the inline script in app/layout.tsx.
function readTheme(): Theme {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener('storage', onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onChange);
  };
}

const getServerSnapshot = (): Theme => 'light';

function applyThemeToDOM(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerSnapshot);

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 400);
    try {
      localStorage.setItem(STORAGE_KEY, readTheme() === 'dark' ? 'light' : 'dark');
    } catch {
      // storage blocked: preference just won't persist
    }
    listeners.forEach((notify) => notify());
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
