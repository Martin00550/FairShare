import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function verifyPaddleSignature(payload: string, signature: string, secret: string) {
    const [tsPart, hPart] = signature.split(";");
    const ts = tsPart.split("=")[1];
    const h = hPart.split("=")[1];

    const signedPayload = `${ts}:${payload}`;
    const computedH = crypto
        .createHmac("sha256", secret)
        .update(signedPayload)
        .digest("hex");

    return computedH === h;
}

interface PaddleWebhookEvent {
    event_type: string;
    data: any;
}

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.PADDLE_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        console.error("PADDLE_WEBHOOK_SECRET is not set");
        return new Response("Webhook secret not configured", { status: 500 });
    }

    const headerPayload = await headers();
    const signature = headerPayload.get("paddle-signature");

    if (!signature) {
        return new Response("Missing Paddle signature", { status: 400 });
    }

    const payload = await req.text();

    const isValid = verifyPaddleSignature(payload, signature, WEBHOOK_SECRET);

    if (!isValid) {
        console.error("Invalid Paddle webhook signature");
        return new Response("Invalid signature", { status: 400 });
    }

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

                const { error } = await supabaseAdmin
                    .from("profiles")
                    .update({
                        subscription_status: status || "canceled",
                        is_pro: status === "active" || status === "trialing",
                    })
                    .eq("id", userId);

                if (error) {
                    console.error("Error updating subscription status:", error);
                    return new Response("Error updating profile", { status: 500 });
                }

                console.log(`User ${userId} subscription status updated to ${status}`);
                break;
            }

            default:
                console.log(`Unhandled Paddle event type: ${eventType}`);
        }

        return new Response("Webhook processed", { status: 200 });

    } catch (error) {
        console.error("Error processing Paddle webhook:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
