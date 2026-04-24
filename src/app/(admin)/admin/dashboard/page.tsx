"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Plus, Calendar, Image as ImageIcon, MapPin,
  QrCode, ChevronRight, Loader2, Camera, TrendingUp
} from "lucide-react";
import NewEventModal from "@/components/admin/NewEventModal";

interface Event {
  id: string;
  name: string;
  date: string;
  location: string | null;
  qrToken: string;
  _count: { photos: number };
}

export default function DashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchEvents = useCallback(async () => {
    const res = await fetch("/api/events");
    if (res.ok) setEvents(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const totalPhotos = events.reduce((s, e) => s + e._count.photos, 0);

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Etkinlikler</h1>
          <p className="text-slate-500 text-sm mt-1">Tüm etkinliklerinizi buradan yönetin</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm"
        >
          <Plus size={18} />
          Yeni Etkinlik
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Calendar size={20} className="text-indigo-600" />
            </div>
            <span className="text-slate-500 text-sm">Toplam Etkinlik</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{events.length}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <ImageIcon size={20} className="text-purple-600" />
            </div>
            <span className="text-slate-500 text-sm">Toplam Fotoğraf</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{totalPhotos.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} className="text-green-600" />
            </div>
            <span className="text-slate-500 text-sm">Aktif Sistem</span>
          </div>
          <div className="text-3xl font-bold text-green-600">Çalışıyor</div>
        </div>
      </div>

      {/* Event list */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-indigo-600" />
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-16 text-center">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Camera size={28} className="text-indigo-400" />
          </div>
          <h3 className="text-slate-700 font-semibold text-lg mb-2">Henüz etkinlik yok</h3>
          <p className="text-slate-400 text-sm mb-6">
            İlk etkinliğinizi oluşturun ve fotoğraf yüklemeye başlayın
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors"
          >
            <Plus size={18} />
            İlk Etkinliği Oluştur
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/admin/events/${event.id}`}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                <Calendar size={22} className="text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 truncate">{event.name}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-slate-500 text-sm flex items-center gap-1">
                    <Calendar size={13} />
                    {new Date(event.date).toLocaleDateString("tr-TR", {
                      day: "numeric", month: "long", year: "numeric"
                    })}
                  </span>
                  {event.location && (
                    <span className="text-slate-500 text-sm flex items-center gap-1">
                      <MapPin size={13} />
                      {event.location}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <div className="text-slate-900 font-semibold flex items-center gap-1.5">
                    <ImageIcon size={15} className="text-slate-400" />
                    {event._count.photos.toLocaleString()}
                  </div>
                  <div className="text-slate-400 text-xs">fotoğraf</div>
                </div>
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                  <QrCode size={15} className="text-slate-400" />
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {showModal && (
        <NewEventModal
          onClose={() => setShowModal(false)}
          onCreated={() => { setShowModal(false); fetchEvents(); }}
        />
      )}
    </div>
  );
}
