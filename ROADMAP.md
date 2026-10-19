# Roadmap

Satu baris adalah satu issue, dikerjakan dalam satu Pull Request. Satu milestone ditutup dengan rilis (tag), dan aplikasi pada setiap rilis harus bisa dijalankan dan didemokan.

- Centang `[x]` berarti issue sudah selesai dan di-merge.
- ID issue (misalnya `M3-01`) dipakai juga di judul GitHub Issue, nama branch, dan pesan commit.
- Tanggal target masih draf. Sesuaikan dengan deadline dosen.
- Aturan untuk AI agent ada di [AGENTS.md](AGENTS.md).

---

## M0 — Persiapan · `v0.0` · target 19 Okt

- [x] **M0-01** Dokumen rencana: README, ROADMAP, AGENTS.md, DEVLOG, template PR/Issue.
  _Selesai jika:_ semua file ada di `main` dan Eben sudah membacanya.
- [x] **M0-02** Buat repo GitHub, milestone M1–M7, issue dari roadmap ini, dan Project board (Todo / Dikerjakan / Selesai).
  _Selesai jika:_ setiap baris roadmap punya GitHub Issue dengan ID yang sama.

## M1 — Halo Router · `v0.1` · target 26 Okt

- [x] **M1-01** Scaffold monorepo: npm workspaces `server/` (Express + TS) dan `web/` (Vite + React + TS + Tailwind). Perintah `npm run dev` menjalankan keduanya.
  _Selesai jika:_ halaman web menampilkan hasil `GET /api/v1/health`, dan bagian "Perintah" di AGENTS.md sudah diisi.
- [ ] **M1-02** Simulator minimal: data router di memori (nama, versi, uptime, CPU, RAM, interface `ether1`–`ether5`, `bridge`, `wlan1`) dan endpoint `GET /api/v1/system/resource`.
  _Selesai jika:_ test Vitest untuk endpoint ini lolos, dan nilai CPU/uptime berubah tiap detik.
- [ ] **M1-03** Dashboard: kartu CPU, RAM, uptime, dan versi, diperbarui tiap 2 detik (polling). Setiap kartu memuat kalimat pemula, misalnya "CPU 21%: router sedang santai".
  _Selesai jika:_ angka bergerak tanpa reload halaman.
- [ ] **M1-04** Layout ala Winbox: menu di kiri, area konten, status bar di bawah (nama router + mode). Menu yang belum ada tampil abu-abu dengan tooltip "Segera hadir".
  _Selesai jika:_ semua halaman M1 terbuka dari menu.
- [ ] **M1-05** Interfaces (hanya baca): tabel nama, tipe, status, dan MAC, ditambah kolom "Artinya" (ether = colokan kabel, wlan = WiFi, bridge = gabungan beberapa port).
  _Selesai jika:_ tabel menampilkan data dari simulator.

## M2 — Aman & syarat wajib · `v0.2` · target 2 Nov

- [ ] **M2-01** Login admin (bcrypt + JWT). Akun dibuat lewat `npm run setup`. Semua `/api/v1/*` selain login wajib memakai token.
  _Selesai jika:_ ada test yang membuktikan request tanpa token ditolak 401, dan halaman login memakai bahasa Indonesia.
- [ ] **M2-02** HTTPS: `npm run setup` membuat sertifikat self-signed (localhost, 127.0.0.1), lalu `npm start` melayani web dan API lewat HTTPS port 443 (port bisa diganti lewat env).
  _Selesai jika:_ `https://localhost` terbuka dan login berhasil.
- [ ] **M2-03** Format error seragam `{ error: { code, message } }` dan komponen notifikasi di web.
  _Selesai jika:_ error dari server tampil sebagai kalimat Indonesia yang ramah, bukan stack trace.
- [ ] **M2-04** Dialog Connect (mode simulator): nama koneksi, alamat, user, password. Koneksi disimpan dengan password terenkripsi. Setiap field punya penjelasan untuk pemula.
  _Selesai jika:_ koneksi yang sudah disimpan bisa dipakai ulang setelah reload.
