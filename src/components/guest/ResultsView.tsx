"use client";
import { useState } from "react";
import { Download, Camera, CheckCircle2, Image as ImageIcon, X, ZoomIn } from "lucide-react";
import type { PhotoResult } from "@/app/e/[token]/page";

interface Props {
  photos: PhotoResult[];
  eventName: string;
  onRetry: () => void;
}

export default function ResultsView({ photos, eventName, onRetry }: Props) {
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
    setSelected(new Set(photos.map((p) => p.id)));
  }

  async function downloadSelected() {
    const targets = selected.size > 0 ? photos.filter((p) => selected.has(p.id)) : photos;
    setDownloading(true);

    for (const photo of targets) {
      const a = document.createElement("a");
      a.href = photo.url;
      a.download = photo.filename;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      await new Promise((r) => setTimeout(r, 400));
    }

    setDownloading(false);
  }

  if (photos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-slate-700 rounded-3xl flex items-center justify-center mb-6">
          <ImageIcon size={32} className="text-slate-400" />
        </div>
        <h2 className="text-white text-2xl font-bold mb-3">Fotoğraf Bulunamadı</h2>
        <p className="text-slate-400 text-sm mb-8 max-w-xs">
          Bu etkinlikte size ait fotoğraf tespit edilemedi. Farklı bir açıyla tekrar deneyin.
        </p>
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl transition-all active:scale-95"
        >
          <Camera size={20} />
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-700 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">
              {photos.length} Fotoğraf Bulundu
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">{eventName}</p>
          </div>
          <button
            onClick={onRetry}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm border border-slate-600 hover:border-slate-400 px-3 py-2 rounded-xl transition-colors"
          >
            <Camera size={15} />
            Yenile
          </button>
        </div>

        {/* Action bar */}
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="flex-1 py-2.5 text-sm font-medium text-slate-300 border border-slate-600 hover:border-slate-400 rounded-xl transition-colors"
          >
            {selected.size === photos.length ? "Seçimi Kaldır" : "Tümünü Seç"}
          </button>
          <button
            onClick={downloadSelected}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-sm font-semibold rounded-xl transition-all"
          >
            {downloading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Download size={16} />
            )}
            {selected.size > 0 ? `${selected.size} İndir` : "Tümünü İndir"}
          </button>
        </div>
      </div>

      {/* Photo grid */}
      <div className="flex-1 p-3 grid grid-cols-2 gap-2 content-start">
        {photos.map((photo) => {
          const isSelected = selected.has(photo.id);
          return (
            <div
              key={photo.id}
              className="relative aspect-square rounded-xl overflow-hidden bg-slate-800 group cursor-pointer"
              onClick={() => toggleSelect(photo.id)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.url}
                alt={photo.filename}
                className={`w-full h-full object-cover transition-all duration-200 ${
                  isSelected ? "scale-95 brightness-75" : "group-active:scale-95"
                }`}
                loading="lazy"
              />

              {/* Selection overlay */}
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center bg-indigo-600/30">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <CheckCircle2 size={18} className="text-white" />
                  </div>
                </div>
              )}

              {/* Similarity badge */}
              <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                %{Math.round(photo.similarity)}
              </div>

              {/* Zoom button */}
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(photo); }}
                className="absolute top-2 right-2 w-7 h-7 bg-black/60 rounded-full items-center justify-center hidden group-hover:flex transition-all"
              >
                <ZoomIn size={14} className="text-white" />
              </button>

              {/* Download button */}
              <a
                href={photo.url}
                download={photo.filename}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="absolute bottom-2 right-2 w-8 h-8 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-indigo-600 transition-colors"
              >
                <Download size={14} />
              </a>
            </div>
          );
        })}
      </div>

      {/* Bottom padding */}
      <div className="h-8" />

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col"
          onClick={() => setLightbox(null)}
        >
          <div className="flex items-center justify-between p-4">
            <span className="text-slate-400 text-sm truncate">{lightbox.filename}</span>
            <button className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center text-white">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightbox.url}
              alt={lightbox.filename}
              className="max-w-full max-h-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="p-4">
            <a
              href={lightbox.url}
              download={lightbox.filename}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl transition-all"
            >
              <Download size={20} />
              Bu Fotoğrafı İndir
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
