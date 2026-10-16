const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();

const razorpayKeysConfigured =
  Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

const razorpay = razorpayKeysConfigured
  ? new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    })
  : null;

// Create Razorpay order
router.post("/create-order", async (req, res) => {
  if (!razorpay) {
    return res.status(503).json({
      success: false,
      message: "Payments are temporarily unavailable. Razorpay is not configured.",
    });
  }

  try {
    const { amount, currency = "INR", receipt } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    const options = {
      amount: Math.round(Number(amount) * 100),
      currency,
      receipt: receipt || `lokart_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create payment order",
      error: error.message,
    });
  }
});

module.exports = router;
