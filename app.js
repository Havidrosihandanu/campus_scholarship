const express = require("express");
const methodOverride = require("method-override");
const portalRoutes = require("./routes/portalRoute");
const dashboardRoutes = require("./routes/dashboardRoute");
const authRoutes = require("./routes/authRoute");
const path = require("path");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const multer = require("multer");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));

// Fontawesome icon
app.use(express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')));

// View engine
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

const session = require("express-session");

// Middleware for session management
app.use(session({
    secret: "campus_scholarship",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

// Routes
app.use("/dashboard", dashboardRoutes);
app.use("/portal", portalRoutes);
app.use("/auth", authRoutes);

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error("Global error:", err.stack);
//   res.status(500).render("error", { message: "Something went wrong!" });
// });

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
