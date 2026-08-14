"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { sanitizeError } from "@/lib/security";


export async function markInvoiceAsPaid(invoiceId: string) {
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized" };

    try {
        // 1. Update Invoice Status
        const { error: invoiceError } = await supabaseAdmin
            .from("invoices")
            .update({ status: "paid" })
            .eq("id", invoiceId)
            .eq("user_id", userId);

        if (invoiceError) throw new Error(invoiceError.message);

        // 2. Update Linked Expenses Status
        // Expenses should have been linked to this invoice via invoice_id
        const { error: expensesError } = await supabaseAdmin
            .from("expenses")
            .update({ status: "paid" })
            .eq("invoice_id", invoiceId)
            .eq("user_id", userId);

        if (expensesError) throw new Error(expensesError.message);

        revalidatePath("/invoices");
        revalidatePath("/dashboard");
        revalidatePath("/profile");

        return { success: true };
    } catch (error: unknown) {
        console.error("Error marking invoice as paid:", error);
        return { error: sanitizeError(error, "Failed to mark as paid") };
    }
}
