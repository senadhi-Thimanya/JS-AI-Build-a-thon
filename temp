import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import fs from "fs";

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4o"; // or another multimodal-capable model

function getImageDataUrl(imageFile, imageFormat) {
  const imageBuffer = fs.readFileSync(imageFile);
  const imageBase64 = imageBuffer.toString("base64");
  return `data:image/${imageFormat};base64,${imageBase64}`;
}

export async function main() {
  const client = ModelClient(endpoint, new AzureKeyCredential(token));
  const imageFilePath = "contoso_layout_sketch.jpg";
  const imageFormat = "jpeg"; // or "png"

  const imageDataUrl = getImageDataUrl(imageFilePath, imageFormat);

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Write HTML and CSS code for a web page based on the following hand drawn sketch." },
            {
              type: "image_url",
              image_url: { url: imageDataUrl, detail: "auto" }
            }
          ]
        }
      ],
      model: model,
      temperature: 1.0,
      top_p: 1.0
    }
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log(response.body.choices[0].message.content);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
