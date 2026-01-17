"use server";

import { createClient } from "@supabase/supabase-js";
import { auth, currentUser } from "@clerk/nextjs/server";

// We use a SERVICE ROLE client here to bypass RLS for the insert, 
// ensuring we explicitly set the user_id from the trusted Clerk auth() context.
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// SECURITY: Define typed interface for expense input
interface ExpenseInput {
    merchant: string;
    date: string;
    total_amount: number;
    split_amount?: number;
    category?: string;
}

export async function saveExpenseAction(data: ExpenseInput, userIdFromClient: string) {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || userId !== userIdFromClient) {
        return { error: "Unauthorized" };
    }

    // SECURITY: Validate required fields
    if (!data.merchant || typeof data.merchant !== 'string' || data.merchant.trim().length === 0) {
        return { error: "Invalid merchant name" };
    }
    if (!data.date || isNaN(Date.parse(data.date))) {
        return { error: "Invalid date" };
    }
    if (typeof data.total_amount !== 'number' || data.total_amount <= 0 || data.total_amount > 1000000) {
        return { error: "Invalid amount" };
    }

    // SECURITY: Sanitize string inputs to prevent injection and limit length
    const merchant = data.merchant.trim().slice(0, 100);
    const category = (data.category || "Other").trim().slice(0, 50);

    // Get real email from Clerk
    const email = user?.emailAddresses?.[0]?.emailAddress || "user@fairshare.app";

    // Ensure profile exists (idempotent)
    const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .upsert(
            { id: userId, email: email },
            { onConflict: "id", ignoreDuplicates: true }
        );

    if (profileError) {
        console.warn("Profile upsert warning:", profileError.message);
    }

    // Insert expense with sanitized values
    const { error } = await supabaseAdmin.from("expenses").insert({
        user_id: userId,
        merchant: merchant,
        date: data.date,
        total_amount: data.total_amount,
        split_amount: data.split_amount || data.total_amount / 2,
        category: category,
        status: 'pending'
    });

    if (error) {
        console.error("Supabase Save Error:", error);
        return { error: error.message };
    }

    return { success: true };
}
