const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

/**
 * ============================
 * IMAGE UPLOAD API
 * POST /api/upload/image
 * ============================
 */
router.post("/image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully.",
      image: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    });
  } catch (error) {
    console.error("Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: "Image upload failed.",
    });
  }
});

module.exports = router;