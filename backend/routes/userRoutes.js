const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers,
  saveFcmToken,
} = require("../controllers/userControllers");

const {protect} = require("../middleware/authMiddleware");

// =======================
// PUBLIC ROUTES
// =======================
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/fcm-token", protect, saveFcmToken);

// =======================
// PROTECTED ROUTES
// =======================
router.get("/", protect, getUsers);
router.get("/profile/:id", protect, getUserProfile);

module.exports = router;