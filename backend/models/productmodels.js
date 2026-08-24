const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    // 🛒 Product Name
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    // 📝 Description
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    // 💰 Price
    price: {
      type: Number,
      required: true,
      min: 1,
    },

    // 🏷️ Category (craft, art, handmade, etc.)
    category: {
      type: String,
      required: true,
      trim: true,
    },

    // 🖼️ Image URL
    image: {
      type: String,
      default: "",
    },

    // 📍 Village / Location
    village: {
      type: String,
      required: true,
      trim: true,
    },

    // 📦 Stock availability
    stock: {
      type: Number,
      default: 1,
      min: 0,
    },

    // 🔐 Owner (IMPORTANT for marketplace system)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);