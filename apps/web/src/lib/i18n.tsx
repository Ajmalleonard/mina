"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import enMessages from "../../messages/en.json";
import arMessages from "../../messages/ar.json";
import trMessages from "../../messages/tr.json";
import esMessages from "../../messages/es.json";

type Messages = Record<string, any>;

interface I18nContextValue {
  locale: string;
  t: (key: string) => string;
  setLocale: (l: string) => void;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  t: (k: string) => k,
  setLocale: () => {},
});

const MESSAGES: Record<string, Messages> = {
  en: enMessages as Messages,
  ar: arMessages as Messages,
  tr: trMessages as Messages,
  es: esMessages as Messages,
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<string>(() => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("locale") : null;
      const nav = typeof navigator !== "undefined" ? (navigator.language || (navigator.languages && navigator.languages[0]) || "") : "";
      const detected = (stored || (nav ? nav.split("-")[0] : "en")) as string;
      return ['en', 'ar', 'tr', 'es'].includes(detected) ? detected : 'en';
    } catch (e) {
      return 'en';
    }
  });

  const [messages, setMessages] = useState<Messages>(() => MESSAGES[locale] || (enMessages as Messages));

  useEffect(() => {
    setMessages(MESSAGES[locale] || (enMessages as Messages));
    try {
      localStorage.setItem("locale", locale);
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    } catch {}
  }, [locale]);

  function t(key: string) {
    // direct flat lookup
    if (messages && typeof messages === "object" && key in messages) {
      const v = messages[key];
      return typeof v === "string" ? v : key;
    }

    // try nested lookup for keys like 'privacy.section1.title'
    const parts = key.split(".");
    let node: any = messages;
    for (const p of parts) {
      if (node && typeof node === "object" && p in node) {
        node = node[p];
      } else {
        node = undefined;
        break;
      }
    }

    return typeof node === "string" ? node : key;
  }

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
