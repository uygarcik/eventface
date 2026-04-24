import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Phogo — Etkinlik Fotoğrafını Saniyeler İçinde Bul",
  description: "Phogo ile etkinlikteki fotoğraflarınıza anında ulaşın. QR kodu okutun, selfie çekin — yapay zeka binlerce fotoğraf arasından sizinkini saniyeler içinde bulur. Düğün, kurumsal etkinlik, festival için ideal.",
  keywords: "etkinlik fotoğraf, yüz tanıma, QR fotoğraf, etkinlik organizasyon, fotoğraf bulma",
  openGraph: {
    title: "Phogo — Etkinlik Fotoğrafını Saniyeler İçinde Bul",
    description: "QR okut, selfie çek, fotoğraflarını al. Phogo ile etkinlik fotoğrafçılığı artık çok kolay.",
    url: "https://phogo.app",
    siteName: "Phogo",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${geist.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
