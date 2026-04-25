"use client";
import { useState } from "react";
import { X, Loader2, Calendar, MapPin, Type } from "lucide-react";
import { useAdminT } from "@/contexts/AdminLangContext";

interface Props { onClose: () => void; onCreated: () => void; }

export default function NewEventModal({ onClose, onCreated }: Props) {
  const { t } = useAdminT();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, date, location }),
    });
    if (res.ok) {
      onCreated();
    } else {
      const d = await res.json();
      setError(d.error ?? "Error");
      setLoading(false);
    }
  }

  const inputClass = "w-full pl-9 pr-4 py-3 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4B4FAE]/30 focus:border-[#4B4FAE] transition-all";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">{t.newEvent.title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{t.newEvent.name} {t.newEvent.required}</label>
            <div className="relative">
              <Type size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder={t.newEvent.namePlaceholder} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{t.newEvent.date} {t.newEvent.required}</label>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{t.newEvent.location} <span className="text-slate-400">{t.newEvent.optional}</span></label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder={t.newEvent.locationPlaceholder} className={inputClass} />
            </div>
          </div>
          {error && <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">{error}</div>}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50">{t.newEvent.cancel}</button>
            <button type="submit" disabled={loading} className="flex-1 py-3 bg-[#4B4FAE] hover:bg-[#3a3e8f] disabled:opacity-60 text-white font-medium rounded-xl flex items-center justify-center gap-2">
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}{t.newEvent.create}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
