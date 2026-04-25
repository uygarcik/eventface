"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Zap, Shield, Download, QrCode, Users, Clock, ArrowRight, Check, Camera, Star, Heart, ChevronDown, Loader2 } from "lucide-react";

export default function LandingPage() {
  const t = useTranslations();
  const locale = useLocale();
  const otherLocale = locale === "tr" ? "en" : "tr";

  return (
    <div className="min-h-screen bg-white">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center">
            <Image src="/logo.png" alt="Phogo" width={130} height={42} className="h-9 w-auto object-contain" priority />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#nasil-calisir" className="text-base font-bold text-slate-700 hover:text-[#4B4FAE] transition-colors">{t("nav.howItWorks")}</a>
            <a href="#avantajlar" className="text-base font-bold text-slate-700 hover:text-[#4B4FAE] transition-colors">{t("nav.advantages")}</a>
            <a href="#iletisim" className="text-base font-bold text-slate-700 hover:text-[#4B4FAE] transition-colors">{t("nav.contact")}</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/${otherLocale}`}
              className="text-sm font-bold text-slate-500 hover:text-[#4B4FAE] border border-slate-200 hover:border-[#4B4FAE] px-3 py-1.5 rounded-lg transition-colors">
              {otherLocale === "en" ? "EN" : "TR"}
            </Link>
            <a href="#iletisim" className="text-sm bg-[#4B4FAE] hover:bg-[#3a3e8f] text-white px-5 py-2.5 rounded-xl transition-colors font-bold shadow-sm">
              {t("nav.demo")}
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-white pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#4B4FAE]/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            {t("hero.title")}<br />
            <span className="text-[#4B4FAE]">{t("hero.titleHighlight")}</span>
          </h1>
          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">{t("hero.description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#iletisim" className="flex items-center gap-2 bg-[#4B4FAE] hover:bg-[#3a3e8f] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#4B4FAE]/25 hover:shadow-xl active:scale-95">
              {t("hero.cta")}<ArrowRight size={20} />
            </a>
            <a href="#nasil-calisir" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 px-6 py-4 rounded-xl font-semibold transition-colors">
              {t("hero.howItWorks")}<ChevronDown size={18} />
            </a>
          </div>
          <p className="text-slate-400 text-sm mt-5">{t("hero.subtext")}</p>
        </div>

        {/* Photo grid */}
        <div className="relative max-w-5xl mx-auto mt-14">
          <div className="bg-gradient-to-br from-slate-900 to-[#1e2060] rounded-3xl p-6 shadow-2xl">
            <div className="grid grid-cols-3 gap-3">
              {[
                { src: "/images/event1.jpg", match: false },
                { src: "/images/event2.jpg", match: true },
                { src: "/images/event3.jpg", match: false },
                { src: "/images/event4.jpg", match: false },
                { src: "/images/event5.jpg", match: true },
                { src: "/images/event6.jpg", match: false },
              ].map((item, i) => (
                <div key={i} className={`relative aspect-video rounded-2xl overflow-hidden ${item.match ? "ring-4 ring-[#4B4FAE] ring-offset-2 ring-offset-slate-900" : ""}`}>
                  <Image src={item.src} alt={`Event photo ${i + 1}`} fill className="object-cover" sizes="300px" />
                  {item.match && (
                    <div className="absolute inset-0 bg-[#4B4FAE]/30 flex items-center justify-center">
                      <div className="bg-[#4B4FAE] rounded-full p-2 shadow-lg"><Check size={20} className="text-white" /></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-white/50 text-sm">1.240 {t("hero.scanned")}</div>
              <div className="bg-[#4B4FAE] text-white text-sm px-4 py-2 rounded-lg font-bold">2 {t("hero.found")}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Event types */}
      <section className="py-10 px-6 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-400 text-xs mb-5 uppercase tracking-widest font-semibold">{t("eventTypes.label")}</p>
          <div className="flex flex-wrap justify-center gap-6 text-slate-600 font-semibold text-sm">
            {(t.raw("eventTypes.items") as string[]).map((item) => (
              <span key={item} className="flex items-center gap-1.5"><Star size={12} className="text-[#4B4FAE]" />{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="nasil-calisir" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{t("howItWorks.title")}</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">{t("howItWorks.subtitle")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {([
              { step: "01", icon: Camera, color: "bg-[#4B4FAE]/10 text-[#4B4FAE]" },
              { step: "02", icon: QrCode, color: "bg-purple-50 text-purple-600" },
              { step: "03", icon: Download, color: "bg-green-50 text-green-600" },
            ] as const).map(({ step, icon: Icon, color }, i) => (
              <div key={step} className="relative">
                <div className="text-8xl font-bold text-slate-100 absolute -top-4 -left-2 select-none">{step}</div>
                <div className="relative bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#4B4FAE]/20 transition-all">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{t(`howItWorks.steps.${i}.title`)}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{t(`howItWorks.steps.${i}.desc`)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section id="avantajlar" className="py-24 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-5">
            <span className="text-[#4B4FAE] text-sm font-bold uppercase tracking-widest">{t("advantages.badge")}</span>
          </div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {t("advantages.title")}<br />
              <span className="text-[#7b80d4]">{t("advantages.titleHighlight")}</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">{t("advantages.description")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {([
              { icon: Zap, color: "text-yellow-400" },
              { icon: Shield, color: "text-green-400" },
              { icon: Users, color: "text-blue-400" },
              { icon: Clock, color: "text-purple-400" },
              { icon: Heart, color: "text-red-400" },
              { icon: Download, color: "text-orange-400" },
            ] as const).map(({ icon: Icon, color }, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-[#4B4FAE]/40 transition-all">
                <Icon size={26} className={`${color} mb-4`} />
                <h3 className="font-bold text-white text-lg mb-3">{t(`advantages.items.${i}.title`)}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t(`advantages.items.${i}.desc`)}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <blockquote className="text-2xl md:text-3xl font-bold text-white/90 leading-relaxed max-w-3xl mx-auto">
              {t("advantages.quote")}
              <span className="text-[#7b80d4]">{t("advantages.quoteHighlight")}</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="iletisim" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-[#4B4FAE] text-sm font-bold uppercase tracking-widest">{t("contact.badge")}</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-3 mb-5 leading-tight">{t("contact.title")}</h2>
              <p className="text-slate-500 leading-relaxed mb-8">{t("contact.description")}</p>
              <div className="space-y-4">
                {(t.raw("contact.features") as string[]).map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#4B4FAE]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={13} className="text-[#4B4FAE]" />
                    </div>
                    <span className="text-slate-700 font-medium text-sm">{f}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-slate-100">
                <p className="text-slate-500 text-sm">{t("contact.directContact")}</p>
                <a href="mailto:info@phogo.app" className="text-[#4B4FAE] font-bold text-lg hover:underline">info@phogo.app</a>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href={`/${locale}`}>
            <Image src="/logo.png" alt="Phogo" width={100} height={32} className="h-7 w-auto object-contain brightness-0 invert" />
          </Link>
          <div className="text-slate-500 text-sm">© 2026 Phogo. {t("footer.rights")}</div>
          <div className="flex gap-6 text-slate-500 text-sm">
            <a href="mailto:info@phogo.app" className="hover:text-white transition-colors">info@phogo.app</a>
            <Link href="/admin/login" className="hover:text-white transition-colors">{t("footer.adminLogin")}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContactForm() {
  const t = useTranslations("contact.form");
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-100 rounded-2xl p-10 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Check size={28} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">{t("successTitle")}</h3>
        <p className="text-slate-500 text-sm">{t("successDesc")}</p>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4B4FAE]/30 focus:border-[#4B4FAE] transition-all text-sm";

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t("name")} {t("required")}</label>
          <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} required placeholder={t("namePlaceholder")} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t("email")} {t("required")}</label>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required placeholder={t("emailPlaceholder")} className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t("phone")}</label>
          <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder={t("phonePlaceholder")} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t("company")}</label>
          <input type="text" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder={t("companyPlaceholder")} className={inputClass} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">{t("message")} {t("required")}</label>
        <textarea value={form.message} onChange={(e) => update("message", e.target.value)} required rows={4} placeholder={t("messagePlaceholder")} className={`${inputClass} resize-none`} />
      </div>
      {status === "error" && <p className="text-red-500 text-sm">{t("error")}</p>}
      <button type="submit" disabled={status === "loading"}
        className="w-full py-3.5 bg-[#4B4FAE] hover:bg-[#3a3e8f] disabled:opacity-60 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm">
        {status === "loading" ? <><Loader2 size={18} className="animate-spin" /> {t("submitting")}</> : <>{t("submit")} <ArrowRight size={18} /></>}
      </button>
      <p className="text-slate-400 text-xs text-center">{t("responseTime")}</p>
    </form>
  );
}
