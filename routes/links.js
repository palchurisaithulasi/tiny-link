const express = require("express");
const router = express.Router();

const { createShortLink, links, getLink } = require("../db/index");

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
    shortUrl: `${process.env.RENDER_EXTERNAL_URL || "http://localhost:3000"}/${code}`,
  });
});

// DEBUG: SHOW ALL LINKS
router.get("/debug/all", (req, res) => {
  res.json({ links });
});

// GET STATS FOR A SHORT CODE
router.get("/stats/:code", (req, res) => {
  const code = req.params.code;
  const link = getLink(code);

  if (!link) {
    return res.status(404).json({ error: "Code not found" });
  }

  res.json({
    success: true,
    code: code,
    url: link.url,
    clicks: link.clicks,
    lastClicked: link.lastClicked
  });
});

// DELETE A SHORT LINK
router.delete("/:code", (req, res) => {
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