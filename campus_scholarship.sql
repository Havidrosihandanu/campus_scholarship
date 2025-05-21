-- TABLE: users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password_hash TEXT
);

-- TABLE: announcement
CREATE TABLE announcement (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150),
    description TEXT,
    content TEXT,
    file VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLE: scholarship
CREATE TABLE scholarship (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(50),
    nominal INTEGER,
    deadline DATE,
    duration VARCHAR(50),
    description TEXT,
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLE: registrant_data
CREATE TABLE registrant_data (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100),
    domicile VARCHAR(100),
    birth_date DATE,
    email VARCHAR(100),
    phone VARCHAR(20),
    campus_origin VARCHAR(100),
    major VARCHAR(100),
    degree VARCHAR(50),
    scholarship_id INT REFERENCES scholarship(id),
    letter_of_recomendation VARCHAR(255),
    supporting_file VARCHAR(255),
    interest TEXT,
    semester INT,
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email, password_hash) VALUES
('Admin', 'admin@example.com', 'hashedpw1');

INSERT INTO announcement (title, description, content, file) VALUES
('Beasiswa Semester Ganjil', 'Pengumuman beasiswa', 'Isi pengumuman A', 'file1.pdf'),
('Pendaftaran Ulang', 'Instruksi pendaftaran', 'Isi pengumuman B', 'file2.pdf'),
('Perubahan Jadwal', 'Update jadwal', 'Isi pengumuman C', 'file3.pdf'),
('Beasiswa Prestasi', 'Beasiswa bagi mahasiswa berprestasi', 'Isi pengumuman D', 'file4.pdf'),
('Workshop Karir', 'Acara workshop karir', 'Isi pengumuman E', 'file5.pdf'),
('Batas Akhir Pendaftaran', 'Deadline beasiswa', 'Isi pengumuman F', 'file6.pdf'),
('Sosialisasi Beasiswa', 'Webinar sosialisasi', 'Isi pengumuman G', 'file7.pdf'),
('Tes Seleksi Beasiswa', 'Detail teknis tes', 'Isi pengumuman H', 'file8.pdf'),
('Pelatihan Wajib', 'Pelatihan peserta beasiswa', 'Isi pengumuman I', 'file9.pdf'),
('Penerimaan Mahasiswa Baru', 'Info PMB', 'Isi pengumuman J', 'file10.pdf');

INSERT INTO scholarship (name, type, nominal, deadline, duration, description, status) VALUES
('Beasiswa Unggulan', 'Prestasi', 10000000, '2025-06-30', '1 Tahun', 'Untuk mahasiswa berprestasi', 'Aktif'),
('Beasiswa Reguler', 'Akademik', 7500000, '2025-07-15', '1 Semester', 'Beasiswa umum', 'Aktif'),
('Beasiswa Pintar', 'Non-Akademik', 5000000, '2025-06-20', '6 Bulan', 'Untuk bidang non-akademik', 'Aktif'),
('Beasiswa Tahfidz', 'Agama', 9000000, '2025-08-01', '1 Tahun', 'Untuk penghafal Quran', 'Aktif'),
('Beasiswa Atlet', 'Olahraga', 6000000, '2025-06-25', '2 Semester', 'Mahasiswa berprestasi olahraga', 'Aktif'),
('Beasiswa Bidikmisi', 'Kebutuhan', 8000000, '2025-07-10', '4 Semester', 'Untuk keluarga kurang mampu', 'Aktif'),
('Beasiswa Riset', 'Penelitian', 12000000, '2025-07-05', '1 Tahun', 'Untuk penelitian mahasiswa', 'Aktif'),
('Beasiswa Startup', 'Inovasi', 10000000, '2025-08-15', '1 Tahun', 'Untuk ide startup', 'Aktif'),
('Beasiswa Digital', 'IT', 8500000, '2025-07-20', '1 Semester', 'Untuk mahasiswa bidang IT', 'Aktif'),
('Beasiswa Luar Negeri', 'Internasional', 15000000, '2025-09-01', '2 Tahun', 'Studi ke luar negeri', 'Aktif');

INSERT INTO registrant_data (
  full_name, domicile, birth_date, email, phone, campus_origin, major, degree,
  scholarship_id, letter_of_recomendation, supporting_file, interest, semester, status
) VALUES
('Ahmad Rizki', 'Jakarta', '2002-01-15', 'ahmad@example.com', '081234567890', 'UI', 'Teknik Informatika', 'S1', 1, 'rekom_ahmad.pdf', 'file_ahmad.pdf', 'AI dan Pemrograman', 4, 'Diterima'),
('Budi Santoso', 'Bandung', '2001-05-10', 'budi@example.com', '081234567891', 'ITB', 'Matematika', 'S1', 2, 'rekom_budi.pdf', 'file_budi.pdf', 'Analisis Data', 5, 'Diproses'),
('Clara Putri', 'Surabaya', '2000-11-20', 'clara@example.com', '081234567892', 'UNAIR', 'Kedokteran', 'S1', 3, 'rekom_clara.pdf', 'file_clara.pdf', 'Kesehatan Masyarakat', 6, 'Diterima'),
('Dani Kurniawan', 'Yogyakarta', '2002-04-04', 'dani@example.com', '081234567893', 'UGM', 'Biologi', 'S1', 4, 'rekom_dani.pdf', 'file_dani.pdf', 'Genetika', 3, 'Ditolak'),
('Elisa Ningsih', 'Medan', '2001-09-30', 'elisa@example.com', '081234567894', 'USU', 'Farmasi', 'S1', 5, 'rekom_elisa.pdf', 'file_elisa.pdf', 'Obat Herbal', 5, 'Diproses'),
('Fikri Ramadhan', 'Padang', '2002-02-22', 'fikri@example.com', '081234567895', 'UNAND', 'Ekonomi', 'S1', 6, 'rekom_fikri.pdf', 'file_fikri.pdf', 'Keuangan Digital', 4, 'Diterima'),
('Gita Ayu', 'Makassar', '2000-07-18', 'gita@example.com', '081234567896', 'UNHAS', 'Sosiologi', 'S1', 7, 'rekom_gita.pdf', 'file_gita.pdf', 'Masyarakat Digital', 6, 'Diproses'),
('Hendri Saputra', 'Palembang', '2001-12-25', 'hendri@example.com', '081234567897', 'UNSRI', 'Teknik Sipil', 'S1', 8, 'rekom_hendri.pdf', 'file_hendri.pdf', 'Struktur Bangunan', 5, 'Ditolak'),
('Intan Permata', 'Bali', '2002-03-17', 'intan@example.com', '081234567898', 'Udayana', 'Pariwisata', 'S1', 9, 'rekom_intan.pdf', 'file_intan.pdf', 'Promosi Wisata', 3, 'Diterima'),
('Joko Prabowo', 'Semarang', '2000-10-09', 'joko@example.com', '081234567899', 'UNDIP', 'Teknik Mesin', 'S1', 10, 'rekom_joko.pdf', 'file_joko.pdf', 'Otomotif', 7, 'Diproses');

