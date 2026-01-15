"use server";

import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SaveInvoiceParams {
    pdfBuffer: number[]; // Serialized buffer for server action
    expenseIds: string[];
    totalDue: number;
}

export async function saveGeneratedInvoice({ pdfBuffer, expenseIds, totalDue }: SaveInvoiceParams) {
    const { userId } = await auth();
    if (!userId) return { error: "Unauthorized" };

    try {
        // 1. Generate unique filename and invoice number
        const timestamp = Date.now();
        const filename = `${userId}/INV-${timestamp}.pdf`;
        const invoiceNumber = `INV-${new Date().getFullYear()}-${timestamp % 100000}`;

        // 2. Upload PDF to Supabase Storage
        const buffer = Buffer.from(pdfBuffer);
        const { data: uploadData, error: uploadError } = await supabaseAdmin
            .storage
            .from("invoices")
            .upload(filename, buffer, {
                contentType: "application/pdf",
                cacheControl: "3600",
                upsert: false
            });

        if (uploadError) {
            console.error("Storage upload error:", uploadError);
            return { error: "Failed to upload invoice PDF" };
        }

        // 3. Get public URL
        const { data: urlData } = supabaseAdmin
            .storage
            .from("invoices")
            .getPublicUrl(filename);

        const pdfUrl = urlData.publicUrl;

        // 4. Create invoice record in DB
        const { data: invoiceData, error: dbError } = await supabaseAdmin
            .from("invoices")
            .insert({
                user_id: userId,
                total_due: totalDue,
                pdf_url: pdfUrl,
                invoice_number: invoiceNumber,
                status: 'generated'
            })
            .select()
            .single();

        if (dbError) {
            console.error("Database invoice error:", dbError);
            // Cleanup storage if DB fails
            await supabaseAdmin.storage.from("invoices").remove([filename]);
            return { error: "Failed to create invoice record" };
        }

        const invoiceId = invoiceData.id;

        // 5. Update expenses to link to this invoice and set status to 'invoiced'
        const { error: updateError } = await supabaseAdmin
            .from("expenses")
            .update({
                status: 'invoiced',
                invoice_id: invoiceId
            })
            .in("id", expenseIds);

        if (updateError) {
            console.error("Expense update error:", updateError);
            return { error: "Failed to link expenses to invoice" };
        }

        revalidatePath("/invoices");
        revalidatePath("/dashboard");

        return { success: true, invoiceId, pdfUrl };

    } catch (error: any) {
        console.error("Save invoice error:", error);
        return { error: error.message || "An unexpected error occurred" };
    }
}
