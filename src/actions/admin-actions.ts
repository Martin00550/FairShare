"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { checkAdminAuth, sanitizeError } from "@/lib/security";


export async function getAdminStats() {
    try {
        await checkAdminAuth();

        // 1. User stats
        const { count: totalUsers } = await supabaseAdmin
            .from("profiles")
            .select("*", { count: "exact", head: true });

        const { count: proUsers } = await supabaseAdmin
            .from("profiles")
            .select("*", { count: "exact", head: true })
            .eq("is_pro", true);

        // 2. Expense stats
        const { data: allExpenses } = await supabaseAdmin
            .from("expenses")
            .select("total_amount, split_amount");

        const totalExpensesCount = allExpenses?.length || 0;
        const totalVolume = allExpenses?.reduce((sum, e) => sum + (e.total_amount || 0), 0) || 0;

        // 3. Invoice stats
        const { count: totalInvoices } = await supabaseAdmin
            .from("invoices")
            .select("*", { count: "exact", head: true });

        // 4. Recent activity (last 10 users)
        const { data: recentUsers } = await supabaseAdmin
            .from("profiles")
            .select("email, created_at, is_pro")
            .order("created_at", { ascending: false })
            .limit(10);

        return {
            totalUsers: totalUsers || 0,
            proUsers: proUsers || 0,
            totalExpenses: totalExpensesCount,
            totalVolume,
            totalInvoices: totalInvoices || 0,
            recentUsers: recentUsers || [],
        };
    } catch (error) {
        console.error("Admin stats error:", error);
        return { error: sanitizeError(error, "Failed to fetch admin stats") };
    }
}

/**
 * Public function to fetch the current active announcement.
 */
export async function getAnnouncement() {
    try {
        const { data, error } = await supabaseAdmin
            .from("announcements")
            .select("content, is_active, type")
            .order("updated_at", { ascending: false })
            .limit(1)
            .single();

        if (error) throw error;
        return data;
    } catch (error) {
        // Fail silently for public fetch
        return null;
    }
}

/**
 * Admin-only function to update the global announcement.
 */
export async function updateAnnouncement(content: string, isActive: boolean, type: string = "info") {
    try {
        await checkAdminAuth();

        const { data: existing } = await supabaseAdmin
            .from("announcements")
            .select("id")
            .limit(1)
            .single();

        const { error } = await supabaseAdmin
            .from("announcements")
            .upsert({
                id: existing?.id,
                content,
                is_active: isActive,
                type,
                updated_at: new Date().toISOString(),
            });

        if (error) throw error;
        return { success: true };
    } catch (error) {
        console.error("Update announcement error:", error);
        return { error: sanitizeError(error, "Failed to update announcement") };
    }
}

