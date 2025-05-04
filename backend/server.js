const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

// ✅ Load environment variables FIRST
dotenv.config();

// ✅ Check required environment variable
if (!process.env.GOOGLE_MAPS_API_KEY) {
  console.error("❌ Missing GOOGLE_MAPS_API_KEY in .env file");
  process.exit(1);
}

// ✅ Connect to MongoDB
connectDB();

// ✅ Initialize Express app
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static files from /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Import Routes
const authRoutes = require("./routes/authRoutes");
const itineraryRoutes = require("./routes/itineraryRoutes");
const matchRoutes = require("./routes/matchRoutes");
const tripRoutes = require("./routes/tripRoutes");
const nearbyRoutes = require("./routes/nearbyRoutes");
const travelRoutes = require("./routes/travelRoutes");
const tourRoutes = require("./routes/tourRoutes"); // ✅ NEW: Tour Packages
const uploadRoutes = require("./routes/uploadRoutes"); // ✅ NEW: Local Image Upload

// ✅ Mount Routes
app.use("/api/auth", authRoutes);                       // /api/auth/register, /api/auth/login
app.use("/api/generate-itinerary", itineraryRoutes);    // /api/generate-itinerary (POST)
app.use("/api", matchRoutes);                           // /api/match-options
app.use("/api", tripRoutes);                            // /api/save-trip
app.use("/api", nearbyRoutes);                          // /api/nearby-suggestions
app.use("/api", travelRoutes);                          // /api/travel-info
app.use("/api/tours", tourRoutes);                      // ✅ NEW: /api/tours CRUD
app.use("/api/upload", uploadRoutes);                   // ✅ NEW: Local upload endpoint

// ✅ Health check endpoint
app.get("/", (req, res) => {
  res.send("🌍 Sri Lanka Journey API is running...");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
