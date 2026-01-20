import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { Settings, Shield, CreditCard, User, Mail, Calendar, CheckCircle, Percent } from "lucide-react";
import { SplitSettings } from "@/components/split-settings";
import { PaymentSettings } from "@/components/payment-settings";
import { UpgradeButton } from "@/components/upgrade-button";
import { ManageSubscription } from "@/components/manage-subscription";
import { updateSplitPercentage, updatePaymentInstructions } from "@/actions/profile-settings";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function getProfileData(userId: string) {
    // Get profile data
    const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("is_pro, lifetime_invoices_count, split_percentage, payment_instructions, paddle_subscription_id")
        .eq("id", userId)
        .single();

    // Get expense stats
    const { data: expenses } = await supabaseAdmin
        .from("expenses")
        .select("split_amount")
        .eq("user_id", userId);

    const totalTracked = expenses?.reduce((sum, e) => sum + (e.split_amount || 0), 0) || 0;
    const receiptCount = expenses?.length || 0;

    return {
        isPro: profile?.is_pro || false,
        invoicesUsed: profile?.lifetime_invoices_count || 0,
        splitPercentage: profile?.split_percentage || 50,
        paymentInstructions: profile?.payment_instructions || "",
        paddleSubscriptionId: profile?.paddle_subscription_id || "",
        receiptCount,
        totalTracked,
    };
}

export default async function ProfilePage() {
    const user = await currentUser();

    if (!user) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <p className="text-slate-500">Please sign in to view your profile.</p>
            </div>
        );
    }

    const { isPro, invoicesUsed, splitPercentage, paymentInstructions, paddleSubscriptionId, receiptCount, totalTracked } = await getProfileData(user.id);

    async function handleSplitSave(newSplit: number) {
        "use server";
        const { revalidatePath } = await import("next/cache");
        await updateSplitPercentage(newSplit);
        revalidatePath("/profile");
    }

    async function handlePaymentInstructionsSave(instructions: string) {
        "use server";
        const { revalidatePath } = await import("next/cache");
        await updatePaymentInstructions(instructions);
        revalidatePath("/profile");
    }

    return (
        <div className="min-h-screen bg-stone-50 pb-24 md:pb-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">Account Settings</h1>
                    <p className="text-slate-500 mt-1">Manage your profile and preferences.</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
                    <div className="flex items-start gap-6">
                        <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold font-serif shrink-0">
                            {user.firstName?.[0] || user.emailAddresses?.[0]?.emailAddress?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl font-bold text-slate-900 font-serif">
                                {user.firstName} {user.lastName}
                            </h2>
                            <div className="flex items-center gap-2 text-slate-500 mt-1">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm truncate">{user.emailAddresses?.[0]?.emailAddress}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 mt-1">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">Member since {new Date(user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Split Percentage Settings */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mb-6">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                        <Percent className="w-5 h-5 text-slate-400" />
                        <h3 className="font-bold text-slate-900">Expense Split Settings</h3>
                    </div>
                    <div className="p-6">
                        <SplitSettings currentSplit={splitPercentage} onSave={handleSplitSave} />
                    </div>
                </div>

                {/* Payment Instructions Settings */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mb-6">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-slate-400" />
                        <h3 className="font-bold text-slate-900">Payment Preferences</h3>
                    </div>
                    <div className="p-6">
                        <PaymentSettings currentInstructions={paymentInstructions} onSave={handlePaymentInstructionsSave} />
                    </div>
                </div>

                {/* Subscription Card */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mb-6">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-slate-400" />
                        <h3 className="font-bold text-slate-900">Subscription</h3>
                    </div>
                    <div className="p-6">
                        {isPro ? (
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-900">Pro Account</span>
                                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">ACTIVE</span>
                                    </div>
                                    <p className="text-sm text-slate-500 mt-1">Unlimited invoices, history, and organized reports.</p>
                                    <div className="mt-4 flex flex-col gap-2">
                                        {paddleSubscriptionId ? (
                                            <>
                                                <ManageSubscription subscriptionId={paddleSubscriptionId} />
                                                <p className="text-[11px] text-slate-400">
                                                    Update payment methods or manage your subscription at any time.
                                                </p>
                                            </>
                                        ) : (
                                            <p className="text-sm text-slate-500 italic">
                                                Manage your subscription via the email link provided by Paddle.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                                    <User className="w-6 h-6 text-slate-500" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-slate-900">Free Account</span>
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">{invoicesUsed}/3 INVOICES</span>
                                    </div>
                                    <p className="text-sm text-slate-500 mt-1">Upgrade to Pro for unlimited invoices.</p>
                                    <UpgradeButton />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Privacy Card */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm mb-6">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                        <Shield className="w-5 h-5 text-slate-400" />
                        <h3 className="font-bold text-slate-900">Privacy & Security</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-slate-100">
                            <div>
                                <p className="font-semibold text-slate-900">Privacy Guard</p>
                                <p className="text-sm text-slate-500">Your co-parent is NOT notified of your activity.</p>
                            </div>
                            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">ACTIVE</div>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <p className="font-semibold text-slate-900">Data Encryption</p>
                                <p className="text-sm text-slate-500">All data encrypted with AES-256.</p>
                            </div>
                            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">ENABLED</div>
                        </div>
                    </div>
                </div>

                {/* Usage Stats */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
                        <Settings className="w-5 h-5 text-slate-400" />
                        <h3 className="font-bold text-slate-900">Usage Statistics</h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-indigo-600 font-serif">{invoicesUsed}</p>
                                <p className="text-sm text-slate-500 mt-1">Invoices</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-slate-900 font-serif">{receiptCount}</p>
                                <p className="text-sm text-slate-500 mt-1">Receipts</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-emerald-600 font-serif">${totalTracked.toFixed(0)}</p>
                                <p className="text-sm text-slate-500 mt-1">Tracked</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-indigo-600 font-serif">{splitPercentage}%</p>
                                <p className="text-sm text-slate-500 mt-1">Your Split</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
