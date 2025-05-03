// sri-lanka-journey/backend/server.js

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Import route files
const authRoutes = require("./routes/authRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const matchRoutes = require("./routes/matchRoutes");
const tripRoutes = require("./routes/tripRoutes"); // ✅ NEW: Save trip route

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);                    // /api/auth/register, /api/auth/login
app.use("/api/generate-itinerary", itineraryRoutes); // /api/generate-itinerary (POST)
app.use("/api", matchRoutes);                        // /api/match-options?city=... (GET)
app.use("/api", tripRoutes);                         // ✅ /api/save-trip (POST)

// Root endpoint (health check)
app.get("/", (req, res) => {
  res.send("🌍 Sri Lanka Journey API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
