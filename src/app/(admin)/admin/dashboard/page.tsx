"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Plus, Calendar, Image as ImageIcon, MapPin, QrCode, ChevronRight, Loader2, Camera, TrendingUp, Trash2 } from "lucide-react";
import NewEventModal from "@/components/admin/NewEventModal";
import { useAdminT } from "@/contexts/AdminLangContext";

interface Event {
  id: string; name: string; date: string; location: string | null;
  qrToken: string; _count: { photos: number };
}

export default function DashboardPage() {
  const { t } = useAdminT();
  const lang = t.sidebar.clients === "Clients" ? "en" : "tr";
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Event | null>(null);

  const fetchEvents = useCallback(async () => {
    const res = await fetch("/api/events");
    if (res.ok) setEvents(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchEvents(); }, [fetchEvents]);

  const totalPhotos = events.reduce((s, e) => s + e._count.photos, 0);

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t.dashboard.title}</h1>
          <p className="text-slate-500 text-sm mt-1">{t.dashboard.subtitle}</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#4B4FAE] hover:bg-[#3a3e8f] text-white font-medium rounded-xl transition-colors shadow-sm">
          <Plus size={18} />{t.dashboard.newEvent}
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
              <Calendar size={20} className="text-[#4B4FAE]" />
            </div>
            <span className="text-slate-500 text-sm">{t.dashboard.totalEvents}</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{events.length}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <ImageIcon size={20} className="text-purple-600" />
            </div>
            <span className="text-slate-500 text-sm">{t.dashboard.totalPhotos}</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">{totalPhotos.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} className="text-green-600" />
            </div>
            <span className="text-slate-500 text-sm">{t.dashboard.activeSystem}</span>
          </div>
          <div className="text-3xl font-bold text-green-600">{t.dashboard.working}</div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-[#4B4FAE]" />
        </div>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-16 text-center">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Camera size={28} className="text-indigo-400" />
          </div>
          <h3 className="text-slate-700 font-semibold text-lg mb-2">{t.dashboard.noEvents}</h3>
          <p className="text-slate-400 text-sm mb-6">{t.dashboard.noEventsDesc}</p>
          <button onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4B4FAE] hover:bg-[#3a3e8f] text-white font-medium rounded-xl transition-colors">
            <Plus size={18} />{t.dashboard.createFirst}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => (
            <Link key={event.id} href={`/admin/events/${event.id}`}
              className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                <Calendar size={22} className="text-[#4B4FAE]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-900 truncate">{event.name}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-slate-500 text-sm flex items-center gap-1">
                    <Calendar size={13} />
                    {new Date(event.date).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  {event.location && (
                    <span className="text-slate-500 text-sm flex items-center gap-1"><MapPin size={13} />{event.location}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-right hidden sm:block">
                  <div className="text-slate-900 font-semibold flex items-center gap-1.5">
                    <ImageIcon size={15} className="text-slate-400" />{event._count.photos.toLocaleString()}
                  </div>
                  <div className="text-slate-400 text-xs">{t.dashboard.photos}</div>
                </div>
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                  <QrCode size={15} className="text-slate-400" />
                </div>
                <button
                  onClick={(e) => { e.preventDefault(); setDeleteTarget(event); }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-[#4B4FAE] transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {showModal && (
        <NewEventModal onClose={() => setShowModal(false)} onCreated={() => { setShowModal(false); fetchEvents(); }} />
      )}

      {deleteTarget && (
        <DeleteEventModal
          event={deleteTarget}
          lang={lang}
          onClose={() => setDeleteTarget(null)}
          onDeleted={() => { setDeleteTarget(null); fetchEvents(); }}
        />
      )}
    </div>
  );
}

function DeleteEventModal({ event, lang, onClose, onDeleted }: {
  event: Event; lang: string; onClose: () => void; onDeleted: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const res = await fetch(`/api/events/${event.id}`, { method: "DELETE" });
    if (res.ok) onDeleted();
    else setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
          <Trash2 size={22} className="text-red-500" />
        </div>
        <h3 className="font-bold text-slate-900 text-lg mb-1">
          {lang === "en" ? "Delete event?" : "Etkinliği sil?"}
        </h3>
        <p className="text-slate-500 text-sm mb-2">
          <span className="font-semibold text-slate-700">{event.name}</span>
        </p>
        <p className="text-slate-400 text-sm mb-6">
          {lang === "en"
            ? `All ${event._count.photos} photos, face data and QR codes will be permanently deleted.`
            : `${event._count.photos} fotoğraf, yüz verileri ve QR kodlar kalıcı olarak silinecek.`}
        </p>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
            {lang === "en" ? "Cancel" : "İptal"}
          </button>
          <button onClick={handleDelete} disabled={loading}
            className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-colors">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
            {lang === "en" ? "Delete" : "Sil"}
          </button>
        </div>
      </div>
    </div>
  );
}
