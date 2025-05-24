const db = require("../../config/db");

exports.index = (req, res) => {
  res.render("dashboard/index", {
    layout : 'layouts/dashboard',
    title: "Dashboard",
    currentPage: "dashboard",
    scripts: "",
    stylesheets: "",
  });
};
