const express = require("express");
const router = express.Router();

const { sendTemplateMessage } = require("../services/whatsappTemplateService");

/**
 * 🚀 SEND TEMPLATE MESSAGE API
 */
router.post("/send-template", async (req, res) => {
  try {
    const { to, templateName, languageCode, variables } = req.body;

    const result = await sendTemplateMessage(
      to,
      templateName,
      languageCode || "en_US",
      variables || []
    );

    return res.json({
      success: true,
      message: "Template sent successfully",
      data: result,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Template send failed",
    });
  }
});

module.exports = router;