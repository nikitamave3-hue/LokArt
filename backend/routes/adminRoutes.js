const express = require("express");
const router = express.Router();

// =======================
// CONTROLLERS
// =======================
const {
  getAdminStats,
} = require("../controllers/adminController");

// =======================
// MIDDLEWARE
// =======================
const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// ======================================================
// ADMIN ROUTES
// Base URL : /api/admin
// ======================================================

// 📊 Dashboard Analytics
router.get(
  "/stats",
  protect,
  adminOnly,
  getAdminStats
);

module.exports = router;