import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { syncUserProfile } from "@/actions/sync-profile";
import { supabaseAdmin } from "@/lib/supabase";
import { FileText, Receipt, TrendingUp, Zap, Plus, Camera, ChevronRight } from "lucide-react";



async function getDashboardData(userId: string) {
    const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("is_pro, lifetime_invoices_count, payment_instructions")
        .eq("id", userId)
        .single();

    const { data: expenses } = await supabaseAdmin
        .from("expenses")
        .select(`
            split_amount,
            invoices!inner (
                status
            )
        `)
        .eq("user_id", userId)
        .eq("invoices.status", "paid");

    const totalCollected = expenses?.reduce((sum, e) => sum + (e.split_amount || 0), 0) || 0;

    const { data: recentExpenses } = await supabaseAdmin
        .from("expenses")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);

    return {
        invoicesUsed: profile?.lifetime_invoices_count || 0,
        isPro: profile?.is_pro || false,
        paymentInstructionsSet: !!profile?.payment_instructions,
        totalCollected,
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
    const { invoicesUsed, isPro, paymentInstructionsSet, totalCollected, recentExpenses } = await getDashboardData(userId);
    const invoicesLimit = 3;
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

                {/* Missing Payment Instructions Warning */}
                {!paymentInstructionsSet && (
                    <div className="mb-8 bg-amber-50 border border-amber-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-in fade-in slide-in-from-top-4 duration-700">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shrink-0">
                                <Zap className="w-6 h-6" />
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="font-bold text-slate-900">Finish setting up your profile</h3>
                                <p className="text-sm text-slate-600">Add your payment instructions so co-parents know how to reimburse you.</p>
                            </div>
                        </div>
                        <Link href="/profile">
                            <Button variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-100 font-bold px-6 h-11 rounded-xl whitespace-nowrap">
                                Setup Payment Info
                                <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </Link>
                    </div>
                )}

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
                                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Total Collected</span>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl sm:text-5xl font-bold text-slate-900 font-serif">${totalCollected.toFixed(2)}</span>
                                    <span className="text-slate-500 font-medium">REIMBURSED</span>
                                </div>
                                <p className="text-sm text-slate-400 mt-2">Lifetime reimbursement received</p>
                            </div>

                            {/* Usage Card */}
                            <div className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-indigo-700 to-indigo-900 rounded-3xl p-6 text-white shadow-2xl shadow-indigo-200 group">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700" />
                                <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl" />

                                <div className="relative z-10 flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center shadow-inner">
                                        <Zap className="w-6 h-6 text-amber-300 fill-amber-300" />
                                    </div>
                                    <span className="text-lg font-black text-white uppercase tracking-[0.2em] drop-shadow-md">
                                        {isPro ? "Pro Account" : "Free Usage"}
                                    </span>
                                </div>

                                <div className="relative z-10 space-y-6">
                                    {isPro ? (
                                        <>
                                            <div className="inline-flex items-center px-4 py-1.5 bg-emerald-400/20 backdrop-blur-md text-emerald-300 text-[10px] font-black rounded-full border border-emerald-400/30 shadow-sm uppercase tracking-widest">
                                                Unlimited
                                            </div>
                            <p className="text-[15px] text-indigo-50 font-medium leading-relaxed max-w-[240px]">
                                                Enjoy unlimited <span className="font-bold text-white underline underline-offset-4 decoration-indigo-400/50">invoices</span>, unlimited history, and organized reports.
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-xs font-black uppercase tracking-widest text-indigo-200">Usage Limit</span>
                                                    <span className="font-black text-xl text-white">{invoicesUsed}<span className="text-indigo-300 text-sm ml-1">/ {invoicesLimit}</span></span>
                                                </div>
                                                <div className="w-full h-3 bg-white/10 backdrop-blur-sm rounded-full overflow-hidden border border-white/5">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(255,255,255,0.3)] ${invoicesUsed >= invoicesLimit ? 'bg-rose-500' :
                                                            invoicesUsed >= 2 ? 'bg-amber-400' :
                                                                'bg-emerald-400'
                                                            }`}
                                                        style={{ width: `${Math.min((invoicesUsed / invoicesLimit) * 100, 100)}%` }}
                                                    />
                                                </div>
                                            </div>

                                            {invoicesUsed >= invoicesLimit ? (
                                                <Link href="/pricing" className="block">
                                                    <Button className="w-full h-12 bg-white text-indigo-700 hover:bg-indigo-50 font-black rounded-xl shadow-xl transition-all active:scale-95 group/btn">
                                                        UPGRADE FOR UNLIMITED
                                                        <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Button>
                                                </Link>
                                            ) : (
                                                <p className="text-[14px] text-indigo-100 font-medium leading-relaxed">
                                                    Upgrade to Pro for <span className="font-bold text-white underline underline-offset-4 decoration-white/30">unlimited invoices</span>.
                                                </p>
                                            )}
                                        </>
                                    )}
                                </div>
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
                                            <p className="text-sm text-slate-500">{new Date(expense.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-indigo-600">${expense.split_amount?.toFixed(2)}</p>
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${expense.status === 'pending'
                                                ? 'bg-slate-100 text-slate-600'
                                                : 'bg-blue-100 text-blue-600'
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
                            <p className="text-slate-500 text-sm">Create a professional PDF invoice</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
