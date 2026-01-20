"use server";

import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const PADDLE_API_URL = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === "production"
    ? "https://api.paddle.com"
    : "https://sandbox-api.paddle.com";

async function getPaddleHeaders() {
    const apiKey = process.env.PADDLE_API_KEY;
    if (!apiKey) {
        throw new Error("PADDLE_API_KEY is not set");
    }

    return {
        "Authorization": `Bearer ${apiKey}`,
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

        revalidatePath("/profile");

        return { success: true, status: data.data.status };

    } catch (error) {
        console.error("Error canceling subscription:", error);
        throw error;
    }
}
