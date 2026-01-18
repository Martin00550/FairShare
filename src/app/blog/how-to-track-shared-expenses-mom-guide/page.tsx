import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, AlertTriangle, ShieldCheck, Heart, LayoutList, ClipboardCheck, ArrowRight, HelpCircle, History } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "A Mom's Guide to Tracking Shared Expenses Your Ex Can't Ignore | FairShare",
    description: "Tired of your ex ignoring your requests for reimbursement? Learn how to document expenses for family court so you actually get paid.",
    openGraph: {
        title: "How to Document Shared Expenses for Family Court (A Mom's Guide)",
        description: "Spreadsheets aren't enough. Discover the 3-step documentation method that holds co-parents accountable.",
    },
};

export default function MomsGuideToExpensesPage() {
    return (
        <article className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
            {/* Hero Header */}
            <header className="relative w-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-500 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
                </div>
                <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-white transition-colors mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Blog
                    </Link>
                    <div className="flex items-center gap-4 text-sm mb-6">
                        <span className="bg-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full font-medium border border-indigo-500/30">
                            Strategy Guide
                        </span>
                        <span className="text-slate-400">January 24, 2026</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400">8 min read</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
                        The Mom&apos;s Guide to <span className="text-indigo-400">Undeniable</span> Tracking
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl font-light">
                        Stop the &quot;reimbursement dance&quot; and turn financial chaos into a professional, court-ready audit trail.
                    </p>
                </div>
            </header>

            {/* Content Body */}
            <div className="w-full max-w-4xl mx-auto px-6 py-16">

                {/* Section 1: Emotional Context */}
                <section className="mb-16">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center shrink-0 border border-rose-200">
                            <Heart className="w-6 h-6 text-rose-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                The Emotional Toll of the Chase
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full" />
                        </div>
                    </div>
                    <div className="pl-0 md:pl-16 space-y-4 text-lg text-slate-600 leading-relaxed font-light">
                        <p>
                            If you&apos;re a custodial parent, you know the &quot;reimbursement dance.&quot;
                            You pay for photos, the winter coat, or the emergency dentist. Then comes
                            the text. Then the reminder. Then the argument.
                        </p>
                        <div className="bg-white rounded-2xl border-l-4 border-rose-500 p-8 shadow-sm italic text-slate-700">
                            &quot;The $450 Camp Bill story happens to everyone. You pay it, they ignore the text,
                            and by the time you reach mediation, the money has practically disappeared
                            because you can&apos;t find the receipt.&quot;
                        </div>
                    </div>
                </section>

                {/* Section 2: Evidence Hierarchy */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">Evidence Standards</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                            The Hierarchy of Documentation
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-rose-200 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-rose-200">
                                <span className="text-white font-black">L1</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">Text Messages</h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-light">
                                &quot;I bought soccer gear, you owe $50.&quot; Just words. No receipt. Easily ignored or denied in court as hearsay.
                            </p>
                        </div>
                        <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-amber-200">
                                <span className="text-white font-black">L2</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">Spreadsheets</h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-light">
                                Numbers typed in a list with loose photos. Difficult for a clerk to audit and verify against merchant timestamps.
                            </p>
                        </div>
                        <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-200">
                                <ShieldCheck className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">FairShare Ledger</h3>
                            <p className="text-slate-600 text-sm leading-relaxed font-light">
                                Every expense itemized, totaled by percentage, with high-res merchant receipts appended directly to the report.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 3: The Method */}
                <section className="mb-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-indigo-100">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
                            <ClipboardCheck className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                The 3-Step Method
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                        </div>
                    </div>
                    <div className="pl-0 md:pl-16 space-y-4">
                        {[
                            { step: 1, title: "Immediate Scan", desc: "Don&apos;t store receipts in your wallet. Snap a photo in the car. FairShare extracts the data instantly." },
                            { step: 2, title: "Contextual Tagging", desc: "Tag it as Medical, School, or Sport. Most agreements have different splits for different categories." },
                            { step: 3, title: "Monthly Statements", desc: "Stop pinging for every $10. Send one crisp, professional statement at the end of the month." },
                        ].map(item => (
                            <div key={item.step} className="flex items-start gap-4 bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 transition-colors shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-bold shrink-0">
                                    {item.step}
                                </div>
                                <div className="pt-2">
                                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                                    <p className="text-slate-600 text-sm font-light leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 4: Warning Section */}
                <section className="mb-16 bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
                    <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                        <div className="shrink-0">
                            <div className="w-20 h-20 rounded-2xl bg-amber-500 flex items-center justify-center shadow-[0_0_50px_rgba(245,158,11,0.3)]">
                                <AlertTriangle className="w-10 h-10 text-slate-950" />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-4">A Note on the Burden of Proof</h3>
                            <p className="text-slate-400 text-lg leading-relaxed font-light">
                                In family court, typed numbers are just hearsay. Without the original merchant receipt
                                to clarify the <strong className="text-white font-bold italic underline">date, merchant, and individual items purchased</strong>,
                                any co-parent can challenge the validity of your records.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 5: FAQ */}
                <section className="mb-16">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0 border border-purple-200">
                            <HelpCircle className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                Shared Questions
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                        </div>
                    </div>
                    <div className="pl-0 md:pl-16 space-y-4">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm transition-all hover:shadow-md">
                            <p className="font-bold text-slate-900 mb-2">&quot;What if they say it wasn&apos;t agreed upon?&quot;</p>
                            <p className="text-slate-600 leading-relaxed text-sm font-light">
                                Keep your court order digitally. FairShare lets you add &quot;Notes&quot; to any invoice line to quote the specific clause from your agreement that covers that expense.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                    </div>
                    <div className="relative">
                        <div className="inline-block px-4 py-1.5 bg-indigo-500/30 rounded-full text-indigo-100 text-xs font-bold tracking-widest uppercase mb-6 border border-white/10 backdrop-blur-sm">
                            <ShieldCheck className="w-4 h-4 inline mr-2 text-emerald-400" /> Professional Documentation
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            Stop Being a Debt Collector
                        </h3>
                        <p className="text-indigo-200 mb-8 max-w-lg mx-auto font-light leading-relaxed">
                            Experience the relief of knowing your records are perfect. Shift from arguments to professional reports today for free.
                        </p>
                        <Link href="/">
                            <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-xl bg-white text-indigo-700 hover:bg-slate-100 shadow-2xl group transition-all hover:scale-105 active:scale-95">
                                Start Tracking Free
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </article>
    );
}
