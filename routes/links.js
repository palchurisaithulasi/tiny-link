const express = require("express");
const router = express.Router();

const { createShortLink, listLinks } = require("../db/index");

// Create short link
router.post("/", (req, res) => {
  const { url, code } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, error: "URL is required" });
  }

  const result = createShortLink(url, code);

  if (result.error === "CodeExists") {
    return res.status(409).json({ success: false, error: "Custom code already exists" });
  }

  if (result.error) {
    return res.status(400).json({ success: false, error: result.error });
  }

  return res.json({
    success: true,
    shortUrl: result.shortUrl,
    code: result.code
  });
});

// List all links
router.get("/", (req, res) => {
  const all = listLinks();
  res.json({ success: true, links: all });
});

// Delete a link
router.delete("/:code", (req, res) => {
  const code = req.params.code;

  const { links } = require("../db/index");
  if (!links[code]) {
    return res.status(404).json({ success: false, error: "Code not found" });
  }

  delete links[code];
  res.json({ success: true, message: "Short link deleted" });
});

module.exports = router;