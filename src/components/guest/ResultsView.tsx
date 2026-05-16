"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Download, Camera, CheckCircle2, Image as ImageIcon, X } from "lucide-react";
import JSZip from "jszip";
import type { PhotoResult } from "@/app/[locale]/e/[token]/page";

interface Props {
  photos: PhotoResult[];
  eventName: string;
  onRetry: () => void;
}

function sanitizeFilename(filename: string): string {
  return filename.replace(/\.json$/i, "");
}

function proxyUrl(id: string, filename: string) {
  return `/api/download?photoId=${encodeURIComponent(id)}&filename=${encodeURIComponent(sanitizeFilename(filename))}`;
}

function thumbnailUrl(id: string) {
  return `/api/thumbnail?photoId=${encodeURIComponent(id)}`;
}

export default function ResultsView({ photos, eventName, onRetry }: Props) {
  const t = useTranslations("guest");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [lightbox, setLightbox] = useState<PhotoResult | null>(null);
  const [downloading, setDownloading] = useState(false);

  function toggleSelect(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function selectAll() {
    setSelected(selected.size === photos.length ? new Set() : new Set(photos.map((p) => p.id)));
  }

  async function downloadSelected() {
    const targets = selected.size > 0 ? photos.filter((p) => selected.has(p.id)) : photos;
    setDownloading(true);

    try {
      if (targets.length === 1) {
        // Single file: direct proxy link click
        const a = document.createElement("a");
        a.href = proxyUrl(targets[0].id, targets[0].filename);
        a.download = sanitizeFilename(targets[0].filename);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        // Multiple: create ZIP client-side, download as single file
        const zip = new JSZip();
        await Promise.all(
          targets.map(async (photo) => {
            const res = await fetch(proxyUrl(photo.id, photo.filename));
            const blob = await res.blob();
            zip.file(sanitizeFilename(photo.filename), blob);
          })
        );
        const zipBlob = await zip.generateAsync({ type: "blob" });
        const blobUrl = URL.createObjectURL(zipBlob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = `${eventName || "photos"}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
      }
    } finally {
      setDownloading(false);
    }
  }

  if (photos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-slate-700 rounded-3xl flex items-center justify-center mb-6">
          <ImageIcon size={32} className="text-slate-400" />
        </div>
        <h2 className="text-white text-2xl font-bold mb-3">{t("notFound")}</h2>
        <p className="text-slate-400 text-sm mb-8 max-w-xs">{t("notFoundDesc")}</p>
        <button onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3.5 bg-[#4B4FAE] hover:bg-[#5a5ec0] text-white font-semibold rounded-2xl transition-all active:scale-95">
          <Camera size={20} />{t("retry")}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <div className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-700 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">{photos.length} {t("found")}</h2>
            <p className="text-slate-400 text-xs mt-0.5">{eventName}</p>
          </div>
          <button onClick={onRetry}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm border border-slate-600 hover:border-slate-400 px-3 py-2 rounded-xl transition-colors">
            <Camera size={15} />{t("refresh")}
          </button>
        </div>
        <div className="flex gap-2">
          <button onClick={selectAll}
            className="flex-1 py-2.5 text-sm font-medium text-slate-300 border border-slate-600 hover:border-slate-400 rounded-xl transition-colors">
            {selected.size === photos.length ? t("deselectAll") : t("selectAll")}
          </button>
          <button onClick={downloadSelected} disabled={downloading}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#4B4FAE] hover:bg-[#5a5ec0] disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-all">
            {downloading
              ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <Download size={16} />}
            {selected.size > 0 ? `${selected.size} ${t("download")}` : t("downloadAll")}
          </button>
        </div>
      </div>

      <div className="flex-1 p-3 grid grid-cols-2 gap-2 content-start">
        {photos.map((photo) => {
          const isSelected = selected.has(photo.id);
          return (
            <div key={photo.id}
              className="relative aspect-square rounded-xl overflow-hidden bg-slate-800 cursor-pointer"
              onClick={() => setLightbox(photo)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailUrl(photo.id)}
                alt={sanitizeFilename(photo.filename)}
                className={`w-full h-full object-cover transition-all duration-200 ${isSelected ? "brightness-60" : ""}`}
                loading="lazy"
              />

              {/* Select circle — top-right, always visible on mobile */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleSelect(photo.id); }}
                className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center">
                {isSelected
                  ? <div className="w-6 h-6 bg-[#4B4FAE] rounded-full flex items-center justify-center shadow-lg ring-2 ring-white">
                      <CheckCircle2 size={14} className="text-white" />
                    </div>
                  : <div className="w-6 h-6 rounded-full border-2 border-white/80 bg-black/40" />
                }
              </button>

              {/* Similarity badge — top-left */}
              <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                %{Math.round(photo.similarity)}
              </div>

              {/* Download button — proxy URL, same-origin so download attr works on iOS */}
              <a
                href={proxyUrl(photo.id, photo.filename)}
                download={sanitizeFilename(photo.filename)}
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-2 right-2 w-8 h-8 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#4B4FAE] active:bg-[#4B4FAE] transition-colors">
                <Download size={14} />
              </a>
            </div>
          );
        })}
      </div>
      <div className="h-8" />

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col" onClick={() => setLightbox(null)}>
          <div className="flex items-center justify-between p-4">
            <span className="text-slate-400 text-sm truncate">{sanitizeFilename(lightbox.filename)}</span>
            <button className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.url}
              alt={sanitizeFilename(lightbox.filename)}
              className="max-w-full max-h-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="p-4">
            <a
              href={proxyUrl(lightbox.id, lightbox.filename)}
              download={sanitizeFilename(lightbox.filename)}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#4B4FAE] hover:bg-[#5a5ec0] text-white font-semibold rounded-2xl transition-all active:scale-95">
              <Download size={20} />{t("download")}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
