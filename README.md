# Aplikasi Monitoring Sensor Air

Repositori ini berisi semua file sumber dan skrip yang diperlukan untuk menghasilkan dokumen proposal "Aplikasi Monitoring Sensor Air".

## Alur Kerja

Prosesnya sekarang terdiri dari dua tahap utama:
1.  **Build Image Docker (Sekali Saja):** Anda membuat image Docker kustom yang berisi Pandoc dan LaTeX. Ini hanya perlu dilakukan sekali, atau setiap kali `Dockerfile` diubah.
2.  **Build Dokumen:** Anda menjalankan serangkaian perintah untuk mengubah file sumber di `src/` menjadi proposal PDF final di `dist/`.

## Struktur Proyek

```
.
├── src/                      # Folder untuk semua file SUMBER
│   ├── assets/
│   ├── proposal.md
│   ├── diagram.mmd
│   └── mockups/
├── scripts/                  # Folder untuk skrip generator
├── dist/                     # Folder untuk semua HASIL GENERATE
├── Dockerfile                # (Baru) Resep untuk membuat image Docker kustom Anda
├── .gitignore
├── package.json
└── README.md
```

---

## Instruksi Lengkap

### Langkah 1: Build Image Docker Kustom (Hanya Sekali)

Buka terminal Anda di root proyek dan jalankan perintah berikut. Perintah ini akan membuat image Docker lokal dari `Dockerfile` dan memberinya nama `endymuhardin/pandoc-latex` agar mudah digunakan.

```bash
docker build -t endymuhardin/pandoc-latex .
```
Proses ini mungkin memakan waktu beberapa menit saat pertama kali dijalankan.

### Langkah 2: Instal Dependensi Node.js

Jika ini pertama kalinya, inisialisasi proyek dan instal semua dependensi yang diperlukan.

```bash
npm init -y
npm install playwright @mermaid-js/mermaid-cli
```

### Langkah 3: Build Dokumen Proposal

Setelah image Docker siap dan dependensi terinstal, Anda bisa menjalankan proses build kapan saja.

**a. Siapkan Folder Build dan Salin Aset:**
```bash
mkdir -p dist/assets
cp -r src/assets/. dist/assets/
```

**b. Hasilkan Aset Dinamis (Diagram & Screenshot):**
```bash
npx mmdc -i src/diagram.mmd -o dist/assets/diagram.svg
node scripts/capture_screens.js
```

**c. Hasilkan Dokumen PDF menggunakan Image Lokal Anda:**
```bash
docker run --rm \
  --volume "$(pwd)/src:/data" \
  --volume "$(pwd)/dist/assets:/data/assets" \
  --user $(id -u):$(id -g) \
  endymuhardin/pandoc-latex proposal.md \
  -o /data/../dist/proposal.pdf \
  --from markdown \
  --pdf-engine=xelatex \
  -V geometry:"margin=1in"
```

---

### **Saran: Otomatisasi dengan NPM Scripts**

Untuk mempermudah, tambahkan skrip berikut ke `package.json` Anda:

```json
"scripts": {
  "docker:build": "docker build -t endymuhardin/pandoc-latex .",
  "clean": "rm -rf dist",
  "prepare": "mkdir -p dist/assets && cp -r src/assets/. dist/assets/",
  "generate:diagram": "npx mmdc -i src/diagram.mmd -o dist/assets/diagram.svg",
  "generate:screenshots": "node scripts/capture_screens.js",
  "build:assets": "npm run generate:diagram && npm run generate:screenshots",
  "build:pdf": "docker run --rm --volume \"$(pwd)/src:/data\" --volume \"$(pwd)/dist/assets:/data/assets\" --user $(id -u):$(id -g) endymuhardin/pandoc-latex proposal.md -o /data/../dist/proposal.pdf --from markdown --pdf-engine=xelatex -V geometry:\"margin=1in\"",
  "build": "npm run clean && npm run prepare && npm run build:assets && npm run build:pdf"
}
```

**Alur Kerja dengan NPM Scripts:**
1.  Jalankan `npm run docker:build` (hanya sekali).
2.  Setiap kali ingin membuat PDF, jalankan: `npm run build`.
