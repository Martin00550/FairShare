"use server";

import { createClient } from "@supabase/supabase-js";
import { auth, currentUser } from "@clerk/nextjs/server";

// We use a SERVICE ROLE client here to bypass RLS for the insert, 
// ensuring we explicitly set the user_id from the trusted Clerk auth() context.
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function saveExpenseAction(data: any, userIdFromClient: string) {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || userId !== userIdFromClient) {
        return { error: "Unauthorized" };
    }

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

    // Insert expense with category if provided
    const { error } = await supabaseAdmin.from("expenses").insert({
        user_id: userId,
        merchant: data.merchant,
        date: data.date,
        total_amount: data.total_amount,
        split_amount: data.split_amount || data.total_amount / 2,
        category: data.category || "Other",
        status: 'pending'
    });

    if (error) {
        console.error("Supabase Save Error:", error);
        return { error: error.message };
    }

    return { success: true };
}
