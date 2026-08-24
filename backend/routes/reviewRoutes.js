const express = require("express");
const router = express.Router();

const {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

// 📋 Get All Reviews
router.get("/", getReviews);

// ⭐ Create Review
router.post("/", createReview);

// ✏️ Update Review
router.put("/:id", updateReview);

// 🗑️ Delete Review
router.delete("/:id", deleteReview);

module.exports = router;