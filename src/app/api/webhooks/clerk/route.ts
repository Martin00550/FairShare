"use server";

import { Webhook } from "svix";
import { headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface WebhookEvent {
    data: {
        id: string;
        email_addresses?: Array<{ email_address: string }>;
        first_name?: string;
        last_name?: string;
    };
    type: string;
}

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        console.error("CLERK_WEBHOOK_SECRET is not set");
        return new Response("Webhook secret not configured", { status: 500 });
    }

    // Get the headers
    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Missing svix headers", { status: 400 });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with the secret
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Webhook verification failed:", err);
        return new Response("Invalid signature", { status: 400 });
    }

    // Handle the webhook events
    const eventType = evt.type;

    try {
        switch (eventType) {
            case "user.created": {
                const { id, email_addresses } = evt.data;
                const email = email_addresses?.[0]?.email_address || "no-email@fairshare.app";

                // Create profile in Supabase
                const { error } = await supabaseAdmin
                    .from("profiles")
                    .upsert(
                        {
                            id,
                            email,
                            is_pro: false,
                            lifetime_invoices_count: 0,
                            subscription_status: "free",
                        },
                        { onConflict: "id" }
                    );

                if (error) {
                    console.error("Error creating profile:", error);
                    return new Response("Error creating profile", { status: 500 });
                }

                console.log(`Profile created for user ${id}`);
                break;
            }

            case "user.updated": {
                const { id, email_addresses } = evt.data;
                const email = email_addresses?.[0]?.email_address;

                if (email) {
                    const { error } = await supabaseAdmin
                        .from("profiles")
                        .update({ email })
                        .eq("id", id);

                    if (error) {
                        console.error("Error updating profile:", error);
                        return new Response("Error updating profile", { status: 500 });
                    }

                    console.log(`Profile updated for user ${id}`);
                }
                break;
            }

            case "user.deleted": {
                const { id } = evt.data;

                // Delete user's expenses first (due to foreign key constraint)
                await supabaseAdmin
                    .from("expenses")
                    .delete()
                    .eq("user_id", id);

                // Delete user's invoices
                await supabaseAdmin
                    .from("invoices")
                    .delete()
                    .eq("user_id", id);

                // Delete the profile
                const { error } = await supabaseAdmin
                    .from("profiles")
                    .delete()
                    .eq("id", id);

                if (error) {
                    console.error("Error deleting profile:", error);
                    return new Response("Error deleting profile", { status: 500 });
                }

                console.log(`Profile and data deleted for user ${id}`);
                break;
            }

            default:
                console.log(`Unhandled event type: ${eventType}`);
        }

        return new Response("Webhook processed successfully", { status: 200 });
    } catch (error) {
        console.error("Webhook processing error:", error);
        return new Response("Webhook processing failed", { status: 500 });
    }
}
