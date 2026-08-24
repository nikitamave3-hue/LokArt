const axios = require("axios");

const sendWhatsAppMessage = async (to, message) => {
  try {
    const url = `https://graph.facebook.com/${process.env.META_GRAPH_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

    const response = await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: {
          body: message,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ WhatsApp message sent successfully");
    return response.data;
  } catch (error) {
    console.error(
      "❌ WhatsApp Send Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = sendWhatsAppMessage;