const db = require("../config/db");
const multer = require("multer");
const path = require("path");
const { announcement } = require("./dashboard/announcementController");

// Konfigurasi Multer untuk upload file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "/../public/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

exports.portal = (req, res) => {
  db.query("SELECT * FROM scholarship", (err, scholarship) => {
    if (err) {
      console.log(err);
      res.status(500).send("Gagal mengambil data beasiswa.");
    }

    db.query(
      "SELECT * FROM announcement ORDER BY created_at DESC",
      (err, announcement) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Gagal mengambil pengumuman.");
        }

        res.render("portal/index", {
          scholarships: scholarship,
          announcements: announcement,
          title: "Portal",
          currentPage: "index",
          layout: "./layouts/portal",
          scripts: "",
          stylesheets: "",
        });
      }
    );
  });
};

exports.scholarshipDetail = (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM scholarship WHERE id = ?",
    [id],
    (err, scholarshipById) => {
      if (err) {
        console.log(err);
        res.status(500).send("Gagal mengambil data beasiswa.");
      }

      const scholarshipData =
        scholarshipById.length > 0 ? scholarshipById[0] : null;

      res.render("portal/scholarshipDetail", {
        title: "Detail Beasiswa",
        currentPage: "detailScholarship",
        layout: "./layouts/portal",
        scholarship: scholarshipData,
      });
    }
  );
};

exports.scholarshipForm = (req, res) => {
  const id = req.params.id;
  res.render("portal/scholarshipForm", {
    title: "Form Beasiswa",
    currentPage: "scholarshipForm",
    layout: "./layouts/portal",
    scholarshipID: id,
    scripts: "",
    stylesheets: "",
  });
};

exports.submitScholarshipForm = [
  upload.fields([
    { name: "letter_of_recomendation", maxCount: 1 },
    { name: "supporting_file", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        full_name,
        domicile,
        birth_date,
        email,
        scholarship_id,
        phone,
        campus_origin,
        major,
        degree,
        semester,
        interest,
        status,
        created_at,
      } = req.body;

      const letterOfRecommendationFile = req.files["letter_of_recomendation"]
        ? req.files["letter_of_recomendation"][0].filename
        : null;
      const supportingFile = req.files["supporting_file"]
        ? req.files["supporting_file"][0].filename
        : null;

      const registrantData = {
        full_name,
        domicile,
        birth_date,
        email,
        phone,
        campus_origin,
        major,
        degree,
        scholarship_id,
        letter_of_recomendation: letterOfRecommendationFile,
        supporting_file: supportingFile,
        interest,
        semester: semester || null,
        status: status || "pending",
        created_at: created_at || new Date(),
      };

      db.query(
        "INSERT INTO registrant_data SET ?",
        registrantData,
        (err, result) => {
          if (err) {
            console.error("Gagal menyimpan data:", err);
            return res.redirect("/portal?success=false");
          }
          res.redirect("/portal?success=true");
        }
      );
    } catch (error) {
      console.error("Error pendaftaran:", error);
      res.status(500).json({ message: "Terjadi kesalahan saat pendaftaran." });
    }
  },
];

exports.announcement = (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM announcement WHERE id = ?",
    [id],
    (err, announcementById) => {
      if (err) {
        console.log(err);
        res.status(500).send("Gagal mengambil data pengumuman.");
      }

      const announcementData =
        announcementById.length > 0 ? announcementById[0] : null;

      res.render("portal/announcement", {
        title: "Pengumuman",
        currentPage: "announcement",
        layout: "./layouts/portal",
        announcement: announcementData,
      });
    }
  );
};

exports.aboutUs = (req, res) => {
  res.render("portal/aboutUs", {
    title: "Tentang Kami",
    layout: "./layouts/portal",
    scripts: "",
    stylesheets: "",
  });
};
