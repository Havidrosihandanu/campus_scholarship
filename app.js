const express = require("express");
const methodOverride = require("method-override");
const portalRoutes = require("./routes/portalRoute");
const dashboardRoutes = require("./routes/dashboardRoute");
const path = require("path");
const app = express();
const db = require("./config/db");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use("/dashboard", dashboardRoutes);
app.use("/portal", portalRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error:", err.stack);
  res.status(500).render("error", { message: "Something went wrong!" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
