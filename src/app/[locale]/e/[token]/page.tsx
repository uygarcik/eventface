"use client";
import { useEffect, useState, use } from "react";
import LandingView from "@/components/guest/LandingView";
import CameraView from "@/components/guest/CameraView";
import SearchingView from "@/components/guest/SearchingView";
import ResultsView from "@/components/guest/ResultsView";
import ErrorView from "@/components/guest/ErrorView";

export type AppState = "landing" | "camera" | "searching" | "results" | "error";

export interface PhotoResult {
  id: string;
  filename: string;
  similarity: number;
  url: string;
}

interface EventInfo {
  id: string;
  name: string;
  date: string;
  location: string | null;
  _count: { photos: number };
}

export default function GuestPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [state, setState] = useState<AppState>("landing");
  const [event, setEvent] = useState<EventInfo | null>(null);
  const [photos, setPhotos] = useState<PhotoResult[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/events/public/${token}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setEvent)
      .catch(() => setNotFound(true));
  }, [token]);

  async function handleCapture(imageBlob: Blob) {
    setState("searching");

    const form = new FormData();
    form.append("token", token);
    form.append("image", imageBlob, "face.jpg");

    try {
      const res = await fetch("/api/face-search", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Bir hata oluştu");
        setState("error");
        return;
      }

      setPhotos(data.photos ?? []);
      setState("results");
    } catch {
      setErrorMsg("Sunucuya bağlanılamadı, lütfen tekrar deneyin");
      setState("error");
    }
  }

  if (notFound) {
    return <ErrorView message="Bu etkinlik linki geçersiz veya süresi dolmuş" onRetry={undefined} />;
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {state === "landing" && (
        <LandingView event={event} onStart={() => setState("camera")} />
      )}
      {state === "camera" && (
        <CameraView
          onCapture={handleCapture}
          onBack={() => setState("landing")}
        />
      )}
      {state === "searching" && <SearchingView />}
      {state === "results" && (
        <ResultsView
          photos={photos}
          eventName={event.name}
          onRetry={() => setState("camera")}
        />
      )}
      {state === "error" && (
        <ErrorView
          message={errorMsg}
          onRetry={() => setState("camera")}
        />
      )}
    </div>
  );
}
