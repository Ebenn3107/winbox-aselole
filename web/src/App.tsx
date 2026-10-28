import { useEffect, useState } from 'react';

type Status = 'checking' | 'ok' | 'down';

const styles: Record<Status, string> = {
  checking: 'border-slate-200 bg-slate-50 text-slate-700',
  ok: 'border-green-200 bg-green-50 text-green-800',
  down: 'border-amber-200 bg-amber-50 text-amber-900',
};

export function App() {
  const [status, setStatus] = useState<Status>('checking');

  useEffect(() => {
    // Server mati, jawaban bukan JSON, atau isinya tidak sesuai: semuanya dianggap "belum berjalan".
    fetch('/api/v1/health')
      .then((res) => res.json())
      .then((body) => setStatus(body?.data?.ok === true ? 'ok' : 'down'))
      .catch(() => setStatus('down'));
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-slate-100 p-6">
      <section className="w-full max-w-md rounded-lg bg-white p-6 shadow">
        <h1 className="text-xl font-semibold text-slate-900">Winbox Web</h1>
        <p className="mt-1 text-slate-600">Aplikasi untuk mengatur router MikroTik lewat browser.</p>

        <div role="status" className={`mt-6 rounded-md border p-4 ${styles[status]}`}>
          {status === 'checking' && <p>Memeriksa sambungan ke server…</p>}
          {status === 'ok' && <p className="font-medium">Server tersambung ✓</p>}
          {status === 'down' && (
            <p>
              Server belum berjalan. Jalankan <code className="font-mono">npm run dev</code> di folder
              proyek, lalu muat ulang halaman ini.
            </p>
          )}
        </div>

        <p className="mt-3 text-sm text-slate-500">
          Server adalah bagian aplikasi yang nanti menghubungkan halaman ini dengan router.
        </p>
      </section>
    </main>
  );
}
