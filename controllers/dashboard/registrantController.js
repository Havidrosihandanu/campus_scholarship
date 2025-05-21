const db = require("../../config/db");

exports.registrant = (req, res) => {
  db.query("SELECT * FROM registrant_data", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gagal mengambil data pendaftar.");
    } else {
      res.render("dashboard/registrant", {
        registrants: result,
        title: "Pendaftar",
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
  const {
    id,
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

  // Validasi input
  if (!id || !full_name || !email) {
    return res
      .status(400)
      .json({ success: false, message: "Data tidak lengkap" });
  }

  const query = `
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
    WHERE id = ?
  `;

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
    id,
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      console.log(err);
      return res
        .status(500)
        .json({ success: false, message: "Gagal update data" });
    }

    // Cek apakah ada perubahan
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
