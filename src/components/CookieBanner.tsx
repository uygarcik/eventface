"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check } from "lucide-react";

const CONSENT_KEY = "phogo-cookie-consent";
const CONSENT_DATE_KEY = "phogo-cookie-date";
const RENEWAL_DAYS = 7;

interface Props { locale: string; }

export default function CookieBanner({ locale }: Props) {
  const [show, setShow] = useState(false);
  const lang = locale === "en" ? "en" : "tr";

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    const dateStr = localStorage.getItem(CONSENT_DATE_KEY);
    if (!consent || !dateStr) { setShow(true); return; }
    const daysSince = (Date.now() - Number(dateStr)) / (1000 * 60 * 60 * 24);
    if (daysSince >= RENEWAL_DAYS) setShow(true);
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    localStorage.setItem(CONSENT_DATE_KEY, Date.now().toString());
    setShow(false);
  }

  function reject() {
    localStorage.setItem(CONSENT_KEY, "rejected");
    localStorage.setItem(CONSENT_DATE_KEY, Date.now().toString());
    setShow(false);
  }

  if (!show) return null;

  const t = lang === "tr" ? {
    title: "Çerezler Hakkında",
    text: "Phogo, yalnızca hizmetin düzgün çalışması için gerekli olan zorunlu çerezleri kullanır. Reklam veya izleme amaçlı çerez kullanılmamaktadır.",
    privacy: "Gizlilik Politikası", cookies: "Çerez Politikası", accept: "Kabul Et", reject: "Reddet",
  } : {
    title: "About Cookies",
    text: "Phogo only uses essential cookies required for the service to function properly. No advertising or tracking cookies are used.",
    privacy: "Privacy Policy", cookies: "Cookie Policy", accept: "Accept", reject: "Decline",
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-[#4B4FAE] rounded-xl flex items-center justify-center flex-shrink-0">
            <Cookie size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white mb-1">{t.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-3">{t.text}</p>
            <div className="flex flex-wrap gap-3 items-center">
              <button onClick={accept} className="flex items-center gap-2 px-4 py-2 bg-[#4B4FAE] hover:bg-[#5a5ec0] text-white text-sm font-semibold rounded-xl transition-colors">
                <Check size={15} />{t.accept}
              </button>
              <button onClick={reject} className="flex items-center gap-2 px-4 py-2 border border-slate-600 hover:border-slate-400 text-slate-300 text-sm font-medium rounded-xl transition-colors">
                <X size={15} />{t.reject}
              </button>
              <div className="flex gap-3 text-xs text-slate-500">
                <Link href={`/${locale}/gizlilik`} className="hover:text-[#7b80d4] transition-colors">{t.privacy}</Link>
                <Link href={`/${locale}/cerezler`} className="hover:text-[#7b80d4] transition-colors">{t.cookies}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
