"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";


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
