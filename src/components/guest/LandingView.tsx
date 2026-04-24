"use client";
import { Camera, MapPin, Calendar, ImageIcon, ChevronRight, Sparkles } from "lucide-react";

interface Props {
  event: {
    name: string;
    date: string;
    location: string | null;
    _count: { photos: number };
  };
  onStart: () => void;
}

export default function LandingView({ event, onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 flex flex-col">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative flex flex-col flex-1 items-center justify-center px-6 py-12 text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-3xl shadow-2xl shadow-indigo-500/30 mb-4">
            <Camera size={36} className="text-white" />
          </div>
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full">
            <Sparkles size={12} />
            Yüz Tanıma Teknolojisi
          </div>
        </div>

        {/* Event info */}
        <h1 className="text-3xl font-bold text-white mb-2 leading-tight">{event.name}</h1>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-1.5 text-slate-400 text-sm">
            <Calendar size={14} />
            {new Date(event.date).toLocaleDateString("tr-TR", {
              day: "numeric", month: "long", year: "numeric"
            })}
          </div>
          {event.location && (
            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
              <MapPin size={14} />
              {event.location}
            </div>
          )}
        </div>

        {/* Photo count badge */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 mb-10">
          <ImageIcon size={18} className="text-indigo-400" />
          <span className="text-white font-semibold">{event._count.photos.toLocaleString()}</span>
          <span className="text-slate-400 text-sm">fotoğraf yüklendi</span>
        </div>

        {/* How it works */}
        <div className="w-full max-w-sm mb-10">
          <div className="grid grid-cols-3 gap-3">
            {[
              { step: "1", text: "Kamerayı Aç" },
              { step: "2", text: "Yüzünü Tara" },
              { step: "3", text: "Fotoğraflarını Bul" },
            ].map(({ step, text }) => (
              <div key={step} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-bold mx-auto mb-2">
                  {step}
                </div>
                <div className="text-white text-xs font-medium leading-tight">{text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="w-full max-w-sm flex items-center justify-center gap-3 py-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-lg font-bold rounded-2xl transition-all shadow-2xl shadow-indigo-500/30 active:scale-[0.98]"
        >
          <Camera size={22} />
          Fotoğraflarımı Bul
          <ChevronRight size={20} />
        </button>

        <p className="text-slate-500 text-xs mt-4">
          Yüz veriniz kaydedilmez • Güvenli & Özel
        </p>
      </div>
    </div>
  );
}
