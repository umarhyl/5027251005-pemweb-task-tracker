# Week 5 — Task Tracker Kuliah

Aplikasi sederhana untuk mencatat dan mengelola tugas kuliah menggunakan HTML, CSS,
dan JavaScript tanpa framework.

## Fitur

- Menambahkan tugas dengan judul, mata kuliah, dan deadline.
- Validasi judul minimal tiga karakter dan deadline wajib diisi.
- Menampilkan daftar tugas dari array of objects.
- Menandai tugas sebagai selesai menggunakan checkbox.
- Menghapus tugas.
- Memfilter tugas berdasarkan status:
  - Semua
  - Aktif
  - Selesai
- Menampilkan jumlah tugas yang masih aktif.
- Menyimpan data ke `localStorage`, sehingga data tetap tersedia setelah halaman
  dimuat ulang.
- Menggunakan satu fungsi `render()` untuk memperbarui tampilan.
- Menggunakan event delegation pada daftar tugas.
- Menggunakan `textContent` atau escape HTML saat menampilkan data pengguna.
- Tampilan minimalis dan responsif.

## Struktur File

```text
week5/
├── index.html
├── style.css
├── app.js
└── README.md
```

- `index.html` berisi struktur halaman, form, tombol filter, dan daftar tugas.
- `style.css` mengatur tampilan minimalis serta responsivitas halaman.
- `app.js` mengatur state tugas, event listener, render, filter, validasi, dan
  `localStorage`.

## Alur Kerja

1. Pengguna mengisi form tugas.
2. Data divalidasi saat form dikirim.
3. Tugas baru ditambahkan ke array `tasks`.
4. Data disimpan ke `localStorage`.
5. Fungsi `render()` membangun ulang daftar tugas.
6. Checkbox dan tombol hapus diproses melalui event delegation.
7. Filter mengubah data yang ditampilkan tanpa menghapus data asli.

Link chat AI:
https://share.gemini.google/q8hjCckO2IC9
