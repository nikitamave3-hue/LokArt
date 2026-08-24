const express = require("express");
const router = express.Router();
const sendWhatsAppMessage = require("../utils/whatsapp");

/**
 * =====================================
 * 🔐 VERIFY WEBHOOK (Meta Dashboard)
 * URL:
 * GET /api/whatsapp
 * =====================================
 */
router.get("/", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (
    mode === "subscribe" &&
    token === process.env.WHATSAPP_VERIFY_TOKEN
  ) {
    console.log("✅ WhatsApp Webhook Verified");
    return res.status(200).send(challenge);
  }

  console.log("❌ Webhook verification failed");
  return res.sendStatus(403);
});

/**
 * =====================================
 * 📩 RECEIVE WHATSAPP MESSAGE
 * URL:
 * POST /api/whatsapp
 * =====================================
 */
router.post("/", async (req, res) => {
  try {
    const value = req.body?.entry?.[0]?.changes?.[0]?.value;
    const message = value?.messages?.[0];

    // Ignore non-message events
    if (!message) {
      return res.sendStatus(200);
    }

    const from = message.from;
    const text = message.text?.body?.trim() || "";

    console.log("📩 Incoming WhatsApp Message");
    console.log("From :", from);
    console.log("Text :", text);

    const msg = text.toLowerCase();

    if (msg === "hi" || msg === "hello") {
      await sendWhatsAppMessage(
        from,
        "👋 Welcome to LokArt!\nHow can we help you today?"
      );
    } else if (msg === "help") {
      await sendWhatsAppMessage(
        from,
        "🛠️ LokArt Help\n\n1️⃣ Artist Search\n2️⃣ Worker Search\n3️⃣ Booking Support\n4️⃣ Order Status"
      );
    } else {
      await sendWhatsAppMessage(
        from,
        "🙏 Sorry, I didn't understand your message.\n\nType *HELP* to see available options."
      );
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error("❌ WhatsApp Webhook Error:", error.message);
    return res.sendStatus(500);
  }
});

module.exports = router;