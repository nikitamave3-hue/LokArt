const axios = require("axios");
const config = require("../config/whatsapp");

/**
 * 🚀 Send WhatsApp Template Message (Meta Cloud API)
 */
const sendTemplateMessage = async (
  to,
  templateName,
  languageCode = "en_US",
  components = []
) => {
  try {
    // Basic validation
    if (!to || !templateName) {
      throw new Error("Phone number and template name are required.");
    }

    const url = `https://graph.facebook.com/${config.version}/${config.phoneNumberId}/messages`;

    const payload = {
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: templateName,
        language: {
          code: languageCode,
        },
        components,
      },
    };

    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      timeout: 15000,
    });

    console.log("✅ WhatsApp Template Sent Successfully");

    return response.data;
  } catch (error) {
    console.error(
      "❌ WhatsApp Template Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};

module.exports = {
  sendTemplateMessage,
};