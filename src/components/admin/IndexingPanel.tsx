"use client";
import { useEffect, useState, useRef } from "react";
import { Cpu, CheckCircle2, Play, Loader2, AlertCircle, RefreshCw } from "lucide-react";

interface Props {
  eventId: string;
  photoCount: number;
}

interface Progress {
  total: number;
  indexed: number;
  pending: number;
  percent: number;
}

export default function IndexingPanel({ eventId, photoCount }: Props) {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function fetchProgress() {
    const res = await fetch(`/api/events/${eventId}/index-faces`);
    if (res.ok) setProgress(await res.json());
  }

  useEffect(() => {
    fetchProgress();
  }, [eventId]);

  async function startIndexing() {
    setRunning(true);
    setResult(null);
    setError(null);

    // Poll progress every 2 seconds while indexing
    pollRef.current = setInterval(fetchProgress, 2000);

    try {
      const res = await fetch(`/api/events/${eventId}/index-faces`, { method: "POST" });
      const data = await res.json();
      setResult(data.message);
      await fetchProgress();
    } catch {
      setError("İndeksleme sırasında hata oluştu");
    } finally {
      setRunning(false);
      if (pollRef.current) clearInterval(pollRef.current);
    }
  }

  const isDone = progress && progress.pending === 0 && progress.total > 0;

  return (
    <div className="space-y-5">
      {/* Info card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
            <Cpu size={20} className="text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Yüz İndeksleme</h3>
            <p className="text-slate-500 text-sm">
              AWS Rekognition ile fotoğraflardaki yüzler tanımlanır
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-slate-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-slate-900">{progress?.total ?? photoCount}</div>
            <div className="text-slate-500 text-xs mt-1">Toplam Foto</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{progress?.indexed ?? 0}</div>
            <div className="text-slate-500 text-xs mt-1">İndekslendi</div>
          </div>
          <div className="bg-amber-50 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{progress?.pending ?? photoCount}</div>
            <div className="text-slate-500 text-xs mt-1">Bekliyor</div>
          </div>
        </div>

        {/* Progress bar */}
        {progress && progress.total > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-600">İlerleme</span>
              <span className="font-semibold text-slate-900">%{progress.percent}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progress.percent}%` }}
              />
            </div>
          </div>
        )}

        {/* Status messages */}
        {result && !running && (
          <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm mb-4 ${
            isDone ? "bg-green-50 text-green-700 border border-green-100" : "bg-amber-50 text-amber-700 border border-amber-100"
          }`}>
            {isDone ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {result}
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm mb-4 bg-red-50 text-red-600 border border-red-100">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={startIndexing}
            disabled={running || photoCount === 0}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
          >
            {running ? (
              <><Loader2 size={18} className="animate-spin" /> İndeksleniyor...</>
            ) : isDone ? (
              <><RefreshCw size={18} /> Yeniden Çalıştır</>
            ) : (
              <><Play size={18} /> İndekslemeyi Başlat</>
            )}
          </button>
          <button
            onClick={fetchProgress}
            disabled={running}
            className="px-4 py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-indigo-50 rounded-2xl p-5">
        <h4 className="font-semibold text-indigo-900 mb-3 text-sm">Nasıl Çalışır?</h4>
        <ul className="space-y-2 text-sm text-indigo-700">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-indigo-200 rounded-full flex items-center justify-center text-xs font-bold text-indigo-800 flex-shrink-0 mt-0.5">1</span>
            Her fotoğraf AWS Rekognition'a gönderilir
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-indigo-200 rounded-full flex items-center justify-center text-xs font-bold text-indigo-800 flex-shrink-0 mt-0.5">2</span>
            Yüzler tespit edilip bu etkinliğin koleksiyonuna eklenir
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-indigo-200 rounded-full flex items-center justify-center text-xs font-bold text-indigo-800 flex-shrink-0 mt-0.5">3</span>
            Katılımcılar QR okutunca yüzleri bu koleksiyonla eşleştirilir
          </li>
        </ul>
      </div>
    </div>
  );
}
