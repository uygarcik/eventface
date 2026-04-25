"use client";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { Copy, Check, ExternalLink, Printer } from "lucide-react";
import { useAdminT } from "@/contexts/AdminLangContext";

interface Props {
  event: { id: string; name: string; qrToken: string; };
}

export default function QRDisplay({ event }: Props) {
  const { t } = useAdminT();
  const T = t.qr;
  const [copied, setCopied] = useState(false);
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const eventUrl = `${baseUrl}/e/${event.qrToken}`;

  function copyLink() {
    navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-900 mb-1">{T.title}</h3>
        <p className="text-slate-500 text-sm mb-6">{T.subtitle}</p>
        <div className="flex flex-col items-center gap-6">
          <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm">
            <QRCodeSVG value={eventUrl} size={220} level="H" includeMargin={false} fgColor="#1e1b4b" />
          </div>
          <div className="text-center">
            <div className="font-bold text-slate-900 text-lg">{event.name}</div>
            <div className="text-slate-500 text-sm mt-1">{T.scanText}</div>
          </div>
          <div className="w-full flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <span className="flex-1 text-slate-600 text-sm truncate font-mono">{eventUrl}</span>
            <button onClick={copyLink} className="flex items-center gap-1.5 text-sm font-medium text-[#4B4FAE] hover:text-[#3a3e8f] flex-shrink-0 transition-colors">
              {copied ? <><Check size={15} className="text-green-500" /> {T.copied}</> : <><Copy size={15} /> {T.copy}</>}
            </button>
          </div>
          <div className="flex gap-3 w-full">
            <button onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
              <Printer size={18} />{T.print}
            </button>
            <a href={eventUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#4B4FAE] hover:bg-[#3a3e8f] text-white font-medium rounded-xl transition-colors">
              <ExternalLink size={18} />{T.preview}
            </a>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-2xl p-5">
        <h4 className="font-semibold text-amber-900 mb-3 text-sm">{T.tips}</h4>
        <ul className="space-y-2 text-sm text-amber-700">
          {[T.tip1, T.tip2, T.tip3, T.tip4].map((tip, i) => (
            <li key={i}>• {tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
