const axios = require("axios");

/**
 * 📤 Send WhatsApp Message (Cloud API)
 */
const sendWhatsAppMessage = async (to, message) => {
  try {
    await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Message sent to:", to);
  } catch (error) {
    console.error(
      "❌ WhatsApp Send Failed:",
      error.response?.data || error.message
    );
  }
};

module.exports = sendWhatsAppMessage;