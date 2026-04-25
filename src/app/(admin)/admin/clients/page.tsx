"use client";
import { useEffect, useState, useCallback } from "react";
import { Plus, Users, Calendar, ToggleLeft, ToggleRight, Trash2, Loader2, Eye, EyeOff, RefreshCw } from "lucide-react";

interface Client {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  active: boolean;
  createdAt: string;
  _count: { events: number };
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchClients = useCallback(async () => {
    const res = await fetch("/api/clients");
    if (res.ok) setClients(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  async function toggleActive(client: Client) {
    await fetch(`/api/clients/${client.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !client.active }),
    });
    fetchClients();
  }

  async function deleteClient(client: Client) {
    if (!confirm(`"${client.email}" hesabını silmek istediğinize emin misiniz? Tüm etkinlikleri de silinecek.`)) return;
    await fetch(`/api/clients/${client.id}`, { method: "DELETE" });
    fetchClients();
  }

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Müşteriler</h1>
          <p className="text-slate-500 text-sm mt-1">Tüm müşteri hesaplarını buradan yönetin</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#4B4FAE] hover:bg-[#3a3e8f] text-white font-medium rounded-xl transition-colors shadow-sm"
        >
          <Plus size={18} />
          Yeni Müşteri
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={32} className="animate-spin text-[#4B4FAE]" />
        </div>
      ) : clients.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-16 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users size={28} className="text-slate-400" />
          </div>
          <h3 className="text-slate-700 font-semibold text-lg mb-2">Henüz müşteri yok</h3>
          <p className="text-slate-400 text-sm mb-6">İlk müşteri hesabını oluşturun</p>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#4B4FAE] hover:bg-[#3a3e8f] text-white font-medium rounded-xl transition-colors"
          >
            <Plus size={18} />
            Müşteri Oluştur
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Müşteri</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Şirket</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Etkinlik</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Durum</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-5 py-4">
                    <div>
                      <div className="font-medium text-slate-900 text-sm">{client.name ?? "—"}</div>
                      <div className="text-slate-400 text-xs mt-0.5">{client.email}</div>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-slate-600 text-sm">{client.company ?? "—"}</span>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="flex items-center gap-1.5 text-sm text-slate-600">
                      <Calendar size={14} className="text-slate-400" />
                      {client._count.events}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => toggleActive(client)}>
                      {client.active ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
                          <ToggleRight size={14} /> Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                          <ToggleLeft size={14} /> Pasif
                        </span>
                      )}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <ResetPasswordButton clientId={client.id} />
                      <button
                        onClick={() => deleteClient(client)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Sil"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <NewClientModal
          onClose={() => setShowModal(false)}
          onCreated={() => { setShowModal(false); fetchClients(); }}
        />
      )}
    </div>
  );
}

function ResetPasswordButton({ clientId }: { clientId: string }) {
  const [open, setOpen] = useState(false);
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function reset() {
    if (pw.length < 8) return;
    setLoading(true);
    await fetch(`/api/clients/${clientId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    setLoading(false);
    setDone(true);
    setTimeout(() => { setOpen(false); setDone(false); setPw(""); }, 1500);
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="p-2 text-slate-400 hover:text-[#4B4FAE] hover:bg-[#4B4FAE]/10 rounded-lg transition-colors" title="Şifre sıfırla">
        <RefreshCw size={16} />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Yeni şifre"
          className="w-32 text-xs px-2 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#4B4FAE]"
        />
        <button type="button" onClick={() => setShow(!show)} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400">
          {show ? <EyeOff size={12} /> : <Eye size={12} />}
        </button>
      </div>
      <button onClick={reset} disabled={loading || pw.length < 8} className="text-xs px-2 py-1.5 bg-[#4B4FAE] text-white rounded-lg disabled:opacity-50">
        {done ? "✓" : loading ? "..." : "Kaydet"}
      </button>
      <button onClick={() => setOpen(false)} className="text-xs px-2 py-1.5 border border-slate-200 rounded-lg text-slate-500">✕</button>
    </div>
  );
}

function NewClientModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({ email: "", password: "", name: "", company: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function generatePassword() {
    const chars = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789!@#";
    return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      onCreated();
    } else {
      const d = await res.json();
      setError(d.error ?? "Hata oluştu");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Yeni Müşteri</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Ad Soyad</label>
            <input type="text" value={form.name} onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Ahmet Yılmaz"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4B4FAE]/30 focus:border-[#4B4FAE]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Şirket</label>
            <input type="text" value={form.company} onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
              placeholder="Firma Adı"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4B4FAE]/30 focus:border-[#4B4FAE]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">E-posta *</label>
            <input type="email" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
              required placeholder="musteri@firma.com"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4B4FAE]/30 focus:border-[#4B4FAE]" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Şifre *</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input type={showPw ? "text" : "password"} value={form.password}
                  onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
                  required minLength={8} placeholder="En az 8 karakter"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4B4FAE]/30 focus:border-[#4B4FAE] pr-10" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <button type="button" onClick={() => setForm(f => ({ ...f, password: generatePassword() }))}
                className="px-3 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-600 hover:bg-slate-50 whitespace-nowrap">
                Üret
              </button>
            </div>
            {form.password && (
              <p className="text-xs text-slate-400 mt-1 font-mono bg-slate-50 px-2 py-1 rounded">{form.password}</p>
            )}
          </div>

          {error && <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50">İptal</button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 bg-[#4B4FAE] hover:bg-[#3a3e8f] disabled:opacity-60 text-white font-medium rounded-xl flex items-center justify-center gap-2">
              {loading ? <Loader2 size={16} className="animate-spin" /> : null}
              Oluştur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
