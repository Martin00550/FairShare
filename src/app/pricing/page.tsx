"use client";

import { useState } from "react";
import { Check, Zap, Shield, FileText, Sparkles, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePaddle } from "@/components/paddle-provider";
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
    const { isLoaded, openCheckout } = usePaddle();
    const { user, isSignedIn } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const handleUpgrade = () => {
        if (!isSignedIn) {
            // Redirect to sign up
            window.location.href = "/sign-up?redirect=/pricing";
            return;
        }

        setIsLoading(true);

        const proPriceId = process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID;

        if (!proPriceId) {
            console.error("NEXT_PUBLIC_PADDLE_PRO_PRICE_ID not configured");
            alert("Payment system not configured. Please contact support.");
            setIsLoading(false);
            return;
        }

        openCheckout({
            items: [{ priceId: proPriceId, quantity: 1 }],
            customer: {
                email: user?.emailAddresses?.[0]?.emailAddress,
            },
            customData: {
                user_id: user?.id || "",
            },
            settings: {
                successUrl: `${window.location.origin}/dashboard?upgrade=success`,
                displayMode: "overlay",
            },
        });

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-stone-50 pb-24 md:pb-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif mb-4">Simple, Transparent Pricing</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto italic">
                        Everything you need to keep your shared parenting finances transparent and court-ready.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Free Plan */}
                    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col transition-all hover:shadow-md">
                        <div className="p-8 border-b border-slate-100">
                            <h2 className="text-xl font-bold text-slate-900 font-serif mb-2">Free Starter</h2>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-slate-900">$0</span>
                                <span className="text-slate-500">forever</span>
                            </div>
                            <p className="text-slate-500 mt-4 text-sm">Perfect for occasional expense tracking.</p>
                        </div>
                        <div className="p-8 flex-1">
                            <ul className="space-y-4 mb-8">
                                {features.free.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-slate-600 text-sm">
                                        <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/dashboard">
                                <Button variant="outline" className="w-full h-12 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50">
                                    Get Started Free
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-white rounded-3xl border-2 border-indigo-500 overflow-hidden shadow-xl flex flex-col relative scale-105 z-10">
                        <div className="absolute top-4 right-4 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                            <Zap className="w-3 h-3 fill-current" />
                            MOST POPULAR
                        </div>

                        <div className="p-8 border-b border-slate-100 bg-indigo-50/30">
                            <h2 className="text-xl font-bold text-slate-900 font-serif mb-2">FairShare Pro</h2>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-slate-900">$9</span>
                                <span className="text-slate-500">/per month</span>
                            </div>
                            <p className="text-slate-500 mt-4 text-sm">Full access to simplify your co-parenting life.</p>
                        </div>

                        <div className="p-8 flex-1">
                            <ul className="space-y-4 mb-8">
                                {features.pro.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-slate-900 text-sm font-medium">
                                        <div className="w-5 h-5 bg-emerald-50 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                onClick={handleUpgrade}
                                disabled={!isLoaded || isLoading}
                                className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 font-bold rounded-xl shadow-lg shadow-indigo-900/50"
                            >
                                {isLoading ? "Loading..." : "Upgrade to Pro"}
                            </Button>

                            <p className="text-center text-xs text-slate-500 mt-3">
                                Cancel anytime
                            </p>
                        </div>
                    </div>
                </div>

                {/* Benefits Section */}
                <div className="mt-24 grid sm:grid-cols-3 gap-12 text-center max-w-5xl mx-auto">
                    <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                            <Shield className="w-7 h-7 text-indigo-500" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 font-serif text-lg">Court Ready</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Generate professional, audit-proof reports that lawyers and mediators trust.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                            <Sparkles className="w-7 h-7 text-indigo-500" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 font-serif text-lg">AI Categorization</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Stop manual entry. Let our AI sort your expenses into court-recognized categories.
                        </p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6">
                            <Receipt className="w-7 h-7 text-indigo-500" />
                        </div>
                        <h3 className="font-bold text-slate-900 mb-2 font-serif text-lg">Tax Compliant</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Full breakdown of totals for your annual tax and child support documentation.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
