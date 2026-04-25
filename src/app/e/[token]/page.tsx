"use client";
import { useEffect, use } from "react";
import { useRouter } from "next/navigation";

export default function GuestRedirectPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const router = useRouter();

  useEffect(() => {
    const lang = navigator.language?.toLowerCase().startsWith("en") ? "en" : "tr";
    router.replace(`/${lang}/e/${token}`);
  }, [token, router]);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#4B4FAE] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
