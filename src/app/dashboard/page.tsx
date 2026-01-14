import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { syncUserProfile } from "@/actions/sync-profile";
import { createClient } from "@supabase/supabase-js";
import { FileText, Receipt, TrendingUp, Zap, Plus, Camera, ChevronRight } from "lucide-react";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getDashboardData(userId: string) {
    const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("is_pro, lifetime_invoices_count")
        .eq("id", userId)
        .single();

    const { data: expenses } = await supabaseAdmin
        .from("expenses")
        .select("split_amount")
        .eq("user_id", userId)
        .eq("status", "pending");

    const totalOwed = expenses?.reduce((sum, e) => sum + (e.split_amount || 0), 0) || 0;

    const { data: recentExpenses } = await supabaseAdmin
        .from("expenses")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);

    return {
        invoicesUsed: profile?.lifetime_invoices_count || 0,
        isPro: profile?.is_pro || false,
        totalOwed,
        recentExpenses: recentExpenses || [],
    };
}

export default async function Dashboard() {
    const { userId } = await auth();
    const { currentUser } = await import("@clerk/nextjs/server");
    const user = await currentUser();

    if (!userId) {
        return (
            <div className="p-8 text-center">
                <p className="text-slate-500">Please sign in to view your dashboard.</p>
            </div>
        );
    }

    await syncUserProfile();
    const { invoicesUsed, isPro, totalOwed, recentExpenses } = await getDashboardData(userId);
    const invoicesLimit = 5;
    const hasExpenses = recentExpenses.length > 0;

    return (
        <div className="min-h-screen bg-stone-50 pb-24 md:pb-8">
            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
                        Welcome, {user?.firstName || "Friend"}
                    </h1>
                    <p className="text-slate-500 mt-1">
                        {hasExpenses ? "Here's your expense tracking overview." : "Get started by tracking your first shared expense."}
                    </p>
                </div>

                {!hasExpenses ? (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center bg-white rounded-xl border border-slate-200 p-12 shadow-sm mb-8">
                        <div className="relative mb-8">
                            <div className="bg-indigo-50 rounded-full p-8">
                                <Camera className="w-16 h-16 text-indigo-600" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-full p-2 border-4 border-white">
                                <Zap className="w-4 h-4 text-white" />
                            </div>
                        </div>
                        <div className="max-w-lg text-center space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900 font-serif">Let's organize your first expense.</h2>
                            <p className="text-slate-500 leading-relaxed">
                                FairShare uses AI to automatically extract totals and categories from your receipts. Stop manual entry and start tracking today.
                            </p>
                        </div>
                        <div className="mt-8 flex flex-col items-center gap-3">
                            <Link href="/expenses">
                                <Button size="lg" className="h-14 px-8 bg-indigo-600 hover:bg-indigo-700 text-lg font-bold shadow-lg shadow-indigo-200 gap-2">
                                    <Plus className="w-5 h-5" />
                                    Scan First Receipt
                                </Button>
                            </Link>
                            <p className="text-xs text-slate-400">Supported formats: JPG, PNG, PDF</p>
                        </div>
                    </div>
                ) : (
                    /* Stats & Activity */
                    <>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                            {/* Total Owed Card */}
                            <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 bg-indigo-100 rounded-lg">
                                        <TrendingUp className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Total Reimbursement</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl sm:text-5xl font-bold text-slate-900 font-serif">${totalOwed.toFixed(2)}</span>
                                    <span className="text-slate-500 font-medium">OWED TO YOU</span>
                                </div>
                                <p className="text-sm text-slate-400 mt-2">Across {recentExpenses.filter((e: any) => e.status === 'pending').length} pending expenses</p>
                            </div>

                            {/* Usage Card */}
                            <div className="bg-slate-900 rounded-xl p-6 text-white">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-2 bg-amber-500/20 rounded-lg">
                                        <Zap className="w-4 h-4 text-amber-400" />
                                    </div>
                                    <span className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                                        {isPro ? "Pro Account" : "Free Usage"}
                                    </span>
                                </div>
                                {!isPro ? (
                                    <>
                                        <div className="flex items-baseline gap-2 mb-3">
                                            <span className="text-3xl font-bold">{invoicesUsed}</span>
                                            <span className="text-slate-400">/ {invoicesLimit} invoices</span>
                                        </div>
                                        <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                                            <div
                                                className="h-full bg-linear-to-r from-indigo-500 to-violet-500 rounded-full"
                                                style={{ width: `${Math.min((invoicesUsed / invoicesLimit) * 100, 100)}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-indigo-400">{invoicesLimit - invoicesUsed} invoices remaining</p>
                                    </>
                                ) : (
                                    <div>
                                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full">UNLIMITED</span>
                                        <p className="text-sm text-slate-300 mt-3">Enjoy unlimited court-ready invoices.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mb-8">
                            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                                <h2 className="text-lg font-bold text-slate-900 font-serif">Recent Expenses</h2>
                                <Link href="/expenses" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                                    View All <ChevronRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {recentExpenses.map((expense: any) => (
                                    <div key={expense.id} className="px-6 py-4 flex justify-between items-center hover:bg-slate-50 transition-colors">
                                        <div>
                                            <p className="font-semibold text-slate-900">{expense.merchant}</p>
                                            <p className="text-sm text-slate-500">{new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-indigo-600">${expense.split_amount?.toFixed(2)}</p>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${expense.status === 'pending'
                                                ? 'bg-slate-100 text-slate-600'
                                                : 'bg-emerald-100 text-emerald-600'
                                                }`}>
                                                {expense.status === 'pending' ? 'Pending' : 'Invoiced'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/expenses" className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
                        <div className="bg-slate-100 rounded-lg h-12 w-12 flex items-center justify-center text-indigo-600">
                            <Receipt className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-slate-900 font-bold">Add New Expense</h3>
                            <p className="text-slate-500 text-sm">Scan a receipt or enter manually</p>
                        </div>
                    </Link>
                    <Link href="/invoices/new" className="flex gap-4 rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
                        <div className="bg-slate-100 rounded-lg h-12 w-12 flex items-center justify-center text-indigo-600">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-slate-900 font-bold">Generate Invoice</h3>
                            <p className="text-slate-500 text-sm">Create a professional PDF report</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
