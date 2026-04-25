"use client";

import React, { useEffect, useRef, useState } from "react";
import { useI18n } from '@/lib/i18n';
import { ChevronDown } from 'lucide-react';
import { cn } from "@/lib/utils";

type Locale = "en" | "ar" | "tr" | "es";

const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const current = LOCALES.find(l => l.code === locale) || LOCALES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-full p-3  bg-white text-sm "
      >
        <span className="text-lg">{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown className="w-4 h-4 opacity-70" />
      </button>

      {open && (
        // if language is arabic right-0 - else left-0
        <div className={cn("absolute  mt-2 w-44 bg-white  rounded-md z-50 overflow-hidden", locale === "ar" ? "right-0" : "left-0")}>
          {LOCALES.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLocale(l.code); setOpen(false); }}
              className={`w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-white/5 flex items-center gap-3 ${locale === l.code ? 'font-semibold' : 'font-normal'}`}
            >
              <span className="text-sm">{l.flag}</span>
              <span className="truncate text-sm">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
