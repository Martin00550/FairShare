import { currentUser } from "@clerk/nextjs/server";

// Security utilities for FairShare
export const ADMIN_EMAIL = "hello@getfairshare.cloud";

/**
 * SECURITY: Sanitize error messages before returning to client.
 * In production, internal errors should not expose stack traces or system details.
 */

const isProduction = process.env.NODE_ENV === "production";

// Known safe error messages that can be passed through
const SAFE_ERROR_PATTERNS = [
    "Unauthorized",
    "Invalid",
    "limit",
    "not found",
    "too many",
    "File too",
    "Maximum",
];

export function sanitizeError(error: unknown, fallbackMessage: string = "An error occurred"): string {
    if (!error) return fallbackMessage;

    const message = error instanceof Error ? error.message : String(error);

    // In development, show full error for debugging
    if (!isProduction) {
        return message;
    }

    // Check if error message is safe to expose
    const isSafe = SAFE_ERROR_PATTERNS.some(pattern =>
        message.toLowerCase().includes(pattern.toLowerCase())
    );

    if (isSafe) {
        return message;
    }

    // Log full error server-side for debugging
    console.error("[Sanitized Error]:", error);

    // Return generic message to client
    return fallbackMessage;
}

/**
 * Checks if a given email is the designated admin email.
 */
export function isAdmin(email: string | null | undefined): boolean {
    return email === ADMIN_EMAIL;
}

/**
 * Server-side check for admin authentication.
 * Throws an error or returns false if the user is not the admin.
 */
export async function checkAdminAuth() {
    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;

    if (!isAdmin(email)) {
        throw new Error("Forbidden: Admin access only");
    }

    return true;
}
