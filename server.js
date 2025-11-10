// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const shortid = require("shortid");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ URL Schema
const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Url = mongoose.model("Url", urlSchema);

// ✅ Routes

// POST: Shorten a URL
app.post("/shorten", async (req, res) => {
  try {
    const { longUrl } = req.body;
    if (!longUrl) return res.status(400).json({ message: "URL is required" });

    const shortCode = shortid.generate();
    const newUrl = await Url.create({ longUrl, shortCode });
    const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;
    res.json({ longUrl, shortUrl });
  } catch (error) {
    console.error("Error shortening URL:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET: Redirect to original URL
app.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode });
    if (url) return res.redirect(url.longUrl);
    res.status(404).json({ message: "URL not found" });
  } catch (error) {
    console.error("Error redirecting:", error);
    res.status(500).json({ error: error.message });
  }
});

// Root Route
app.get("/", (req, res) => {
  res.send("🌍 CodeAlpha URL Shortener API is running!");
});

// ✅ MongoDB Connection + Start Server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
};

startServer();
