"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, LogOut, Menu, Users } from "lucide-react";

interface Me { email: string; role: string; }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [me, setMe] = useState<Me | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") return;
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.ok ? r.json() : null)
      .then((d) => { if (d?.email) setMe(d); });
  }, [pathname]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    window.location.href = "/admin/login";
  }

  if (pathname === "/admin/login") return <>{children}</>;

  const isSuperAdmin = me?.role === "SUPER_ADMIN";

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard, show: true },
    { href: "/admin/clients", label: "Müşteriler", icon: Users, show: isSuperAdmin },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 flex flex-col transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>

        <div className="flex items-center px-5 py-5 border-b border-slate-700">
          <Link href="/" target="_blank">
            <Image src="/logo.png" alt="Phogo" width={120} height={38} className="h-8 w-auto object-contain brightness-0 invert" priority />
          </Link>
        </div>

        {me && (
          <div className="px-5 py-3 border-b border-slate-700/50">
            <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full ${isSuperAdmin ? "bg-amber-500/20 text-amber-400" : "bg-[#4B4FAE]/20 text-[#7b80d4]"}`}>
              {isSuperAdmin ? "Super Admin" : "Müşteri"}
            </span>
          </div>
        )}

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.filter(i => i.show).map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith(href) ? "bg-[#4B4FAE] text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-slate-700">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 bg-[#4B4FAE] rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {me?.email.charAt(0).toUpperCase() ?? "?"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-slate-300 text-xs truncate">{me?.email}</div>
            </div>
          </div>
          <button onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <LogOut size={18} />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-slate-600 hover:text-slate-900">
            <Menu size={22} />
          </button>
          <Image src="/logo.png" alt="Phogo" width={90} height={28} className="h-7 w-auto object-contain" />
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
