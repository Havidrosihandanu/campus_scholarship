const db = require("../config/db");
const bcrypt = require("bcrypt"); 

exports.login = (req, res) => {
    res.render("auth/login", {
        title: "Login",
        layout: "./layouts/auth",
        scripts: "",
        stylesheets: "",
    });
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body; 

    
    const query = "SELECT * FROM users WHERE email = ?";
    
    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).send("Internal Server Error");
        }

        if (results.length === 0) {
            return res.status(401).send("Invalid username or password");
        }

        const user = results[0];

        
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(401).send("Invalid username or password");
        }

        
        req.session.userId = user.id; 
        res.redirect("/dashboard"); 
    });
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return console.error("Logout error:", err);
        }
        res.redirect("/auth/login"); 
    });
};