const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  getPostById,
  deletePost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

// MARKETPLACE ROUTES

router.post("/", protect, createPost);      // create post
router.get("/", getPosts);                  // all posts
router.get("/:id", getPostById);            // single post
router.delete("/:id", protect, deletePost); // delete post

module.exports = router;