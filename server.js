const express = require("express");
const path = require("path");
const app = express();

// Use Render's dynamic port OR fallback to 3000 locally
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// API ROUTES
const linkRoutes = require("./routes/links");
app.use("/api/links", linkRoutes);

// REDIRECT ROUTES
const redirectRoutes = require("./routes/redirect");
app.use("/", redirectRoutes);

// HEALTH CHECK
app.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});