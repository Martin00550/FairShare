"use server";

import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function updateSplitPercentage(splitPercentage: number) {
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized" };

    // Validate split percentage
    if (splitPercentage < 10 || splitPercentage > 90) {
        return { error: "Split percentage must be between 10% and 90%" };
    }

    const { error } = await supabaseAdmin
        .from("profiles")
        .update({ split_percentage: splitPercentage })
        .eq("id", userId);

    if (error) {
        console.error("Error updating split:", error);
        return { error: error.message };
    }

    return { success: true };
}

export async function getSplitPercentage() {
    const { userId } = await auth();
    if (!userId) return 50; // Default

    const { data } = await supabaseAdmin
        .from("profiles")
        .select("split_percentage")
        .eq("id", userId)
        .single();

    return data?.split_percentage || 50;
}

export async function markExpenseAsPaid(expenseId: string) {
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized" };

    const { error } = await supabaseAdmin
        .from("expenses")
        .update({
            status: "paid",
            paid_at: new Date().toISOString()
        })
        .eq("id", expenseId)
        .eq("user_id", userId);

    if (error) {
        console.error("Error marking as paid:", error);
        return { error: error.message };
    }

    return { success: true };
}
