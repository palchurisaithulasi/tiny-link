const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// API ROUTES
const linkRoutes = require("./routes/links");
app.use("/api/links", linkRoutes);

// STATS PAGE ROUTE
app.get("/code/:code", (req, res) => {
  res.sendFile(__dirname + "/public/stats.html");
});
// REDIRECT ROUTES
const redirectRoutes = require("./routes/redirect");
app.use("/", redirectRoutes);

// HEALTH CHECK
app.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});