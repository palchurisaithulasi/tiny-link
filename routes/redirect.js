const express = require("express");
const router = express.Router();
const { getLongUrl, incrementClick } = require("../db/index");

// SAFEST ROUTE — no regex in the path
router.get("/:code", (req, res) => {
  const { code } = req.params;

  const longUrl = getLongUrl(code);
  if (!longUrl) {
    return res.status(404).send("Short URL Not Found");
  }

  incrementClick(code);
  return res.redirect(longUrl);
});

module.exports = router;