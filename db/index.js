// db/index.js
// In-memory storage
const links = {};

// Regex rule for codes: 6-8 alphanumeric
const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

// Generate code
function generateCode(len = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < len; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Validate URL simple check
function validateUrl(u) {
  try {
    new URL(u);
    return true;
  } catch (e) {
    return false;
  }
}

// Create short link (supports custom code)
function createShortLink(longUrl, customCode = null) {
  if (!validateUrl(longUrl)) {
    return { error: "Invalid URL" };
  }

  let code = null;

  // If user provides custom code
  if (customCode) {
    if (!CODE_REGEX.test(customCode)) {
      return { error: "Custom code must match /^[A-Za-z0-9]{6,8}$/" };
    }
    if (links[customCode]) {
      return { error: "CodeExists" };
    }
    code = customCode;
  } else {
    // Auto-generate code
    do {
      code = generateCode(6);
    } while (links[code]);
  }

  const now = new Date().toISOString();

  links[code] = {
    url: longUrl,
    createdAt: now,
    clicks: 0,
    lastClicked: null,
  };

  return {
    code,
    shortUrl: `${process.env.BASE_URL || "http://localhost:3000"}/${code}`,
    link: links[code],
  };
}

// Return a single link
function getLink(code) {
  return links[code] || null;
}

// Return all links
function listLinks() {
  return Object.entries(links).map(([code, data]) => ({
    code,
    url: data.url,
    clicks: data.clicks,
    lastClicked: data.lastClicked,
    createdAt: data.createdAt,
  }));
}

// Update clicks + last clicked
function recordClick(code) {
  if (links[code]) {
    links[code].clicks += 1;
    links[code].lastClicked = new Date().toISOString();
  }
}

module.exports = {
  links,
  createShortLink,
  getLink,
  listLinks,
  recordClick,
};