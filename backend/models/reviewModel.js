const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    // 👤 Review dene wala User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🛍️ Jis Product ka Review hai
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // ⭐ Rating (1 to 5)
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    // 💬 Review Message
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", ReviewSchema);