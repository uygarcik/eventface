"use client";
import { useTranslations } from "next-intl";
import { AlertTriangle, Camera, Home } from "lucide-react";
import Link from "next/link";

interface Props {
  message: string;
  onRetry: (() => void) | undefined;
}

export default function ErrorView({ message, onRetry }: Props) {
  const t = useTranslations("guest");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mb-6 border border-red-500/20">
        <AlertTriangle size={32} className="text-red-400" />
      </div>
      <h2 className="text-white text-2xl font-bold mb-3">Hata</h2>
      <p className="text-slate-400 text-sm mb-8 max-w-xs leading-relaxed">{message}</p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {onRetry && (
          <button onClick={onRetry}
            className="flex items-center justify-center gap-2 py-3.5 bg-[#4B4FAE] hover:bg-[#5a5ec0] text-white font-semibold rounded-2xl transition-all active:scale-95">
            <Camera size={20} />{t("retry")}
          </button>
        )}
        <Link href="/"
          className="flex items-center justify-center gap-2 py-3.5 border border-slate-600 text-slate-300 font-medium rounded-2xl hover:border-slate-400 transition-colors">
          <Home size={18} />Ana Sayfa
        </Link>
      </div>
    </div>
  );
}
