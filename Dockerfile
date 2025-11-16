# Gunakan base image Debian yang stabil, ramping, dan mendukung multi-arsitektur (termasuk arm64)
FROM debian:stable-slim

# Atur environment variable untuk instalasi non-interaktif
ENV DEBIAN_FRONTEND=noninteractive

# Update, install pandoc, texlive-xetex (untuk XeLaTeX), dan paket pendukungnya.
# --no-install-recommends digunakan agar ukuran image tidak terlalu besar.
# Optimized: Removed inkscape, fonts-noto-core, texlive-fonts-extra, lmodern
# (diagram generated with mmdc/Playwright locally, template only uses Lato font)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    pandoc \
    texlive-xetex \
    texlive-latex-recommended \
    texlive-fonts-recommended \
    librsvg2-bin \
    fonts-lato && \
    # Bersihkan cache apt untuk mengurangi ukuran image
    rm -rf /var/lib/apt/lists/*

# Atur direktori kerja di dalam container
WORKDIR /data

# Perintah ini bisa diaktifkan jika Anda ingin 'pandoc' menjadi perintah default
ENTRYPOINT ["pandoc"]
