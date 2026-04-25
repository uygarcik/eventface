"use client";
import { useEffect, useState, useCallback } from "react";
import { Loader2, Trash2, Download, CheckSquare, Square, ZoomIn, X, RefreshCw, ImageIcon, CheckCircle2 } from "lucide-react";
import { useAdminT } from "@/contexts/AdminLangContext";

interface Photo {
  id: string;
  filename: string;
  faceCount: number;
  createdAt: string;
  url: string;
}

interface Props {
  eventId: string;
  onDeleted: () => void;
}

export default function PhotoGallery({ eventId, onDeleted }: Props) {
  const { t } = useAdminT();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [lightbox, setLightbox] = useState<Photo | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/events/${eventId}/photos`);
    if (res.ok) setPhotos(await res.json());
    setLoading(false);
  }, [eventId]);

  useEffect(() => { fetchPhotos(); }, [fetchPhotos]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected(selected.size === photos.length ? new Set() : new Set(photos.map((p) => p.id)));
  }

  async function deleteSelected() {
    if (selected.size === 0) return;
    setDeleting(true);
    setConfirmDelete(false);
    const res = await fetch(`/api/events/${eventId}/photos/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ photoIds: Array.from(selected) }),
    });
    if (res.ok) {
      setSelected(new Set());
      await fetchPhotos();
      onDeleted();
    }
    setDeleting(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-[#4B4FAE]" />
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-16 text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <ImageIcon size={28} className="text-slate-300" />
        </div>
        <h3 className="text-slate-600 font-semibold mb-2">
          {t.lang === "en" ? "No photos yet" : "Henüz fotoğraf yok"}
        </h3>
        <p className="text-slate-400 text-sm">
          {t.lang === "en" ? "Upload photos from the Upload tab" : "Fotoğraf Yükle sekmesinden yükleme yapın"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-wrap items-center gap-3">
        <button onClick={toggleAll}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
          {selected.size === photos.length
            ? <><CheckSquare size={18} className="text-[#4B4FAE]" /> {t.lang === "en" ? "Deselect all" : "Tümünü kaldır"}</>
            : <><Square size={18} /> {t.lang === "en" ? "Select all" : "Tümünü seç"}</>
          }
        </button>

        <div className="h-5 w-px bg-slate-200" />

        <span className="text-sm text-slate-500">
          {photos.length} {t.lang === "en" ? "photos" : "fotoğraf"}
          {selected.size > 0 && (
            <span className="ml-2 text-[#4B4FAE] font-medium">· {selected.size} {t.lang === "en" ? "selected" : "seçili"}</span>
          )}
        </span>

        <div className="ml-auto flex items-center gap-2">
          <button onClick={fetchPhotos}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
            <RefreshCw size={16} />
          </button>

          {selected.size > 0 && (
            <button
              onClick={() => setConfirmDelete(true)}
              disabled={deleting}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white text-sm font-medium rounded-xl transition-colors"
            >
              {deleting
                ? <Loader2 size={16} className="animate-spin" />
                : <Trash2 size={16} />
              }
              {t.lang === "en" ? `Delete ${selected.size}` : `${selected.size} Sil`}
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {photos.map((photo) => {
          const isSelected = selected.has(photo.id);
          return (
            <div key={photo.id}
              className={`relative group rounded-xl overflow-hidden bg-slate-100 aspect-square cursor-pointer transition-all ${
                isSelected ? "ring-3 ring-[#4B4FAE] ring-offset-2" : "hover:ring-2 hover:ring-slate-300"
              }`}
              onClick={() => toggle(photo.id)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.filename}
                className={`w-full h-full object-cover transition-all duration-200 ${isSelected ? "brightness-75" : "group-hover:brightness-90"}`}
                loading="lazy"
              />

              {/* Selected overlay */}
              {isSelected && (
                <div className="absolute inset-0 bg-[#4B4FAE]/20 flex items-start justify-start p-2">
                  <div className="w-6 h-6 bg-[#4B4FAE] rounded-full flex items-center justify-center shadow">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                </div>
              )}

              {/* Checkbox (always visible when not selected, shown on hover) */}
              {!isSelected && (
                <div className="absolute top-2 left-2 w-6 h-6 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow">
                  <Square size={12} className="text-slate-500" />
                </div>
              )}

              {/* Face count badge */}
              {photo.faceCount > 0 && (
                <div className="absolute top-2 right-2 bg-[#4B4FAE] text-white text-xs px-2 py-0.5 rounded-full font-medium shadow">
                  {photo.faceCount} {t.lang === "en" ? "face" : "yüz"}
                </div>
              )}

              {/* Bottom actions */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1.5">
                <button
                  onClick={(e) => { e.stopPropagation(); setLightbox(photo); }}
                  className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                >
                  <ZoomIn size={14} />
                </button>
                <a
                  href={photo.url}
                  download={photo.filename}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="w-7 h-7 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                >
                  <Download size={14} />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col" onClick={() => setLightbox(null)}>
          <div className="flex items-center justify-between p-4 flex-shrink-0">
            <div>
              <p className="text-white font-medium truncate max-w-xs">{lightbox.filename}</p>
              <p className="text-slate-400 text-sm">
                {lightbox.faceCount} {t.lang === "en" ? "face(s) indexed" : "yüz indekslendi"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a href={lightbox.url} download={lightbox.filename} target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2 bg-[#4B4FAE] text-white text-sm rounded-xl hover:bg-[#5a5ec0] transition-colors">
                <Download size={16} />
                {t.lang === "en" ? "Download" : "İndir"}
              </a>
              <button className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20">
                <X size={18} />
              </button>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-6 min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.url}
              alt={lightbox.filename}
              className="max-w-full max-h-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-4">
              <Trash2 size={22} className="text-red-500" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">
              {t.lang === "en" ? "Delete photos?" : "Fotoğrafları sil?"}
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              {t.lang === "en"
                ? `${selected.size} photo(s) will be permanently deleted from storage and the face index. This cannot be undone.`
                : `${selected.size} fotoğraf kalıcı olarak silinecek. Bu işlem geri alınamaz.`
              }
            </p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(false)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors">
                {t.lang === "en" ? "Cancel" : "İptal"}
              </button>
              <button onClick={deleteSelected}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                <Trash2 size={16} />
                {t.lang === "en" ? "Delete" : "Sil"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
