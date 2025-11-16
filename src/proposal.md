# **PROPOSAL PENGEMBANGAN APLIKASI MONITORING SENSOR AIR BERBASIS WEB**

| | |
| :--- | :--- |
| **Tanggal** | 16 November 2025 |
| **Untuk** | [Nama Klien/Perusahaan Anda] |
| **Dari** | [Nama Anda/Perusahaan Anda] |

---

## **1. Deskripsi Aplikasi**

Aplikasi Monitoring Sensor Air adalah sebuah sistem berbasis web yang dirancang untuk menerima, memproses, dan memvisualisasikan data yang dikirim oleh sensor-sensor air secara *real-time*. Sistem ini memungkinkan pemantauan jarak jauh terhadap berbagai parameter kualitas atau level air dari banyak lokasi sekaligus.

Data dari setiap unit sensor akan dikirimkan melalui protokol MQTT ke sebuah *MQTT Broker* pusat. Aplikasi server yang dibangun menggunakan **Spring Boot 4** dan **Java 25 LTS** akan mengambil data dari broker tersebut, menyimpannya ke dalam database, dan menampilkannya dalam bentuk laporan dan grafik pada antarmuka web yang responsif.

## **2. Diagram Arsitektur**

Diagram berikut mengilustrasikan alur data dari sensor hingga ke pengguna akhir.

![Diagram Arsitektur](assets/diagram.png){ width=100% }

## **3. Daftar Fitur**

Aplikasi akan memiliki fitur-fitur utama sebagai berikut:

1.  **Dashboard Pemantauan**: Halaman utama yang menampilkan ringkasan status semua sensor (KPI), tren data terkini, dan notifikasi penting secara visual.

2.  **Laporan & Grafik Historis**: Kemampuan untuk melihat data historis dalam bentuk grafik dan tabel dengan filter lanjutan (perangkat, rentang tanggal, interval).

3.  **Daftar Sensor & Status**: Menampilkan daftar semua sensor yang terhubung beserta status operasionalnya secara real-time (Healthy, Low Battery, Disconnected, dll.).

4.  **Pemantauan Kondisi Sensor**: Halaman khusus untuk memantau metrik internal sensor, seperti tingkat daya baterai dan kekuatan sinyal.

5.  **Manajemen Sensor**: Antarmuka untuk menambah, mengedit, dan menghapus data sensor dari sistem.

6.  **Penerimaan Data MQTT**: Kemampuan untuk terhubung ke MQTT broker dan menerima data dari semua sensor.

**Catatan Arsitektur:**

Aplikasi dibangun sebagai **monolithic web application** dengan server-side HTML rendering menggunakan Spring Boot. Pengguna mengakses sistem melalui web browser (desktop atau mobile browser). Pendekatan ini memberikan kompatibilitas maksimal tanpa memerlukan instalasi aplikasi khusus.

**Rencana Pengembangan Fase Berikutnya:**

Aplikasi mobile native (Android/iOS) direncanakan untuk fase pengembangan berikutnya. **Pengembangan mobile app TIDAK termasuk dalam proposal dan biaya ini.** Mobile app akan menjadi topik diskusi terpisah dengan estimasi biaya dan timeline tersendiri.

## **4. UI Mockup**

Berikut adalah beberapa mockup yang mengilustrasikan fitur-fitur utama aplikasi.

### **4.1. Dashboard Pemantauan**

Halaman utama untuk melihat ringkasan data dan tren secara cepat.

![Dashboard Pemantauan](assets/mockup_dashboard.png){ width=65% }

### **4.2. Daftar Sensor & Status**

Layar untuk melihat status operasional semua sensor dalam satu tabel.

![Daftar Sensor & Status](assets/mockup_sensor_list.png){ width=65% }

### **4.3. Pemantauan Kondisi Sensor**

Layar untuk menganalisa metrik internal sensor seperti tingkat baterai.

![Pemantauan Kondisi Sensor](assets/mockup_sensor_health.png){ width=65% }

