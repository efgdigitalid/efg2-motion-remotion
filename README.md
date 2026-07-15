# EFG Motion — Remotion Abstract Motion Graphics Generator

Aplikasi pembuat video motion graphics abstrak berbasis **Remotion**, dirancang untuk kebutuhan stock footage (Adobe Stock, dll) dan konten promosi EFG Digital. Setiap komposisi bisa di-generate dalam banyak variasi warna/gaya tanpa harus bikin video baru dari nol.

## Daftar Komposisi (12 total)

| Komposisi | Gaya | Cocok untuk |
|---|---|---|
| `ParticleFlow` | Partikel mengalir dengan glow | Background tech/abstrak, meditasi |
| `GeometricLoop` | Bentuk geometris berputar | Motion background modern/minimalis |
| `WaveGradient` | Gelombang gradient halus | Overlay background lembut |
| `LightRays` | God rays + bokeh berputar | Cinematic, spiritual, luxury |
| `LiquidBlob` | Blob organik morphing | Background modern/organik, app promo |
| `StarfieldWarp` | Bintang warp speed | Space, sci-fi, teknologi |
| `AuroraFlow` | Pita cahaya aurora mengalir | Calm/ambient, wellness content |
| `NetworkLines` | Titik & garis jaringan | Tech, data, AI, corporate |
| `KaleidoscopeLoop` | Pola simetris berputar | Musik, festival, seni abstrak |
| `SmokeFog` | Kabut/asap lembut | Mistery, elegan, cinematic |
| `GlitchGrid` | Grid digital dengan glitch | Cyberpunk, gaming, tech disruptif |
| `TitleIntro` | Animasi teks masuk/keluar | Intro/outro promosi EFG Digital (bukan loop, 5 detik) |

Semua komposisi (kecuali `TitleIntro`) dirancang **seamless loop** — bisa diputar berulang tanpa terlihat "patah", cocok untuk requirement loop di beberapa platform stock.

## ⚠️ Perbedaan penting dari tools kamu yang lain

Remotion butuh **Node.js + Chromium** untuk render video ke MP4. Ini bukan file HTML statis yang bisa langsung jalan di Netlify atau dibuka di HP. Karena kamu banyak kerja di Android, ada 2 cara realistis untuk pakai project ini:

### Opsi A (direkomendasikan): GitHub Codespaces + GitHub Actions
1. Push folder project ini ke repo GitHub kamu (`zulhoiri-debug`).
2. Buat variasi video baru dengan edit `scripts/render-jobs.mjs` langsung dari GitHub (bisa dari browser HP — buka file, klik pensil edit, commit).
3. Buka tab **Actions** di repo → workflow "Render Motion Graphics" → klik **Run workflow**.
4. Tunggu proses selesai (biasanya 5-20 menit tergantung jumlah variasi), lalu download hasil MP4 dari bagian **Artifacts** di halaman run tersebut.
5. Kalau mau preview/edit komposisi secara visual (bukan cuma edit kode), buka repo di **GitHub Codespaces** (tombol "Code" → "Codespaces" → "Create codespace") — ini jalan penuh di browser, termasuk dari HP Android, dan sudah ada Node.js di dalamnya. Jalankan `npm install` lalu `npm start` untuk buka Remotion Studio (preview live).

### Opsi B: PC/Laptop (kalau ada akses)
```bash
npm install
npm start        # buka Remotion Studio untuk preview & atur props secara visual
npm run batch-render   # render semua variasi di scripts/render-jobs.mjs sekaligus ke folder /out
```

## Struktur Project

```
src/
  Root.tsx                 <- daftar semua komposisi + setting resolusi/fps/durasi
  theme.ts                 <- preset warna (12 tema, tinggal tambah tema baru di sini)
  noise.ts                 <- helper pseudo-noise untuk efek organik (aurora, smoke)
  compositions/
    ParticleFlow.tsx
    GeometricLoop.tsx
    WaveGradient.tsx
    LightRays.tsx
    LiquidBlob.tsx
    StarfieldWarp.tsx
    AuroraFlow.tsx
    NetworkLines.tsx
    KaleidoscopeLoop.tsx
    SmokeFog.tsx
    GlitchGrid.tsx
    TitleIntro.tsx
scripts/
  render-jobs.mjs           <- daftar variasi yang mau di-render (edit di sini utk nambah variasi, ~39 variasi siap pakai)
  batch-render.mjs           <- script yang menjalankan semua render-jobs sekaligus
.github/workflows/render.yml <- otomatisasi render di GitHub Actions
```

## Cara menambah variasi baru

Cukup tambah baris baru di `scripts/render-jobs.mjs`, contoh:

```js
{ composition: "ParticleFlow", outputName: "particleflow-pastel-slow", props: { theme: "pastelDream", particleCount: 120, speed: 0.5, particleSize: 8, direction: "up" } },
```

Tema warna yang tersedia: `sunsetGold`, `oceanBlue`, `neonCyberpunk`, `emeraldLux`, `monoMinimal`, `pastelDream`, `fireRed`, `iceWhite`, `galaxyPurple`, `forestGreen`, `roseGold`, `midnightIndigo` (bisa tambah tema baru di `src/theme.ts`).

## Cara menambah komposisi baru