- [ ] **M2-05** **IP > Services**: daftar www, www-ssl, ssh, api, winbox, telnet, ftp beserta port, dengan tombol enable/disable. Setiap service punya penjelasan, dan ada peringatan bila pengguna mematikan service yang sedang dipakai aplikasi.
  _Selesai jika:_ status bisa diubah dan tetap tersimpan.

## M3 — CRUD & pola pemula · `v0.3` · target 9 Nov

- [ ] **M3-01** IP > Addresses: lihat, tambah, edit, hapus, enable/disable. Format CIDR divalidasi saat mengetik, dan IP duplikat ditolak dengan pesan yang jelas.
  _Selesai jika:_ ada test untuk validator CIDR dan untuk penolakan duplikat.
- [ ] **M3-02** IP > Routes: CRUD dengan gateway. Penjelasan pemula: "Rute adalah petunjuk jalan untuk data."
  _Selesai jika:_ default route bisa ditambah dan dihapus.
- [ ] **M3-03** Refactor: ekstrak skema field (`web/src/schemas/`) dan komponen `ResourcePage` dari halaman Addresses dan Routes.
  _Selesai jika:_ perilaku kedua halaman tidak berubah dan semua test tetap lolos.
- [ ] **M3-04** IP > DHCP Server dan Leases, memakai `ResourcePage`. Leases dijelaskan sebagai "perangkat yang mendapat IP otomatis".
  _Selesai jika:_ server bisa di-toggle dan leases tampil.
- [ ] **M3-05** Dialog konfirmasi untuk hapus/disable, berisi kalimat dampak (misalnya "Perangkat di ether2 akan putus").
  _Selesai jika:_ semua aksi hapus dan disable melewati dialog ini.

## M4 — Router asli · `v0.4` · target 16 Nov

- [ ] **M4-01** Refactor: pindahkan simulator ke balik kontrak `RouterAdapter` (list, add, set, remove, enable, disable, systemResource).
  _Selesai jika:_ route API tidak lagi memanggil simulator secara langsung dan semua test lolos.
- [ ] **M4-02** Codec protokol API RouterOS: encode/decode panjang kata dan sentence.
  _Selesai jika:_ ada unit test memakai contoh byte dari dokumentasi MikroTik, termasuk batas panjang 0x7F, 0x3FFF, dan 0x1FFFFF.
- [ ] **M4-03** Klien TCP: connect, login (RouterOS v6.43+), kirim perintah, tangani `!re`/`!done`/`!trap`/`!fatal`, timeout, dan TLS port 8729.
  _Selesai jika:_ ada test dengan socket tiruan.
- [ ] **M4-04** `RouterOsAdapter`: petakan operasi adapter ke `/print`, `/add`, `/set`, `/remove`, `/enable`, `/disable`.
  _Selesai jika:_ semua operasi punya unit test.
- [ ] **M4-05** Mode live di dialog Connect, dengan pesan error yang ramah (misalnya "Router tidak menjawab. Cek alamat IP dan pastikan service api aktif.").
  _Selesai jika:_ salah password dan salah IP masing-masing menampilkan pesan yang jelas.
- [ ] **M4-06** Uji coba di RouterOS CHR (VirtualBox) dan catat hasilnya di `docs/uji-chr.md`.
  _Selesai jika:_ Dashboard, Interfaces, Addresses, dan Services berjalan dengan router asli.

## M5 — Panen fitur · `v0.5` · target 23 Nov

Semua halaman di milestone ini memakai `ResourcePage` dan skema field, dan setiap halaman punya penjelasan pemula.

