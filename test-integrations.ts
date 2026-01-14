import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function verify() {
    console.log("🔍 Starting Integration Checks...\n");
    let hasError = false;

    // 1. Check Env Vars
    const required = [
        "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
        "CLERK_SECRET_KEY",
        "NEXT_PUBLIC_SUPABASE_URL",
        "NEXT_PUBLIC_SUPABASE_ANON_KEY",
        // "SUPABASE_SERVICE_ROLE_KEY", // Optional, might use anon with policies or separate admin client in real app, but code uses service role if available or anon.
        "GEMINI_API_KEY"
    ];

    const missing = required.filter(key => !process.env[key]);
    if (missing.length > 0) {
        console.error(`❌ Missing Environment Variables: ${missing.join(", ")}`);
        hasError = true;
    } else {
        console.log("✅ Environment Variables Present");
    }

    // 2. Test Supabase Connection
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Use strongest available
        const supabase = createClient(supabaseUrl, supabaseKey);

        const { count, error } = await supabase.from("profiles").select("*", { count: "exact", head: true });

        if (error) {
            console.error("❌ Supabase Connection Failed:", error.message);
            hasError = true;
        } else {
            console.log(`✅ Supabase Connection Successful (Profiles count: ${count ?? 0})`);
        }
    } catch (e: any) {
        console.error("❌ Supabase Integration Error:", e.message);
        hasError = true;
    }

    // 3. Test Gemini Connection
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // Use the model we specified

        // Simple prompt
        const result = await model.generateContent("Respond with 'OK' if you receive this.");
        const response = await result.response;
        const text = response.text();

        if (text) {
            console.log(`✅ Gemini Connection Successful (Response: "${text.trim()}")`);
        } else {
            console.error("❌ Gemini returned empty response.");
            hasError = true;
        }
    } catch (e: any) {
        console.error("❌ Gemini Integration Error:", e.message);
        // Common error: 404 (model not found) or 400 (bad key)
        hasError = true;
    }

    console.log("\n" + (hasError ? "⚠️ Checks completed with errors." : "🎉 All checks passed!"));
    process.exit(hasError ? 1 : 0);
}

verify();
