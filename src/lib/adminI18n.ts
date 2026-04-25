export const adminTranslations = {
  tr: {
    sidebar: { dashboard: "Dashboard", clients: "Müşteriler", logout: "Çıkış Yap", superAdmin: "Super Admin", client: "Müşteri" },
    dashboard: {
      title: "Etkinlikler", subtitle: "Tüm etkinliklerinizi buradan yönetin",
      newEvent: "Yeni Etkinlik", totalEvents: "Toplam Etkinlik", totalPhotos: "Toplam Fotoğraf",
      activeSystem: "Aktif Sistem", working: "Çalışıyor", noEvents: "Henüz etkinlik yok",
      noEventsDesc: "İlk etkinliğinizi oluşturun ve fotoğraf yüklemeye başlayın",
      createFirst: "İlk Etkinliği Oluştur", photos: "fotoğraf",
    },
    newEvent: {
      title: "Yeni Etkinlik", name: "Etkinlik Adı", namePlaceholder: "örn. Yılbaşı Partisi 2026",
      date: "Tarih", location: "Konum", locationPlaceholder: "örn. İstanbul Convention Center",
      optional: "(opsiyonel)", cancel: "İptal", create: "Oluştur", required: "*",
    },
    eventDetail: {
      back: "Tüm Etkinlikler", tabs: { upload: "Fotoğraf Yükle", index: "Yüz İndeksleme", qr: "QR Kod" },
    },
    uploader: {
      dropzone: "Fotoğrafları sürükleyip bırakın", dropzoneOr: "veya tıklayarak seçin • JPG, PNG, WEBP • Sınır yok",
      files: "dosya seçildi", completed: "tamamlandı", errors: "hata", clear: "Temizle",
      upload: "Dosyayı Yükle", uploading: "Yükleniyor...", done: "fotoğraf yüklendi", failed: "başarısız",
    },
    indexing: {
      title: "Yüz İndeksleme", subtitle: "AWS Rekognition ile fotoğraflardaki yüzler tanımlanır",
      totalPhotos: "Toplam Foto", indexed: "İndekslendi", pending: "Bekliyor",
      progress: "İlerleme", start: "İndekslemeyi Başlat", indexing: "İndeksleniyor...", rerun: "Yeniden Çalıştır",
      howTitle: "Nasıl Çalışır?", step1: "Her fotoğraf AWS Rekognition'a gönderilir",
      step2: "Yüzler tespit edilip bu etkinliğin koleksiyonuna eklenir",
      step3: "Katılımcılar QR okutunca yüzleri bu koleksiyonla eşleştirilir",
    },
    qr: {
      title: "QR Kod", subtitle: "Etkinlikte bu QR kodu katılımcılara gösterin veya yazdırın",
      scanText: "Fotoğraflarınızı bulmak için tarayın", copy: "Kopyala", copied: "Kopyalandı",
      print: "Yazdır", preview: "Önizle",
      tips: "Kullanım İpuçları", tip1: "QR'yi A4 kağıda büyük boyutlu yazdırın, etkinlik alanına asın",
      tip2: "Masalara küçük standlar yerleştirin", tip3: "Linki sosyal medyadan veya SMS ile de paylaşabilirsiniz",
      tip4: "Fotoğraflar 24 saat geçerli güvenli link ile indirilir",
    },
    clients: {
      title: "Müşteriler", subtitle: "Tüm müşteri hesaplarını buradan yönetin",
      newClient: "Yeni Müşteri", noClients: "Henüz müşteri yok", noClientsDesc: "İlk müşteri hesabını oluşturun",
      createFirst: "Müşteri Oluştur", name: "Ad Soyad", company: "Şirket", events: "Etkinlik",
      status: "Durum", active: "Aktif", passive: "Pasif", delete: "Sil", deleteConfirm: "hesabını silmek istediğinize emin misiniz? Tüm etkinlikleri de silinecek.",
      resetPw: "Şifre sıfırla", save: "Kaydet", newPassword: "Yeni şifre",
    },
    newClient: {
      title: "Yeni Müşteri", name: "Ad Soyad", company: "Şirket", email: "E-posta",
      password: "Şifre", minChars: "En az 8 karakter", generate: "Üret",
      cancel: "İptal", create: "Oluştur", emailPlaceholder: "musteri@firma.com",
      namePlaceholder: "Ahmet Yılmaz", companyPlaceholder: "Firma Adı",
    },
  },
  en: {
    sidebar: { dashboard: "Dashboard", clients: "Clients", logout: "Sign Out", superAdmin: "Super Admin", client: "Client" },
    dashboard: {
      title: "Events", subtitle: "Manage all your events from here",
      newEvent: "New Event", totalEvents: "Total Events", totalPhotos: "Total Photos",
      activeSystem: "Active System", working: "Running", noEvents: "No events yet",
      noEventsDesc: "Create your first event and start uploading photos",
      createFirst: "Create First Event", photos: "photos",
    },
    newEvent: {
      title: "New Event", name: "Event Name", namePlaceholder: "e.g. Annual Gala 2026",
      date: "Date", location: "Location", locationPlaceholder: "e.g. Grand Hyatt Istanbul",
      optional: "(optional)", cancel: "Cancel", create: "Create", required: "*",
    },
    eventDetail: {
      back: "All Events", tabs: { upload: "Upload Photos", index: "Face Indexing", qr: "QR Code" },
    },
    uploader: {
      dropzone: "Drag and drop photos here", dropzoneOr: "or click to select • JPG, PNG, WEBP • No limit",
      files: "files selected", completed: "completed", errors: "errors", clear: "Clear",
      upload: "Upload Files", uploading: "Uploading...", done: "photos uploaded", failed: "failed",
    },
    indexing: {
      title: "Face Indexing", subtitle: "AWS Rekognition detects and indexes faces in your photos",
      totalPhotos: "Total Photos", indexed: "Indexed", pending: "Pending",
      progress: "Progress", start: "Start Indexing", indexing: "Indexing...", rerun: "Re-run",
      howTitle: "How It Works?", step1: "Each photo is sent to AWS Rekognition",
      step2: "Faces are detected and added to this event's collection",
      step3: "When attendees scan the QR, their faces are matched against this collection",
    },
    qr: {
      title: "QR Code", subtitle: "Display or print this QR code for attendees at your event",
      scanText: "Scan to find your photos", copy: "Copy", copied: "Copied",
      print: "Print", preview: "Preview",
      tips: "Usage Tips", tip1: "Print the QR in large format on A4 paper and hang it at the venue",
      tip2: "Place small stands on tables", tip3: "You can also share the link via social media or SMS",
      tip4: "Photos are downloaded via secure links valid for 24 hours",
    },
    clients: {
      title: "Clients", subtitle: "Manage all client accounts from here",
      newClient: "New Client", noClients: "No clients yet", noClientsDesc: "Create your first client account",
      createFirst: "Create Client", name: "Full Name", company: "Company", events: "Events",
      status: "Status", active: "Active", passive: "Inactive", delete: "Delete", deleteConfirm: "are you sure you want to delete this account? All their events will also be deleted.",
      resetPw: "Reset password", save: "Save", newPassword: "New password",
    },
    newClient: {
      title: "New Client", name: "Full Name", company: "Company", email: "Email",
      password: "Password", minChars: "At least 8 characters", generate: "Generate",
      cancel: "Cancel", create: "Create", emailPlaceholder: "client@company.com",
      namePlaceholder: "John Smith", companyPlaceholder: "Company Name",
    },
  },
} as const;

export type AdminLang = keyof typeof adminTranslations;
export type AdminT = typeof adminTranslations.tr | typeof adminTranslations.en;
