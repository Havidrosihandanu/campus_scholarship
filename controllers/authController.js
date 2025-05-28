const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.login = (req, res) => {
  res.render("auth/login", {
    title: "Login",
    layout: "./layouts/auth",
    scripts: "",
    stylesheets: "",
    messages: req.flash(),
  });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      req.flash("error", "Internal Server Error");
      return res.redirect("/auth/login");
    }

    if (results.length === 0) {
      req.flash("error", "Email atau kata sandi tidak valid");
      return res.redirect("/auth/login");
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      req.flash("error", "Email atau kata sandi tidak cocok");
      return res.redirect("/auth/login");
    }

    req.session.userId = user.id;
    res.redirect("/dashboard");
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("Internal Server Error");
    }
    console.log("User logged out successfully");
    res.redirect("/auth/login");
  });
};
