"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { adminTranslations, type AdminLang } from "@/lib/adminI18n";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AdminT = any;
interface AdminLangCtx { lang: AdminLang; t: AdminT; toggleLang: () => void; }

const Ctx = createContext<AdminLangCtx>({
  lang: "tr", t: adminTranslations.tr, toggleLang: () => {},
});

export function AdminLangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<AdminLang>("tr");

  useEffect(() => {
    const stored = localStorage.getItem("phogo-lang") as AdminLang | null;
    if (stored === "en" || stored === "tr") setLang(stored);
    else if (navigator.language?.toLowerCase().startsWith("en")) setLang("en");
  }, []);

  function toggleLang() {
    const next: AdminLang = lang === "tr" ? "en" : "tr";
    setLang(next);
    localStorage.setItem("phogo-lang", next);
  }

  return (
    <Ctx.Provider value={{ lang, t: adminTranslations[lang], toggleLang }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAdminT() {
  return useContext(Ctx);
}
