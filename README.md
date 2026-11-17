# StoreOps Studio — Store Training, Activity & Daily Operations Dashboard

Aplikasi web operasional retail modern dengan **navigasi sidebar**, **akses langsung tanpa login** (halaman Admin dilindungi password `Admin00`), **jadwal mingguan Senin–Minggu**, integrasi **4 folder Google Drive**, dan shortcut **Submit Link Report & Survey Try-on**.

## Link Terkonfigurasi

### Submit Link Report & Survey Try-on (Sidebar)
- **Open Studio**: `https://forms.gle/mfseNo9aRQmVnSBd8`
- **Survey Try-on AirPods**: `https://docs.google.com/forms/d/e/1FAIpQLSdDj3fPWA5_tZ7xBcjEhb8hMn0DAQ5Ok_joASUjwStYUjC5Ow/viewform`
- **Survey Try-on iPad**: `https://forms.gle/BZphsLuhdCtF71J1A`
- **Survey Try-on Apple Watch**: Segera hadir (dapat diisi sewaktu-waktu oleh Admin pada menu *Google Drive & Deploy*)

### Folder Google Drive Bukti Foto
- **Open Studio**: `118nYY6FpDpNZFjTiTjKY0TC81YjU1c3J`
- **Try-on AirPods**: `19x4y06MnJyC8l3TSSXtiRyh_MyPQuy4i`
- **Try-on iPad**: `1Z_Q9bczIFD3GWSuDqvhYHD-B5LyDvx8K`
- **Try-on Apple Watch**: `1hhhShaUgT6Ku4prSFPMau6ejbsV84KaL`

---

## Tutorial Hosting Online Melalui GitHub (Gratis & Real-time)

Aplikasi ini menggunakan **Firebase Firestore** untuk database real-time dan **Vite + React**, sehingga dapat langsung di-hosting online gratis melalui **GitHub + Vercel** (atau Netlify).

### Langkah 1 — Download / Siapkan Source Code & Cek File Konfigurasi
Pastikan seluruh file project berada dalam satu folder, termasuk `package.json`, `vercel.json`, `firebase-applet-config.json`, dan folder `src/`.

### Langkah 2 — Buat Repository Baru di GitHub
1. Login ke [github.com](https://github.com) lalu klik **New repository**.
2. Beri nama repository (contoh: `storeops-dashboard`), pilih **Private** atau **Public**, lalu klik **Create repository**.

### Langkah 3 — Push Kode ke GitHub
Buka terminal di folder project Anda dan jalankan:
```bash
git init
git add .
git commit -m "Initial StoreOps Studio Dashboard"
git branch -M main
git remote add origin https://github.com/USERNAME_ANDA/storeops-dashboard.git
git push -u origin main
```

### Langkah 4 — Deploy Online via Vercel (Terhubung Otomatis ke GitHub)
1. Buka [vercel.com](https://vercel.com) lalu login menggunakan akun **GitHub**.
2. Klik **Add New → Project**, lalu pilih repository `storeops-dashboard`.
3. Pastikan pengaturan build berikut terisi otomatis:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. *(Opsional)* Tambahkan Environment Variable di tab **Environment Variables** Vercel jika sudah men-deploy Google Apps Script:
   - `VITE_GOOGLE_DRIVE_SCRIPT_URL` = URL Web App `/exec` dari Google Apps Script Anda
   - `VITE_STORE_NAME` = Nama toko Anda
5. Klik **Deploy**. Dalam ~1 menit Anda akan mendapatkan URL publik `https://storeops-dashboard.vercel.app` yang dapat langsung dibuka oleh seluruh staff dari HP maupun laptop!

### Langkah 5 — Aktifkan Upload Foto Kamera HP Langsung ke 4 Folder Google Drive
1. Buka aplikasi yang sudah online → masuk ke **Admin & Kasir → Google Drive & Deploy** (masukkan password `Admin00`).
2. Klik **Salin Code.gs**.
3. Buka [script.google.com](https://script.google.com) → **New project** → tempel kode `Code.gs` tersebut.
4. Klik **Deploy → New deployment → Select type: Web app**:
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
5. Salin **Web App URL** (`https://script.google.com/macros/s/.../exec`), tempel ke kolom **Endpoint URL Google Apps Script Web App**, klik **Tes Koneksi**, lalu **Simpan Konfigurasi**.
