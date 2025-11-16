# Aplikasi Monitoring Sensor Air

Dokumen ini berisi proposal pengembangan aplikasi monitoring sensor air berbasis web, serta instruksi untuk menghasilkan dokumen PDF dari proposal dan mockup UI.

## Struktur Proyek

```
.
├── proposal/
│   ├── proposal.md         # File proposal dalam format Markdown
│   └── assets/
│       └── mockup.png      # Screenshot UI Mockup (akan dihasilkan)
├── src/
│   └── mockup.html         # Source code HTML untuk UI Mockup
├── playwright/
│   └── screenshot.js       # Skrip Playwright untuk mengambil screenshot UI Mockup
└── README.md               # Dokumen ini
```

## Instruksi untuk Menghasilkan PDF Proposal

Ikuti langkah-langkah berikut untuk menghasilkan screenshot mockup UI dan mengonversi proposal Markdown menjadi file PDF.

### Langkah 1: Inisialisasi Proyek Node.js

Jalankan perintah ini di terminal Anda untuk membuat file `package.json` jika belum ada:

```bash
npm init -y
```

### Langkah 2: Instal Playwright

Perintah ini akan menginstal Playwright yang diperlukan untuk mengambil screenshot mockup UI.

```bash
npm install playwright
```

### Langkah 3: Hasilkan Screenshot Mockup UI

Jalankan skrip Playwright yang telah kita buat untuk membuat file `mockup.png` di dalam folder `proposal/assets`.

```bash
node playwright/screenshot.js
```

Setelah perintah ini berjalan, Anda akan melihat file `mockup.png` baru di `proposal/assets/`.

### Langkah 4: Konversi Proposal ke PDF menggunakan Docker

Pastikan Docker sudah terinstal dan berjalan di sistem Anda. Perintah berikut akan mengunduh image `pandoc/latex` (jika belum ada), me-mount folder `proposal` Anda, dan mengonversi `proposal.md` menjadi `proposal.pdf`.

Jalankan perintah ini dari direktori root proyek Anda:

```bash
docker run --rm --volume "$(pwd)/proposal:/data" --user $(id -u):$(id -g) pandoc/latex proposal.md -o proposal.pdf --from markdown --pdf-engine=xelatex -V geometry:"margin=1in"
```

Setelah selesai, file **proposal.pdf** akan tersedia di dalam folder `proposal`.
