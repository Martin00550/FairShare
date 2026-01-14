"use server";

import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

// Admin client to update profile count securely
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function checkAndIncrementLimit() {
    const { userId } = await auth();
    if (!userId) return { allowed: false, error: "Unauthorized" };

    // 1. Get Profile
    const { data: profile, error: fetchError } = await supabaseAdmin
        .from("profiles")
        .select("is_pro, lifetime_invoices_count")
        .eq("id", userId)
        .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
        // If error other than Not Found
        return { allowed: false, error: "Failed to fetch profile" };
    }

    // If no profile, we assume defaults (0 count, not pro). Create it now?
    let currentCount = profile?.lifetime_invoices_count || 0;
    let isPro = profile?.is_pro || false;

    // 2. Check Logic
    if (!isPro && currentCount >= 5) {
        return { allowed: false, reason: "limit_reached" };
    }

    // 3. Increment Count (if allowed)
    // Only increment if we are actually generating. 
    // This action implies "I AM generating now".
    if (!isPro) {
        if (profile) {
            await supabaseAdmin.from("profiles").update({ lifetime_invoices_count: currentCount + 1 }).eq("id", userId);
        } else {
            // Create if new
            await supabaseAdmin.from("profiles").insert({ id: userId, lifetime_invoices_count: 1 });
        }
    }

    return { allowed: true, newCount: currentCount + 1 };
}
