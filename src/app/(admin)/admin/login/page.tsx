"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const translations = {
  tr: {
    subtitle: "Yönetim Paneline Giriş",
    email: "E-posta",
    password: "Şifre",
    submit: "Giriş Yap",
    submitting: "Giriş yapılıyor...",
    error: "E-posta ve şifre gerekli",
    serverError: "Sunucuya bağlanılamadı",
  },
  en: {
    subtitle: "Management Panel Login",
    email: "Email",
    password: "Password",
    submit: "Sign In",
    submitting: "Signing in...",
    error: "Email and password required",
    serverError: "Could not connect to server",
  },
};

type Lang = "tr" | "en";

export default function LoginPage() {
  const [lang, setLang] = useState<Lang>("tr");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("phogo-lang") as Lang | null;
    if (stored === "en" || stored === "tr") setLang(stored);
    else if (navigator.language?.toLowerCase().startsWith("en")) setLang("en");
  }, []);

  function toggleLang() {
    const next: Lang = lang === "tr" ? "en" : "tr";
    setLang(next);
    localStorage.setItem("phogo-lang", next);
  }

  const T = translations[lang];

  async function doLogin() {
    if (!email || !password) { setError(T.error); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.replace("/admin/dashboard");
      } else {
        setError(data.error ?? T.error);
        setLoading(false);
      }
    } catch {
      setError(T.serverError);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#4B4FAE]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Lang toggle */}
        <div className="flex justify-end mb-4">
          <button onClick={toggleLang}
            className="text-sm font-bold text-slate-400 hover:text-white border border-slate-600 hover:border-slate-400 px-3 py-1.5 rounded-lg transition-colors">
            {lang === "tr" ? "EN" : "TR"}
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="mb-6">
            <Image src="/logo.png" alt="Phogo" width={160} height={52} className="h-12 w-auto object-contain brightness-0 invert mx-auto" priority />
          </div>
          <p className="text-slate-400 text-sm">{T.subtitle}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{T.email}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && doLogin()}
                autoComplete="email"
                placeholder="admin@phogo.app"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#4B4FAE] focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{T.password}</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && doLogin()}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#4B4FAE] focus:border-transparent transition-all pr-12"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>
            )}

            <button type="button" onClick={doLogin} disabled={loading}
              className="w-full py-3 bg-[#4B4FAE] hover:bg-[#5a5ec0] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#4B4FAE]/20">
              {loading ? <><Loader2 size={18} className="animate-spin" />{T.submitting}</> : T.submit}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
