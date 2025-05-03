const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require("./routes/authRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const matchRoutes = require("./routes/matchRoutes");       // For auto-matching hotel, vehicle, etc.
const tripRoutes = require("./routes/tripRoutes");         // For saving user's trip

// Use routes
app.use("/api/auth", authRoutes);                          // /api/auth/register, /login
app.use("/api/generate-itinerary", itineraryRoutes);       // /api/generate-itinerary (POST)
app.use("/api", matchRoutes);                              // e.g., /api/match-options?city=Kandy
app.use("/api", tripRoutes);                               // e.g., /api/save-trip (POST)

// Health check
app.get("/", (req, res) => {
  res.send("🌍 Sri Lanka Journey API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
