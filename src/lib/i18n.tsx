"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { I18N, LOCALES, type Locale } from "@/lib/data";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
  isRTL: boolean;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem("locale");
  if (stored && LOCALES.find((l) => l.code === stored)) {
    return stored as Locale;
  }
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("locale", next);
    }
  }, []);

  const isRTL = LOCALES.find((l) => l.code === locale)?.rtl === true;
  const dir = isRTL ? "rtl" : "ltr";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = dir;
    }
  }, [locale, dir]);

  const t = useCallback(
    (key: string) => {
      return I18N[locale]?.[key] ?? I18N.en[key] ?? key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir, isRTL }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
