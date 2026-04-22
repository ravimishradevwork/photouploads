import express from "express";
import multer from "multer";
import axios from "axios";
import fs from "fs";

const app = express();
const upload = multer({ dest: "uploads/" });

const HF_API_URL = "https://api-inference.huggingface.co/models/timbrooks/instruct-pix2pix";
const HF_API_KEY ="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"; // set in .env

// Endpoint: upload image + prompt
app.post("/generate", upload.single("image"), async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const filePath = req.file.path;

    const imageData = fs.readFileSync(filePath);

    const response = await axios.post(
      HF_API_URL,
      imageData,
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/octet-stream"
        },
        params: { inputs: prompt }
      }
    );

    // Hugging Face returns raw image bytes
    res.set("Content-Type", "image/png");
    res.send(response.data);

    // cleanup
    fs.unlinkSync(filePath);
  } catch (err) {
    console.error("Error generating image:", err.message);
    res.status(500).json({ error: "Image generation failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
