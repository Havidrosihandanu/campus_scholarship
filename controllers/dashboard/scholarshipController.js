const db = require("../../config/db");

exports.scholarship = (req, res) => {
  db.query("SELECT * FROM scholarship", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gagal mengambil data beasiswa.");
    } else {
      res.render("dashboard/scholarship", {
        layout: "./layouts/dashboard",
        scholarships: result,
        title: "Beasiswa",
        currentPage: "scholarship",
        scripts: "",
        stylesheets: "",
      });
    }
  });
};

exports.createScholarship = (req, res) => {
  const {
    name,
    type,
    nominal,
    deadline,
    duration,
    description,
    general_requirement,
    special_requirement,
    degree_requirement,
    status,
  } = req.body;

  // Debug
  // console.log("📦 req.body:", req.body);

  const query = `
    INSERT INTO scholarship 
      (name, type, nominal, deadline, duration, description, general_requirement, special_requirement, degree_requirement, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    type,
    parseInt(nominal),
    deadline,
    duration,
    description,
    general_requirement,
    special_requirement,
    degree_requirement,
    status,
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("❌ Error SQL:", err);
      return res.status(500).json({ success: false, message: "Gagal tambah data" });
    }

    res.redirect("/dashboard/scholarship");
  });
};


exports.scholarshipByDegree = (req, res) => {
  const degree = req.params.degree;
  db.query(
      "SELECT * FROM scholarship WHERE degree_requirement LIKE ?",
      [`%${degree}%`],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Gagal mengambil data beasiswa berdasarkan jenjang.");
        }

        res.render("dashboard/scholarship", {
          layout: "./layouts/dashboard",
          scholarships: result,
          title: `Beasiswa ${degree}`,
          currentPage: "scholarship",
          scripts: "",
          stylesheets: "",
        });
      }
  );
};



exports.updateScholarship = (req, res) => {
  const id = req.params.id || req.body.id;

  const {
    name,
    type,
    nominal,
    deadline,
    duration,
    description,
    general_requirement,
    special_requirement,
    degree_requirement,
    status,
  } = req.body;

  // Debug
  // console.log("📦 req.body:", req.body);


  const query = `
    UPDATE scholarship SET
      name = ?,
      type = ?,
      nominal = ?,
      deadline = ?,
      duration = ?,
      description = ?,
      general_requirement = ?,
      special_requirement = ?,
      degree_requirement = ?,
      status = ?
    WHERE id = ?
  `;

  const values = [
    name,
    type,
    parseInt(nominal),
    deadline,
    duration,
    description,
    general_requirement,
    special_requirement,
    degree_requirement,
    status,
    id,
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("❌ Error SQL:", err);
      return res.status(500).json({ success: false, message: "Gagal update data" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Data tidak ditemukan" });
    }

    res.redirect("/dashboard/scholarship");
  });
};



exports.deleteScholarship = (req, res) => {
  const { id } = req.body;

  const query = `
    DELETE FROM scholarship 
    WHERE id = ?
  `;

  db.query(query, [id], (err) => {
    if (err) {
      console.error(err);
      return res
          .status(500)
          .json({ success: false, message: "Gagal menghapus beasiswa" });
    }
    res.redirect("/dashboard/scholarship");
  });
};