### **4.4. Manajemen Sensor**

Antarmuka untuk mengelola (menambah, edit, hapus) perangkat sensor.

![Manajemen Sensor](assets/mockup_sensor_management.png){ width=65% }

## **5. Lingkup Pekerjaan**

1.  **Pengembangan Aplikasi**:
    *   Pengembangan backend dengan Spring Boot untuk menerima data MQTT.
    *   Pengembangan antarmuka web (frontend) untuk menampilkan laporan.
    *   Setup database untuk penyimpanan data.
2.  **Setup Infrastruktur**:
    *   Konfigurasi Virtual Private Server (VPS).
    *   Instalasi OS dan software pendukung (Java, Database, Web Server).
    *   Konfigurasi domain dan DNS.
    *   Setup sertifikat SSL (HTTPS) dengan Let's Encrypt.
3.  **Setup MQTT Broker**:
    *   Instalasi dan konfigurasi Mosquitto MQTT Broker di VPS.
    *   Pengamanan broker dengan username/password.
4.  **Deployment Aplikasi**:
    *   Deploy aplikasi Spring Boot ke VPS.
    *   Konfigurasi web server (misal: Nginx) sebagai *reverse proxy*.
    *   Testing end-to-end.

## **6. Daftar Task, Estimasi Mandays, dan Rate**

Asumsi rate per manday: **Rp 1.500.000,-** (dapat disesuaikan).

| Kategori | Task | Estimasi (Mandays) |
| :--- | :--- | :--- |
| **Infrastruktur** | Setup VPS, Domain, & Keamanan | 2 |
| **Development** | Instalasi & Konfigurasi MQTT Broker | 1 |
| | Inisialisasi Proyek & Database | 1 |
| | Implementasi listener MQTT | 2 |
| | Pembuatan API untuk frontend | 2 |
| | Desain UI/UX Laporan | 1 |
| | Integrasi API & Tampilan Tabel | 2 |
| | Implementasi Grafik Data | 2 |
| | Deploy Aplikasi & Testing | 2 |
| **Total** | | **15 Mandays** |

*Catatan: 2 mandays dari total estimasi dialokasikan untuk Setup Infrastruktur, dan 13 mandays untuk Development.*

## **7. Spesifikasi VPS**

### **7.1. Analisis Kebutuhan Teknis**

Perhitungan berikut menunjukkan dasar pemilihan spesifikasi VPS:

**Asumsi Beban Kerja:**

-   100 sensor mengirim data setiap 1-5 menit (rata-rata: 3 menit)

-   Setiap pesan berisi: Water Level, pH, Turbidity, timestamp, battery level, signal strength

-   Ukuran data per pesan: ~250 bytes (format JSON)

**Perhitungan Throughput Data:**

-   Pesan per hari (skenario terburuk, interval 1 menit): 100 sensor × 1,440 menit/hari = 144,000 pesan/hari

-   Pesan per hari (skenario rata-rata, interval 3 menit): 100 sensor × 480 pesan/hari = 48,000 pesan/hari

-   Volume data per hari: 48,000 × 250 bytes ≈ 12 MB/hari

-   Volume data per tahun: 12 MB × 365 hari ≈ 4.4 GB/tahun (data murni)

-   Dengan overhead database (index, metadata): ~2x = **8-10 GB/tahun**

**Kebutuhan Resource per Komponen:**

| Komponen | RAM | CPU | Keterangan |
| :--- | :--- | :--- | :--- |
| MQTT Broker (Mosquitto) | 100-200 MB | 0.25 core | 100 koneksi simultan |
| Spring Boot Application | 1.5-2.5 GB | 1-2 cores | JVM, connection pool, caching |
| PostgreSQL Database | 4-5 GB | 1-2 cores | Shared buffers, query memory, indexes |
| Operating System (Linux) | 0.7-1.5 GB | 0.25 core | Base system + services |
| **Total Estimasi** | **6.3-9.2 GB** | **2.5-4.5 cores** | **Penggunaan aktif** |

