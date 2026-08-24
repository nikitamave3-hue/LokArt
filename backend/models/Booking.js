const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    // 👤 Booking karne wala User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🎨 Jis Artist ko book kiya gaya
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },

    // 🛠️ Service Name
    serviceName: {
      type: String,
      required: true,
      trim: true,
    },

    // 👤 Customer Name
    userName: {
      type: String,
      required: true,
      trim: true,
    },

    // 📞 Phone Number
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^[0-9]{10}$/, "Invalid Phone Number"],
    },

    // 📍 Service Address
    address: {
      type: String,
      required: true,
      trim: true,
    },

    // 📅 Booking Date
    bookingDate: {
      type: Date,
      required: true,
    },
     
    // 📝 Extra Notes
    notes: {
      type: String,
      trim: true,
      default: "",
    },

    // 📦 Booking Status
    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "In Progress",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", BookingSchema);