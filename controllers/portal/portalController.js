exports.index = (req, res) => {
  res.render("portal/index", {
    title: "Beranda",
    currentPage: "index",
    layout: "./layouts/portal",
    scripts: "",
    stylesheets: "",
  });
};