**Kebutuhan Storage:**

-   Sistem operasi & aplikasi: ~10 GB

-   Data sensor (1 tahun): ~10 GB

-   Log aplikasi & backup: ~5 GB

-   Buffer untuk pertumbuhan: ~35 GB

-   **Total**: ~60 GB

**Kesimpulan Analisis:**
Berdasarkan perhitungan di atas, spesifikasi dengan **4 vCPU** dan **8 GB RAM** akan menggunakan sekitar 70-80% kapasitas pada kondisi normal, yang merupakan utilisasi yang sehat untuk sistem produksi. Storage **60 GB** cukup untuk operasional 1-2 tahun dengan strategi arsip data berkala.

### **7.2. Rekomendasi Spesifikasi**

Kami menyediakan **dua alternatif** spesifikasi VPS dari **Biznet Gio Cloud** yang dapat dipilih sesuai kebutuhan dan anggaran:

#### **Opsi A: Konfigurasi Minimalis (Hemat Biaya)**

Cocok untuk implementasi awal dengan skala lebih kecil.

**Asumsi yang Disesuaikan:**

-   Jumlah sensor: **50 sensor** (dapat ditambah bertahap)

-   Interval pengiriman data: **5-10 menit** (mengurangi beban)

-   Pengguna dashboard konkuren: **5-10 pengguna**

-   Retensi data: **6 bulan** (data lama diarsip ke penyimpanan eksternal)

**Spesifikasi VPS:**

-   **Layanan**: NEO Lite Pro

-   **Tipe**: Compute

-   **Paket**: MM 4.2 (estimasi)

-   **vCPU**: 2 Core

-   **RAM**: 4 GB

-   **Penyimpanan**: 40 GB NVMe SSD

-   **Bandwidth**: Unlimited

-   **Estimasi Harga**: Sekitar Rp 250.000,- per bulan (estimasi, harga dapat berubah)

**Kebutuhan Resource (Minimalis):**

| Komponen | RAM | CPU |
| :--- | :--- | :--- |
| MQTT Broker (Mosquitto) | 50-100 MB | 0.25 core |
| Spring Boot Application | 1-1.5 GB | 0.5-1 core |
| PostgreSQL Database | 2-2.5 GB | 0.5-1 core |
| Operating System (Linux) | 0.7 GB | 0.25 core |
| **Total Estimasi** | **3.5-4.3 GB** | **1.5-2.5 cores** |

**Kelebihan:**

-   Biaya operasional lebih rendah (~43% lebih murah)

-   Cocok untuk proof-of-concept atau pilot project

-   Dapat di-upgrade jika kebutuhan bertambah

**Kekurangan:**

-   Kapasitas terbatas untuk scaling

-   Perlu arsip data lebih sering (setiap 6 bulan)

-   Performa bisa menurun saat beban tinggi

#### **Opsi B: Konfigurasi Optimal (Rekomendasi)**

Cocok untuk implementasi penuh dengan ruang pertumbuhan.

**Asumsi Beban Kerja:**

-   Jumlah sensor: **100 sensor**

-   Interval pengiriman data: **1-5 menit** (fleksibel, real-time)

-   Pengguna dashboard konkuren: **20-30 pengguna**

-   Retensi data: **1-2 tahun**

**Spesifikasi VPS:**

-   **Layanan**: NEO Lite Pro

-   **Tipe**: Compute

-   **Paket**: MM 8.4 (Medium Memory)

-   **vCPU**: 4 Core

-   **RAM**: 8 GB

-   **Penyimpanan**: 60 GB NVMe SSD

-   **Bandwidth**: Unlimited

-   **Estimasi Harga**: Sekitar Rp 440.000,- per bulan (estimasi, harga dapat berubah)

**Kelebihan:**

-   Mendukung 100 sensor tanpa kendala

-   Ruang untuk pertumbuhan dan fitur tambahan

-   Performa stabil bahkan saat beban tinggi

-   Retensi data lebih lama tanpa sering arsip

