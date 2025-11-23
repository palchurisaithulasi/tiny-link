const express = require("express");
const router = express.Router();

const { getLink, recordClick } = require("../db/index");

// REDIRECT ONLY if code is 5-8 characters (letters/numbers)
router.get("/:code([A-Za-z0-9]{5,8})", (req, res) => {
  const code = req.params.code;

  const link = getLink(code);

  if (!link) {
    return res.status(404).send("Short URL Not Found");
  }

  recordClick(code);
  return res.redirect(link.url);
});

module.exports = router;
