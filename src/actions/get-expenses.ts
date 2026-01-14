"use server";

import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getPendingExpenses() {
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized" };

    const { data, error } = await supabaseAdmin
        .from("expenses")
        .select("*")
        .eq("user_id", userId)
        .eq("status", "pending")
        .order("date", { ascending: false });

    if (error) {
        console.error("Fetch Error:", error);
        return { error: error.message };
    }

    return { success: true, data };
}
