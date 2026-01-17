"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";

// Initialize Supabase Admin for DB updates (cancellation status)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PADDLE_API_URL = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "production"
    ? "https://api.paddle.com"
    : "https://sandbox-api.paddle.com";

const PADDLE_API_KEY = process.env.PADDLE_API_KEY;

async function getPaddleHeaders() {
    if (!PADDLE_API_KEY) {
        throw new Error("PADDLE_API_KEY is not configured");
    }
    return {
        "Authorization": `Bearer ${PADDLE_API_KEY}`,
        "Content-Type": "application/json",
    };
}

export async function getSubscriptionUpdateUrl(subscriptionId: string) {
    // SECURITY: Verify subscription ownership before allowing update
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized" };

    const { data: profile, error: fetchError } = await supabaseAdmin
        .from("profiles")
        .select("paddle_subscription_id")
        .eq("id", userId)
        .single();

    if (fetchError || profile?.paddle_subscription_id !== subscriptionId) {
        return { error: "Subscription not found or unauthorized" };
    }

    try {
        const headers = await getPaddleHeaders();

        // request a transaction to update the subscription
        // For updating payment method, we create a transaction with update_payment_method intent
        // Reference: https://developer.paddle.com/guides/manage-subscriptions/update-payment-details

        // Actually, for Paddle Billing, the standard way is to generic a transaction 
        // that targets the subscription.

        // However, a simpler way for "Update Payment Method" in v2 is to 
        // direct them to a checkout with the subscription_id and update_payment_method 
        // option client-side, but generating a transaction for it is more robust.

        // Let's use the /subscriptions/{id}/update-payment-method-transaction endpoint if available,
        // OR just create a transaction with the subscription_id.

        // According to Paddle API docs for 'Update payment details':
        // GET /subscriptions/{subscription_id}/update-payment-method-transaction

        const response = await fetch(`${PADDLE_API_URL}/subscriptions/${subscriptionId}/update-payment-method-transaction`, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.detail || "Failed to create update transaction");
        }

        const data = await response.json();
        return { transactionId: data.data.id };

    } catch (error) {
        console.error("Error getting update URL:", error);
        throw error;
    }
}

export async function cancelSubscription(subscriptionId: string) {
    // SECURITY: Verify subscription ownership before allowing cancellation
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized" };

    const { data: profile, error: fetchError } = await supabaseAdmin
        .from("profiles")
        .select("paddle_subscription_id")
        .eq("id", userId)
        .single();

    if (fetchError || profile?.paddle_subscription_id !== subscriptionId) {
        return { error: "Subscription not found or unauthorized" };
    }

    try {
        const headers = await getPaddleHeaders();

        // Cancel subscription
        // POST /subscriptions/{id}/cancel
        const response = await fetch(`${PADDLE_API_URL}/subscriptions/${subscriptionId}/cancel`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                effective_from: "next_billing_period" // or "immediately"
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.detail || "Failed to cancel subscription");
        }

        const data = await response.json();

        // We can optionally update Supabase here immediately, 
        // but the webhook should handle it. 
        // For better UX, we might want to revalidate immediately.

        // Attempt to update local state optimistically or wait for webhook
        revalidatePath("/profile");

        return { success: true, status: data.data.status };

    } catch (error) {
        console.error("Error canceling subscription:", error);
        throw error;
    }
}
