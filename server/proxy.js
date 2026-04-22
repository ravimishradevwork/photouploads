require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // Must be node-fetch v2!
const FormData = require("form-data");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Edit this to use the model you want:
const HUGGINGFACE_MODEL_URL = "https://api-inference.huggingface.co/models/stabilityai/sdxl-turbo";

app.post("/api/hf-proxy", async (req, res) => {
  const apiKey = process.env.HF_API_KEY;
  const { base64Image, prompt } = req.body;

  if (!apiKey) return res.status(401).json({ error: "No Hugging Face API key set in backend!" });
  if (!base64Image || !prompt) {
    return res.status(400).json({ error: "Missing base64Image or prompt in request!" });
  }

  // Convert base64 image to buffer for FormData upload
  const base64Data = base64Image.split(",")[1];
  const buffer = Buffer.from(base64Data, "base64");
  const form = new FormData();
  form.append("inputs", buffer, "image.png");
  form.append("parameters", JSON.stringify({ prompt }));

  // ---- LOGGING OUTBOUND REQUEST ----
  console.log("== About to POST to Hugging Face ==");
  console.log("URL:", HUGGINGFACE_MODEL_URL);
  console.log("Prompt parameter:", prompt);

  // Log FormData content-length for debugging
  form.getLength(function (err, length) {
    if (!err) console.log("FormData Content-Length:", length);
  });

  try {
    // ---- POST to Hugging Face API ----
    const hfRes = await fetch(
      HUGGINGFACE_MODEL_URL,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          // DO NOT manually set Content-Type when using FormData!
        },
        body: form,
      }
    );
    console.log("== Hugging Face Response ==", hfRes.status, hfRes.statusText);

    if (!hfRes.ok) {
      let error = "Unknown error";
      try {
        error = await hfRes.text();
        console.log("Error raw body:", error);
      } catch (e) { }
      return res.status(hfRes.status).json({ error, status: hfRes.status });
    }

    // return as base64 image
    const imgBuffer = await hfRes.buffer();
    const base64Result = `data:image/png;base64,${imgBuffer.toString("base64")}`;
    res.json({ image: base64Result });
  } catch (err) {
    console.error("Proxy exception:", err);
    res.status(500).json({ error: err.toString() });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Backend proxy running on port", PORT));