import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-stone-50 py-12 px-6">
            <div className="max-w-3xl mx-auto space-y-12">
                <Link href="/">
                    <Button variant="ghost" className="group text-slate-600 hover:text-indigo-600">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Button>
                </Link>

                <div className="space-y-4">
                    <div className="w-16 h-16 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-2xl">
                        <RefreshCw className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-bold font-serif text-slate-900 italic">Refund Policy</h1>
                    <p className="text-slate-500 font-medium">Last Updated: January 15, 2026</p>
                </div>

                <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed font-sans">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">1. Our Commitment</h2>
                        <p>
                            At FairShare, we want you to be completely satisfied with our service. We understand that co-parenting
                            can be stressful, and our goal is to alleviate some of that financial management burden.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">2. 14-Day Money-Back Guarantee</h2>
                        <p>
                            We offer a <strong>14-day money-back guarantee</strong> for all new subscriptions. If you are not satisfied
                            with FairShare for any reason, you can request a full refund within 14 days of your initial purchase.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">3. How to Request a Refund</h2>
                        <p>
                            To request a refund, please send an email to <a href="mailto:support@fairshare.app" className="text-indigo-600 hover:underline">support@fairshare.app</a> with
                            your account email address and the reason for your request. Refunds are processed through our payment
                            processor, Paddle, and will be issued to the original payment method.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">4. Cancellations</h2>
                        <p>
                            You can cancel your subscription at any time through your account settings. After cancellation, you
                            will continue to have access to your Pro features until the end of your current billing period.
                            No further charges will be made.
                        </p>
                    </section>

                    <section className="space-y-4 text-slate-500 italic">
                        <p>
                            Please note: Refunds requested after the 14-day period are generally not provided, but we may consider
                            them on a case-by-case basis in exceptional circumstances.
                        </p>
                    </section>

                    <section className="space-y-4 font-normal">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">5. Contact Us</h2>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
                            <p className="font-bold text-slate-900">Martin Vasko</p>
                            <p>Ulica Jozefa Adamca 9983/24</p>
                            <p>917 01 Trnava, Slovakia</p>
                            <p>Email: <a href="mailto:Getfairuse@proton.me" className="text-indigo-600 hover:underline">Getfairuse@proton.me</a></p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
