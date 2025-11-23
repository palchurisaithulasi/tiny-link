const express = require("express");
const router = express.Router();

const { getLink, recordClick } = require("../db/index");

// SAFE CATCH-ALL REDIRECT
router.get("/:code", (req, res) => {
  const code = req.params.code;

  const link = getLink(code);

  if (!link) {
    return res.status(404).send("Short URL Not Found");
  }

  recordClick(code);          // update click count
  return res.redirect(link.url);   // redirect to original URL
});

module.exports = router;
