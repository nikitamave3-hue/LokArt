const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    // 👤 User (who ordered)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🛒 Product
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    // 📦 Quantity
    
    quantity: {
  type: Number,
  required: true,
  default: 1,
  min: 1,
    },

    // 💰 Total Price
    totalPrice: {
      type: Number,
      required: true,
      min: 1,
    },

     paymentStatus: {
  type: String,
  enum: ["Pending", "Paid", "Failed"],
  default: "Pending",
    },

    paymentMethod: {
  type: String,
  enum: ["Online", "COD"],
  default: "Online",
    },

    // 🚚 Status
   status: {
  type: String,
  enum: [
    "Pending",
    "Confirmed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled"
  ],
  default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);