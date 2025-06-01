-- TABLE: users
CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password_hash TEXT
    );

-- TABLE: announcement
CREATE TABLE
    announcement (
        id SERIAL PRIMARY KEY,
        title VARCHAR(150),
        description TEXT,
        content TEXT,
        file VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- TABLE: scholarship
CREATE TABLE
    scholarship (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        type VARCHAR(50),
        nominal INTEGER,
        deadline DATE,
        duration VARCHAR(50),
        description TEXT,
        general_requirement TEXT,
        special_requirement TEXT,
        degree_requirement varchar(100) DEFAULT NULL,
        status VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

-- TABLE: registrant_data
CREATE TABLE
    registrant_data (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(100),
        domicile VARCHAR(100),
        birth_date DATE,
        email VARCHAR(100),
        phone VARCHAR(20),
        campus_origin VARCHAR(100),
        major VARCHAR(100),
        degree VARCHAR(50),
        scholarship_id INT REFERENCES scholarship (id),
        letter_of_recomendation VARCHAR(255),
        supporting_file VARCHAR(255),
        interest TEXT,
        semester INT,
        status VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

INSERT INTO
    users (name, email, password_hash)
VALUES
    (
        'Admin Sigma',
        'admin@beasiswasigma.com',
        '$2b$10$ZGYd/9g2vfJtnqqT6V4vuu1kAEtDT3d5dwGU5DxxpeJxJTMerPs0K' -- admin123
    );

INSERT INTO
    announcement (title, description, content, file, created_at)
VALUES
    (
        'Pembukaan Pendaftaran Beasiswa Unggulan Sigma 2025',
        'Pendaftaran Beasiswa Unggulan Sigma untuk tahun 2025 telah dibuka!',
        'Kami dengan bangga mengumumkan pembukaan pendaftaran Beasiswa Unggulan Sigma 2025. Beasiswa ini ditujukan bagi mahasiswa berprestasi dari berbagai jenjang pendidikan. Jangan lewatkan kesempatan ini!',
        'announcement-file.pdf',
        '2025-05-20'
    ),
    (
        'Tips Sukses Wawancara Beasiswa',
        'Pelajari tips dan trik untuk menghadapi wawancara beasiswa dengan percaya diri.',
        'Wawancara adalah tahap krusial. Pastikan Anda mempersiapkan diri dengan baik, termasuk riset tentang beasiswa dan institusi, serta berlatih menjawab pertanyaan umum.',
        'announcement-file.pdf',
        '2025-05-18 14'
    ),
    (
        'Perpanjangan Deadline Beasiswa Riset Inovasi',
        'Deadline pendaftaran Beasiswa Riset Inovasi diperpanjang hingga 30 Juni 2025.',
        'Mengingat antusiasme yang tinggi dan beberapa permintaan, kami memutuskan untuk memperpanjang batas waktu pendaftaran Beasiswa Riset Inovasi. Manfaatkan waktu tambahan ini!',
        NULL,
        '2025-05-15'
    ),
    (
        'Workshop Penulisan Esai Beasiswa',
        'Ikuti workshop daring gratis tentang cara menulis esai beasiswa yang menarik.',
        'Beasiswa Sigma akan mengadakan workshop daring untuk membantu Anda menyusun esai yang kuat dan persuasif. Daftar sekarang, tempat terbatas!',
        'workshop_esai.link',
        '2025-05-12'
    ),
    (
        'Pengumuman Hasil Seleksi Administrasi Beasiswa IT',
        'Daftar nama peserta yang lolos seleksi administrasi Beasiswa Talenta IT.',
        'Selamat kepada para peserta yang berhasil lolos seleksi administrasi Beasiswa Talenta IT. Tahap selanjutnya adalah wawancara. Silakan cek email Anda untuk detail lebih lanjut.',
        'announcement-file.pdf',
        '2025-05-10'
    ),
    (
        'Beasiswa Sigma Peduli Lingkungan',
        'Program beasiswa baru untuk mahasiswa yang berfokus pada isu lingkungan.',
        'Sebagai bentuk komitmen terhadap keberlanjutan, Beasiswa Sigma meluncurkan program beasiswa khusus bagi mahasiswa yang aktif dalam kegiatan pelestarian lingkungan.',
        NULL,
        '2025-05-08'
    ),
    (
        'Jadwal Wawancara Beasiswa Unggulan Tahap 1',
        'Informasi jadwal wawancara untuk kandidat Beasiswa Unggulan Tahap 1.',
        'Para kandidat yang lolos seleksi administrasi Beasiswa Unggulan Tahap 1, silakan cek jadwal wawancara Anda di lampiran. Pastikan Anda hadir tepat waktu.',
        'announcement-file.pdf',
        '2025-05-05'
    ),
    (
        'FAQ Pendaftaran Beasiswa Sigma',
        'Jawaban atas pertanyaan umum seputar proses pendaftaran beasiswa.',
        'Kami telah merangkum beberapa pertanyaan yang sering diajukan oleh calon pendaftar. Semoga ini membantu Anda dalam proses aplikasi.',
        NULL,
        '2025-05-03'
    ),
    (
        'Webinar "Masa Depan Karir dengan Beasiswa"',
        'Ikuti webinar inspiratif tentang bagaimana beasiswa dapat membentuk masa depan karir Anda.',
        'Beasiswa Sigma mengundang Anda untuk bergabung dalam webinar yang akan menampilkan alumni penerima beasiswa yang sukses di bidangnya.',
        'webinar_karir.link',
        '2025-05-01'
    ),
    ('Syarat & Ketentuan Umum Beasiswa Sigma',
     'Pembaruan syarat dan ketentuan umum untuk semua program beasiswa.',
     'Demi transparansi dan kejelasan, kami telah memperbarui syarat dan ketentuan umum yang berlaku untuk semua program beasiswa di platform Beasiswa Sigma.',
     'announcement-file.pdf',
     '2025-04-28'
    ),
    (
        'Pengumuman Hasil Seleksi Tahap Akhir Beasiswa Lingkungan',
        'Daftar penerima Beasiswa Lingkungan Berkelanjutan telah diumumkan.',
        'Selamat kepada para mahasiswa yang telah lolos seleksi akhir. Silakan cek file lampiran untuk melihat nama-nama penerima.',
        'hasil-seleksi-lingkungan.pdf',
        '2025-05-30'
    ),
    (
        'Perpanjangan Deadline Beasiswa Kewirausahaan',
        'Deadline pendaftaran diperpanjang hingga akhir bulan.',
        'Kami memberikan tambahan waktu hingga 31 Mei 2025 untuk mahasiswa yang ingin mendaftar Beasiswa Kewirausahaan Muda. Jangan lewatkan kesempatan ini!',
        NULL,
        '2025-05-27'
    ),
    (
        'Tips Menulis Esai Beasiswa yang Efektif',
        'Panduan singkat menulis esai yang menarik untuk seleksi beasiswa.',
        'Kami menyusun beberapa kiat menulis esai yang mampu menarik perhatian reviewer dan meningkatkan peluang lolos seleksi.',
        'tips-esai.pdf',
        '2025-05-25'
    ),
    (
        'Informasi Tes Potensi Akademik Beasiswa Sigma',
        'Detail mengenai pelaksanaan TPA untuk pelamar Beasiswa Sigma.',
        'Tes Potensi Akademik akan dilaksanakan secara daring pada 10 Juni 2025. Pastikan perangkat Anda siap dan stabil untuk mengikuti tes.',
        'panduan-tpa.pdf',
        '2025-05-23'
    ),
    ('Beasiswa Olahraga: Syarat Tambahan',
     'Penambahan dokumen wajib untuk pendaftar beasiswa olahraga.',
     'Mulai tahun ini, pelamar Beasiswa Olahraga Berprestasi diminta melampirkan bukti keikutsertaan dalam turnamen tingkat nasional/internasional dalam 2 tahun terakhir.',
     NULL,
     '2025-05-20'),
    (
        'Pengumuman Tahap Administrasi Beasiswa Internasional',
        'Hasil seleksi administrasi Beasiswa Internasional Sigma telah dirilis.',
        'Silakan periksa daftar peserta yang lolos tahap administrasi melalui lampiran berikut. Kandidat terpilih akan melanjutkan ke tahap wawancara.',
        'administrasi-sigma.pdf',
        '2025-05-18'
    ),
    (
        'Reminder: Batas Akhir Pengumpulan Dokumen',
        'Dokumen tambahan harus dikirimkan sebelum 5 Juni 2025.',
        'Bagi seluruh pendaftar yang belum melengkapi dokumen, harap segera unggah file yang diminta melalui portal sebelum tenggat waktu.',
        NULL,
        '2025-05-17'
    ),
    (
        'Pengumuman Webinar Persiapan Seleksi Beasiswa',
        'Ayo ikuti webinar persiapan menghadapi seleksi beasiswa!',
        'Webinar akan diselenggarakan secara daring pada 6 Juni 2025 pukul 16.00 WIB. Terbuka untuk seluruh calon pendaftar beasiswa.',
        'link-webinar-siapseleksi.com',
        '2025-05-15'
    ),
    (
        'Panduan Pengisian Formulir Beasiswa',
        'Langkah-langkah lengkap mengisi formulir pendaftaran.',
        'Agar proses pendaftaran Anda lancar, ikuti panduan pengisian formulir berikut yang tersedia dalam format PDF.',
        'panduan-formulir.pdf',
        '2025-05-13'
    ),
    (
        'Update: Beasiswa Djarum Super Tahap 2 Segera Dibuka',
        'Informasi mengenai pembukaan gelombang kedua.',
        'Setelah sukses pada tahap pertama, Beasiswa Djarum Super akan membuka tahap kedua mulai 15 Juni 2025. Persiapkan dokumen Anda dari sekarang.',
        NULL,
        '2025-05-10'
    );

INSERT INTO
    scholarship (
        name,
        nominal,
        deadline,
        duration,
        description,
        general_requirement,
        special_requirement,
        status,
        created_at,
        degree_requirement
    )
VALUES
    (
        'Beasiswa Unggulan Sigma 2025',
        1500000,
        '2025-06-30',
        '4',
        'Beasiswa penuh untuk mahasiswa berprestasi dari berbagai jurusan. Mencakup biaya kuliah, tunjangan hidup, dan pengembangan diri.',
        'WNI, IPK min 3.50, aktif organisasi, tidak sedang menerima beasiswa lain.',
        'Esai motivasi, surat rekomendasi dosen, wawancara.',
        'Aktif',
        '2025-04-30',
        'S1/D4'
    ),
    (
        'Beasiswa Riset Inovasi',
        1000000,
        '2025-06-15',
        '1',
        'Dukungan finansial untuk proyek riset inovatif di bidang teknologi dan sains.',
        'WNI, mahasiswa S1/S2, proposal riset inovatif, IPK min 3.25.',
        'Presentasi proposal, surat rekomendasi pembimbing.',
        'Aktif',
        '2025-05-04',
        'S1/S2'
    ),
    (
        'Beasiswa Talenta IT',
        1200000,
        '2025-07-20',
        '3',
        'Beasiswa khusus bagi mahasiswa dengan minat dan bakat di bidang teknologi informasi.',
        'WNI, mahasiswa D3/S1 jurusan IT, portofolio proyek IT, IPK min 3.00.',
        'Uji kompetensi teknis, wawancara.',
        'Aktif',
        '2025-05-09',
        'D3/S1'
    ),
    (
        'Beasiswa Pendidikan Guru',
        750000,
        '2025-07-01',
        '2',
        'Mendukung calon guru berdedikasi untuk pendidikan di daerah terpencil.',
        'WNI, mahasiswa jurusan pendidikan, bersedia ditempatkan di daerah terpencil, IPK min 3.00.',
        'Surat komitmen, wawancara.',
        'Aktif',
        '2025-05-11',
        'S1'
    ),
    (
        'Beasiswa Seni & Budaya',
        1300000,
        '2025-08-01',
        '2',
        'Beasiswa untuk mahasiswa yang berprestasi di bidang seni dan budaya.',
        'WNI, mahasiswa jurusan seni/budaya, portofolio karya, IPK min 3.00.',
        'Audisi/pameran karya, wawancara.',
        'Aktif',
        '2025-05-14',
        'S1'
    ),
    (
        'Beasiswa Kewirausahaan Muda',
        800000,
        '2025-08-15',
        '1.5',
        'Dukungan bagi mahasiswa dengan ide bisnis inovatif dan potensi kewirausahaan.',
        'WNI, mahasiswa S1/D3, proposal bisnis, IPK min 2.80.',
        'Presentasi ide bisnis, wawancara.',
        'Aktif',
        '2025-05-17',
        'D3/S1'
    ),
    (
        'Beasiswa Lingkungan Berkelanjutan',
        1400000,
        '2025-09-01',
        '3',
        'Beasiswa untuk mahasiswa yang berdedikasi pada isu lingkungan dan pembangunan berkelanjutan.',
        'WNI, mahasiswa S1/S2 jurusan relevan, terlibat dalam kegiatan lingkungan, IPK min 3.30.',
        'Esai tentang isu lingkungan, wawancara.',
        'Aktif',
        '2025-05-19',
        'S1/S2'
    ),
    (
        'Beasiswa Olahraga Berprestasi',
        900000,
        '2025-09-10',
        '2',
        'Dukungan bagi atlet mahasiswa yang mengharumkan nama bangsa di kancah olahraga.',
        'WNI, mahasiswa aktif, memiliki prestasi olahraga tingkat nasional/internasional, IPK min 2.75.',
        'Sertifikat prestasi, surat rekomendasi pelatih.',
        'Aktif',
        '2025-05-21',
        'S1'
    ),
    (
        'Beasiswa Internasional Sigma',
        2000000,
        '2025-10-01',
        '4',
        'Beasiswa untuk studi di luar negeri bagi mahasiswa berprestasi.',
        'WNI, IPK min 3.70, kemampuan bahasa Inggris (TOEFL/IELTS), surat penerimaan universitas luar negeri.',
        'Esai, wawancara, tes potensi akademik.',
        'Aktif',
        '2025-05-24',
        'S1/S2'
    ),
    (
        'Beasiswa Djarum Super',
        500000,
        '2025-05-31',
        '4',
        'Beasiswa Djarum Super Gelombang 1 hadir untuk membantu meringankan biaya pendidikanmu.',
        'Warga Negara Indonesia (WNI), terdaftar sebagai mahasiswa aktif di [Nama Universitas/Institusi] untuk jenjang [Sebut jenjang, misal: S1, S2] pada akademik [Tahun Akademik], memiliki Indeks Prestasi Kumulatif (IPK) minimal [Sebut IPK Minimal, misal: 3.00] dari skala 4.00, tidak sedang menerima beasiswa lain dari sumber lain.',
        'Surat rekomendasi dari [Sebut Pemberi Rekomendasi, misal: Dosen Pembimbing Akademik], esai dengan tema [Sebut Tema Esai], surat pernyataan tidak mampu (jika beasiswa diperuntukkan bagi mahasiswa kurang mampu), sertifikat prestasi akademik atau non-akademik (jika ada).',
        'Aktif',
        '2025-05-19',
        'S1'
    ),
    (
        'Beasiswa Teknologi Digital Nusantara',
        1250000,
        '2025-08-25',
        '2.5',
        'Diberikan kepada mahasiswa yang berfokus pada inovasi teknologi digital dan solusi berbasis TI.',
        'WNI, mahasiswa S1 jurusan TI/Ilmu Komputer/Sistem Informasi, IPK min 3.20.',
        'Proposal proyek teknologi, wawancara, bukti keterlibatan di komunitas IT.',
        'Aktif',
        '2025-05-28',
        'S1'
    ),
    (
        'Beasiswa Seni dan Budaya Indonesia',
        700000,
        '2025-09-12',
        '1',
        'Dukungan finansial untuk mahasiswa berprestasi di bidang seni pertunjukan dan budaya lokal.',
        'WNI, mahasiswa D3/S1 jurusan seni, memiliki portofolio karya seni, IPK min 2.75.',
        'Portofolio, esai, wawancara.',
        'Aktif',
        '2025-05-29',
        'D3/S1'
    ),
    (
        'Beasiswa Riset dan Inovasi Sains',
        1500000,
        '2025-10-05',
        '3',
        'Diberikan untuk mendukung mahasiswa dalam penelitian ilmiah inovatif dan aplikatif.',
        'WNI, mahasiswa S1/S2 jurusan sains/teknik, memiliki proposal riset, IPK min 3.40.',
        'Proposal riset, review oleh dosen pembimbing, wawancara.',
        'Aktif',
        '2025-05-30',
        'S1/S2'
    ),
    (
        'Beasiswa Pendidikan Karakter',
        600000,
        '2025-09-20',
        '2',
        'Beasiswa bagi mahasiswa yang aktif membina dan mengembangkan karakter di lingkungan kampus.',
        'WNI, mahasiswa aktif semua jurusan, IPK min 3.00, terlibat dalam kegiatan mentoring atau pembinaan.',
        'Esai personal, surat rekomendasi organisasi kampus, wawancara.',
        'Aktif',
        '2025-05-30',
        'D3/S1/S2'
    ),
    (
        'Beasiswa Startup Mahasiswa',
        1800000,
        '2025-11-15',
        '4',
        'Diberikan kepada mahasiswa yang sedang membangun startup berbasis teknologi atau sosial.',
        'WNI, mahasiswa D3/S1/S2, memiliki MVP atau rencana bisnis, IPK min 3.10.',
        'Pitch deck, presentasi startup, wawancara dengan juri.',
        'Aktif',
        '2025-05-31',
        'D3/S1/S2'
    ),
    (
        'Beasiswa Prestasi Akademik Unggulan',
        1000000,
        '2025-08-05',
        '2',
        'Beasiswa untuk mahasiswa dengan prestasi akademik luar biasa di perguruan tinggi.',
        'WNI, mahasiswa aktif S1 dengan IPK ≥ 3.75, tidak sedang menerima beasiswa lain.',
        'Transkrip nilai, surat rekomendasi akademik, wawancara.',
        'Aktif',
        '2025-06-01',
        'S1'
    ),
    (
        'Beasiswa Inklusi dan Akses Pendidikan',
        850000,
        '2025-09-10',
        '1.5',
        'Mendukung mahasiswa dari kelompok kurang mampu agar tetap dapat mengakses pendidikan tinggi.',
        'WNI, mahasiswa D3/S1 dari keluarga prasejahtera, IPK min 2.80.',
        'Surat keterangan tidak mampu, esai motivasi, wawancara.',
        'Aktif',
        '2025-06-01',
        'D3/S1'
    ),
    (
        'Beasiswa Perempuan Berdaya',
        1200000,
        '2025-08-20',
        '2.5',
        'Diperuntukkan bagi mahasiswa perempuan yang aktif dalam kegiatan pemberdayaan masyarakat.',
        'WNI, perempuan, mahasiswa S1/S2, IPK min 3.00, aktif dalam kegiatan sosial.',
        'Esai pengalaman pemberdayaan, wawancara, surat rekomendasi.',
        'Aktif',
        '2025-06-01',
        'S1/S2'
    ),
    (
        'Beasiswa Kesehatan Masyarakat',
        1100000,
        '2025-10-01',
        '3',
        'Dukungan bagi mahasiswa jurusan kesehatan yang berkontribusi dalam promosi kesehatan.',
        'WNI, mahasiswa S1 jurusan kesehatan masyarakat atau keperawatan, IPK min 3.20.',
        'Proposal kegiatan kesehatan, sertifikat kegiatan, wawancara.',
        'Aktif',
        '2025-06-01',
        'S1'
    ),
    (
        'Beasiswa Teknologi Hijau dan Energi Terbarukan',
        1600000,
        '2025-11-05',
        '4',
        'Untuk mahasiswa yang terlibat dalam penelitian atau proyek energi terbarukan.',
        'WNI, mahasiswa S1/S2 teknik lingkungan/energi, IPK ≥ 3.30, proyek terkait energi hijau.',
        'Proposal proyek, wawancara, portofolio teknis.',
        'Aktif',
        '2025-06-01',
        'S1/S2'
    );

INSERT INTO
    registrant_data (
        full_name,
        domicile,
        birth_date,
        email,
        phone,
        campus_origin,
        major,
        degree,
        scholarship_id,
        letter_of_recomendation,
        supporting_file,
        interest,
        semester,
        status,
        created_at
    )
VALUES
    (
        'Budi Santoso',
        'Jakarta',
        '2003-01-15',
        'budi.s@gmail.com',
        '081234567890',
        'Universitas Maju',
        'Teknik Informatika',
        'S1',
        1,
        'surat_rekom_budi.pdf',
        'portofolio_budi.zip',
        'Sangat tertarik pada AI dan ingin berkontribusi pada pengembangan teknologi.',
        6,
        'pending',
        '2025-04-21'
    ),
    (
        'Siti Aminah',
        'Bandung',
        '2002-03-22',
        'siti.a@gmail.com',
        '081312345678',
        'Institut Teknologi Jaya',
        'Desain Komunikasi Visual',
        'S1',
        5,
        'surat_rekom_siti.pdf',
        'karya_siti.zip',
        'Mencintai seni dan ingin mengembangkan karya yang berdampak sosial.',
        7,
        'pending',
        '2025-04-22 09'
    ),
    (
        'Joko Susilo',
        'Surabaya',
        '2004-07-01',
        'joko.s@gmail.com',
        '085787654321',
        'Politeknik Negeri Sejahtera',
        'Teknik Elektronika',
        'D3',
        3,
        'surat_rekom_joko.pdf',
        'sertifikat_joko.pdf',
        'Bersemangat dalam dunia robotika dan otomasi industri.',
        4,
        'pending',
        '2025-04-22'
    ),
    (
        'Dewi Lestari',
        'Yogyakarta',
        '2003-11-05',
        'dewi.l@gmail.com',
        '081998765432',
        'Universitas Gadjah Mada',
        'Ilmu Komunikasi',
        'S1',
        1,
        'surat_rekom_dewi.pdf',
        NULL,
        'Ingin menjadi jurnalis investigasi yang handal dan berintegritas.',
        5,
        'pending',
        '2025-03-23'
    ),
    (
        'Ahmad Fauzi',
        'Medan',
        '2001-09-10',
        'ahmad.f@gmail.com',
        '082112345678',
        'Universitas Sumatera Raya',
        'Agroteknologi',
        'S1',
        7,
        'surat_rekom_ahmad.pdf',
        'proyek_lingkungan_ahmad.pdf',
        'Peduli terhadap keberlanjutan pangan dan lingkungan.',
        8,
        'pending',
        '2025-03-23'
    ),
    (
        'Putri Indah',
        'Makassar',
        '2004-02-28',
        'putri.i@gmail.com',
        '081122334455',
        'Universitas Hasanuddin',
        'Kedokteran',
        'S1',
        1,
        'surat_rekom_putri.pdf',
        NULL,
        'Bercita-cita menjadi dokter spesialis anak dan mengabdi di daerah terpencil.',
        2,
        'pending',
        '2025-02-24'
    ),
    (
        'Rizky Pratama',
        'Palembang',
        '2002-06-17',
        'rizky.p@gmail.com',
        '087899887766',
        'Universitas Sriwijaya',
        'Manajemen',
        'S1',
        6,
        'surat_rekom_rizky.pdf',
        'proposal_bisnis_rizky.pdf',
        'Tertarik membangun startup di bidang edutech.',
        6,
        'pending',
        '2025-02-24'
    ),
    (
        'Cahaya Mentari',
        'Denpasar',
        '2003-04-03',
        'cahaya.m@gmail.com',
        '081287654321',
        'Universitas Udayana',
        'Pariwisata',
        'S1',
        5,
        'surat_rekom_cahaya.pdf',
        'portofolio_cahaya.zip',
        'Ingin mempromosikan pariwisata berkelanjutan di Indonesia.',
        5,
        'pending',
        '2025-05-24'
    ),
    (
        'Fajar Nugraha',
        'Semarang',
        '2001-10-20',
        'fajar.n@gmail.com',
        '085234567890',
        'Universitas Diponegoro',
        'Hukum',
        'S1',
        1,
        'surat_rekom_fajar.pdf',
        NULL,
        'Berkeinginan menjadi advokat yang membela hak-hak masyarakat.',
        8,
        'pending',
        '2025-05-25'
    ),
    (
        'Kartika Sari',
        'Bogor',
        '2003-08-12',
        'kartika.s@gmail.com',
        '081765432109',
        'Universitas Pakuan',
        'Pendidikan Bahasa Inggris',
        'S1',
        4,
        'surat_rekom_kartika.pdf',
        'sertifikat_mengajar_kartika.pdf',
        'Bermimpi menjadi guru bahasa Inggris yang inspiratif.',
        7,
        'pending',
        '2025-05-25'
    );