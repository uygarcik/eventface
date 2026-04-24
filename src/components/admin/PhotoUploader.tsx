"use client";
import { useRef, useState } from "react";
import { Upload, X, CheckCircle2, AlertCircle, Loader2, ImageIcon } from "lucide-react";

interface Props {
  eventId: string;
  onUploaded: () => void;
}

interface FileState {
  file: File;
  status: "pending" | "uploading" | "done" | "error";
  progress: number;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];
const MAX_CONCURRENT = 5;

export default function PhotoUploader({ eventId, onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileState[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [summary, setSummary] = useState<{ done: number; failed: number } | null>(null);

  function addFiles(incoming: FileList | null) {
    if (!incoming) return;
    const valid = Array.from(incoming).filter((f) => ALLOWED_TYPES.includes(f.type));
    setFiles((prev) => [
      ...prev,
      ...valid.map((f) => ({ file: f, status: "pending" as const, progress: 0 })),
    ]);
    setSummary(null);
  }

  async function startUpload() {
    const pending = files.filter((f) => f.status === "pending");
    if (pending.length === 0) return;
    setUploading(true);

    // 1) Get presigned URLs for all pending files
    const presignRes = await fetch(`/api/events/${eventId}/presign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        files: pending.map((f) => ({
          filename: f.file.name,
          contentType: f.file.type || "image/jpeg",
        })),
      }),
    });
    const { uploads } = await presignRes.json();

    // 2) Upload directly to S3 in parallel batches
    const registeredPhotos: { photoId: string; filename: string; s3Key: string }[] = [];
    let done = 0;
    let failed = 0;

    for (let i = 0; i < uploads.length; i += MAX_CONCURRENT) {
      const batch = uploads.slice(i, i + MAX_CONCURRENT);
      await Promise.all(
        batch.map(async (upload: { photoId: string; filename: string; s3Key: string; uploadUrl: string }, bIdx: number) => {
          const fileIdx = i + bIdx;
          const { file } = pending[fileIdx];

          setFiles((prev) =>
            prev.map((f) =>
              f.file === file ? { ...f, status: "uploading", progress: 0 } : f
            )
          );

          try {
            await fetch(upload.uploadUrl, {
              method: "PUT",
              body: file,
              headers: { "Content-Type": file.type || "image/jpeg" },
            });

            setFiles((prev) =>
              prev.map((f) =>
                f.file === file ? { ...f, status: "done", progress: 100 } : f
              )
            );
            registeredPhotos.push({
              photoId: upload.photoId,
              filename: upload.filename,
              s3Key: upload.s3Key,
            });
            done++;
          } catch {
            setFiles((prev) =>
              prev.map((f) =>
                f.file === file ? { ...f, status: "error", progress: 0 } : f
              )
            );
            failed++;
          }
        })
      );
    }

    // 3) Register uploaded photos in DB
    if (registeredPhotos.length > 0) {
      await fetch(`/api/events/${eventId}/photos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photos: registeredPhotos }),
      });
    }

    setSummary({ done, failed });
    setUploading(false);
    onUploaded();
  }

  const pendingCount = files.filter((f) => f.status === "pending").length;
  const doneCount = files.filter((f) => f.status === "done").length;
  const errorCount = files.filter((f) => f.status === "error").length;

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
          dragOver
            ? "border-indigo-500 bg-indigo-50"
            : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
        <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Upload size={24} className="text-indigo-500" />
        </div>
        <h3 className="font-semibold text-slate-800 text-lg mb-1">
          Fotoğrafları sürükleyip bırakın
        </h3>
        <p className="text-slate-500 text-sm">
          veya tıklayarak seçin • JPG, PNG, WEBP • Sınır yok
        </p>
      </div>

      {/* Summary banner */}
      {summary && (
        <div className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
          summary.failed > 0 ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-green-50 text-green-700 border border-green-100"
        }`}>
          {summary.failed > 0 ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          {summary.done} fotoğraf yüklendi{summary.failed > 0 ? `, ${summary.failed} başarısız` : ""}
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <span className="text-sm font-medium text-slate-700">
              {files.length} dosya seçildi
              {doneCount > 0 && <span className="text-green-600 ml-2">({doneCount} tamamlandı)</span>}
              {errorCount > 0 && <span className="text-red-500 ml-2">({errorCount} hata)</span>}
            </span>
            <div className="flex gap-2">
              <button
                onClick={(e) => { e.stopPropagation(); setFiles([]); setSummary(null); }}
                className="text-xs text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Temizle
              </button>
              <button
                onClick={startUpload}
                disabled={uploading || pendingCount === 0}
                className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
              >
                {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                {uploading ? "Yükleniyor..." : `${pendingCount} Dosyayı Yükle`}
              </button>
            </div>
          </div>

          {/* Progress overview */}
          {uploading && (
            <div className="px-5 py-3 bg-indigo-50 border-b border-indigo-100">
              <div className="flex items-center justify-between text-xs text-indigo-600 mb-2">
                <span>Yükleniyor...</span>
                <span>{doneCount} / {files.length}</span>
              </div>
              <div className="w-full bg-indigo-100 rounded-full h-1.5">
                <div
                  className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${files.length > 0 ? (doneCount / files.length) * 100 : 0}%` }}
                />
              </div>
            </div>
          )}

          {/* File rows */}
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3">
                <ImageIcon size={16} className="text-slate-300 flex-shrink-0" />
                <span className="flex-1 text-sm text-slate-700 truncate">{f.file.name}</span>
                <span className="text-xs text-slate-400 flex-shrink-0">
                  {(f.file.size / 1024 / 1024).toFixed(1)} MB
                </span>
                <div className="flex-shrink-0">
                  {f.status === "pending" && <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" />}
                  {f.status === "uploading" && <Loader2 size={15} className="animate-spin text-indigo-500" />}
                  {f.status === "done" && <CheckCircle2 size={15} className="text-green-500" />}
                  {f.status === "error" && <AlertCircle size={15} className="text-red-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
