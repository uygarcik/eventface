"use client";
import { AlertTriangle, Camera, Home } from "lucide-react";
import Link from "next/link";

interface Props {
  message: string;
  onRetry: (() => void) | undefined;
}

export default function ErrorView({ message, onRetry }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center px-6 text-center">
      <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center mb-6 border border-red-500/20">
        <AlertTriangle size={32} className="text-red-400" />
      </div>

      <h2 className="text-white text-2xl font-bold mb-3">Bir Sorun Oluştu</h2>
      <p className="text-slate-400 text-sm mb-8 max-w-xs leading-relaxed">{message}</p>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center justify-center gap-2 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl transition-all active:scale-95"
          >
            <Camera size={20} />
            Tekrar Dene
          </button>
        )}
        <Link
          href="/"
          className="flex items-center justify-center gap-2 py-3.5 border border-slate-600 text-slate-300 font-medium rounded-2xl hover:border-slate-400 transition-colors"
        >
          <Home size={18} />
          Ana Sayfa
        </Link>
      </div>
    </div>
  );
}
