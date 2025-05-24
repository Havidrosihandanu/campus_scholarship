const db = require("../../config/db");

exports.announcement = (req, res) => {
  db.query("SELECT * FROM announcement", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gagal mengambil data berita.");
    } else {
      res.render("dashboard/announcement", {
        layout: "./layouts/dashboard",
        announcements: result,
        title: "Pengumuman",
        currentPage: "announcement",
        scripts: "",
        stylesheets: "",
      });
    }
  });
};

exports.updateAnnouncement = (req, res) => {};

exports.deleteAnnouncement = (req, res) => {};