1. Buat file baru di `src/compositions/`, ikuti pola `ParticleFlow.tsx` (export komponen + default props).
2. Daftarkan di `src/Root.tsx` dengan `<Composition id="..." component={...} .../>`.
3. Tambahkan job render untuk komposisi itu di `scripts/render-jobs.mjs`.

## Kualitas render

Setting default di `remotion.config.ts` dan `batch-render.mjs` sudah diarahkan untuk kualitas tinggi:
- Resolusi 4K (3840x2160) — sesuai standar stock footage premium
- CRF 16 (mendekati visually lossless)
- Codec H.264, pixel format yuv420p (kompatibel luas)
- Durasi 12 detik per klip, fps 30, dirancang seamless loop (bisa diputar berulang tanpa "patah")

Kalau butuh ukuran file lebih kecil untuk upload cepat, naikkan nilai `crf` (misal 20-23) di kedua file tersebut.

---

## 🚀 Step-by-step: Deploy ke GitHub (dari HP Android)

Ini alur lengkap dari nol sampai punya (a) web preview yang bisa dibuka siapa saja lewat link, dan (b) render otomatis yang hasilnya bisa didownload.

### Langkah 1 — Buat repo GitHub

1. Buka github.com (browser HP oke), login sebagai `zulhoiri-debug`.
2. Klik **+** di kanan atas → **New repository**.
3. Nama repo bebas, misal `efg-motion-remotion`. Set **Public** (GitHub Pages gratis butuh public repo, kecuali kamu punya GitHub Pro).
4. Klik **Create repository** (jangan centang "add README", biarkan kosong).

### Langkah 2 — Upload project ke repo

Karena kamu di Android tanpa `git` CLI, cara paling gampang: upload manual lewat browser.

1. Extract file `remotion-stock-motion.zip` ini dulu di HP (pakai app file manager/ZIP extractor).
2. Di halaman repo GitHub yang baru dibuat, klik **uploading an existing file** (atau **Add file → Upload files**).
3. Upload **semua isi folder** (bukan folder zip-nya) — drag semua file & folder (`src/`, `scripts/`, `web-preview/`, `.github/`, `package.json`, dll) ke area upload.
   - Kalau browser HP kesulitan upload folder sekaligus, upload per-folder satu-satu: masuk ke folder itu dulu di GitHub (create folder dengan bikin file baru di path itu), baru upload isinya.
   - Alternatif lebih mudah: pakai app **Working Copy** (iOS) atau **GitJournal / Pydroid+termux** (Android) yang mendukung git clone/push penuh. Atau paling simpel: buka repo lewat **GitHub Codespaces** (langkah 3B) dan push dari sana.
4. Commit dengan pesan misal "Initial commit".

### Langkah 3 — Sesuaikan konfigurasi

1. Buka file `web-preview/vite.config.ts` di GitHub (klik file → pensil edit).
2. Ganti `base: "/REPO_NAME/"` jadi nama repo kamu, contoh kalau repo `efg-motion-remotion`:
   ```ts
   base: "/efg-motion-remotion/",
   ```
3. Commit perubahan.

### Langkah 4 — Aktifkan GitHub Pages

1. Di repo, buka **Settings** → **Pages** (menu kiri).
2. Di bagian **Build and deployment**, pilih source: **GitHub Actions**.
3. Selesai — tidak perlu setting lain, workflow `deploy-pages.yml` yang sudah ada di project akan otomatis jalan.

### Langkah 5 — Jalankan deploy preview

1. Buka tab **Actions** di repo.
2. Kalau workflow belum otomatis jalan, pilih **Deploy Preview to GitHub Pages** di sidebar kiri → klik **Run workflow** → **Run workflow** (tombol hijau).
3. Tunggu 2-5 menit sampai muncul centang hijau.
4. Buka lagi **Settings → Pages**, akan muncul link seperti `https://zulhoiri-debug.github.io/efg-motion-remotion/`. Buka link itu — inilah **aplikasi preview** yang bisa dibuka dari HP mana saja, tanpa install apa-apa.

### Langkah 6 — Render video final (MP4)

1. Edit variasi yang mau di-render di `scripts/render-jobs.mjs` (atau pakai tombol "Salin ke clipboard" dari web preview untuk dapat kode siap tempel).
2. Buka tab **Actions** → pilih workflow **Render Motion Graphics** → **Run workflow**.
3. Tunggu proses selesai (5-30 menit tergantung jumlah variasi).
4. Buka halaman run yang selesai tadi → scroll ke bagian **Artifacts** → download `rendered-videos.zip`, isinya semua file MP4.

### Ringkasan alur kerja sehari-hari

```
Buka web preview (Pages) di HP
   → cek kombinasi komposisi + tema yang bagus
   → salin snippet, tempel ke render-jobs.mjs (edit file di GitHub langsung)
   → commit
   → Actions → Run workflow "Render Motion Graphics"
   → download MP4 dari Artifacts
   → upload ke Adobe Stock
```

Kalau di kemudian hari kamu mau setup lebih smooth (edit kode & push tanpa buka GitHub web tiap kali), pertimbangkan install **Termux + git** di Android, atau pakai **GitHub Codespaces** penuh dari browser — keduanya mendukung `git push` normal seperti di laptop.
