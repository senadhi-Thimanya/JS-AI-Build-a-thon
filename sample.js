import OpenAI from "openai";
import fs from "fs";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const modelName = "openai/gpt-4o";

function getImageDataUrl(imageFile, imageFormat) {
  const imageBuffer = fs.readFileSync(imageFile);
  const imageBase64 = imageBuffer.toString("base64");
  return `data:image/${imageFormat};base64,${imageBase64}`;
}

export async function main() {
  const client = new OpenAI({ baseURL: endpoint, apiKey: token });
  const imageFilePath = "contoso_layout_sketch.jpg";
  const imageFormat = "jpeg"; // or "png"
  const imageDataUrl = getImageDataUrl(imageFilePath, imageFormat);

  const response = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: [
          { type: "text", text: "Write HTML and CSS code for a web page based on the following hand drawn sketch." },
          { type: "image_url", image_url: { url: imageDataUrl, detail: "auto" } }
        ]
      }
    ],
    temperature: 1.0,
    top_p: 1.0,
    max_tokens: 1000,
    model: modelName
  });

  console.log(response.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
