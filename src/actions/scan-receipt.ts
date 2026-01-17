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
        const model = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview",
            generationConfig: {
                temperature: 0,
                topP: 0.1,
            }
        });

        const prompt = `
      You are a high-precision OCR assistant specialized in medical and retail receipts. 
      Your goal is to extract EXACT data. DO NOT guess or hallucinate.

      ANALYSIS STEPS:
      1. Identify the Merchant Name (usually at the very top).
      2. Find the Transaction Date. 
         - Look for "Date", "Time", or a timestamp.
         - Handle formats: DD/MM/YYYY, MM/DD/YYYY, or Month DD, YYYY.
         - CURRENCY SIGNAL: If you see "$" (USD context), prioritize MM/DD/YYYY. If you see "£", "€", or other international symbols, prioritize DD/MM/YYYY.
         - LOGICAL OVERRIDE: Regardless of currency/location, if the first number in a numeric date is > 12 (e.g., 14/01/2025), that number MUST be the Day.
      3. Identify the FINAL Total Amount.
         - Distinguish between "Subtotal", "Tax", "Total", and "Balance Due".
         - Cross-reference: Verify if (Subtotal + Tax) matches the Extract Total.
      4. Determine the Category based on merchant name and receipt content.
         - Use ONLY these categories: "Medical", "Education", "Childcare", "Groceries", "Clothing", "Entertainment", "Transportation", "Other"
         - Examples: "CITYCARE MEDICAL GROUP" → "Medical", "TARGET" with kids items → "Clothing" or "Groceries", "PEDIATRIC DENTIST" → "Medical"
      
      STRICT RULES:
      - If a field is missing or completely illegible, return "null" for that field (as a JSON value).
      - Do not include currency symbols ($) in the total_amount; it must be a number.
      - Return ONLY the JSON object. No preamble, no markdown formatting.

      EXAMPLE OUTPUT:
      {"merchant": "CityCare Medical Group", "date": "2025-10-14", "total_amount": 135.00, "category": "Medical"}
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
