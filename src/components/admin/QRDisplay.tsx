"use client";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { Copy, Check, ExternalLink, Printer } from "lucide-react";

interface Props {
  event: {
    id: string;
    name: string;
    qrToken: string;
  };
}

export default function QRDisplay({ event }: Props) {
  const [copied, setCopied] = useState(false);
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const eventUrl = `${baseUrl}/e/${event.qrToken}`;

  function copyLink() {
    navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function print() {
    window.print();
  }

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-900 mb-1">QR Kod</h3>
        <p className="text-slate-500 text-sm mb-6">
          Etkinlikte bu QR kodu katılımcılara gösterin veya yazdırın
        </p>

        {/* QR Code */}
        <div className="flex flex-col items-center gap-6">
          <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm">
            <QRCodeSVG
              value={eventUrl}
              size={220}
              level="H"
              includeMargin={false}
              fgColor="#1e1b4b"
            />
          </div>

          <div className="text-center">
            <div className="font-bold text-slate-900 text-lg">{event.name}</div>
            <div className="text-slate-500 text-sm mt-1">Fotoğraflarınızı bulmak için tarayın</div>
          </div>

          {/* URL */}
          <div className="w-full flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <span className="flex-1 text-slate-600 text-sm truncate font-mono">{eventUrl}</span>
            <button
              onClick={copyLink}
              className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-700 flex-shrink-0 transition-colors"
            >
              {copied ? (
                <><Check size={15} className="text-green-500" /> Kopyalandı</>
              ) : (
                <><Copy size={15} /> Kopyala</>
              )}
            </button>
          </div>

          {/* Actions */}
          <div className="flex gap-3 w-full">
            <button
              onClick={print}
              className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
            >
              <Printer size={18} />
              Yazdır
            </button>
            <a
              href={eventUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors"
            >
              <ExternalLink size={18} />
              Önizle
            </a>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 rounded-2xl p-5">
        <h4 className="font-semibold text-amber-900 mb-3 text-sm">Kullanım İpuçları</h4>
        <ul className="space-y-2 text-sm text-amber-700">
          <li>• QR'yi A4 kağıda büyük boyutlu yazdırın, etkinlik alanına asın</li>
          <li>• Masalara küçük standlar yerleştirin</li>
          <li>• Linki sosyal medyadan veya SMS ile de paylaşabilirsiniz</li>
          <li>• Fotoğraflar 24 saat geçerli güvenli link ile indirilir</li>
        </ul>
      </div>
    </div>
  );
}
