# TinyLink — URL Shortener

A lightweight URL shortening service with analytics, built for a take-home assignment.

### 🔗 Live Demo  
https://tiny-link-0e8c.onrender.com

---

## 🚀 Features
- Shorten any long URL  
- Optional custom short code  
- Unique short code generation  
- Redirect to original URL (HTTP 302)  
- Click tracking  
- Last-clicked timestamp  
- Dashboard to view all URLs  
- Stats page for each short code  
- Clean API endpoints  
- Deployed on Render

---

## 📁 Project Structure

tiny-link/
├── server.js
├── routes/
│     ├── links.js
│     ├── redirect.js
│     └── stats.js
├── db/
│     └── index.js
├── public/
│     └── index.html
├── package.json

---

## 🛠️ Tech Stack
- Node.js  
- Express.js  
- HTML / CSS / Vanilla JS  
- Deployed on Render  
- In-memory storage  

---

## 📌 API Endpoints

### ➤ Create short URL  
**POST** `/api/links`  
Body:
```json
{
  "url": "https://google.com",
  "code": "optionalCustomCode"
}

➤ List all URLs

GET /api/links

➤ Delete URL

DELETE /api/links/:code

➤ Redirect

GET /:code

➤ Stats Page

GET /code/:code

➤ Health Check

GET /healthz

▶️ How to Run Locally
Install
npm install
Start
node server.js
Open:
http://localhost:3000

🌐 Deployment

Hosted on Render

URL:
https://tiny-link-0e8c.onrender.com

Environment variables:

BASE_URL=https://tiny-link-0e8c.onrender.com


🙋‍♀️ Author

Palchuri Saitulasi
TinyLink — Take-home assignment