- [ ] **M5-01** Firewall > Filter Rules: CRUD, ditambah tombol ↑/↓ untuk mengatur urutan rule.
- [ ] **M5-02** Firewall > NAT: masquerade dan dst-nat. Penjelasan pemula: "buka port untuk game/CCTV".
- [ ] **M5-03** Queues > Simple Queue: batas kecepatan diisi dalam bahasa manusia ("2 Mbps"), lalu diubah ke format RouterOS (`2M/2M`).
- [ ] **M5-04** IP > DNS: daftar server dan allow-remote-requests.
- [ ] **M5-05** IP > Hotspot: users, profiles, dan sesi aktif.
- [ ] **M5-06** PPP: secrets dan koneksi aktif.
- [ ] **M5-07** Wireless: SSID, password (security profile), dan registration table ("perangkat yang tersambung ke WiFi").
- [ ] **M5-08** System: Identity, Clock, dan Users (akun router).
- [ ] **M5-09** Tools: Ping dan Traceroute, dengan hasil yang dijelaskan ("4 dari 4 balasan diterima: koneksi bagus").

_Selesai jika (berlaku untuk setiap issue M5):_ CRUD berjalan di mode simulator dan live, dan setiap field punya contoh serta teks bantuan.

## M6 — Mode Pemula · `v0.6` · target 30 Nov

- [ ] **M6-01** Tombol Pemula ↔ Ahli (tersimpan di browser). Mode Pemula memakai `beginnerLabel` dan menyembunyikan field lanjutan.
- [ ] **M6-02** Menu pemula: Internet, WiFi, Perangkat Terhubung, Batasi Kecepatan, Keamanan. Setiap menu memetakan ke halaman yang sudah ada.
- [ ] **M6-03** Quick Set **Atur WiFi**: isi nama dan password, lalu wireless dan security profile diatur otomatis.
- [ ] **M6-04** Quick Set **Bagikan Internet**: pilih port internet, lalu DHCP client, NAT masquerade, dan DHCP server LAN dibuat otomatis.
- [ ] **M6-05** Quick Set **Batasi Kecepatan**: pilih perangkat dari daftar lease, isi batasnya, lalu simple queue dibuat otomatis.
- [ ] **M6-06** Quick Set **Blokir Situs**: isi domain, lalu address-list dan filter drop dibuat otomatis.
- [ ] **M6-07** Dashboard "Kesehatan Router": lampu hijau/kuning/merah untuk CPU, RAM, dan internet, disertai saran.
- [ ] **M6-08** Kamus istilah: satu halaman kamus, ditambah tooltip istilah di seluruh aplikasi.

_Selesai jika (berlaku untuk setiap Quick Set):_ terdiri dari tiga langkah, menampilkan pratinjau "yang akan diubah" sebelum tombol Terapkan, dan diuji oleh minimal satu teman non-IT.

## M7 — Realtime & demo · `v1.0` · target 7 Des

- [ ] **M7-01** SSE: grafik traffic realtime per interface.
- [ ] **M7-02** Log live dengan filter.
- [ ] **M7-03** Safe Mode versi aplikasi: setiap perubahan dibatalkan otomatis bila tidak dikonfirmasi dalam 60 detik.
- [ ] **M7-04** System > Backup (export/import) dan Files.
- [ ] **M7-05** Tur panduan saat pertama login, dan pencarian menu (Ctrl+K).
- [ ] **M7-06** Uji coba ke 3–5 teman non-IT. Setiap temuan menjadi issue baru.
- [ ] **M7-07** Docker compose dan panduan tester di README.
- [ ] **M7-08** Checklist demo, plus mode simulator sebagai cadangan bila router kampus bermasalah.

---

## Bank fitur tambahan

Ambil dari sini bila ada sisa waktu. Setiap fitur menjadi issue baru dengan ID `X-<nomor>`.

ARP · Neighbors (deteksi router di jaringan) · Bridge & VLAN · IP Pool · DHCP Client · Torch · Bandwidth Test · Scheduler · Scripts · Netwatch · Export `.rsc` · Mode gelap/terang · Multi-tab router · Terminal mini
