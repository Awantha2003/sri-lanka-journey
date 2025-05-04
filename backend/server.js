const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables FIRST
dotenv.config();

// Check for essential environment variables
if (!process.env.GOOGLE_MAPS_API_KEY) {
  console.error("❌ GOOGLE_MAPS_API_KEY not found in .env");
  process.exit(1);
}

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const matchRoutes = require("./routes/matchRoutes");
const tripRoutes = require("./routes/tripRoutes");
const nearbyRoutes = require("./routes/nearbyRoutes");
const travelRoutes = require("./routes/travelRoutes"); // ✅ Travel info route

// Mount routes
app.use("/api/auth", authRoutes);                    // /api/auth/register, /login
app.use("/api/generate-itinerary", itineraryRoutes); // /api/generate-itinerary (POST)
app.use("/api", matchRoutes);                         // /api/match-options?city=Kandy
app.use("/api", tripRoutes);                          // /api/save-trip (POST)
app.use("/api", nearbyRoutes);                        // /api/nearby-suggestions?lat=..&lng=..&type=..
app.use("/api", travelRoutes);                        // ✅ /api/travel-info?origin=..&destination=..

// Health Check
app.get("/", (req, res) => {
  res.send("🌍 Sri Lanka Journey API is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
