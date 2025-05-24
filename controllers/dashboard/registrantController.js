const db = require("../../config/db");
const path = require("path");
const fs = require("fs");

exports.registrant = (req, res) => {
  db.query("SELECT * FROM registrant_data", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gagal mengambil data pendaftar.");
    } else {
      res.render("dashboard/registrant", {
        registrants: result,
        title: "Pendaftar",
        layout: "./layouts/dashboard",
        currentPage: "registrant",
        scripts: "",
        stylesheets: "",
        updateId: null,
        deleteId: null,
      });
    }
  });
};

exports.updateRegistrant = (req, res) => {
  // console.log("BODY:", req.body);
  // console.log("FILES:", req.files);
  const id = req.params.id || req.body.id;

  const {
    full_name,
    domicile,
    birth_date,
    email,
    phone,
    campus_origin,
    major,
    degree,
    semester,
    status,
  } = req.body;

  // Ambil file dari req.files
  const letterFile = req.files?.letter_of_recomendation?.[0] || null;
  const supportFile = req.files?.supporting_file?.[0] || null;

  // console.log("📁 File rekomendasi:", letterFile);
  // console.log("📁 File pendukung:", supportFile);

  // Validasi input
  if (!id || !full_name || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Data tidak lengkap" });
  }

  // Simpan file jika ada
  let letterFileName = null;
  let supportFileName = null;

  const uploadDir = path.join(__dirname, "../../public/uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  if (letterFile) {
    letterFileName = Date.now() + "-" + letterFile.originalname;
    fs.writeFileSync(path.join(uploadDir, letterFileName), letterFile.buffer);
  }

  if (supportFile) {
    supportFileName = Date.now() + "-" + supportFile.originalname;
    fs.writeFileSync(path.join(uploadDir, supportFileName), supportFile.buffer);
  }

  // Siapkan query update
  const baseQuery = `
    UPDATE registrant_data 
    SET 
      full_name = ?,
      domicile = ?,
      birth_date = ?,
      email = ?,
      phone = ?,
      campus_origin = ?,
      major = ?,
      degree = ?,
      semester = ?,
      status = ?
      ${letterFileName ? ", letter_of_recomendation = ?" : ""}
      ${supportFileName ? ", supporting_file = ?" : ""}
    WHERE id = ?
  `;

  // Buat values dinamis tergantung file yang diupload
  const values = [
    full_name,
    domicile,
    birth_date,
    email,
    phone,
    campus_origin,
    major,
    degree,
    semester,
    status,
  ];

  if (letterFileName) values.push(letterFileName);
  if (supportFileName) values.push(supportFileName);
  values.push(id); // id harus paling akhir

  db.query(baseQuery, values, (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Gagal update data" });
    }

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Data tidak ditemukan" });
    }

    res.redirect("/dashboard/registrant");
  });
};

exports.deleteRegistrant = (req, res) => {
  const { id } = req.body;

  const query = `
    DELETE FROM registrant_data 
    WHERE id = ?
  `;

  db.query(query, [id], (err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ success: false, message: "Gagal menghapus data" });
    }
    res.redirect("/dashboard/registrant");
  });
};
