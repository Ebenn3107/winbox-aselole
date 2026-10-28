# Panduan untuk AI Agent

Proyek ini adalah **clone Winbox berbasis web** (aplikasi manajemen router MikroTik), tugas akhir mata kuliah Pemrograman Jaringan oleh Eben Haezer Maharadja. Target penggunanya **orang yang tidak paham jaringan sekalipun**.

File ini dibaca oleh semua agent (Claude Code, Codex, Cursor, Copilot, Gemini, dll). Ikuti seluruh isinya.

## Aturan paling penting

Dosen mewajibkan pengembangan **bertahap dan terlihat di GitHub**. AI boleh membantu, tapi aplikasi tidak boleh "langsung jadi".

1. **Satu sesi = satu issue** dari [ROADMAP.md](ROADMAP.md), yaitu issue yang disebut Eben. Jangan memilih issue sendiri, jangan lanjut ke issue berikutnya, jangan mengerjakan fitur "sekalian".
2. Kalau sebuah issue ternyata besar (kira-kira lebih dari 300 baris perubahan), berhenti dan usulkan cara memecahnya.
3. Jangan commit, push, merge, atau membuat tag kecuali Eben memintanya. **Jangan pernah** mengubah tanggal commit atau menulis ulang riwayat yang sudah di-push (`--date`, `GIT_*_DATE`, `rebase`/`amend` pada commit yang sudah di-push, `push --force`).
4. Jangan menyalin kode dari repo prototipe lama (`winbox-clone` / `winbox-clone-prototype`). Tulis kode baru sesuai keadaan repo ini.
5. Jangan membuat bagian arsitektur yang belum diminta issue (misalnya adapter sebelum M4, SSE sebelum M7). Struktur di bawah adalah *tujuan akhir*, bukan untuk dibuat sekarang.
6. Eben harus bisa memahami setiap perubahan. Di akhir sesi, jelaskan file yang berubah beserta alasannya, lalu siapkan deskripsi PR sesuai `.github/pull_request_template.md`.
7. Jangan mengubah `docs/DEVLOG.md`. File itu ditulis Eben sendiri.

## Alur kerja per issue

1. Baca issue di `ROADMAP.md` (judul, isi, "Selesai jika") dan bagian file ini yang relevan.
2. Buat branch `feat/<id>-<slug>`, contoh `feat/m3-01-ip-address`. Untuk perbaikan pakai `fix/<slug>`.
3. Untuk logika (validator, codec protokol, endpoint API): tulis test dulu, baru kode.
4. Jalankan test dan cek manual di browser untuk perubahan UI.
5. Centang issue (`- [x]`) di `ROADMAP.md` pada branch yang sama.
6. Laporkan ke Eben: apa yang berubah, cara mengujinya, dan teks pemula yang perlu ia tinjau.

## Syarat wajib dari tugas

- REST API **buatan sendiri** (Node.js). Dilarang memakai atau mem-proxy `/rest` bawaan RouterOS.
- Protokol API RouterOS (TCP 8728, TLS 8729) **ditulis sendiri**, karena ini inti mata kuliah. Jangan memakai library RouterOS pihak ketiga.
- Aplikasi dilayani lewat **HTTPS** (self-signed), dan ada fitur **IP > Services** untuk enable/disable www, www-ssl, ssh, api, winbox.
- Nilai sebanding dengan jumlah fitur yang berfungsi.

## Arsitektur tujuan

Dibangun bertahap sesuai roadmap.

```
web/     React + Vite + TypeScript + Tailwind  (UI ala Winbox + Mode Pemula)
  │  HTTPS, /api/v1/*
server/  Express + TypeScript                  (REST API buatan sendiri)
  │  RouterAdapter (mulai M4)
  ├─ SimulatorAdapter   router virtual di memori, untuk dev & demo tanpa hardware
  └─ RouterOsAdapter    protokol API RouterOS buatan sendiri (TCP 8728 / TLS 8729)
```

- Monorepo npm workspaces: `server/` dan `web/`.
- Semua endpoint diawali `/api/v1`. Respons sukses `{ "data": ... }`. Respons error (mulai M2-03) `{ "error": { "code": "...", "message": "..." } }`, dengan `message` dalam bahasa Indonesia yang bisa langsung ditampilkan ke pengguna.
- Mulai M4, semua akses router lewat `RouterAdapter`. Frontend tidak boleh tahu mode yang sedang dipakai (simulator atau live).
- Mulai M3-03, setiap resource router punya **skema field** di `web/src/schemas/<resource>.ts`. Skema ini dipakai sekaligus oleh tabel, form, dan Mode Pemula. Contoh:

```ts
export const ipAddress = {
  path: 'ip/address',
  title: 'IP Addresses',
  beginnerTitle: 'Alamat IP Router',
  description: 'Alamat router di jaringan ini, seperti nomor rumah.',
  fields: [
    {
      name: 'address', label: 'Address', beginnerLabel: 'Alamat IP',
      example: '192.168.88.1/24',
      help: '/24 artinya jaringan ini muat 254 perangkat.',
      validate: 'cidr',
    },
  ],
};
```

## Aturan UI ramah pemula

Berlaku sejak M1, untuk setiap halaman.

- Semua teks UI memakai bahasa Indonesia sehari-hari. Istilah teknis boleh muncul, tapi selalu disertai penjelasan singkat.
- Setiap field form punya label, contoh (placeholder), dan teks bantuan satu kalimat.
- Validasi berjalan saat pengguna mengetik. Pesan error menyebut apa yang salah dan cara memperbaikinya.
  - Salah: `Invalid value`
  - Benar: `Format IP belum benar. Contoh: 192.168.88.1/24`
- Aksi berbahaya (hapus, disable, import) wajib lewat konfirmasi yang menjelaskan dampaknya.
- Halaman kosong menjelaskan fungsi halaman tersebut dan menampilkan tombol untuk aksi pertama.
- Jangan pernah menampilkan stack trace atau JSON mentah ke pengguna.
- Teks penjelasan untuk pemula boleh berupa draf dari agent, tapi sebutkan di laporan supaya Eben meninjaunya.

## Konvensi kode

- TypeScript strict. Nama variabel, fungsi, dan file dalam bahasa Inggris. Teks UI, komentar, dan pesan commit dalam bahasa Indonesia.
- Pesan commit `<tipe>: <ringkasan> (<ID issue>)`. Tipe: `feat`, `fix`, `refactor`, `test`, `docs`, `chore`. Contoh: `feat: form tambah IP address (M3-01)`.
- Test memakai Vitest. Logika wajib punya test. Perubahan UI cukup dicek manual, lalu screenshot-nya dilampirkan di PR.
- Jangan menambah dependency tanpa alasan yang ditulis di PR.

## Perintah

Butuh Node.js 22.18 atau lebih baru (server menjalankan file `.ts` langsung lewat Node). Semua perintah dijalankan dari folder root.

- `npm install`: pasang dependency untuk `server/` dan `web/` sekaligus.
- `npm run dev`: jalankan server API (port 3000) dan web (port 5173) bersamaan. Buka http://localhost:5173.
- `npm test`: jalankan semua test Vitest. Untuk satu bagian saja: `npm test -w server`.
- `npm run build`: cek tipe TypeScript, lalu build ke `server/dist` dan `web/dist`.
