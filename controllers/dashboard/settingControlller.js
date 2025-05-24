const db = require("../../config/db");

exports.setting = (req, res) => {
  db.query("SELECT * FROM setting", (err, result) => {
    if (err) {
      console.log(err);
      res.render("dashboard/setting", {
        layout: "./layouts/dashboard",
        settings: result,
        title: "Pengaturan",
        currentPage: "setting",
        scripts: "",
        stylesheets: "",
      });
    } else {
      res.render("dashboard/setting", {
        layout: "./layouts/dashboard",
        settings: result,
        title: "Pengaturan",
        currentPage: "setting",
        scripts: "",
        stylesheets: "",
      });
    }
  });
};

exports.updateSetting = (req, res) => {};
