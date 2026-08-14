"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { checkAdminAuth, sanitizeError } from "@/lib/security";
import { auth } from "@clerk/nextjs/server";


export type ErrorSeverity = 'error' | 'critical' | 'warning';

/**
 * Logs a system error to the database.
 * Usage: await logSystemError(error, "saveInvoice", "critical");
 */
export async function logSystemError(
    error: unknown,
    context: string,
    severity: ErrorSeverity = 'error',
    metadata: Record<string, any> = {}
) {
    try {
        const { userId } = await auth().catch(() => ({ userId: null })); // Handle cases where auth might fail or not be available

        const message = error instanceof Error ? error.message : String(error);
        const stack = error instanceof Error ? error.stack : undefined;

        // Still log to console for vercel logs
        console.error(`[System Error - ${context}]:`, error);

        await supabaseAdmin.from("error_logs").insert({
            message,
            stack,
            context,
            severity,
            user_id: userId,
            metadata,
        });
    } catch (loggingError) {
        // Fallback: don't crash the app if logging fails
        console.error("FAILED TO LOG ERROR TO DB:", loggingError);
        console.error("ORIGINAL ERROR:", error);
    }
}

/**
 * Admin: Fetch error logs
 */
export async function getErrorLogs(limit = 50, resolved = false) {
    try {
        await checkAdminAuth();

        const { data, error } = await supabaseAdmin
            .from("error_logs")
            .select("*")
            .eq("resolved", resolved)
            .order("created_at", { ascending: false })
            .limit(limit);

        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Fetch logs error:", error);
        return { error: sanitizeError(error, "Failed to fetch error logs") };
    }
}

/**
 * Admin: Mark error as resolved
 */
export async function resolveErrorAndArchive(id: string) {
    try {
        await checkAdminAuth();

        const { error } = await supabaseAdmin
            .from("error_logs")
            .update({ resolved: true })
            .eq("id", id);

        if (error) throw error;
        return { success: true };
    } catch (error) {
        return { error: sanitizeError(error, "Failed to resolve error") };
    }
}

/**
 * Admin: Clear all resolved errors (optional cleanup)
 */
export async function deleteResolvedErrors() {
    try {
        await checkAdminAuth();
        await supabaseAdmin.from("error_logs").delete().eq("resolved", true);
        return { success: true };
    } catch (error) {
        return { error: sanitizeError(error, "Failed to clean up logs") };
    }
}
