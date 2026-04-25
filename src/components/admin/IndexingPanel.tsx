"use client";
import { useEffect, useState, useRef } from "react";
import { Cpu, CheckCircle2, Play, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { useAdminT } from "@/contexts/AdminLangContext";

interface Props { eventId: string; photoCount: number; }
interface Progress { total: number; indexed: number; pending: number; percent: number; }

export default function IndexingPanel({ eventId, photoCount }: Props) {
  const { t } = useAdminT();
  const T = t.indexing;
  const [progress, setProgress] = useState<Progress | null>(null);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function fetchProgress() {
    const res = await fetch(`/api/events/${eventId}/index-faces`);
    if (res.ok) setProgress(await res.json());
  }

  useEffect(() => { fetchProgress(); }, [eventId]);

  async function startIndexing() {
    setRunning(true); setResult(null); setError(null);
    pollRef.current = setInterval(fetchProgress, 2000);
    try {
      const res = await fetch(`/api/events/${eventId}/index-faces`, { method: "POST" });
      const data = await res.json();
      setResult(data.message);
      await fetchProgress();
    } catch { setError("Error"); }
    finally { setRunning(false); if (pollRef.current) clearInterval(pollRef.current); }
  }

  const isDone = progress && progress.pending === 0 && progress.total > 0;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
            <Cpu size={20} className="text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{T.title}</h3>
            <p className="text-slate-500 text-sm">{T.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: T.totalPhotos, value: progress?.total ?? photoCount, color: "bg-slate-50 text-slate-900" },
            { label: T.indexed, value: progress?.indexed ?? 0, color: "bg-green-50 text-green-600" },
            { label: T.pending, value: progress?.pending ?? photoCount, color: "bg-amber-50 text-amber-600" },
          ].map(({ label, value, color }) => (
            <div key={label} className={`${color.split(" ")[0]} rounded-xl p-4 text-center`}>
              <div className={`text-2xl font-bold ${color.split(" ")[1]}`}>{value}</div>
              <div className="text-slate-500 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>

        {progress && progress.total > 0 && (
          <div className="mb-5">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-slate-600">{T.progress}</span>
              <span className="font-semibold text-slate-900">%{progress.percent}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5">
              <div className="bg-gradient-to-r from-[#4B4FAE] to-purple-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress.percent}%` }} />
            </div>
          </div>
        )}

        {result && !running && (
          <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm mb-4 ${isDone ? "bg-green-50 text-green-700 border border-green-100" : "bg-amber-50 text-amber-700 border border-amber-100"}`}>
            {isDone ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}{result}
          </div>
        )}
        {error && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm mb-4 bg-red-50 text-red-600 border border-red-100">
            <AlertCircle size={16} />{error}
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={startIndexing} disabled={running || photoCount === 0}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#4B4FAE] hover:bg-[#3a3e8f] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors">
            {running ? <><Loader2 size={18} className="animate-spin" /> {T.indexing}</> : isDone ? <><RefreshCw size={18} /> {T.rerun}</> : <><Play size={18} /> {T.start}</>}
          </button>
          <button onClick={fetchProgress} disabled={running} className="px-4 py-3 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-2xl p-5">
        <h4 className="font-semibold text-indigo-900 mb-3 text-sm">{T.howTitle}</h4>
        <ul className="space-y-2 text-sm text-indigo-700">
          {[T.step1, T.step2, T.step3].map((step, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-5 h-5 bg-indigo-200 rounded-full flex items-center justify-center text-xs font-bold text-indigo-800 flex-shrink-0 mt-0.5">{i + 1}</span>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
