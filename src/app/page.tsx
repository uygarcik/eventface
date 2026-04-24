import Link from "next/link";
import Image from "next/image";
import { Camera, Zap, Shield, Download, QrCode, Users, Star, ArrowRight, Check } from "lucide-react";

export const metadata = {
  title: "Phogo — Etkinlik Fotoğraflarını Anında Bul",
  description: "Yüz tanıma teknolojisiyle etkinlik fotoğraflarını saniyeler içinde bul ve indir. QR kodu tara, selfie çek, fotoğrafların hazır.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Phogo" width={120} height={40} className="h-8 w-auto object-contain" priority />
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#nasil-calisir" className="hover:text-slate-900 transition-colors">Nasıl Çalışır?</a>
            <a href="#ozellikler" className="hover:text-slate-900 transition-colors">Özellikler</a>
            <a href="#fiyatlandirma" className="hover:text-slate-900 transition-colors">Fiyatlandırma</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/login" className="text-sm text-slate-600 hover:text-slate-900 transition-colors hidden sm:block">
              Giriş Yap
            </Link>
            <a href="mailto:hello@phogo.app" className="text-sm bg-[#4B4FAE] hover:bg-[#3a3e8f] text-white px-4 py-2 rounded-lg transition-colors font-medium">
              Demo Al
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/60 to-white pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-[#4B4FAE] text-sm px-4 py-2 rounded-full mb-8 font-medium">
            <Zap size={14} />
            Yapay Zeka ile Güçlendirilmiş
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
            Etkinlik fotoğrafını<br />
            <span className="text-[#4B4FAE]">3 saniyede</span> bul
          </h1>

          <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Katılımcılar QR kodu okutup selfie çekiyor, Phogo tüm etkinlik fotoğrafları arasından onların bulunduğu her kareyi anında buluyor.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:hello@phogo.app"
              className="flex items-center gap-2 bg-[#4B4FAE] hover:bg-[#3a3e8f] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-200 active:scale-95"
            >
              Ücretsiz Demo Talep Et
              <ArrowRight size={20} />
            </a>
            <a href="#nasil-calisir" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 px-6 py-4 rounded-xl font-medium transition-colors">
              Nasıl çalışır? →
            </a>
          </div>

          <p className="text-slate-400 text-sm mt-6">Kurulum gerektirmez · 5 dakikada aktif</p>
        </div>

        {/* Hero visual */}
        <div className="relative max-w-5xl mx-auto mt-16">
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 shadow-2xl">
            <div className="grid grid-cols-3 gap-4">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className={`aspect-square rounded-2xl ${i === 2 || i === 5 ? 'bg-indigo-500/40 ring-4 ring-indigo-400 ring-offset-2 ring-offset-slate-900' : 'bg-white/10'} flex items-center justify-center`}>
                  {(i === 2 || i === 5) && (
                    <div className="text-center">
                      <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Check size={20} className="text-white" />
                      </div>
                      <div className="text-white text-xs font-medium">Eşleşti!</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <div className="text-white/60 text-sm">1.240 fotoğraf tarandı</div>
              <div className="bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg font-medium">2 fotoğraf bulundu ✓</div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos / Social proof */}
      <section className="py-12 px-6 border-y border-slate-100 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-400 text-sm mb-6 uppercase tracking-widest font-medium">Hangi etkinlikler için?</p>
          <div className="flex flex-wrap justify-center gap-8 text-slate-500 font-medium">
            {["Düğünler", "Kurumsal Etkinlikler", "Mezuniyet Törenleri", "Festivaller", "Konserler", "Spor Organizasyonları"].map((item) => (
              <span key={item} className="text-base">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="nasil-calisir" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">3 adımda çalışır</h2>
            <p className="text-slate-500 text-lg">Katılımcılarınız için kurulum yok, uygulama yok, kayıt yok.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: Camera,
                title: "Fotoğrafları Yükle",
                desc: "Etkinlik fotoğraflarınızı admin paneline yükleyin. 5.000 fotoğrafa kadar destek.",
                color: "bg-indigo-50 text-[#4B4FAE]",
              },
              {
                step: "02",
                icon: QrCode,
                title: "QR'ı Paylaş",
                desc: "Oluşturulan QR kodu etkinlik alanına asın veya dijital ortamda paylaşın.",
                color: "bg-purple-50 text-purple-600",
              },
              {
                step: "03",
                icon: Download,
                title: "Anında İndir",
                desc: "Katılımcılar selfie çeker, Phogo fotoğraflarını bulur. Tek tıkla indirir.",
                color: "bg-green-50 text-green-600",
              },
            ].map(({ step, icon: Icon, title, desc, color }) => (
              <div key={step} className="relative">
                <div className="text-8xl font-bold text-slate-100 absolute -top-4 -left-2 select-none">{step}</div>
                <div className="relative bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
                  <p className="text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="ozellikler" className="py-24 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Her ölçeğe hazır</h2>
            <p className="text-slate-400 text-lg">50 kişilik bir toplantıdan 10.000 kişilik festivale kadar.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Anında Sonuç", desc: "AWS'nin yüz tanıma motoru milisaniyeler içinde eşleştirir.", color: "text-yellow-400" },
              { icon: Shield, title: "Gizlilik Öncelikli", desc: "Yüz verisi asla saklanmaz. Sadece anlık arama yapılır.", color: "text-green-400" },
              { icon: Users, title: "Toplu Yükleme", desc: "5.000 fotoğrafa kadar tek seferde yükleyin.", color: "text-blue-400" },
              { icon: Download, title: "Kolay İndirme", desc: "Katılımcılar tüm fotoğraflarını tek tıkla indirir.", color: "text-purple-400" },
              { icon: QrCode, title: "QR Sistemi", desc: "Her etkinliğe özel QR kod. Uygulama gerekmez.", color: "text-indigo-400" },
              { icon: Star, title: "Çoklu Etkinlik", desc: "Aynı anda birden fazla etkinliği yönetin.", color: "text-orange-400" },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors">
                <Icon size={24} className={`${color} mb-4`} />
                <h3 className="font-semibold text-white text-lg mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="fiyatlandirma" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Basit fiyatlandırma</h2>
            <p className="text-slate-500 text-lg">Gizli ücret yok. Etkinlik başına öde.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Başlangıç",
                price: "₺999",
                period: "/ etkinlik",
                desc: "Küçük etkinlikler için",
                features: ["500 fotoğrafa kadar", "Sınırsız katılımcı", "QR kod sistemi", "24 saat indirme linki", "E-posta destek"],
                cta: "Hemen Başla",
                highlight: false,
              },
              {
                name: "Profesyonel",
                price: "₺2.499",
                period: "/ etkinlik",
                desc: "Düğün & kurumsal için",
                features: ["2.000 fotoğrafa kadar", "Sınırsız katılımcı", "QR kod sistemi", "7 gün indirme linki", "Öncelikli destek", "Özel marka kaldırma"],
                cta: "Demo Al",
                highlight: true,
              },
              {
                name: "Kurumsal",
                price: "Özel",
                period: "fiyatlandırma",
                desc: "Festival & büyük organizasyonlar",
                features: ["5.000+ fotoğraf", "Sınırsız etkinlik", "API erişimi", "SLA garantisi", "Özel entegrasyon", "Dedike destek"],
                cta: "İletişime Geç",
                highlight: false,
              },
            ].map(({ name, price, period, desc, features, cta, highlight }) => (
              <div key={name} className={`rounded-2xl p-6 border-2 transition-all ${highlight ? 'border-[#4B4FAE] bg-[#4B4FAE] shadow-xl shadow-indigo-200' : 'border-slate-200 bg-white hover:border-indigo-200'}`}>
                {highlight && <div className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-4">En Popüler</div>}
                <div className={`text-sm font-medium mb-1 ${highlight ? 'text-indigo-200' : 'text-slate-500'}`}>{name}</div>
                <div className={`text-4xl font-bold mb-1 ${highlight ? 'text-white' : 'text-slate-900'}`}>{price}</div>
                <div className={`text-sm mb-2 ${highlight ? 'text-indigo-200' : 'text-slate-400'}`}>{period}</div>
                <div className={`text-sm mb-6 ${highlight ? 'text-indigo-100' : 'text-slate-500'}`}>{desc}</div>
                <ul className="space-y-3 mb-8">
                  {features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${highlight ? 'text-indigo-100' : 'text-slate-600'}`}>
                      <Check size={15} className={highlight ? 'text-indigo-300' : 'text-indigo-500'} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="mailto:hello@phogo.app"
                  className={`block text-center py-3 rounded-xl font-semibold transition-all ${highlight ? 'bg-white text-[#4B4FAE] hover:bg-indigo-50' : 'bg-[#4B4FAE] text-white hover:bg-[#3a3e8f]'}`}
                >
                  {cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#4B4FAE] to-[#3a3e8f]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Bir sonraki etkinliğinizde deneyin
          </h2>
          <p className="text-indigo-200 text-xl mb-10">
            5 dakikada kurulum. Katılımcılarınız fotoğraflarını anında bulur.
          </p>
          <a
            href="mailto:hello@phogo.app"
            className="inline-flex items-center gap-3 bg-white text-[#4B4FAE] px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl hover:shadow-2xl active:scale-95"
          >
            <Camera size={22} />
            Ücretsiz Demo Talep Et
          </a>
          <p className="text-indigo-300 text-sm mt-4">hello@phogo.app · En geç 24 saat içinde dönüş</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Phogo" width={100} height={32} className="h-7 w-auto object-contain brightness-0 invert" />
          </div>
          <div className="text-slate-500 text-sm">© 2026 Phogo. Tüm hakları saklıdır.</div>
          <div className="flex gap-6 text-slate-500 text-sm">
            <a href="mailto:hello@phogo.app" className="hover:text-white transition-colors">İletişim</a>
            <Link href="/admin/login" className="hover:text-white transition-colors">Admin</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
