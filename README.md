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
│   ├── template.tex          # (Baru) Template LaTeX kustom
│   └── mockups/
├── scripts/                  # Folder untuk skrip generator
├── dist/                     # Folder untuk semua HASIL GENERATE
├── Dockerfile                # Resep untuk membuat image Docker kustom Anda
├── .gitignore
├── package.json
└── README.md
```

---

## Instruksi Lengkap

### Langkah 1: Build Image Docker Kustom (Wajib, Lakukan Sekali Saja)

Build image Docker yang berisi Pandoc, XeLaTeX, dan paket pendukung lainnya.

```bash
podman build -t endymuhardin/pandoc-latex .
```

### Langkah 2: Instal Dependensi Node.js (Jika Perlu)

Jika ini pertama kalinya, instal dependensi yang diperlukan.
```bash
npm install
```

### Langkah 3: Build Dokumen Proposal (Cara Mudah)

Gunakan NPM script yang telah dioptimalkan untuk build proses lengkap:

```bash
npm run build
```

Perintah ini akan menjalankan semua langkah otomatis:
- Membersihkan folder `dist/`
- Menyiapkan struktur direktori dan menyalin aset statis
- Menghasilkan diagram dari Mermaid
- Membuat screenshot UI mockups
- Menghasilkan PDF final dengan desain modern

### Langkah 4: Build Manual (Opsional)

Jika ingin menjalankan langkah-langkah secara individual:

**a. Siapkan Folder Build dan Salin Aset:**
```bash
npm run clean
npm run prepare
```

**b. Hasilkan Aset Dinamis:**
```bash
npm run build:assets
```

**c. Hasilkan PDF:**
```bash
npm run build:pdf
```

---

### **NPM Scripts yang Tersedia**

Proyek ini dilengkapi dengan NPM scripts yang memudahkan proses build:

```json
"scripts": {
  "docker:build": "podman build -t endymuhardin/pandoc-latex .",
  "clean": "rm -rf dist",
  "prepare": "mkdir -p dist/assets && cp -r src/assets/. dist/assets/",
  "generate:diagram": "npx mmdc -i src/diagram.mmd -o dist/assets/diagram.svg",
  "generate:screenshots": "node scripts/capture_screens.js",
  "build:assets": "npm run generate:diagram && npm run generate:screenshots",
  "build:pdf": "podman run --rm --volume \"$(pwd)/src:/src\" --volume \"$(pwd)/dist:/dist\" --user $(id -u):$(id -g) endymuhardin/pandoc-latex --template=/src/template.tex --resource-path=/dist --pdf-engine=xelatex -M title=\"PROPOSAL PENGEMBANGAN APLIKASI MONITORING SENSOR AIR BERBASIS WEB\" -M author.name=\"Endy Muhardin / ArtiVisi Intermedia\" -M author.affiliation=\"IT Consultant\" -M client=\"[Nama Klien/Perusahaan Anda]\" -M date=\"16 November 2025\" -M website=\"https://artivisi.com/\" --toc -o /dist/proposal.pdf /src/proposal.md",
  "build": "npm run clean && npm run prepare && npm run build:assets && npm run build:pdf"
}
```

**Alur Kerja Final:**
1.  Jalankan `npm run docker:build` (hanya sekali atau saat Dockerfile berubah).
2.  Setiap kali ingin membuat PDF, jalankan: `npm run build`.

**Fitur Template Modern:**
- Desain cover page yang menarik dengan elemen grafis modern
- Warna tema yang konsisten (biru tua, biru muda, abu-abu)
- Typography yang bersih menggunakan font Lato
- Table of contents yang terformat dengan baik
- Header dan footer yang profesional
- Spacing dan layout yang optimal
