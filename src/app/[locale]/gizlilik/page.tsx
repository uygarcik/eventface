import Link from "next/link";
import Image from "next/image";
import { type Locale } from "@/i18n";

const content = {
  tr: {
    title: "Gizlilik Politikası & KVKK Aydınlatma Metni",
    updated: "Son güncelleme: Nisan 2026",
    sections: [
      {
        heading: "1. Veri Sorumlusu",
        text: `Bu Gizlilik Politikası; Phogo ("Phogo", "biz" veya "şirket") tarafından işletilen phogo.app web sitesi ve sunulan hizmetlere ilişkin kişisel veri işleme faaliyetlerini açıklamaktadır.

Veri Sorumlusu: Phogo
İletişim: info@phogo.app
Web sitesi: phogo.app`,
      },
      {
        heading: "2. Toplanan Kişisel Veriler",
        text: `Hizmetlerimizi kullanmanız sırasında aşağıdaki veriler işlenebilir:

a) İletişim Formu Verileri
• Ad Soyad
• E-posta adresi
• Telefon numarası (opsiyonel)
• Şirket/organizasyon adı (opsiyonel)
• Mesaj içeriği

b) Yönetici Hesap Verileri
• E-posta adresi
• Şifreli (hashlenmiş) parola
• Hesap oluşturma tarihi

c) Yüz Tanıma Verisi (Etkinlik Katılımcıları)
ÖNEMLİ: Phogo, yüz tanıma işlemini anlık olarak gerçekleştirir ve hiçbir yüz verisini depolamaz. Katılımcının selfie fotoğrafı yalnızca eşleştirme işlemi süresince bellekte tutulur ve işlem tamamlandıktan sonra derhal silinir. Biyometrik veri anlamında kalıcı bir kayıt oluşturulmaz.`,
      },
      {
        heading: "3. Kişisel Verilerin İşlenme Amaçları",
        text: `• Demo talebi ve müşteri iletişiminin sağlanması
• Hizmet sözleşmesinin kurulması ve ifası
• Yönetici hesaplarının güvenli şekilde yönetilmesi
• Yasal yükümlülüklerin yerine getirilmesi
• Meşru menfaatlerimiz kapsamında hizmet kalitesinin artırılması`,
      },
      {
        heading: "4. Hukuki Dayanak",
        text: `Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun (KVKK) 5. ve 6. maddeleri kapsamında aşağıdaki hukuki dayanaklara göre işlenmektedir:

• Açık rızanız (yüz tanıma işlemi için)
• Sözleşmenin kurulması ve ifası
• Veri sorumlusunun meşru menfaati
• Kanuni yükümlülüğün yerine getirilmesi`,
      },
      {
        heading: "5. Veri Saklama Süreleri",
        text: `• İletişim formu verileri: 3 yıl
• Yönetici hesap verileri: Hesap silinene kadar
• Etkinlik fotoğrafları (S3): Etkinlik sahibinin sildiği zamana kadar (maksimum 1 yıl)
• Yüz tanıma verisi: İşlem süresiyle sınırlı (anlık, depolanmaz)`,
      },
      {
        heading: "6. Verilerin Aktarımı",
        text: `Kişisel verileriniz; hizmetlerimizin sunulması amacıyla aşağıdaki üçüncü taraflarla paylaşılabilir:

• Amazon Web Services (AWS) — Fotoğraf depolama (S3) ve yüz tanıma (Rekognition) hizmetleri; sunucular Avrupa'da (Frankfurt) konumlanmaktadır
• Vercel — Web uygulaması barındırma hizmeti
• Neon (PostgreSQL) — Veritabanı hizmeti
• Resend — E-posta iletişim hizmeti

Üçüncü taraflarla yapılan veri aktarımları, KVKK'nın 8. ve 9. maddeleri ile GDPR'ın ilgili hükümleri çerçevesinde gerçekleştirilmekte olup gerekli güvenlik önlemleri alınmaktadır.`,
      },
      {
        heading: "7. KVKK Kapsamındaki Haklarınız",
        text: `6698 sayılı KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:

• Kişisel verilerinizin işlenip işlenmediğini öğrenme
• İşlenen verileriniz hakkında bilgi talep etme
• Verilerinizin işlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme
• Verilerinizin aktarıldığı üçüncü kişileri öğrenme
• Eksik veya yanlış işlenen verilerin düzeltilmesini isteme
• Verilerin silinmesini veya yok edilmesini talep etme
• İşlemenin otomatik sistemler aracılığıyla yapılması halinde ortaya çıkan aleyhte sonuçlara itiraz etme
• Verilerinizin kanuna aykırı işlenmesi nedeniyle uğradığınız zararın tazminini talep etme

Haklarınızı kullanmak için: info@phogo.app`,
      },
      {
        heading: "8. Çerezler (Cookies)",
        text: `Web sitemiz minimum düzeyde çerez kullanmaktadır. Detaylı bilgi için Çerez Politikamızı inceleyiniz.`,
      },
      {
        heading: "9. Güvenlik Önlemleri",
        text: `Kişisel verilerinizi korumak için endüstri standardı güvenlik önlemleri uygulanmaktadır:
• HTTPS şifrelemesi (Cloudflare SSL)
• Parolalar bcrypt ile hashlenmektedir
• JWT tabanlı oturum yönetimi
• AWS IAM ile erişim kontrolü
• Fotoğraflar imzalı (signed) URL'ler ile korunmaktadır`,
      },
      {
        heading: "10. Politika Güncellemeleri",
        text: `Bu politika zaman zaman güncellenebilir. Önemli değişikliklerde kullanıcılar bilgilendirilecektir. Güncel politika her zaman phogo.app/gizlilik adresinde yayımlanmaktadır.

Sorularınız için: info@phogo.app`,
      },
    ],
  },
  en: {
    title: "Privacy Policy & Data Protection",
    updated: "Last updated: April 2026",
    sections: [
      {
        heading: "1. Data Controller",
        text: `This Privacy Policy describes how Phogo ("Phogo", "we" or "company") processes personal data in connection with phogo.app and our services.

Data Controller: Phogo
Contact: info@phogo.app
Website: phogo.app`,
      },
      {
        heading: "2. Personal Data We Collect",
        text: `The following data may be processed when you use our services:

a) Contact Form Data
• Full name
• Email address
• Phone number (optional)
• Company/organization name (optional)
• Message content

b) Admin Account Data
• Email address
• Encrypted (hashed) password
• Account creation date

c) Face Recognition Data (Event Attendees)
IMPORTANT: Phogo processes facial recognition data in real-time and does not store any facial data. The attendee's selfie is held in memory only during the matching process and is immediately deleted after completion. No permanent biometric record is created.`,
      },
      {
        heading: "3. Purposes of Processing",
        text: `• Processing demo requests and customer communications
• Establishing and performing service agreements
• Secure management of administrator accounts
• Compliance with legal obligations
• Service quality improvement within our legitimate interests`,
      },
      {
        heading: "4. Legal Basis",
        text: `Your personal data is processed under the following legal bases in accordance with GDPR Article 6 and Turkey's KVKK:

• Your explicit consent (for face recognition processing)
• Performance of a contract
• Legitimate interests of the data controller
• Compliance with legal obligations`,
      },
      {
        heading: "5. Data Retention",
        text: `• Contact form data: 3 years
• Admin account data: Until account deletion
• Event photos (S3): Until deleted by event owner (maximum 1 year)
• Face recognition data: Limited to processing time (real-time, not stored)`,
      },
      {
        heading: "6. Data Transfers",
        text: `Your data may be shared with the following third parties to provide our services:

• Amazon Web Services (AWS) — Photo storage (S3) and face recognition (Rekognition); servers located in Europe (Frankfurt)
• Vercel — Web application hosting
• Neon (PostgreSQL) — Database service
• Resend — Email communication service

All transfers comply with GDPR Chapter V and KVKK Articles 8-9.`,
      },
      {
        heading: "7. Your Rights",
        text: `Under GDPR Article 15-22 and KVKK Article 11, you have the right to:

• Know whether your personal data is being processed
• Request information about processed data
• Learn the purpose of processing and whether it is used accordingly
• Know third parties to whom your data is transferred
• Request correction of incomplete or inaccurate data
• Request deletion or destruction of your data
• Object to automated decision-making
• Claim compensation for damages arising from unlawful processing

To exercise your rights: info@phogo.app`,
      },
      {
        heading: "8. Cookies",
        text: `Our website uses cookies to a minimum extent. Please refer to our Cookie Policy for more information.`,
      },
      {
        heading: "9. Security Measures",
        text: `Industry-standard security measures are in place to protect your personal data:
• HTTPS encryption (Cloudflare SSL)
• Passwords are hashed using bcrypt
• JWT-based session management
• AWS IAM access control
• Photos protected with signed URLs`,
      },
      {
        heading: "10. Policy Updates",
        text: `This policy may be updated from time to time. Users will be notified of significant changes. The current policy is always available at phogo.app/privacy.

For questions: info@phogo.app`,
      },
    ],
  },
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const lang = (locale === "en" ? "en" : "tr") as Locale;
  const c = content[lang];

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{c.title}</h1>
        <p className="text-slate-400 text-sm mb-10">{c.updated}</p>

        <div className="space-y-8">
          {c.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="text-lg font-bold text-slate-900 mb-3">{section.heading}</h2>
              <div className="text-slate-600 leading-relaxed whitespace-pre-line text-sm">{section.text}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex gap-6 text-sm text-slate-400">
          <Link href={`/${locale}/cerezler`} className="hover:text-[#4B4FAE] transition-colors">
            {lang === "tr" ? "Çerez Politikası" : "Cookie Policy"}
          </Link>
          <a href="mailto:info@phogo.app" className="hover:text-[#4B4FAE] transition-colors">info@phogo.app</a>
        </div>
      </div>
    </div>
  );
}
