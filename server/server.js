require("dotenv").config();
const express = require("express");
const multer = require("multer");
const axios = require("axios");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

const HF_API_URL = "https://api-inference.huggingface.co/models/timbrooks/instruct-pix2pix";
const HF_API_KEY ="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"; // .env: HF_API_KEY=hf_xxxxxx

// Endpoint: upload image + prompt
app.post("/generate", upload.single("image"), async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const filePath = req.file.path;

    // Read image file as binary
    const imageData = fs.readFileSync(filePath);

    // Send POST request to Hugging Face (image-to-image)
    const response = await axios({
      method: "POST",
      url: HF_API_URL + "?inputs=" + encodeURIComponent(prompt),
      data: imageData,
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/octet-stream",
        "Accept": "image/png" // force binary out
      },
      responseType: "arraybuffer", // force binary
      validateStatus: null
    });

    // Safety: remove uploaded file
    fs.unlinkSync(filePath);

    // --- Handle image versus error ---
    const contentType = response.headers['content-type'] || '';
    if (contentType.includes('image')) {
      res.set("Content-Type", "image/png");
      return res.send(Buffer.from(response.data));
    } else {
      // Try to interpret error
      let details = '';
      try {
        details = Buffer.from(response.data).toString("utf8");
      } catch (e) {}
      console.error("Hugging Face API returned non-image:", details);
      return res.status(502).json({
        error: "Hugging Face API did not return an image.",
        details
      });
    }
  } catch (err) {
    console.error("Error generating image:", err);
    res.status(500).json({ error: "Image generation failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});