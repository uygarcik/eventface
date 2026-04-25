import Link from "next/link";
import Image from "next/image";

const content = {
  tr: {
    title: "Çerez Politikası",
    updated: "Son güncelleme: Nisan 2026",
    intro: "Bu Çerez Politikası, phogo.app web sitesinde hangi çerezlerin kullanıldığını, bunların amaçlarını ve nasıl yönetebileceğinizi açıklamaktadır.",
    sections: [
      {
        heading: "1. Çerez Nedir?",
        text: "Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız tarafından cihazınıza kaydedilen küçük metin dosyalarıdır. Web sitelerinin çalışmasını sağlamak, kullanım deneyimini iyileştirmek veya site sahiplerine analitik bilgiler sunmak amacıyla kullanılırlar.",
      },
      {
        heading: "2. Kullandığımız Çerezler",
        text: "",
        table: [
          { name: "admin_token", type: "Zorunlu", purpose: "Yönetici oturumu kimlik doğrulama", duration: "7 gün", thirdParty: "Hayır" },
          { name: "phogo-lang", type: "İşlevsel", purpose: "Dil tercihinizi kaydetme (TR/EN)", duration: "Tarayıcı kapanana kadar (localStorage)", thirdParty: "Hayır" },
          { name: "phogo-cookie-consent", type: "Zorunlu", purpose: "Çerez onayı kaydı", duration: "7 gün", thirdParty: "Hayır" },
        ],
      },
      {
        heading: "3. Üçüncü Taraf Çerezleri",
        text: "Phogo, reklam amaçlı üçüncü taraf çerezleri veya izleme araçları (Google Analytics, Facebook Pixel vb.) KULLANMAMAKTADIR. Yalnızca hizmetin temel işlevselliği için gerekli olan çerezler yerleştirilmektedir.",
      },
      {
        heading: "4. Çerezlerin Yönetimi",
        text: `Çerez tercihlerinizi aşağıdaki yollarla yönetebilirsiniz:

• Tarayıcı ayarları üzerinden tüm çerezleri engelleyebilir veya silebilirsiniz
• Zorunlu çerezleri devre dışı bırakmanız durumunda oturum açma gibi temel özellikler çalışmayabilir

Popüler tarayıcılarda çerez yönetimi:
• Chrome: Ayarlar > Gizlilik ve güvenlik > Çerezler
• Safari: Tercihler > Gizlilik
• Firefox: Seçenekler > Gizlilik ve Güvenlik`,
      },
      {
        heading: "5. Çerez Onayı Yenileme",
        text: "Çerez onayınız 7 günde bir yenilenir. Bu süre sonunda tekrar onayınız talep edilecektir. Onayı reddettiğinizde yalnızca zorunlu çerezler kullanılmaya devam eder.",
      },
      {
        heading: "6. İletişim",
        text: "Çerez politikamız hakkında sorularınız için: info@phogo.app",
      },
    ],
  },
  en: {
    title: "Cookie Policy",
    updated: "Last updated: April 2026",
    intro: "This Cookie Policy explains what cookies are used on phogo.app, their purposes, and how you can manage them.",
    sections: [
      {
        heading: "1. What Are Cookies?",
        text: "Cookies are small text files stored on your device by your browser when you visit a website. They are used to make websites function, improve user experience, or provide analytical information to site owners.",
      },
      {
        heading: "2. Cookies We Use",
        text: "",
        table: [
          { name: "admin_token", type: "Essential", purpose: "Admin session authentication", duration: "7 days", thirdParty: "No" },
          { name: "phogo-lang", type: "Functional", purpose: "Saves your language preference (TR/EN)", duration: "Until browser close (localStorage)", thirdParty: "No" },
          { name: "phogo-cookie-consent", type: "Essential", purpose: "Records cookie consent", duration: "7 days", thirdParty: "No" },
        ],
      },
      {
        heading: "3. Third-Party Cookies",
        text: "Phogo does NOT use advertising third-party cookies or tracking tools (Google Analytics, Facebook Pixel, etc.). Only cookies necessary for the core functionality of the service are placed.",
      },
      {
        heading: "4. Managing Cookies",
        text: `You can manage your cookie preferences in the following ways:

• You can block or delete all cookies through your browser settings
• Disabling essential cookies may prevent core features like logging in from working

Cookie management in popular browsers:
• Chrome: Settings > Privacy and security > Cookies
• Safari: Preferences > Privacy
• Firefox: Options > Privacy & Security`,
      },
      {
        heading: "5. Consent Renewal",
        text: "Your cookie consent is renewed every 7 days. After this period, your consent will be requested again. If you decline, only essential cookies will continue to be used.",
      },
      {
        heading: "6. Contact",
        text: "For questions about our cookie policy: info@phogo.app",
      },
    ],
  },
};

export default async function CookiePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = locale === "en" ? "en" : "tr";
  const c = content[lang];

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-100 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href={`/${locale}`}>
            <Image src="/logo.png" alt="Phogo" width={110} height={35} className="h-8 w-auto object-contain" />
          </Link>
          <Link href={`/${locale}`} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
            ← {lang === "tr" ? "Ana Sayfa" : "Home"}
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{c.title}</h1>
        <p className="text-slate-400 text-sm mb-4">{c.updated}</p>
        <p className="text-slate-600 leading-relaxed mb-10">{c.intro}</p>

        <div className="space-y-8">
          {c.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-bold text-slate-900 mb-3">{section.heading}</h2>
              {"table" in section && section.table ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="text-left px-4 py-3 border border-slate-200 font-semibold text-slate-700">{lang === "tr" ? "Çerez Adı" : "Cookie Name"}</th>
                        <th className="text-left px-4 py-3 border border-slate-200 font-semibold text-slate-700">{lang === "tr" ? "Tür" : "Type"}</th>
                        <th className="text-left px-4 py-3 border border-slate-200 font-semibold text-slate-700">{lang === "tr" ? "Amaç" : "Purpose"}</th>
                        <th className="text-left px-4 py-3 border border-slate-200 font-semibold text-slate-700">{lang === "tr" ? "Süre" : "Duration"}</th>
                        <th className="text-left px-4 py-3 border border-slate-200 font-semibold text-slate-700">{lang === "tr" ? "3. Taraf" : "3rd Party"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.map((row) => (
                        <tr key={row.name}>
                          <td className="px-4 py-3 border border-slate-200 font-mono text-xs text-slate-800">{row.name}</td>
                          <td className="px-4 py-3 border border-slate-200 text-slate-600">{row.type}</td>
                          <td className="px-4 py-3 border border-slate-200 text-slate-600">{row.purpose}</td>
                          <td className="px-4 py-3 border border-slate-200 text-slate-600">{row.duration}</td>
                          <td className="px-4 py-3 border border-slate-200 text-slate-600">{row.thirdParty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-slate-600 leading-relaxed whitespace-pre-line text-sm">{section.text}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex gap-6 text-sm text-slate-400">
          <Link href={`/${locale}/gizlilik`} className="hover:text-[#4B4FAE] transition-colors">
            {lang === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
          </Link>
          <a href="mailto:info@phogo.app" className="hover:text-[#4B4FAE] transition-colors">info@phogo.app</a>
        </div>
      </div>
    </div>
  );
}
