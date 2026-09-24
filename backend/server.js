const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Determine frontend directory (Docker vs Local)
const frontendPath = fs.existsSync(path.join(__dirname, "../frontend"))
    ? path.join(__dirname, "../frontend")
    : path.join(__dirname, "frontend");

app.use(express.static(frontendPath));

// Health check route
app.get("/health", (req, res) => {
    res.json({ status: "healthy" });
});

// Get Products Route
app.get("/api/products", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM products");
        res.json(rows);
    } catch (error) {
        console.error("Database query failed, returning fallback data:", error.message);
        res.json([
            { id: 1, name: "Teak Wood", description: "Quality teak wood suitable for furniture, doors and other woodworking applications.", icon: "🌳" },
            { id: 2, name: "Timber", description: "Reliable timber products for construction and various woodworking requirements.", icon: "🪵" },
            { id: 3, name: "Wood Products", description: "Wood solutions selected according to customer requirements and applications.", icon: "🏠" }
        ]);
    }
});

// Fallback route for SPA / root navigation
app.get("*", (req, res) => {
    const indexPath = path.join(frontendPath, "index.html");
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send("Frontend files not found.");
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});