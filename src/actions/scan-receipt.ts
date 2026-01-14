"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function scanReceipt(formData: FormData) {
    const file = formData.get("file") as File;
    if (!file) {
        return { error: "No file uploaded" };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
      Analyze this receipt image. Extract the following details:
      - Merchant Name (merchant)
      - Date of purchase (date) in YYYY-MM-DD format
      - Total Amount (total_amount) as a number
      
      Return ONLY a valid JSON object with keys: merchant, date, total_amount.
      Do not wrap in markdown code blocks.
    `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Image,
                    mimeType: file.type || "image/jpeg",
                },
            },
        ]);

        const text = result.response.text();
        // Clean up if markdown is included despite instructions
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        const data = JSON.parse(cleanText);

        // Calculate split (50/50 default)
        const splitAmount = data.total_amount ? data.total_amount / 2 : 0;

        return { success: true, data: { ...data, split_amount: splitAmount } };
    } catch (error) {
        console.error("Gemini Scan Error:", error);
        return { error: "Failed to create invoice from receipt." };
    }
}
