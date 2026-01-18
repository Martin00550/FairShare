import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowLeft, Hourglass, Shield, CheckCircle, UserCheck, Milestone, ArrowRight, Lightbulb, Quote, HelpCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "What Is Unilateral Co-Parenting? Tools That Don't Require Your Ex | FairShare",
    description: "Dealing with a difficult or uncooperative ex? Learn how unilateral co-parenting tools let you track expenses and document everything without their permission.",
    openGraph: {
        title: "Unilateral Co-Parenting: How to Manage Expenses Without Your Ex's Cooperation",
        description: "Don't let an uncooperative ex stop your organization. Discover the power of unilateral co-parenting tools.",
    },
};

export default function UnilateralCoParentingPage() {
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
                            Strategy
                        </span>
                        <span className="text-slate-400">January 20, 2026</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400">9 min read</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
                        What Is <span className="text-indigo-400">Unilateral</span> Co-Parenting?
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                        When communication breaks down, you need a system that doesn&apos;t require their permission to work. Welcome to the &quot;Solo Fortress&quot; approach.
                    </p>
                </div>
            </header>

            {/* Content Body */}
            <div className="w-full max-w-4xl mx-auto px-6 py-16">

                {/* Section 1: Definition */}
                <section className="mb-16">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                            <Shield className="w-6 h-6 text-slate-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                Moving From Negotiation to Documentation
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full" />
                        </div>
                    </div>
                    <div className="pl-0 md:pl-16 space-y-4 text-lg text-slate-600 leading-relaxed">
                        <p>
                            Traditional co-parenting apps focus on &quot;collaboration.&quot; But what happens
                            when your co-parent refuses to collaborate? What if they won&apos;t even join the app?
                        </p>
                        <p>
                            <strong>Unilateral co-parenting</strong> is the practice of maintaining your own
                            impenetrable records, reports, and schedules without requiring the other parent&apos;s
                            cooperation. You stop waiting for them to play fair and start building your own defense.
                        </p>
                    </div>
                </section>

                {/* Section 2: Why it Wins Grid */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">Solo Fortress</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                            Why Solo Tracking Wins
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <Hourglass className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">No Waiting</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Stop stalking their inbox for an invite acceptance. Start your ledger today, and they only see the final, professional results.
                            </p>
                        </div>
                        <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-red-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <UserCheck className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">Reduced Engagement</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Every direct interaction is a chance for a new argument. Unilateral tools allow you to send statements, not &quot;chats.&quot;
                            </p>
                        </div>
                        <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <Milestone className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">Court-First Design</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Legacy apps try to be a &quot;Social Network&quot; for parents. FairShare is a &quot;Financial Ledger&quot; for the justice system.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Section 3: Grey Rock Highlight */}
                <section className="mb-16 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-3xl p-8 md:p-12 border border-indigo-100">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
                            <Lightbulb className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                The &quot;Grey Rock&quot; Method
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <p className="text-lg text-slate-700 leading-relaxed font-serif italic">
                                &quot;In a high-conflict divorce, your best defense is to become as Boring as a Grey Rock.&quot;
                            </p>
                            <p className="text-sm text-slate-500">
                                This psychological strategy aims to minimize attention from difficult personalities by providing no emotional ammo.
                            </p>
                        </div>
                        <div className="bg-white/60 backdrop-blur rounded-2xl p-6 border border-indigo-200">
                            <div className="flex items-center gap-2 text-indigo-600 font-bold mb-4">
                                <Quote className="w-5 h-5" />
                                Clinical Communication
                            </div>
                            <ul className="space-y-2 text-slate-600 text-xs leading-relaxed italic">
                                <li>• &quot;I won&apos;t be debating that. Please see the attached report.&quot;</li>
                                <li>• &quot;The financial ledger is updated. You can view the receipts there.&quot;</li>
                                <li>• &quot;Our court order requirements are fulfilled in this statement.&quot;</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Section 4: Workflow Steps */}
                <section className="mb-16">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center shrink-0 border border-teal-200">
                            <CheckCircle className="w-6 h-6 text-teal-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                Solo Fortress Checklist
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full" />
                        </div>
                    </div>
                    <div className="pl-0 md:pl-16 space-y-4">
                        {[
                            { step: 1, title: "Private Repository", desc: "Don&apos;t share your password. Keep your FairShare account as your private sanctuary of truth." },
                            { step: 2, title: "Zero Wait-Time", desc: "Don&apos;t ask for permission to track an expense. Scan it, tag it, and move on." },
                            { step: 3, title: "Formal Issuance", desc: "Send a monthly report. If they ignore it, the date-stamped PDF becomes your exhibit A." },
                        ].map(item => (
                            <div key={item.step} className="flex items-start gap-4 bg-white rounded-xl border border-slate-200 p-5 hover:border-indigo-300 transition-colors shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shrink-0 shadow-md">
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
                            <p className="font-bold text-slate-900 mb-2">&quot;What if the court ordered us to use a specific app?&quot;</p>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                Use the ordered app for messaging, but use FairShare for your own financial sanity. You can always export FairShare data and upload the PDF file into the court-ordered app as an attachment.
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                    </div>
                    <div className="relative">
                        <div className="inline-block px-4 py-1.5 bg-indigo-500/30 rounded-full text-indigo-100 text-xs font-bold tracking-widest uppercase mb-6 border border-white/10 backdrop-blur-sm">
                            <ShieldCheck className="w-4 h-4 inline mr-2" /> Unilateral Fortress
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            Take Control Today
                        </h3>
                        <p className="text-indigo-200 mb-8 max-w-lg mx-auto font-light">
                            Stop waiting for cooperation that might never come. Build your professional records for free.
                        </p>
                        <Link href="/">
                            <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 shadow-2xl group transition-all hover:scale-105 active:scale-95 text-white italic">
                                Build Your Solo Fortress
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </article>
    );
}