**Kekurangan:**

-   Biaya operasional lebih tinggi

-   Mungkin over-spec untuk deployment awal yang kecil

**Referensi Harga**: Untuk informasi harga terkini dan detail spesifikasi lengkap, silakan kunjungi halaman resmi Biznet Gio Cloud:

- Halaman Produk NEO Lite Pro: [https://www.biznetgio.com/product/neo-lite-pro](https://www.biznetgio.com/product/neo-lite-pro)
- Daftar Harga Lengkap: [https://www.biznetgio.com/pricelist](https://www.biznetgio.com/pricelist)

*Catatan: Harga dapat berubah sewaktu-waktu sesuai kebijakan Biznet Gio Cloud. Disarankan untuk mengecek harga terkini sebelum melakukan pemesanan.*

## **8. Rincian Biaya**

Berikut adalah estimasi total biaya untuk proyek ini berdasarkan dua alternatif spesifikasi VPS:

### **8.1. Opsi A: Paket Minimalis**

| Item | Deskripsi | Biaya |
| :--- | :--- | :--- |
| **1. Biaya Development** | 13 Mandays x Rp 1.500.000,- | Rp 19.500.000,- |
| **2. Biaya Setup Infrastruktur** | 2 Mandays x Rp 1.500.000,- | Rp 3.000.000,- |
| **3. Pembelian Domain (.com)** | Registrasi untuk 1 tahun | Rp 175.000,- |
| **4. Sewa VPS** | Biznet NEO Lite Pro MM 4.2 (Rp 250.000 x 12 bln) | Rp 3.000.000,- |
| **Subtotal Biaya Tahun Pertama** | | **Rp 25.675.000,-** |
| **PPN (11%)** | | **Rp 2.824.250,-** |
| **Total Keseluruhan (termasuk PPN)** | | **Rp 28.499.250,-** |

*Paket ini cocok untuk 50 sensor dengan interval 5-10 menit.*

### **8.2. Opsi B: Paket Optimal (Rekomendasi)**

| Item | Deskripsi | Biaya |
| :--- | :--- | :--- |
| **1. Biaya Development** | 13 Mandays x Rp 1.500.000,- | Rp 19.500.000,- |
| **2. Biaya Setup Infrastruktur** | 2 Mandays x Rp 1.500.000,- | Rp 3.000.000,- |
| **3. Pembelian Domain (.com)** | Registrasi untuk 1 tahun | Rp 175.000,- |
| **4. Sewa VPS** | Biznet NEO Lite Pro MM 8.4 (Rp 440.000 x 12 bln) | Rp 5.280.000,- |
| **Subtotal Biaya Tahun Pertama** | | **Rp 27.955.000,-** |
| **PPN (11%)** | | **Rp 3.075.050,-** |
| **Total Keseluruhan (termasuk PPN)** | | **Rp 31.030.050,-** |

*Paket ini cocok untuk 100 sensor dengan interval 1-5 menit dan ruang pertumbuhan.*

### **8.3. Perbandingan Biaya**

| Komponen | Opsi A (Minimalis) | Opsi B (Optimal) | Selisih |
| :--- | :--- | :--- | :--- |
| **Total Tahun Pertama** | Rp 28.499.250,- | Rp 31.030.050,- | Rp 2.530.800,- |
| **Biaya Operasional/Tahun** | Rp 3.000.000,- | Rp 5.280.000,- | Rp 2.280.000,- |

*Catatan: Harga domain dan VPS bersifat estimasi dan dapat berubah sesuai kebijakan penyedia layanan. Untuk verifikasi harga VPS terkini, silakan kunjungi [https://www.biznetgio.com/pricelist](https://www.biznetgio.com/pricelist)*

---

## **9. Informasi Kontak**

Untuk diskusi lebih lanjut mengenai proposal ini, silakan hubungi:

- **Nama**: Endy Muhardin
- **Email**: endy@artivisi.com
- **Telepon**: +62 812 98000 468
- **Website**: https://artivisi.com
