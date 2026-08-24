const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const { protect } = require("../middleware/authMiddleware");

// Get logged-in customer's bookings
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("artist", "name village skills")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("MY BOOKINGS ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Create booking
router.post("/create", protect, async (req, res) => {
  try {
    const {
      artist,
      serviceName,
      userName,
      phone,
      address,
      bookingDate,
      notes,
    } = req.body;

    if (
      !artist ||
      !serviceName ||
      !userName ||
      !phone ||
      !address ||
      !bookingDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required booking fields.",
      });
    }

    const booking = new Booking({
      user: req.user._id,
      artist,
      serviceName,
      userName,
      phone,
      address,
      bookingDate,
      notes: notes || "",
      status: "Pending",
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Service booking created successfully.",
      booking,
    });
  } catch (error) {
    console.error("BOOKING ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
