---

### ✅ `server/README.md` (Backend)

```markdown
# 🛠 Asset Management Backend (Node + Express)

This is the Express.js backend for the Asset Management System. It exposes REST APIs to manage assets, GRNs, vendors, and generate reports.

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv
- body-parser
- nodemon (dev)

---

## 📁 Project Structure

server/
├── controllers/ # Route logic
├── models/ # Mongoose schemas
├── routes/ # Route definitions
├── middlewares/ #(error handlers, etc.)
├── server.js # Main entry point
└── .env # Environment variables

---

## 📦 Installation

```bash
cd server
npm install

```

## Create a .env file inside /server:

PORT=5000
MONGO_URI=mongodb://localhost:27017/asset_management

## ▶️ Running the Server

```bash
npm run dev

```

The server will run at: http://localhost:5000
