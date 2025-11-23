
const express = require("express");
const router = express.Router();

const { getLink, recordClick } = require("../db/index");

// SAFE — NO REGEX — WORKS ON RENDER
router.get("/:code", (req, res) => {
  const code = req.params.code;

  const link = getLink(code);
  if (!link) {
    return res.status(404).send("Short URL Not Found");
  }

  recordClick(code);
  return res.redirect(link.url);
});

module.exports = router;