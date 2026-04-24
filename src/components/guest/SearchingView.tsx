"use client";
import { useEffect, useState } from "react";

const steps = [
  "Yüzünüz analiz ediliyor...",
  "Fotoğraflar taranıyor...",
  "Eşleşmeler bulunuyor...",
  "Fotoğraflarınız hazırlanıyor...",
];

export default function SearchingView() {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIdx((i) => Math.min(i + 1, steps.length - 1));
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-950 flex flex-col items-center justify-center px-6">
      {/* Animated rings */}
      <div className="relative flex items-center justify-center mb-10">
        <div className="absolute w-32 h-32 rounded-full border-2 border-indigo-500/20 animate-ping" />
        <div className="absolute w-24 h-24 rounded-full border-2 border-indigo-500/30 animate-ping [animation-delay:300ms]" />
        <div className="absolute w-16 h-16 rounded-full border-2 border-indigo-500/40 animate-ping [animation-delay:600ms]" />
        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/50">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      </div>

      <h2 className="text-white text-2xl font-bold mb-3 text-center">
        Fotoğraflarınız Aranıyor
      </h2>

      <div className="h-6 overflow-hidden">
        <p className="text-indigo-300 text-center text-sm transition-all duration-500">
          {steps[stepIdx]}
        </p>
      </div>

      {/* Step dots */}
      <div className="flex gap-2 mt-8">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i <= stepIdx ? "bg-indigo-500 w-6" : "bg-white/20 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
