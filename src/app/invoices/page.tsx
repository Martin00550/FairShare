import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { Plus, FileText } from "lucide-react";
import { InvoiceStatusActions } from "@/components/invoice-status-actions";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// For now, we'll track invoices by counting distinct "invoiced" expense batches
// In a full implementation, you'd have a separate invoices table
async function getInvoiceHistory(userId: string) {
    const { data: invoices, error } = await supabaseAdmin
        .from("invoices")
        .select("id, invoice_number, created_at, total_due, pdf_url, status")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching invoices:", error);
        return [];
    }

    return (invoices || []).map(inv => ({
        id: inv.id,
        invoiceNumber: inv.invoice_number || `INV-${inv.id}`,
        date: new Date(inv.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        total: inv.total_due || 0,
        pdfUrl: inv.pdf_url,
        status: inv.status || "generated"
    }));
}

export default async function InvoicesPage() {
    const { userId } = await auth();

    if (!userId) {
        return (
            <div className="p-8 text-center">
                <p className="text-slate-500">Please sign in to view your invoices.</p>
            </div>
        );
    }

    const invoices = await getInvoiceHistory(userId);
    const hasInvoices = invoices.length > 0;

    return (
        <div className="min-h-screen bg-stone-50 pb-24 md:pb-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">Invoices</h1>
                        <p className="text-slate-500 mt-1">View and manage your generated invoices.</p>
                    </div>
                    <Link href="/invoices/new">
                        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
                            <Plus className="w-4 h-4" />
                            Create New Invoice
                        </Button>
                    </Link>
                </div>

                {!hasInvoices ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-slate-200 p-12 shadow-sm">
                        <div className="bg-slate-100 rounded-full p-6 mb-6">
                            <FileText className="w-12 h-12 text-slate-400" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900 font-serif mb-2">No invoices yet</h2>
                        <p className="text-slate-500 text-center max-w-sm mb-6">
                            Create your first professional PDF invoice to request reimbursement from your co-parent.
                        </p>
                        <Link href="/invoices/new">
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                Start Your First Invoice
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Mobile Card Layout */}
                        <div className="md:hidden space-y-4">
                            {invoices.map((invoice) => (
                                <div key={invoice.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <span className="font-semibold text-slate-900 block">{invoice.invoiceNumber}</span>
                                            <span className="text-sm text-slate-500">{invoice.date}</span>
                                        </div>
                                        <span className="font-bold text-indigo-600 text-lg">${Number(invoice.total).toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                                        <InvoiceStatusActions
                                            invoiceId={invoice.id}
                                            status={invoice.status}
                                        />
                                        {invoice.pdfUrl && (
                                            <a
                                                href={invoice.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                            >
                                                <FileText className="w-4 h-4" />
                                                View PDF
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Desktop Table Layout */}
                        <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200">
                                        <th className="px-6 py-4">Invoice #</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4 text-right">Total</th>
                                        <th className="px-6 py-4 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {invoices.map((invoice) => (
                                        <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-slate-900">{invoice.invoiceNumber}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">{invoice.date}</td>
                                            <td className="px-6 py-4 text-right">
                                                <span className="font-bold text-indigo-600">${Number(invoice.total).toFixed(2)}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-3">
                                                    <InvoiceStatusActions
                                                        invoiceId={invoice.id}
                                                        status={invoice.status}
                                                    />
                                                    {invoice.pdfUrl && (
                                                        <a
                                                            href={invoice.pdfUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-indigo-600 hover:text-indigo-800"
                                                        >
                                                            <FileText className="w-5 h-5" />
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
