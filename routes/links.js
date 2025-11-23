const express = require("express");
const router = express.Router();

const { createShortLink, links } = require("../db/index");

// CREATE SHORT LINK
router.post("/", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const code = createShortLink(url);

  res.json({
    success: true,
    code: code,
    shortUrl: `http://localhost:3000/${code}`,
  });
});

// DEBUG: SHOW ALL LINKS
router.get("/debug/all", (req, res) => {
  res.json({ links });
});

// GET STATS FOR A CODE
router.get("/stats/:code", (req, res) => {
  const code = req.params.code;

  if (!links[code]) {
    return res.status(404).json({ error: "Code not found" });
  }

  res.json({
    success: true,
    code: code,
    url: links[code].url,
    clicks: links[code].clicks,
    lastClicked: links[code].lastClicked
  });
});

// DELETE A SHORT LINK
router.delete("/delete/:code", (req, res) => {
  const code = req.params.code;

  if (!links[code]) {
    return res.status(404).json({ error: "Code not found" });
  }

  delete links[code];

  res.json({
    success: true,
    message: "Short link deleted"
  });
});

module.exports = router;