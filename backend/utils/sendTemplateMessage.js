const axios = require("axios");

const sendTemplateMessage = async (
  to,
  templateName,
  language = "en_US",
  components = []
) => {
  try {
    const url = `https://graph.facebook.com/${process.env.META_GRAPH_VERSION}/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

    const response = await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: language,
          },
          components,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ WhatsApp Template Sent");
    return response.data;
  } catch (error) {
    console.error(
      "❌ Template Send Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = sendTemplateMessage;