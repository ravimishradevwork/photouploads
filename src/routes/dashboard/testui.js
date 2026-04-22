const fetch = require("node-fetch"); // npm install node-fetch
const fs = require("fs");

// Read demo image (ensure test.png exists, or use base64 string)
const imageData = fs.readFileSync("C:\Users\RAVI MISHRA\Downloads\WhatsApp.jpeg", { encoding: 'base64' });
const dataUrl = "data:image/png;base64," + imageData;

const prompt = "a man sitting in front of a futuristic cityscape at sunset, cinematic lighting, digital painting";

// Call your local backend
async function main() {
  try {
    const response = await fetch("http://localhost:4000/api/gen", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: dataUrl,
        prompt: prompt,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error("API Error: " + err);
    }
    const result = await response.json();

    // Save result to file
    if (result.result) {
      const outB64 = result.result.replace(/^data:image\/\w+;base64,/, "");
      fs.writeFileSync("out.png", outB64, { encoding: 'base64' });
      console.log("Result saved as out.png");
    } else {
      console.error("No result!", result);
    }
  } catch (e) {
    console.error("Test failed:", e);
  }
}

main();