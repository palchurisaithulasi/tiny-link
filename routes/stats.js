const express = require("express");
const router = express.Router();
const { getLink } = require("../db/index");

// Stats page – correct route: /code/:code
router.get("/code/:code", (req, res) => {
  const code = req.params.code;
  const link = getLink(code);

  if (!link) {
    return res.status(404).send("Code not found");
  }

  res.send(`
    <h2>Stats for Short URL</h2>
    <p><b>Code:</b> ${code}</p>
    <p><b>Original URL:</b> ${link.url}</p>
    <p><b>Total Clicks:</b> ${link.clicks}</p>
    <p><b>Last Clicked:</b> ${link.lastClicked || "Never"}</p>
  `);
});

module.exports = router;