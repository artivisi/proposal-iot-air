# Aplikasi Monitoring Sensor Air

Repositori ini berisi semua file sumber dan skrip yang diperlukan untuk menghasilkan dokumen proposal "Aplikasi Monitoring Sensor Air".

## Struktur Proyek

```
.
├── src/                      # Folder untuk semua file SUMBER
│   ├── proposal.md
│   ├── diagram.mmd
│   └── mockups/
│       └── screens.html
├── scripts/                  # Folder untuk skrip generator
│   └── capture_screens.js
├── dist/                     # Folder untuk semua HASIL GENERATE (diabaikan oleh git)
│   ├── assets/
│   │   ├── diagram.svg
│   │   └── *.png
│   └── proposal.pdf
├── .gitignore
├── package.json
└── README.md
```

- **`src/`**: Berisi file-file yang Anda edit: proposal dalam Markdown, diagram dalam format Mermaid, dan mockup dalam HTML.
- **`scripts/`**: Berisi skrip Node.js untuk mengambil screenshot dari mockup HTML.
- **`dist/`**: Berisi semua hasil akhir. Folder ini bisa dihapus dengan aman dan akan dibuat ulang saat proses build dijalankan.

## Instruksi untuk Menghasilkan PDF Proposal

Ikuti langkah-langkah berikut untuk mengubah semua file sumber di `src/` menjadi proposal `proposal.pdf` di dalam folder `dist/`.

### Langkah 1: Instal Dependensi

Jika ini pertama kalinya, inisialisasi proyek dan instal semua dependensi yang diperlukan (Playwright untuk screenshot dan Mermaid CLI untuk diagram).

```bash
npm init -y
npm install playwright @mermaid-js/mermaid-cli
```

### Langkah 2: Hasilkan Aset (Diagram & Screenshot)

Jalankan perintah berikut untuk mengubah file sumber menjadi aset gambar di dalam folder `dist/assets/`.

**a. Hasilkan Diagram Arsitektur:**

```bash
npx mmdc -i src/diagram.mmd -o dist/assets/diagram.svg
```

**b. Hasilkan Screenshot Mockup:**

```bash
node scripts/capture_screens.js
```

### Langkah 3: Hasilkan Dokumen PDF

Setelah semua aset gambar berada di `dist/assets/`, jalankan perintah Docker berikut untuk mengonversi `src/proposal.md` menjadi `dist/proposal.pdf`.

Perintah ini secara cerdas menggunakan `src` sebagai folder sumber dan `dist/assets` sebagai lokasi resource gambar, lalu menyimpan outputnya di `dist`.

```bash
docker run --rm \
  --volume "$(pwd)/src:/data" \
  --volume "$(pwd)/dist/assets:/data/assets" \
  --user $(id -u):$(id -g) \
  pandoc/latex proposal.md \
  -o /data/../dist/proposal.pdf \
  --from markdown \
  --pdf-engine=xelatex \
  -V geometry:"margin=1in"
```
*Catatan: Perintah di atas mungkin perlu sedikit penyesuaian di Windows (terkait `$(pwd)` dan `$(id -u):$(id -g)`).*

---

### **Saran: Otomatisasi dengan NPM Scripts**

Untuk mempermudah, tambahkan skrip berikut ke `package.json` Anda:

```json
"scripts": {
  "clean": "rm -rf dist",
  "prepare": "mkdir -p dist/assets",
  "generate:diagram": "npx mmdc -i src/diagram.mmd -o dist/assets/diagram.svg",
  "generate:screenshots": "node scripts/capture_screens.js",
  "build:assets": "npm run generate:diagram && npm run generate:screenshots",
  "build:pdf": "docker run --rm --volume \"$(pwd)/src:/data\" --volume \"$(pwd)/dist/assets:/data/assets\" --user $(id -u):$(id -g) pandoc/latex proposal.md -o /data/../dist/proposal.pdf --from markdown --pdf-engine=xelatex -V geometry:\"margin=1in\"",
  "build": "npm run clean && npm run prepare && npm run build:assets && npm run build:pdf"
}
```

Setelah itu, Anda cukup menjalankan satu perintah untuk membangun semuanya dari awal:
**`npm run build`**
