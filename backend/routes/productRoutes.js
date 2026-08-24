const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

const {protect} = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// =======================
// PUBLIC ROUTES
// =======================
router.get("/", getProducts);
router.get("/:id", getProductById);

// =======================
// PROTECTED ROUTES
// =======================
router.post("/", protect, upload.single("image"), createProduct);
router.put("/:id", protect, upload.single("image"), updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;