import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Scale, Calculator, ShieldAlert, Zap, ArrowRight, HelpCircle, CheckCircle, XCircle, StepForward } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Best Free Alternative to TalkingParents for Expenses | FairShare",
    description: "Looking for a TalkingParents alternative? Compare features and pricing. FairShare offers free expense tracking without the monthly fee.",
    openGraph: {
        title: "Best Free Alternative to TalkingParents for Expense Tracking",
        description: "Compare TalkingParents vs FairShare. Get expense tracking without the premium price tag.",
    },
};

export default function TalkingParentsAlternativePage() {
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
                            Comparison
                        </span>
                        <span className="text-slate-400">January 18, 2026</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400">7 min read</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
                        The Best Free <span className="text-indigo-400">Alternative</span> to TalkingParents
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                        Want professional expense tracking without the monthly fee? Discover why FairShare is the smarter choice for modern co-parents.
                    </p>
                </div>
            </header>

            {/* Content Body */}
            <div className="w-full max-w-4xl mx-auto px-6 py-16">

                {/* Section 1: The Cost */}
                <section className="mb-16">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                            <Scale className="w-6 h-6 text-slate-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                The High Cost of Accountability
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full" />
                        </div>
                    </div>
                    <div className="pl-0 md:pl-16 space-y-4 text-lg text-slate-600 leading-relaxed">
                        <p>
                            Co-parenting in the digital age should be simpler, but for many, it has become a
                            logistical minefield. Apps like TalkingParents were early pioneers, promising
                            accountability to high-conflict interactions.
                        </p>
                        <p>
                            However, accountability shouldn&apos;t come with a steep monthly subscription that drains your household budget.
                        </p>
                    </div>
                </section>

                {/* Section 2: Comparison Grid */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">Comparison</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                            A Transparent Look at the Differences
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <Calculator className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">Pricing Strategy</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                TalkingParents limits free users to basic web access. FairShare provides full mobile expense tracking and PDF reports for free.
                            </p>
                        </div>
                        <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <ShieldAlert className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">The Invite Wall</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Legacy apps require both parents to consent. FairShare works &quot;unilaterally,&quot; meaning you can start tracking today alone.
                            </p>
                        </div>
                        <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <Zap className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">AI Automation</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Don&apos;t type numbers into a phone. FairShare&apos;s AI scans receipts and populates your ledger in seconds.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 3: Tables Section */}
                <section className="mb-16 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-indigo-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-indigo-100 italic">
                                    <th className="px-4 py-4 text-sm font-bold text-slate-700">Feature</th>
                                    <th className="px-4 py-4 text-sm font-bold text-indigo-600">FairShare</th>
                                    <th className="px-4 py-4 text-sm font-bold text-slate-400 text-right">TalkingParents</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-indigo-50">
                                {[
                                    { f: "Core Expense Tracking", fs: "Free & Unlimited", tp: "Limited Free" },
                                    { f: "AI Receipt Scanning", fs: true, tp: false },
                                    { f: "Organized PDF Reports", fs: true, tp: "Paid Only" },
                                    { f: "Mobile App Access", fs: "Free", tp: "Paid Only" },
                                    { f: "Unilateral (Solo) Use", fs: true, tp: false },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-white/50 transition-colors">
                                        <td className="px-4 py-4 text-slate-700 font-medium">{row.f}</td>
                                        <td className="px-4 py-4 text-emerald-600 font-bold">
                                            {row.fs === true ? "✓" : row.fs}
                                        </td>
                                        <td className="px-4 py-4 text-slate-400 text-right">
                                            {row.tp === false ? "✗" : row.tp}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Section 4: Workflow */}
                <section className="mb-16">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-200">
                            <StepForward className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                3 Steps to Transition Today
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                        </div>
                    </div>
                    <div className="pl-0 md:pl-16 space-y-4">
                        {[
                            { step: 1, title: "Export History", desc: "Download your existing records from TalkingParents as a PDF for safekeeping." },
                            { step: 2, title: "Setup FairShare", desc: "Set your reimbursement split (e.g., 50/50) in under 30 seconds." },
                            { step: 3, title: "Scan & Store", desc: "Snap photos of your receipts and generate your first professional invoice." },
                        ].map(item => (
                            <div key={item.step} className="flex items-start gap-4 bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-300 transition-colors shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold shrink-0">
                                    {item.step}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
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
                            <p className="font-bold text-slate-900 mb-2">&quot;Is FairShare legally admissible?&quot;</p>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                FairShare generates professional PDF invoices with attached receipt images and clear timestamps. This structured format can provide clear documentation for legal proceedings. Always consult with your attorney about specific evidence requirements in your jurisdiction.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm transition-all hover:shadow-md">
                            <p className="font-bold text-slate-900 mb-2">&quot;Do I have to invite my ex?&quot;</p>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                No. You can manage everything privately and they only see the professional reports you choose to send via email or text.
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
                            Professional Reports: Included
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            Professional Tracking for Free
                        </h3>
                        <p className="text-indigo-200 mb-8 max-w-lg mx-auto">
                            Join the parents who have traded complex subscriptions for simple, professional invoicing.
                        </p>
                        <Link href="/">
                            <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 shadow-2xl group transition-all hover:scale-105 active:scale-95">
                                Get Started Free
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </article>
    );
}
