"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { X, AlertCircle } from "lucide-react";

interface Props {
  onCapture: (blob: Blob) => void;
  onBack: () => void;
}

export default function CameraView({ onCapture, onBack }: Props) {
  const t = useTranslations("guest");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [capturing, setCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const startCamera = useCallback(async () => {
    setError("");
    setReady(false);
    if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => setReady(true);
      }
    } catch {
      setError(t("cameraError"));
    }
  }, [t]);

  useEffect(() => {
    startCamera();
    return () => { streamRef.current?.getTracks().forEach((t) => t.stop()); };
  }, [startCamera]);

  function capture() {
    if (!videoRef.current || !canvasRef.current || !ready) return;
    setCapturing(true);
    let count = 3;
    setCountdown(count);
    const interval = setInterval(() => {
      count--;
      if (count === 0) { clearInterval(interval); setCountdown(null); doCapture(); }
      else setCountdown(count);
    }, 1000);
  }

  function doCapture() {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.translate(canvas.width, 0); ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    canvas.toBlob((blob) => { setCapturing(false); if (blob) onCapture(blob); }, "image/jpeg", 0.92);
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      <div className="relative flex-1 overflow-hidden">
        <video ref={videoRef} autoPlay playsInline muted
          className="w-full h-full object-cover scale-x-[-1]" />
        <canvas ref={canvasRef} className="hidden" />

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <mask id="oval-mask">
                <rect width="100%" height="100%" fill="white" />
                <ellipse cx="50%" cy="47%" rx="38%" ry="44%" fill="black" />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="rgba(0,0,0,0.55)" mask="url(#oval-mask)" />
            <ellipse cx="50%" cy="47%" rx="38%" ry="44%" fill="none" stroke="white" strokeWidth="2" strokeDasharray="12 6" opacity="0.8" />
          </svg>
        </div>

        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-white text-9xl font-bold opacity-90 drop-shadow-2xl">{countdown}</div>
          </div>
        )}

        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4 pb-4">
          <button onClick={onBack} className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
            <X size={20} />
          </button>
        </div>

        <div className="absolute bottom-36 left-0 right-0 text-center px-4 pointer-events-none">
          {error ? (
            <div className="flex items-center justify-center gap-2 text-red-400 text-sm bg-black/60 rounded-xl px-4 py-3 mx-4">
              <AlertCircle size={16} />{error}
            </div>
          ) : !ready ? (
            <div className="text-white/60 text-sm">{t("cameraStarting")}</div>
          ) : (
            <div className="text-white/80 text-sm bg-black/40 backdrop-blur-sm rounded-xl px-4 py-2 inline-block">
              {t("faceGuide")}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-8 bg-black gap-4">
        {ready && !capturing && (
          <p className="text-white/60 text-sm">{t("captureHint")}</p>
        )}
        <button onClick={capture} disabled={!ready || capturing} className="relative w-20 h-20 disabled:opacity-50">
          <div className="absolute inset-0 rounded-full border-4 border-white/80" />
          <div className={`absolute inset-2 rounded-full transition-all ${capturing ? "bg-white/50 scale-90" : "bg-white active:scale-90"}`} />
        </button>
      </div>
    </div>
  );
}
