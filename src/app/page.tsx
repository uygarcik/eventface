"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Zap, Shield, Download, QrCode, Users, Clock, ArrowRight, Check, Camera, Star, Heart, ChevronDown, Loader2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Phogo" width={130} height={42} className="h-9 w-auto object-contain" priority />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#nasil-calisir" className="text-base font-bold text-slate-700 hover:text-[#4B4FAE] transition-colors">Nasıl Çalışır?</a>
            <a href="#avantajlar" className="text-base font-bold text-slate-700 hover:text-[#4B4FAE] transition-colors">Avantajlar</a>
            <a href="#iletisim" className="text-base font-bold text-slate-700 hover:text-[#4B4FAE] transition-colors">İletişim</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/login" className="text-sm text-slate-500 hover:text-slate-900 transition-colors hidden sm:block font-medium">
              Giriş
            </Link>
            <a href="#iletisim" className="text-sm bg-[#4B4FAE] hover:bg-[#3a3e8f] text-white px-5 py-2.5 rounded-xl transition-colors font-bold shadow-sm">
              Demo Al
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
            Phogo ile her anın<br />
            <span className="text-[#4B4FAE]">fotoğrafı sende</span>
          </h1>

          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Etkinlikte çekilen binlerce fotoğraf arasından sadece seninkiler anında ekrana gelir.
            QR okut, selfie çek — Phogo gerisini halleder.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#iletisim"
              className="flex items-center gap-2 bg-[#4B4FAE] hover:bg-[#3a3e8f] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#4B4FAE]/25 hover:shadow-xl active:scale-95"
            >
              Ücretsiz Demo Talep Et
              <ArrowRight size={20} />
            </a>
            <a href="#nasil-calisir" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 px-6 py-4 rounded-xl font-semibold transition-colors">
              Nasıl çalışır?
              <ChevronDown size={18} />
            </a>
          </div>
          <p className="text-slate-400 text-sm mt-5">Kurulum gerektirmez · 5 dakikada aktif · Uygulama indirme yok</p>
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
                  <Image
                    src={item.src}
                    alt={`Etkinlik fotoğrafı ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 300px"
                  />
                  {item.match && (
                    <div className="absolute inset-0 bg-[#4B4FAE]/30 flex items-center justify-center">
                      <div className="bg-[#4B4FAE] rounded-full p-2 shadow-lg">
                        <Check size={20} className="text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-white/50 text-sm">1.240 fotoğraf tarandı</div>
              <div className="bg-[#4B4FAE] text-white text-sm px-4 py-2 rounded-lg font-bold">2 fotoğraf bulundu ✓</div>
            </div>
          </div>
        </div>
      </section>

      {/* Event types */}
      <section className="py-10 px-6 border-y border-slate-100 bg-slate-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-400 text-xs mb-5 uppercase tracking-widest font-semibold">Hangi etkinlikler için idealdir?</p>
          <div className="flex flex-wrap justify-center gap-6 text-slate-600 font-semibold text-sm">
            {["Kurumsal Toplantılar", "Düğün & Nişan", "Mezuniyet Törenleri", "Konferanslar", "Festivaller", "Spor Etkinlikleri"].map((item) => (
              <span key={item} className="flex items-center gap-1.5"><Star size={12} className="text-[#4B4FAE]" />{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="nasil-calisir" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Phogo nasıl çalışır?</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">Katılımcılarınız için sıfır kurulum, sıfır uygulama, sıfır kayıt. Sadece kamera ve bir dokunuş.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Camera,
                title: "Fotoğrafları Yükle",
                desc: "Etkinlik fotoğraflarını Phogo yönetim panelinize yükleyin. Yapay zeka her yüzü sessizce indeksler.",
                color: "bg-[#4B4FAE]/10 text-[#4B4FAE]",
              },
              {
                step: "02",
                icon: QrCode,
                title: "QR Kodu Paylaş",
                desc: "Phogo'nun oluşturduğu QR kodu etkinlik alanına asın. Katılımcılar sadece kameralarını uzatsın.",
                color: "bg-purple-50 text-purple-600",
              },
              {
                step: "03",
                icon: Download,
                title: "Anında İndir",
                desc: "Selfie çeken katılımcı, Phogo sayesinde etkinlikteki tüm fotoğraflarına saniyeler içinde ulaşır.",
                color: "bg-green-50 text-green-600",
              },
            ].map(({ step, icon: Icon, title, desc, color }) => (
              <div key={step} className="relative">
                <div className="text-8xl font-bold text-slate-100 absolute -top-4 -left-2 select-none">{step}</div>
                <div className="relative bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-[#4B4FAE]/20 transition-all">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
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
            <span className="text-[#4B4FAE] text-sm font-bold uppercase tracking-widest">Neden Phogo?</span>
          </div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Fotoğrafçınız binlerce kare çekti.<br />
              <span className="text-[#7b80d4]">Peki katılımcılar onlara nasıl ulaşacak?</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Phogo bu soruyu sonsuza kadar çözüyor. USB paylaşımı yok, WhatsApp grubu kaosuna son,
              "fotoğrafları kim gönderecek?" sorusuna gerek yok. Herkes kendi fotoğrafına, anında ulaşır.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: Zap,
                title: "3 Saniyede Sonuç",
                desc: "Phogo, AWS'nin milyonlarca görüntü işlediği aynı yüz tanıma motorunu kullanır. Binlerce fotoğraf arasından sizinkiler milisaniyeler içinde gelir.",
                color: "text-yellow-400",
              },
              {
                icon: Shield,
                title: "Gizliliğiniz Güvende",
                desc: "Phogo yüz verinizi asla saklamaz. Her arama anlık işlenir ve sonra silinir. GDPR uyumlu, şeffaf, güvenli.",
                color: "text-green-400",
              },
              {
                icon: Users,
                title: "Sınırsız Katılımcı",
                desc: "100 kişilik toplantıdan 10.000 kişilik festivale. Phogo aynı kalitede, aynı hızda çalışır. Ölçek fark etmez.",
                color: "text-blue-400",
              },
              {
                icon: Clock,
                title: "5 Dakikada Hazır",
                desc: "Teknik bilgi gerekmez. Phogo paneline giriş yapın, fotoğrafları yükleyin, QR'ı paylaşın. Hepsi bu.",
                color: "text-purple-400",
              },
              {
                icon: Heart,
                title: "Katılımcı Deneyimi",
                desc: "Uygulama indirme yok, kayıt yok, şifre yok. Sadece QR ve selfie. Katılımcılar sizi sever.",
                color: "text-red-400",
              },
              {
                icon: Download,
                title: "Kolay & Hızlı İndirme",
                desc: "Tek fotoğraf veya tümü bir arada. Phogo güvenli indirme linkleri oluşturur, 24 saat geçerlidir.",
                color: "text-orange-400",
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-[#4B4FAE]/40 transition-all group">
                <Icon size={26} className={`${color} mb-4`} />
                <h3 className="font-bold text-white text-lg mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Strong quote */}
          <div className="mt-16 text-center">
            <blockquote className="text-2xl md:text-3xl font-bold text-white/90 leading-relaxed max-w-3xl mx-auto">
              "Etkinliğin bitmesi, anıların bitmesi anlamına gelmiyor.
              <span className="text-[#7b80d4]"> Phogo ile her kare, herkese ulaşır."</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="iletisim" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <div>
              <span className="text-[#4B4FAE] text-sm font-bold uppercase tracking-widest">İletişim</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-3 mb-5 leading-tight">
                Phogo'yu etkinliğinizde<br />deneyin
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                Ücretsiz demo için bize ulaşın. Ekibimiz en geç 24 saat içinde size dönüş yapar ve
                ilk etkinliğinizi birlikte hazırlarız.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Check, text: "İlk etkinliğe özel ücretsiz demo" },
                  { icon: Check, text: "5 dakikada kurulum, teknik destek dahil" },
                  { icon: Check, text: "Taahhüt yok, istediğiniz zaman iptal" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#4B4FAE]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon size={13} className="text-[#4B4FAE]" />
                    </div>
                    <span className="text-slate-700 font-medium text-sm">{text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100">
                <p className="text-slate-500 text-sm">Doğrudan yazabilirsiniz:</p>
                <a href="mailto:hello@phogo.app" className="text-[#4B4FAE] font-bold text-lg hover:underline">hello@phogo.app</a>
              </div>
            </div>

            {/* Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Phogo" width={100} height={32} className="h-7 w-auto object-contain brightness-0 invert" />
          </Link>
          <div className="text-slate-500 text-sm">© 2026 Phogo. Tüm hakları saklıdır.</div>
          <div className="flex gap-6 text-slate-500 text-sm">
            <a href="mailto:hello@phogo.app" className="hover:text-white transition-colors">hello@phogo.app</a>
            <Link href="/admin/login" className="hover:text-white transition-colors">Admin Girişi</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}

function ContactForm() {
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
        <h3 className="text-xl font-bold text-slate-900 mb-2">Mesajınız alındı!</h3>
        <p className="text-slate-500 text-sm">En geç 24 saat içinde size dönüş yapacağız.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Ad Soyad *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
            placeholder="Ahmet Yılmaz"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4B4FAE]/30 focus:border-[#4B4FAE] transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">E-posta *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            required
            placeholder="ahmet@firma.com"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4B4FAE]/30 focus:border-[#4B4FAE] transition-all text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Telefon</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+90 555 000 00 00"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4B4FAE]/30 focus:border-[#4B4FAE] transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Şirket / Organizasyon</label>
          <input
            type="text"
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="Firma Adı"
            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4B4FAE]/30 focus:border-[#4B4FAE] transition-all text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mesajınız *</label>
        <textarea
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          required
          rows={4}
          placeholder="Etkinliğiniz hakkında kısaca bilgi verin..."
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4B4FAE]/30 focus:border-[#4B4FAE] transition-all text-sm resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm">Bir hata oluştu, lütfen tekrar deneyin.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3.5 bg-[#4B4FAE] hover:bg-[#3a3e8f] disabled:opacity-60 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
      >
        {status === "loading" ? (
          <><Loader2 size={18} className="animate-spin" /> Gönderiliyor...</>
        ) : (
          <>Demo Talep Et <ArrowRight size={18} /></>
        )}
      </button>
      <p className="text-slate-400 text-xs text-center">En geç 24 saat içinde dönüş yapılır.</p>
    </form>
  );
}
