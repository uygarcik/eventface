"use client";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("guest");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 flex flex-col">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#4B4FAE]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative flex flex-col flex-1 items-center justify-center px-6 py-12 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#4B4FAE] rounded-3xl shadow-2xl shadow-[#4B4FAE]/30 mb-4">
            <Camera size={36} className="text-white" />
          </div>
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full">
            <Sparkles size={12} />
            {t("aiPowered")}
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2 leading-tight">{event.name}</h1>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-1.5 text-slate-400 text-sm">
            <Calendar size={14} />
            {new Date(event.date).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
          </div>
          {event.location && (
            <div className="flex items-center gap-1.5 text-slate-400 text-sm">
              <MapPin size={14} />
              {event.location}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 mb-10">
          <ImageIcon size={18} className="text-[#7b80d4]" />
          <span className="text-white font-semibold">{event._count.photos.toLocaleString()}</span>
          <span className="text-slate-400 text-sm">{t("scanCount")}</span>
        </div>

        <div className="w-full max-w-sm mb-10">
          <div className="grid grid-cols-3 gap-3">
            {[t("howStep1"), t("howStep2"), t("howStep3")].map((text, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div className="w-7 h-7 bg-[#4B4FAE] rounded-lg flex items-center justify-center text-white text-xs font-bold mx-auto mb-2">
                  {i + 1}
                </div>
                <div className="text-white text-xs font-medium leading-tight">{text}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full max-w-sm flex items-center justify-center gap-3 py-4 bg-[#4B4FAE] hover:bg-[#5a5ec0] active:bg-[#3a3e8f] text-white text-lg font-bold rounded-2xl transition-all shadow-2xl shadow-[#4B4FAE]/30 active:scale-[0.98]"
        >
          <Camera size={22} />
          {t("findPhotos")}
          <ChevronRight size={20} />
        </button>

        <p className="text-slate-500 text-xs mt-4">{t("privacy")}</p>
      </div>
    </div>
  );
}
