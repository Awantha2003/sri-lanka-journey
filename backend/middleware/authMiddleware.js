const jwt = require("jsonwebtoken");

// 🔐 Protect middleware - checks for valid JWT in Authorization header
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Validate the token exists and starts with "Bearer"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1]; // Extract token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    // Attach user info to the request
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next(); // Continue to next middleware
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

// 🛡️ Admin check middleware - only allows users with role "admin"
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ msg: "Access denied: Admins only" });
  }
  next();
};

module.exports = {
  protect,
  isAdmin,
};
