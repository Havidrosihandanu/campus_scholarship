const express = require("express");
const methodOverride = require("method-override");
const portalRoutes = require("./routes/portalRoute");
const dashboardRoutes = require("./routes/dashboardRoute");
const authRoutes = require("./routes/authRoute");
const path = require("path");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const { isAuthenticated, isNotAuthenticated } = require("./middlewares/authMiddleware");
const authController = require("./controllers/authController");
const flash = require("connect-flash");
app.use(flash());
require('dotenv').config();
const { Pool } = require('pg');

app.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW() AS time');
    res.json({ time: rows[0].time });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: err.message });
  }
});

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false } // Supabase butuh SSL
});

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

// Middleware for session management
app.use(session({
    secret: "campus_scholarship",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

// Routes
app.use("/dashboard", isAuthenticated, dashboardRoutes);
app.use("/portal", portalRoutes);
app.use("/auth", isNotAuthenticated, authRoutes);
app.use("/logout", isAuthenticated, authController.logout);

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error("Global error:", err.stack);
//   res.status(500).render("error", { message: "Something went wrong!" });
// });

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
