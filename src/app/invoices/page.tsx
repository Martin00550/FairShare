import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { Plus, FileText, Clock, CheckCircle } from "lucide-react";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// For now, we'll track invoices by counting distinct "invoiced" expense batches
// In a full implementation, you'd have a separate invoices table
async function getInvoiceHistory(userId: string) {
    // Get all invoiced expenses grouped by date as a simple invoice proxy
    const { data: expenses } = await supabaseAdmin
        .from("expenses")
        .select("id, date, merchant, split_amount, status, created_at")
        .eq("user_id", userId)
        .eq("status", "invoiced")
        .order("created_at", { ascending: false });

    if (!expenses || expenses.length === 0) {
        return [];
    }

    // Group by date as a simple invoice representation
    const invoiceMap = new Map<string, { items: number; total: number; date: string }>();
    expenses.forEach(expense => {
        const dateKey = new Date(expense.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        if (invoiceMap.has(dateKey)) {
            const existing = invoiceMap.get(dateKey)!;
            existing.items += 1;
            existing.total += expense.split_amount || 0;
        } else {
            invoiceMap.set(dateKey, {
                items: 1,
                total: expense.split_amount || 0,
                date: dateKey
            });
        }
    });

    // Convert to array with generated invoice IDs
    return Array.from(invoiceMap.entries()).map(([date, data], index) => ({
        id: `INV-${new Date().getFullYear()}-${String(index + 1).padStart(3, '0')}`,
        date: data.date,
        items: data.items,
        total: data.total,
        status: "paid" as const
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
                    /* Invoice List */
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200">
                                    <th className="px-6 py-4">Invoice #</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 hidden sm:table-cell">Items</th>
                                    <th className="px-6 py-4 text-right">Total</th>
                                    <th className="px-6 py-4 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {invoices.map((invoice) => (
                                    <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-slate-900">{invoice.id}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{invoice.date}</td>
                                        <td className="px-6 py-4 text-sm text-slate-500 hidden sm:table-cell">{invoice.items} expenses</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="font-bold text-indigo-600">${invoice.total.toFixed(2)}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600">
                                                <CheckCircle className="w-3 h-3" /> Generated
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
