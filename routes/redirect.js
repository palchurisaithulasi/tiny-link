const express = require("express");
const router = express.Router();

const { getLongUrl, updateStats } = require("../db/index");

// REDIRECT ROUTE (/:code)
router.get("/:code([A-Za-z0-9]{5,8})", (req, res) => {
  const code = req.params.code;

  const longUrl = getLongUrl(code);

  if (!longUrl) {
    return res.status(404).send("Short URL not found");
  }

  // update clicks + last clicked
  updateStats(code);

  return res.redirect(longUrl);
});

module.exports = router;