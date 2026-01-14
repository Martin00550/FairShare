import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface PaddleWebhookEvent {
    event_type: string;
    data: {
        id: string;
        customer_id: string;
        status?: string;
        custom_data?: {
            user_id?: string;
        };
        items?: Array<{
            price: {
                id: string;
            };
        }>;
    };
}

// Verify Paddle webhook signature
function verifyPaddleSignature(payload: string, signature: string, secret: string): boolean {
    try {
        // Paddle uses ts;h1= format for signatures
        const parts = signature.split(";");
        const ts = parts.find(p => p.startsWith("ts="))?.split("=")[1];
        const h1 = parts.find(p => p.startsWith("h1="))?.split("=")[1];

        if (!ts || !h1) {
            console.error("Invalid signature format");
            return false;
        }

        // Create the signed payload
        const signedPayload = `${ts}:${payload}`;

        // Compute HMAC
        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(signedPayload)
            .digest("hex");

        return crypto.timingSafeEqual(
            Buffer.from(h1),
            Buffer.from(expectedSignature)
        );
    } catch (error) {
        console.error("Signature verification error:", error);
        return false;
    }
}

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.PADDLE_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        console.error("PADDLE_WEBHOOK_SECRET is not set");
        return new Response("Webhook secret not configured", { status: 500 });
    }

    // Get the signature header
    const headerPayload = await headers();
    const signature = headerPayload.get("paddle-signature");

    if (!signature) {
        return new Response("Missing Paddle signature", { status: 400 });
    }

    // Get the raw body
    const payload = await req.text();

    // Verify signature
    const isValid = verifyPaddleSignature(payload, signature, WEBHOOK_SECRET);

    if (!isValid) {
        console.error("Invalid Paddle webhook signature");
        return new Response("Invalid signature", { status: 400 });
    }

    // Parse the event
    let event: PaddleWebhookEvent;
    try {
        event = JSON.parse(payload);
    } catch (error) {
        console.error("Failed to parse webhook payload:", error);
        return new Response("Invalid JSON", { status: 400 });
    }

    const eventType = event.event_type;

    try {
        switch (eventType) {
            case "subscription.created":
            case "subscription.activated": {
                const { customer_id, id: subscription_id, custom_data } = event.data;
                const userId = custom_data?.user_id;

                if (!userId) {
                    console.error("No user_id in custom_data");
                    return new Response("Missing user_id", { status: 400 });
                }

                // Update user to Pro status
                const { error } = await supabaseAdmin
                    .from("profiles")
                    .update({
                        is_pro: true,
                        paddle_customer_id: customer_id,
                        paddle_subscription_id: subscription_id,
                        subscription_status: "active",
                    })
                    .eq("id", userId);

                if (error) {
                    console.error("Error updating profile to Pro:", error);
                    return new Response("Error updating profile", { status: 500 });
                }

                console.log(`User ${userId} upgraded to Pro`);
                break;
            }

            case "subscription.canceled":
            case "subscription.past_due": {
                const { custom_data, status } = event.data;
                const userId = custom_data?.user_id;

                if (!userId) {
                    console.error("No user_id in custom_data");
                    return new Response("Missing user_id", { status: 400 });
                }

                // Update subscription status but keep Pro until period ends
                const { error } = await supabaseAdmin
                    .from("profiles")
                    .update({
                        subscription_status: status || "canceled",
                    })
                    .eq("id", userId);

                if (error) {
                    console.error("Error updating subscription status:", error);
                    return new Response("Error updating profile", { status: 500 });
                }

                console.log(`User ${userId} subscription status: ${status}`);
                break;
            }

            case "subscription.paused":
            case "subscription.updated": {
                const { custom_data, status } = event.data;
                const userId = custom_data?.user_id;

                if (userId && status) {
                    await supabaseAdmin
                        .from("profiles")
                        .update({
                            subscription_status: status,
                            is_pro: status === "active",
                        })
                        .eq("id", userId);
                }
                break;
            }

            default:
                console.log(`Unhandled Paddle event type: ${eventType}`);
        }

        return new Response("Webhook processed successfully", { status: 200 });
    } catch (error) {
        console.error("Paddle webhook processing error:", error);
        return new Response("Webhook processing failed", { status: 500 });
    }
}
