import genAI from "../config/gemini.js";

export const analyzeFoodImage =
  async (imageBase64, mimeType) => {

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

   const prompt = `
You are analyzing a food waste image.

Identify:

1. Food type
2. Approximate quantity
3. Whether the food appears edible
4. Collection urgency
5. Confidence score

Return ONLY valid JSON.

{
  "foodType":"",
  "quantity":"Small|Medium|Large",
  "edible":true,
  "urgency":"Low|Medium|High",
  "confidence":0
}

If food is visible, never return "None".
`;

    const result =
      await model.generateContent([
        prompt,
        {
          inlineData: {
            data: imageBase64,
            mimeType
          }
        }
      ]);

    return result.response.text();
};