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

exports.updateScholarship = (req, res) => {};

exports.deleteScholarship = (req, res) => {};
