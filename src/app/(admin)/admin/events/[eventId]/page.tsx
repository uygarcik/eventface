"use client";
import { useEffect, useState, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Cpu, QrCode, ImageIcon, Loader2, Images } from "lucide-react";
import Link from "next/link";
import PhotoUploader from "@/components/admin/PhotoUploader";
import QRDisplay from "@/components/admin/QRDisplay";
import IndexingPanel from "@/components/admin/IndexingPanel";
import PhotoGallery from "@/components/admin/PhotoGallery";
import { useAdminT } from "@/contexts/AdminLangContext";

interface Event {
  id: string; name: string; date: string; location: string | null;
  qrToken: string; _count: { photos: number };
}

type Tab = "upload" | "gallery" | "index" | "qr";

export default function EventDetailPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = use(params);
  const router = useRouter();
  const { t } = useAdminT();
  const lang = t.sidebar.dashboard === "Dashboard" ? "en" : "tr";
  const [event, setEvent] = useState<Event | null>(null);
  const [tab, setTab] = useState<Tab>("upload");
  const [loading, setLoading] = useState(true);

  const fetchEvent = useCallback(async () => {
    const res = await fetch("/api/events");
    if (!res.ok) { router.push("/admin/dashboard"); return; }
    const events: Event[] = await res.json();
    const found = events.find((e) => e.id === eventId);
    if (!found) { router.push("/admin/dashboard"); return; }
    setEvent(found);
    setLoading(false);
  }, [eventId, router]);

  useEffect(() => { fetchEvent(); }, [fetchEvent]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><Loader2 size={32} className="animate-spin text-[#4B4FAE]" /></div>;
  }
  if (!event) return null;

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "upload",  label: t.eventDetail.tabs.upload, icon: Upload },
    { id: "gallery", label: lang === "en" ? "Photos" : "Fotoğraflar", icon: Images },
    { id: "index",   label: t.eventDetail.tabs.index,  icon: Cpu },
    { id: "qr",      label: t.eventDetail.tabs.qr,     icon: QrCode },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm mb-4 transition-colors">
          <ArrowLeft size={16} />{t.eventDetail.back}
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{event.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-slate-500 text-sm">
                {new Date(event.date).toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}
              </span>
              {event.location && <span className="text-slate-500 text-sm">• {event.location}</span>}
            </div>
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 text-[#4B4FAE] px-3 py-1.5 rounded-lg text-sm font-medium">
            <ImageIcon size={15} />{event._count.photos.toLocaleString()} {t.dashboard.photos}
          </div>
        </div>
      </div>

      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl mb-6 overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
              tab === id ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}>
            <Icon size={16} /><span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {tab === "upload"  && <PhotoUploader eventId={eventId} onUploaded={() => { fetchEvent(); setTab("gallery"); }} />}
      {tab === "gallery" && <PhotoGallery eventId={eventId} onDeleted={fetchEvent} />}
      {tab === "index"   && <IndexingPanel eventId={eventId} photoCount={event._count.photos} />}
      {tab === "qr"      && <QRDisplay event={event} />}
    </div>
  );
}
