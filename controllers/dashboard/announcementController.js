const db = require("../../config/db");
const path = require("path");
const fs = require("fs");

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
      });
    }
  });
};

exports.createAnnouncement = (req, res) => {
  const { title, description, content } = req.body;
  const file = req.file;

  if (!title || !description) {
    return res.status(400).send("Judul dan deskripsi wajib diisi.");
  }

  let fileName = null;
  const uploadDir = path.join(__dirname, "../../public/uploads");

  // Buat folder uploads jika belum ada
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  if (file) {
    fileName = Date.now() + "-" + file.originalname;
    fs.writeFileSync(path.join(uploadDir, fileName), file.buffer);
  }

  const query = `
    INSERT INTO announcement (title, description, content, file, created_at)
    VALUES (?, ?, ?, ?, NOW())
  `;

  const values = [title, description, content || "", fileName];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Gagal menyimpan pengumuman:", err);
      return res.status(500).send("Gagal menyimpan pengumuman.");
    }

    res.redirect("/dashboard/announcement");
  });
};

exports.updateAnnouncement = (req, res) => {
  const id = req.params.id || req.body.id;
  const { title, description, content } = req.body;
  const file = req.file;

  if (!id || !title || !description) {
    return res.status(400).send("Data tidak lengkap");
  }

  let fileName = null;
  const uploadDir = path.join(__dirname, "../../public/uploads");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  if (file) {
    fileName = Date.now() + "-" + file.originalname;
    fs.writeFileSync(path.join(uploadDir, fileName), file.buffer);
  }

  let query = `
    UPDATE announcement 
    SET title = ?, description = ?, content = ?
    ${fileName ? ", file = ?" : ""}
    WHERE id = ?
  `;

  const values = [title, description, content];
  if (fileName) values.push(fileName);
  values.push(id);

  db.query(query, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Gagal mengupdate data pengumuman.");
    }

    res.redirect("/dashboard/announcement");
  });
};

exports.deleteAnnouncement = (req, res) => {
  const { id } = req.body;

  const query = "DELETE FROM announcement WHERE id = ?";
  db.query(query, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Gagal menghapus pengumuman.");
    }

    res.redirect("/dashboard/announcement");
  });
};
