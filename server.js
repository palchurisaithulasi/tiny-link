const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// HEALTH CHECK — ALWAYS FIRST
app.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});

// Serve static files (dashboard)
app.use(express.static(path.join(__dirname, "public")));

// API routes
const linkRoutes = require("./routes/links");
app.use("/api/links", linkRoutes);

// STATS ROUTE
const statsRoutes = require("./routes/stats");
app.use("/stats", statsRoutes);

// REDIRECT ROUTE — MUST BE LAST
const redirectRoutes = require("./routes/redirect");
app.use("/", redirectRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});