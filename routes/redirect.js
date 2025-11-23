const express = require("express");
const router = express.Router();

const { getLink, recordClick } = require("../db/index");

// REDIRECT ROUTE (/:code)
router.get("/:code", (req, res) => {
  const code = req.params.code;

  const linkData = getLink(code);

  if (!linkData) {
    return res.status(404).send("Short URL not found");
  }

  // Record click
  recordClick(code);

  // Redirect to original URL
  return res.redirect(linkData.url);
});

module.exports = router;