const db = require("../../config/db");

exports.announcement = (req, res) => {
    db.query("SELECT * FROM announcement ORDER BY created_at DESC", (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Gagal mengambil data pengumuman.");
        }

        res.render("portal/announcement", {
            title: "Pengumuman",
            currentPage: "announcement",
            layout: "./layouts/portal",
            announcements: results,
        });
    });
};

exports.announcementDetail = (req, res) => {
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

            res.render("layouts/components/portal/announcement", {
                title: "Pengumuman",
                currentPage: "announcement",
                layout: "./layouts/portal",
                announcement: announcementData,
            });
        }
    );
};