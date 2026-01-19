"use client";

import { Check, Zap, Shield, FileText, Sparkles, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreemCheckout } from "@creem_io/nextjs";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const features = {
    free: [
        "3 Free Invoices",
        "AI Receipt Scanning",
        "Cloud Shoebox Storage",
        "Professional PDF Exports",
        "History Tracking",
    ],
    pro: [
        "Unlimited Invoices",
        "AI Receipt Scanning",
        "Cloud Shoebox Storage",
        "Professional PDF Exports",
        "History Tracking",
    ],
};

export default function PricingPage() {
    const { user, isSignedIn } = useUser();
    const productId = process.env.NEXT_PUBLIC_CREEM_PRODUCT_ID;

    return (
        <div className="min-h-screen bg-stone-50 pb-24 md:pb-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-full mb-4">
                        <Sparkles className="w-4 h-4" />
                        Simple Pricing
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif mb-4">
                        Choose Your Plan
                    </h1>
                    <p className="text-slate-500 max-w-xl mx-auto">
                        Start free with 5 invoices. Upgrade to Pro for unlimited access to all features.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Plan */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                                <Receipt className="w-6 h-6 text-slate-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">Free</h2>
                                <p className="text-sm text-slate-500">Get started today</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <span className="text-4xl font-bold text-slate-900">$0</span>
                            <span className="text-slate-500 ml-2">forever</span>
                        </div>

                        <ul className="space-y-3 mb-8">
                            {features.free.map((feature) => (
                                <li key={feature} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                    <span className="text-slate-700">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {isSignedIn ? (
                            <Link href="/dashboard">
                                <Button variant="outline" className="w-full h-12 font-bold rounded-xl">
                                    Go to Dashboard
                                </Button>
                            </Link>
                        ) : (
                            <Link href="/sign-up">
                                <Button variant="outline" className="w-full h-12 font-bold rounded-xl">
                                    Get Started Free
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-slate-900 rounded-2xl p-8 shadow-xl relative overflow-hidden">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">Pro</h2>
                                <p className="text-sm text-slate-400">Unlimited everything</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <span className="text-4xl font-bold text-white">$9</span>
                            <span className="text-slate-400 ml-2">/month</span>
                        </div>

                        <ul className="space-y-3 mb-8">
                            {features.pro.map((feature) => (
                                <li key={feature} className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                                    <span className="text-slate-300">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        {isSignedIn && productId ? (
                            <CreemCheckout
                                productId={productId}
                                successUrl={typeof window !== 'undefined' ? `${window.location.origin}/dashboard?upgrade=success` : '/dashboard?upgrade=success'}
                                referenceId={user?.id || ""}
                                customer={{
                                    email: user?.emailAddresses?.[0]?.emailAddress || "",
                                    name: user?.fullName || "",
                                }}
                            >
                                <Button
                                    className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 font-bold rounded-xl shadow-lg shadow-indigo-900/50"
                                >
                                    Upgrade to Pro
                                </Button>
                            </CreemCheckout>
                        ) : (
                            <Link href="/sign-up?redirect=/pricing">
                                <Button
                                    className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 font-bold rounded-xl shadow-lg shadow-indigo-900/50"
                                >
                                    Sign Up to Upgrade
                                </Button>
                            </Link>
                        )}

                        <p className="text-center text-xs text-slate-500 mt-3">
                            Cancel anytime
                        </p>

                        {/* Decorative glow */}
                        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-600/30 rounded-full blur-3xl" />
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-16 text-center">
                    <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            <span className="text-sm font-medium">256-bit SSL Encryption</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            <span className="text-sm font-medium">Court-Ready Documents</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            <span className="text-sm font-medium">Instant PDF Generation</span>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="mt-20 max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 font-serif text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 mb-2">Can I cancel anytime?</h3>
                            <p className="text-slate-500 text-sm">
                                Yes! You can cancel your Pro subscription at any time. You'll continue to have access until the end of your billing period.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 mb-2">What happens to my data if I cancel?</h3>
                            <p className="text-slate-500 text-sm">
                                Your expenses and documents remain safely stored. You just won't be able to generate new invoices beyond the free limit.
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 mb-2">Is my information secure?</h3>
                            <p className="text-slate-500 text-sm">
                                Absolutely. We use bank-level encryption and your co-parent never sees your activity or login information.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* AI Disclosure */}
            <div className="max-w-3xl mx-auto px-6 pb-20">
                <p className="text-center text-xs text-slate-400 leading-relaxed">
                    <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1 text-[10px]">AI Disclosure</span>
                    FairShare is an independent service built on top of advanced AI models. We are an independent product and are not affiliated with, endorsed by, or sponsored by Google, OpenAI, or any other model providers.
                </p>
            </div>
        </div>
    );
}
