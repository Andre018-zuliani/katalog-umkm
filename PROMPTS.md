# Jurnal Prompt

Catat prompt penting selama membangun aplikasi: apa yang kamu minta, hasilnya, dan perbaikan yang dilakukan. Beri tanda **[SENDIRI]** untuk prompt yang kamu tulis sendiri (bukan dari lembar kerja).

## US-01 Katalog dari database

**Prompt:**
Ubah `app/page.jsx` supaya daftar produk diambil dari tabel `produk` di Supabase pada sisi server, menggunakan `SUPABASE_URL` dan `SUPABASE_SECRET_KEY`. Buat koneksi server di `lib/supabase`, pertahankan `KartuProduk`, tampilkan pesan error atau `Belum ada produk`, dan hapus `CatatanBelumAktif`.

**Hasil:**
Katalog mengambil data dari Supabase melalui Server Component dan build berhasil.

**Perbaikan:**
Menambahkan penanganan environment/query yang gagal dan menjadikan halaman dinamis agar data terbaru diambil saat request.

## US-02 Detail produk

**Prompt:**
Ubah `app/produk/[id]/page.jsx` supaya mengambil satu produk dari tabel `produk` di Supabase berdasarkan id URL pada sisi server, memanggil `notFound()` jika tidak ditemukan, mempertahankan tampilan, dan menghapus `CatatanBelumAktif`.

**Hasil:**
Halaman detail mengambil foto, kategori, nama, harga, dan deskripsi dari database serta menangani produk yang tidak ditemukan.

**Perbaikan:**
Error query diteruskan sebagai error server, sedangkan hasil kosong memanggil `notFound()`.

## US-03 Pesan via WhatsApp

**Prompt:**
Ubah `components/TombolWhatsApp.jsx` menjadi tautan `wa.me` ke nomor di `lib/toko.js`, dengan pesan otomatis berisi nama dan harga produk dalam format rupiah, memakai `encodeURIComponent` dan tab baru.

**Hasil:**
Tombol membuka WhatsApp dengan pesan produk yang sudah terisi.

**Perbaikan:**
Mempertahankan class tampilan tombol dan menambahkan `rel="noopener noreferrer"`.

## US-04 Login admin

**Prompt:**
Buat login admin memakai Supabase Auth email/password dengan `@supabase/ssr` dan cookie. Proses melalui Server Action, tampilkan error login, arahkan login berhasil ke `/admin`, dan buat tombol keluar mengakhiri sesi.

**Hasil:**
Login dan logout memakai Server Actions dengan session cookie Supabase.

**Perbaikan:**
Menambahkan `useActionState` agar error login tampil pada form tanpa mengubah tampilannya.

## US-05 Ganti password

**Prompt:**
Buat Server Action ganti password untuk admin yang sedang login, validasi minimal 8 karakter dan konfirmasi sama, tampilkan pesan hasil, sambungkan ke form, dan hapus `CatatanBelumAktif`.

**Hasil:**
Password diperbarui melalui Supabase Auth setelah sesi diverifikasi di server.

**Perbaikan:**
Menambahkan pesan validasi, error, dan sukses pada form berbasis `useActionState`.

## US-06 Proteksi halaman admin

**Prompt:**
Buat `proxy.js` di root untuk melindungi semua rute `/admin` kecuali `/admin/login` dengan Supabase Auth, pastikan action perubahan data memeriksa login di server, dan hapus `CatatanBelumAktif` dari halaman admin.

**Hasil:**
Pengunjung tanpa sesi diarahkan ke `/admin/login`, dan proxy mempertahankan cookie Auth yang diperbarui.

**Perbaikan:**
`ubahPasswordAdmin` memanggil `getUser()` sebelum `updateUser`; build mengenali proxy Next.js 16.

## Debugging dan fitur bonus

Tambahkan bagian baru untuk setiap error yang kamu perbaiki atau fitur bonus yang kamu kerjakan.
