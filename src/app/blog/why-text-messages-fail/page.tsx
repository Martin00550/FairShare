import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquareX, Search, FileWarning, HeartCrack, FileCheck, ArrowRight, Lightbulb, HelpCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Why Text Messages Fail in Family Court: Move to Invoices | FairShare",
    description: "Stop relying on screenshots of text messages. Learn why specialized communication apps and invoices are superior for family court evidence.",
    openGraph: {
        title: "Why You Should Stop Texting for Child Support Money",
        description: "Texts get lost, deleted, and taken out of context. Professional documentation works. Here is the difference.",
    },
};

export default function WhyTextsFailPage() {
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
                            Advice
                        </span>
                        <span className="text-slate-400">February 2, 2026</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400">8 min read</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
                        Why Text Messages <span className="text-indigo-400">Fail</span> in Family Court
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
                        &quot;I sent you a text about it two weeks ago!&quot; If you find yourself saying
                        this to your co-parent (or your lawyer), it&apos;s time to change your system.
                    </p>
                </div>
            </header>

            {/* Content */}
            <div className="w-full max-w-4xl mx-auto px-6 py-16">

                {/* Intro Section */}
                <section className="mb-16">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                            <MessageSquareX className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                The &quot;Screenshot Defense&quot; Isn&apos;t a Strategy
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
                        </div>
                    </div>
                    <div className="pl-0 md:pl-16 space-y-4 text-lg text-slate-600 leading-relaxed">
                        <p>
                            If you walk into a lawyer&apos;s office with a 100-page packet of printed screenshots
                            from your iPhone, you are already losing. Not because your claims are wrong,
                            but because your <strong className="text-slate-900">presentation is exhausting.</strong>
                        </p>
                        <p>
                            In the modern age, we assume that a text message is an &quot;official&quot; record.
                            And while it is evidence, it is often <strong className="text-slate-900">the weakest form of evidence</strong> available to you.
                        </p>
                    </div>
                </section>

                {/* 3 Reasons Section */}
                <section className="mb-16">
                    <div className="text-center mb-10">
                        <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">The Problem</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                            3 Reasons Text Messages Fail as Evidence
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <Search className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">The Searchability Problem</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                How do you find the text from 6 months ago where your co-parent said
                                &quot;Yes, I&apos;ll pay half for the braces&quot;? In a fast-paced legal hearing, scrolling is fatal.
                            </p>
                        </div>
                        <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <FileWarning className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">No Verifiable Proof</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                A text that says &quot;I spent $200 at the dentist&quot; is just words. Without the
                                <strong> merchant receipt</strong> attached, it is your word against theirs.
                            </p>
                        </div>
                        <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                <HeartCrack className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3">Emotional Context Wall</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Texts are mixed with personal arguments. When a judge sees your financial request
                                sandwiched between drama, it lowers your credibility.
                            </p>
                        </div>
                    </div>
                </section>

                {/* The Solution Visual */}
                <section className="mb-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-indigo-100">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
                            <FileCheck className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                The Noise-to-Signal Ratio
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/60 backdrop-blur rounded-2xl p-6 border border-red-200">
                            <div className="flex items-center gap-2 text-red-600 font-bold mb-4">
                                <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-sm">✗</span>
                                Text Thread Evidence
                            </div>
                            <ul className="space-y-2 text-slate-600 text-sm">
                                <li>• Arguments and sarcasm mixed in</li>
                                <li>• Personal drama clouds the data</li>
                                <li>• Judge has to &quot;hunt&quot; for facts</li>
                                <li>• Easy to take out of context</li>
                            </ul>
                        </div>
                        <div className="bg-white/60 backdrop-blur rounded-2xl p-6 border border-emerald-200">
                            <div className="flex items-center gap-2 text-emerald-600 font-bold mb-4">
                                <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-sm">✓</span>
                                FairShare Invoice
                            </div>
                            <ul className="space-y-2 text-slate-600 text-sm">
                                <li>• <strong>Merchant & Date:</strong> Hard proof of the event</li>
                                <li>• <strong>Math Ledger:</strong> Clear breakdown of shares</li>
                                <li>• <strong>Receipt Image:</strong> Attached to every line</li>
                                <li>• No noise. No drama. Just facts.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Strategy Section */}
                <section className="mb-16">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                            <Lightbulb className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                The &quot;Business-First&quot; Workflow
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
                        </div>
                    </div>
                    <p className="text-lg text-slate-600 mb-8 pl-0 md:pl-16">
                        Switching from texting to professional invoicing shifts the power dynamic.
                        You are no longer &quot;asking for a favor.&quot; You are <strong className="text-slate-900">&quot;issuing a statement.&quot;</strong>
                    </p>
                    <div className="pl-0 md:pl-16 space-y-4">
                        {[
                            { step: 1, title: "Stop Texting Costs", desc: "When an expense happens, don't text. Just scan it into FairShare." },
                            { step: 2, title: "Bundle Weekly/Monthly", desc: "Don't ping them for every $5 charge. Bundle them into a clean $145 invoice." },
                            { step: 3, title: "Send the PDF", desc: "Email the report. If they ignore it, send the same report labeled 'SECOND NOTICE' a week later." },
                        ].map(item => (
                            <div key={item.step} className="flex items-start gap-4 bg-white rounded-xl border border-slate-200 p-5 hover:border-emerald-300 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold shrink-0">
                                    {item.step}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{item.title}</h4>
                                    <p className="text-slate-600 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="mb-16">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                            <HelpCircle className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                FAQ: Managing the Transition
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                        </div>
                    </div>
                    <div className="pl-0 md:pl-16 bg-white rounded-2xl border border-slate-200 p-6">
                        <p className="font-bold text-slate-900 mb-2">&quot;What if they get mad that I&apos;m sending an invoice?&quot;</p>
                        <p className="text-slate-600 leading-relaxed">
                            They might. High-conflict individuals often prefer the &quot;messiness&quot; of texts because it offers more chances for engagement.
                            Simply state: <em>&quot;To keep our records better organized for the court, I&apos;ll be sending all reimbursement requests via monthly PDF reports from now on.&quot;</em>
                        </p>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                    </div>
                    <div className="relative">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            Stop the Texting Chaos
                        </h3>
                        <p className="text-indigo-200 mb-8 max-w-lg mx-auto">
                            Experience the peace of mind that comes with professional, court-ready documentation.
                        </p>
                        <Link href="/">
                            <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 shadow-2xl group">
                                Build Your First Professional Report
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </article>
    );
}
