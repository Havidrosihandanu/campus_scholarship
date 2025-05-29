require('dotenv').config();
const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const { Pool } = require("pg");
const flash = require("connect-flash");

// Routes
const portalRoutes = require("./routes/portalRoute");
const dashboardRoutes = require("./routes/dashboardRoute");
const authRoutes = require("./routes/authRoute");
const authController = require("./controllers/authController");

// Middlewares
const { isAuthenticated, isNotAuthenticated } = require("./middlewares/authMiddleware");

const app = express();

// =============================================
// KONEKSI DATABASE
// =============================================
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { 
    rejectUnauthorized: false // Wajib untuk Supabase
  },
  max: 20, // Batas koneksi pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

// Test koneksi database saat startup
pool.query('SELECT NOW()')
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err));

// =============================================
// KONFIGURASI SESSION
// =============================================
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "user_sessions",
      schemaName: "public",
      createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET || "campus_scholarship",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 hari
      httpOnly: true,
      sameSite: 'lax'
    }
  })
);

app.use(flash());

// =============================================
// MIDDLEWARE LAINNYA
// =============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Fontawesome icon
app.use(express.static(path.join(__dirname, "node_modules/@fortawesome/fontawesome-free")));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);

// =============================================
// ROUTES
// =============================================
app.get("/", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT NOW() AS time");
    res.json({ 
      status: 'OK',
      time: rows[0].time,
      session: req.sessionID 
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.use("/dashboard", isAuthenticated, dashboardRoutes);
app.use("/portal", portalRoutes);
app.use("/auth", isNotAuthenticated, authRoutes);
app.use("/logout", isAuthenticated, authController.logout);

// =============================================
// ERROR HANDLER
// =============================================
app.use((err, req, res, next) => {
  console.error("Global error:", err.stack);
  res.status(500).render("error", { 
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// =============================================
// SERVER LISTENER
// =============================================
const PORT = process.env.PORT || 3000;
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully');
  server.close(() => {
    pool.end();
    console.log('Server closed. Database pool ended');
    process.exit(0);
  });
});

module.exports = app;