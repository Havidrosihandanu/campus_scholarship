# campus_scholarship

## Cara clone dan running
clone : git clone https://github.com/Havidrosihandanu/campus_scholarship.git <br>
install packae : npm i <br>
running : node app.js <br>
create db : campus_scholarship <br>
running qpache dan mysql <br>
url : http://localhost:3000/dashboard <br>

## Panduan Struktur Folder 
├── config/ Konfigurasi global; database, environment, API keys <br>
├── controllers/ Logika penanganan permintaan; proses data, respon ke klien <br>
├─────authController/ logika untuk login <br>
├─────dashboardController/ logika untuk sisi admin <br>
├─────portalController/ logika untuk sisi user pendaftar   <br>
├── middlewares/ Middleware Express.js; autentikasi, logging, validasi <br>
├── models/ Skema data; struktur basis data (contoh: Mongoose schemas) <br>
├── routes/ Definisi rute; mapping URL ke controller <br>
├─────authRoute/ route untuk login <br>
├─────dashboardRoute/ route untuk dashboard <br>
├─────portalRoute/ route untuk portal <br>
├── views/ Template tampilan; halaman yang dirender (EJS, Handlebars, dll) <br>
├─────auth/ untuk halaman login <br>
├─────dashboard untuk membuat halaman pada sisi admin <br>
├─────portal untuk membuat halaman sisi user pendaftar <br>
├─────layouts untuk template sisi admin dan user pendaftar <br>
├── public/ File statis; CSS, JS, gambar untuk akses langsung <br>
├── app.js File utama; setup server, middleware, koneksi database <br>
├── package.json Metadata proyek; dependensi dan script npm <br>
└── server.js (Opsional) Entry point; jalankan server (misal: app.listen) <br>

## cara membuat halaman baru supaya readable
EX: membuat halaman settings <br>
1. buat halaman di views <br>
2. buat url baru pada route  <br>
3. buat fungsi pada controller dan render view di controller <br>


