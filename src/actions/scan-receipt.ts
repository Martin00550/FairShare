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
      
      CRITICAL DATE PARSING RULES:
      Disambiguate ambiguous dates (like 05/04/2018) using THESE clues:
      1. CURRENCY SYMBOLS:
         - If you see "£" or "€", assume the region is Europe/UK and use DD/MM/YYYY format.
         - If you see "$", check for further location clues.
      2. LOCATION/ADDRESS:
         - If the receipt mentions UK, Australia, New Zealand, or any EU country, use DD/MM/YYYY.
         - If the receipt mentions USA or Canada, use MM/DD/YYYY.
      3. LOGIC:
         - If the first number is > 12, it's obviously DD/MM/YYYY.
         
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

        return { success: true, data };
    } catch (error) {
        console.error("Gemini Scan Error:", error);
        return { error: "Failed to create invoice from receipt." };
    }
}
