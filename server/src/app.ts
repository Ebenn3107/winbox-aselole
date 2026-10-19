import express from 'express';

// `app` dipisah dari `index.ts` supaya test bisa memakainya tanpa membuka port 3000.
export const app = express();

// Cek sederhana bahwa server hidup. Dipakai halaman web untuk menampilkan status.
app.get('/api/v1/health', (_req, res) => {
  res.json({ data: { ok: true } });
});
