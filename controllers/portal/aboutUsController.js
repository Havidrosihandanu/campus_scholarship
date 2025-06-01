exports.aboutUs = (req, res) => {
    res.render("portal/aboutUs", {
        title: "Tentang Kami",
        layout: "./layouts/portal",
        scripts: "",
        stylesheets: "",
    });
};