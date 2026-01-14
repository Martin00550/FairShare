import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { Lock } from "lucide-react";
import Link from "next/link";
import { Scanner } from "@/features/scanner/components/scanner";
import { ExpenseTable } from "@/components/expense-table";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getExpenses(userId: string) {
    const { data: expenses, error } = await supabaseAdmin
        .from("expenses")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching expenses:", error);
        return [];
    }
    return expenses || [];
}

async function getSplitPercentage(userId: string) {
    const { data } = await supabaseAdmin
        .from("profiles")
        .select("split_percentage")
        .eq("id", userId)
        .single();

    return data?.split_percentage || 50;
}

export default async function ExpensesPage() {
    const { userId } = await auth();

    if (!userId) {
        return (
            <div className="p-8 text-center">
                <p className="text-slate-500">Please sign in to view your expenses.</p>
            </div>
        );
    }

    const expenses = await getExpenses(userId);
    const splitPercentage = await getSplitPercentage(userId);

    return (
        <div className="min-h-screen bg-stone-50 pb-24 md:pb-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">Expenses</h1>
                        <p className="text-slate-500 mt-1">Track shared expenses. Your split: <span className="font-semibold text-indigo-600">{splitPercentage}%</span></p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/invoices/new">
                            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                                Generate PDF Report
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Scanner Section */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 font-serif">Add New Expense</h2>
                    <Scanner />
                </div>

                {/* Expenses Table */}
                <ExpenseTable expenses={expenses} />

                {/* Security Note */}
                <div className="mt-8 flex items-center justify-center p-6 border border-dashed border-slate-200 rounded-xl bg-white/50">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                            <Lock className="w-5 h-5 text-slate-500" />
                        </div>
                        <h3 className="text-slate-900 font-bold">Secure Cloud Storage</h3>
                        <p className="text-slate-500 text-sm">
                            All receipts are backed up securely in the cloud.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
