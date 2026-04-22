import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const TransformInput = z.object({
  imageBase64: z
    .string()
    .min(100)
    .max(8_000_000) // ~6MB base64 -> ~4.5MB binary
    .regex(/^data:image\/(png|jpeg|jpg|webp);base64,/, "Must be a base64 image"),
  templatePrompt: z.string().min(3).max(500),
  userPrompt: z.string().max(300).optional().default(""),
});

export type TransformInputType = z.infer<typeof TransformInput>;

export const transformImage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => TransformInput.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "AI not configured. Please contact support." };
    }

    const finalPrompt = [
      data.templatePrompt,
      data.userPrompt?.trim() ? `Additional details: ${data.userPrompt.trim()}` : "",
      "Preserve the subject's identity and facial features. High quality, photorealistic where appropriate.",
    ]
      .filter(Boolean)
      .join(" ");

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: finalPrompt },
                { type: "image_url", image_url: { url: data.imageBase64 } },
              ],
            },
          ],
          modalities: ["image", "text"],
        }),
      });

      if (res.status === 429) {
        return { ok: false as const, error: "Too many requests. Please wait a moment and try again." };
      }
      if (res.status === 402) {
        return { ok: false as const, error: "AI credits exhausted. Please try again later." };
      }
      if (!res.ok) {
        const text = await res.text();
        console.error("AI gateway error:", res.status, text);
        return { ok: false as const, error: "AI service unavailable. Please try again." };
      }

      const json = await res.json();
      const imageUrl: string | undefined = json.choices?.[0]?.message?.images?.[0]?.image_url?.url;
      if (!imageUrl) {
        console.error("No image in response", JSON.stringify(json).slice(0, 500));
        return { ok: false as const, error: "AI did not return an image. Try a different photo or template." };
      }

      return { ok: true as const, imageUrl };
    } catch (err) {
      console.error("transformImage error:", err);
      return { ok: false as const, error: "Network error. Please try again." };
    }
  });
