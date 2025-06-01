const db = require("../../config/db");
const multer = require("multer");
const path = require("path");

// Konfigurasi Multer untuk upload file
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });

exports.scholarship = (req, res) => {
    const { search, degree, page = 1 } = req.query;

    const currentPageNumber = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (currentPageNumber - 1) * limit;

    let sql = "FROM scholarship WHERE 1 = 1";
    const params = [];

    // Filter search
    if (search) {
        sql += " AND name LIKE ?";
        params.push(`%${search}%`);
    }

    // Filter degree
    if (degree) {
        sql += " AND degree_requirement = ?";
        params.push(degree);
    }

    const countSql = `SELECT COUNT(*) AS total ${sql}`;
    const dataSql = `SELECT * ${sql} LIMIT ? OFFSET ?`;

    db.query(countSql, params, (err, countResult) => {
        if (err) {
            console.error("Gagal menghitung data:", err);
            return res.status(500).send("Gagal mengambil data beasiswa.");
        }

        const totalItems = countResult[0].total;
        const totalPages = Math.ceil(totalItems / limit);

        db.query(dataSql, [...params, limit, offset], (err, scholarships) => {
            if (err) {
                console.error("Gagal mengambil data beasiswa:", err);
                return res.status(500).send("Gagal mengambil data beasiswa.");
            }

            // Ambil pengumuman juga
            db.query("SELECT * FROM announcement ORDER BY created_at DESC", (err, announcement) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Gagal mengambil pengumuman.");
                }

                const startNumber = offset + 1;

                res.render("portal/scholarship", {
                    scholarships,
                    announcements: announcement,
                    title: "Halaman Beasiswa",
                    currentPage: "ScholarshipPage",
                    layout: "./layouts/portal",
                    scripts: "",
                    stylesheets: "",
                    degree,
                    search,
                    currentPageNumber,
                    totalPages,
                    startNumber
                });
            });
        });
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

            res.render("layouts/components/portal/scholarshipDetail", {
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
    res.render("layouts/components/portal/scholarshipForm", {
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


