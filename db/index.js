// In-memory storage
const links = {};

// Generate 6-character code
function generateCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Create short link object
function createShortLink(longUrl) {
  const code = generateCode();
  
  links[code] = {
    url: longUrl,
    clicks: 0,
    lastClicked: null
  };

  return code;
}

// Get link object
function getLink(code) {
  return links[code];
}

// Record click
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
  recordClick
};