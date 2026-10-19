# Winbox Clone (Web)

Aplikasi web untuk mengelola router MikroTik, meniru [Winbox](https://mikrotik.com/download), yang dirancang supaya **bisa dipakai orang yang tidak paham jaringan sekalipun**.

Tugas akhir mata kuliah Pemrograman Jaringan, dikerjakan oleh Eben Haezer Maharadja.

> **Status:** Minggu 0, tahap perencanaan. Belum ada fitur yang bisa dipakai. Progres fitur ada di [ROADMAP.md](ROADMAP.md).

## Tujuan

- Mengelola router MikroTik dari browser: alamat IP, DHCP, firewall, WiFi, hotspot, batas kecepatan, dan lain-lain.
- Memakai **REST API buatan sendiri** dan **klien protokol API RouterOS buatan sendiri** (TCP 8728 / TLS 8729), bukan `/rest` bawaan RouterOS.
- Dilayani lewat **HTTPS**, dan dilengkapi fitur **IP > Services** untuk mengatur www, www-ssl, ssh, api, dan winbox.
- **Mode Pemula**: bahasa sehari-hari, contoh dan penjelasan di setiap isian, serta wizard **Quick Set** (atur WiFi, bagikan internet, batasi kecepatan, blokir situs).
- **Mode simulator**: router virtual untuk mencoba aplikasi tanpa perangkat MikroTik.

## Cara pengembangan

Proyek ini dikembangkan bertahap, dan setiap tahap terlihat di GitHub:

1. Setiap fitur adalah satu issue di [ROADMAP.md](ROADMAP.md), dengan GitHub Issue ber-ID sama.
2. Satu issue dikerjakan di satu branch, lalu digabung lewat satu Pull Request yang berisi screenshot dan catatan bantuan AI.
3. Setiap akhir minggu ada rilis (`v0.1`, `v0.2`, …) dan catatan di [docs/DEVLOG.md](docs/DEVLOG.md).

AI dipakai sebagai asisten, dan penggunaannya dicatat secara terbuka di setiap PR dan di DEVLOG. Aturan untuk AI agent ada di [AGENTS.md](AGENTS.md).

## Teknologi (rencana)

- **Backend:** Node.js, Express, TypeScript
- **Frontend:** React, Vite, TypeScript, Tailwind CSS
- **Test:** Vitest

## Menjalankan aplikasi

Belum tersedia. Panduannya ditambahkan mulai rilis `v0.1`.
