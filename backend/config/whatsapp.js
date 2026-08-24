const dotenv = require("dotenv");
dotenv.config();

/**
 * WhatsApp Cloud API Configuration
 */

const whatsappConfig = {
  token: process.env.WHATSAPP_TOKEN,
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  verifyToken: process.env.WHATSAPP_VERIFY_TOKEN,
  version: process.env.META_GRAPH_VERSION || "v19.0",
};

// Production validation
const requiredEnv = [
  "WHATSAPP_TOKEN",
  "WHATSAPP_PHONE_NUMBER_ID",
  "WHATSAPP_VERIFY_TOKEN",
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️ Missing environment variable: ${key}`);
  }
});

module.exports = whatsappConfig;