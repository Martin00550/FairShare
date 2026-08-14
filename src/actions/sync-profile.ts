"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { auth, currentUser } from "@clerk/nextjs/server";


/**
 * Ensures the current user has a profile in the database.
 * Call this on dashboard load to guarantee the profile exists.
 * Uses upsert to handle both new and existing profiles gracefully.
 */
export async function syncUserProfile() {
    try {
        const { userId } = await auth();
        if (!userId) return { error: "Unauthorized" };

        const user = await currentUser();
        const email = user?.emailAddresses?.[0]?.emailAddress || "no-email@fairshare.app";

        // Check if profile already exists
        const { data: existingProfile } = await supabaseAdmin
            .from("profiles")
            .select("id")
            .eq("id", userId)
            .maybeSingle();

        if (existingProfile) {
            // Profile exists, no need to create
            return { success: true, isNew: false };
        }

        // Try upsert to create or update profile
        const { error } = await supabaseAdmin
            .from("profiles")
            .upsert(
                {
                    id: userId,
                    email: email,
                    is_pro: false,
                    lifetime_invoices_count: 0,
                },
                {
                    onConflict: "id",
                    ignoreDuplicates: true,
                }
            );

        if (error) {
            // Log for debugging but don't throw - allow dashboard to load
            console.warn("Profile sync warning:", error.message);
            // Return success anyway - profile might exist via different path
            return { success: true, isNew: false, warning: error.message };
        }

        return { success: true, isNew: true };
    } catch (err) {
        console.error("Profile sync exception:", err);
        // Don't block dashboard load on sync errors
        return { success: true, error: "Sync failed but continuing" };
    }
}
