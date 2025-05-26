const db = require("../../config/db");

exports.index = (req, res) => {
  const queries = [
    {
      sql: "SELECT COUNT(*) AS total_scholarship FROM scholarship",
      key: "totalScholarship",
    },
    {
      sql: "SELECT COUNT(*) AS total_registrant FROM registrant_data",
      key: "totalRegistrant",
    },
    {
      sql: "SELECT COUNT(*) AS total_scholarship_active FROM scholarship WHERE status = 'Aktif'",
      key: "totalScholarshipActive",
    },
    {
      sql: `
        SELECT MONTH(created_at) AS month, COUNT(*) AS total_registrants 
        FROM registrant_data 
        WHERE YEAR(created_at) = YEAR(CURDATE()) 
        GROUP BY MONTH(created_at)
      `,
      key: "monthlyRegistrants",
    },
  ];

  let results = {};
  let completedQueries = 0;

  queries.forEach(({ sql, key }) => {
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Gagal mengambil data.");
      }

      console.log("SQL Query:", sql);
      console.log("Result:", result);

      if (result.length > 0) {
        if (key === "monthlyRegistrants") {
          results[key] = new Array(12).fill(0);
          result.forEach((row) => {
            results[key][row.month - 1] = row.total_registrants;
          });
        } else {
          const propName = Object.keys(result[0])[0];
          results[key] = result[0][propName];
        }
      } else {
        results[key] = 0;
      }

      completedQueries++;

      if (completedQueries === queries.length) {
        res.render("dashboard/index", {
          totalScholarship: results.totalScholarship,
          totalRegistrant: results.totalRegistrant,
          totalScholarshipActive: results.totalScholarshipActive,
          monthlyRegistrants: results.monthlyRegistrants,
          layout: "layouts/dashboard",
          title: "Dashboard",
          currentPage: "dashboard",
        });
      }
    });
  });
};
