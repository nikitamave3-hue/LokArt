const jwt = require("jsonwebtoken");
const User = require("../models/usermodels");

// =======================
// PROTECT ROUTE
// =======================
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Token missing.",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("========== AUTH ==========");
    console.log("Authorization Header:", authHeader);
    console.log("Token:", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "supersecret"
    );
    console.log("========== AUTH ==========");
    console.log("Authorization Header:", authHeader);
    console.log("Token:", token);
    console.log("Decoded:", decoded);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

// =======================
// ADMIN ONLY
// =======================
const adminOnly = (req, res, next) => {

  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  if (
    req.user.role !== "Admin" &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({
      success: false,
      message: "Admin access only.",
    });
  }

  next();
};

module.exports = {
  protect,
  adminOnly,
};