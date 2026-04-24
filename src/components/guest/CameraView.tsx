"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Camera, X, RefreshCw, AlertCircle, Flashlight } from "lucide-react";

interface Props {
  onCapture: (blob: Blob) => void;
  onBack: () => void;
}

export default function CameraView({ onCapture, onBack }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [capturing, setCapturing] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const startCamera = useCallback(async () => {
    setError("");
    setReady(false);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => setReady(true);
      }
    } catch {
      setError("Kamera erişimi reddedildi. Lütfen tarayıcı ayarlarından kamera iznini verin.");
    }
  }, [facingMode]);

  useEffect(() => {
    startCamera();
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [startCamera]);

  function capture() {
    if (!videoRef.current || !canvasRef.current || !ready) return;

    setCapturing(true);
    let count = 3;
    setCountdown(count);

    const interval = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(interval);
        setCountdown(null);
        doCapture();
      } else {
        setCountdown(count);
      }
    }, 1000);
  }

  function doCapture() {
    const video = videoRef.current!;
    const canvas = canvasRef.current!;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d")!;

    // Mirror front camera
    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        setCapturing(false);
        if (blob) onCapture(blob);
      },
      "image/jpeg",
      0.92
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col">
      {/* Video */}
      <div className="relative flex-1 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-full object-cover ${facingMode === "user" ? "scale-x-[-1]" : ""}`}
        />
        <canvas ref={canvasRef} className="hidden" />

        {/* Dark overlay with oval cutout */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <mask id="oval-mask">
                <rect width="100%" height="100%" fill="white" />
                <ellipse cx="50%" cy="47%" rx="38%" ry="44%" fill="black" />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="rgba(0,0,0,0.55)" mask="url(#oval-mask)" />
            <ellipse
              cx="50%" cy="47%" rx="38%" ry="44%"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="12 6"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Countdown */}
        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-white text-9xl font-bold opacity-90 drop-shadow-2xl">
              {countdown}
            </div>
          </div>
        )}

        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-safe pb-4 pt-4">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
          >
            <X size={20} />
          </button>
          <button
            onClick={() => setFacingMode((f) => (f === "user" ? "environment" : "user"))}
            className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Instruction */}
        <div className="absolute bottom-36 left-0 right-0 text-center px-4 pointer-events-none">
          {error ? (
            <div className="flex items-center justify-center gap-2 text-red-400 text-sm bg-black/60 rounded-xl px-4 py-3 mx-4">
              <AlertCircle size={16} />
              {error}
            </div>
          ) : !ready ? (
            <div className="text-white/60 text-sm">Kamera başlatılıyor...</div>
          ) : (
            <div className="text-white/80 text-sm bg-black/40 backdrop-blur-sm rounded-xl px-4 py-2 inline-block">
              Yüzünüzü oval içine yerleştirin
            </div>
          )}
        </div>
      </div>

      {/* Capture button */}
      <div className="flex items-center justify-center py-8 bg-black">
        <button
          onClick={capture}
          disabled={!ready || capturing}
          className="relative w-20 h-20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-white/80" />
          {/* Inner circle */}
          <div
            className={`absolute inset-2 rounded-full transition-all ${
              capturing ? "bg-white/50 scale-90" : "bg-white active:scale-90"
            }`}
          />
          {capturing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera size={24} className="text-slate-600" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
