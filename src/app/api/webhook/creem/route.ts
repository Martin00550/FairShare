import { Webhook } from '@creem_io/nextjs';
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const POST = Webhook({
    webhookSecret: process.env.CREEM_WEBHOOK_SECRET!,
    onGrantAccess: async ({ customer, metadata }) => {
        const userId = metadata?.referenceId as string;
        if (!userId) {
            console.error("No referenceId (userId) in metadata");
            return;
        }

        const { error } = await supabaseAdmin
            .from("profiles")
            .update({
                is_pro: true,
                subscription_status: "active",
                creem_customer_id: customer.id,
            })
            .eq("id", userId);

        if (error) {
            console.error("Error updating profile to Pro:", error);
        } else {
            console.log(`User ${userId} upgraded to Pro via Creem (Customer ID: ${customer.id})`);
        }
    },
    onRevokeAccess: async ({ customer, metadata }) => {
        const userId = metadata?.referenceId as string;
        if (!userId) {
            console.error("No referenceId (userId) in metadata");
            return;
        }

        const { error } = await supabaseAdmin
            .from("profiles")
            .update({
                is_pro: false,
                subscription_status: "canceled",
            })
            .eq("id", userId);

        if (error) {
            console.error("Error revoking Pro access:", error);
        } else {
            console.log(`User ${userId} Pro access revoked via Creem`);
        }
    },
    onCheckoutCompleted: async ({ customer, product, metadata }) => {
        console.log(`${customer?.email} completed checkout for ${product?.name}`);
    }
});
