import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Check, X, Trophy, ShieldCheck, Zap, Calendar, ArrowRight, Activity, Award, HelpCircle, MessageSquare, DollarSign, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The 5 Best Free Co-Parenting Apps in 2026 (Ranked by Features) | FairShare",
    description: "Looking for the best free co-parenting apps? We ranked the top 5 options for 2026 based on expense tracking, communication, and scheduling features.",
    openGraph: {
        title: "5 Best Free Co-Parenting Apps in 2026: A Complete Comparison",
        description: "Compare free co-parenting apps for communication, scheduling, and expense tracking. Find the right tool for your family.",
    },
};

const apps = [
    {
        rank: 1,
        name: "FairShare",
        rating: 5,
        bestFor: "Expense Tracking & Professional Invoices",
        description: "A specialized expense tracking tool for co-parents. FairShare focuses on one thing: creating professional, organized invoices from scanned receipts. It works unilaterally, meaning you don't need your co-parent's cooperation to use it.",
        pros: ["AI receipt scanning", "Organized PDF invoices", "No invite required (unilateral)", "Free tier with 3 invoices"],
        cons: ["No built-in messaging", "No shared calendar"],
        cta: "Try FairShare Free",
        href: "/",
        featured: true
    },
    {
        rank: 2,
        name: "AppClose",
        rating: 4,
        bestFor: "All-in-One Communication & Scheduling",
        description: "AppClose is a well-established free co-parenting app that combines messaging, a shared calendar, and basic expense logging. It requires both parents to create accounts and agree to use the platform.",
        pros: ["Free shared calendar", "In-app messaging", "Expense logging", "iOS and Android apps"],
        cons: ["Requires both parents to sign up", "Manual expense entry"],
        cta: "Visit AppClose",
        href: "https://appclose.com",
        featured: false
    },
    {
        rank: 3,
        name: "2Houses",
        rating: 4,
        bestFor: "Detailed Custody Scheduling",
        description: "2Houses offers a robust shared calendar, document storage, and expense management. It has a free tier with limited features and a paid tier for full access.",
        pros: ["Visual custody calendar", "Shared document storage", "Expense tracking", "Web and mobile apps"],
        cons: ["Full features require paid plan", "Both parents must join"],
        cta: "Visit 2Houses",
        href: "https://www.2houses.com",
        featured: false
    },
    {
        rank: 4,
        name: "Cozi",
        rating: 3,
        bestFor: "General Family Organization",
        description: "Cozi is a popular family organizer with a shared calendar and to-do lists. It's not designed specifically for co-parenting but is used by some separated families for basic scheduling.",
        pros: ["Free shared calendar", "To-do lists", "Widely used and reliable"],
        cons: ["Not designed for co-parenting", "No expense tracking", "No court documentation features"],
        cta: "Visit Cozi",
        href: "https://www.cozi.com",
        featured: false
    },
    {
        rank: 5,
        name: "OurFamilyWizard",
        rating: 3,
        bestFor: "Court-Ordered Communication (Premium)",
        description: "OurFamilyWizard is a premium co-parenting platform often ordered by courts for high-conflict cases. It offers comprehensive features but is not free.",
        pros: ["Court-recognized platform", "Comprehensive feature set", "ToneMeter for message review"],
        cons: ["Subscription required (~$150/year)", "Both parents must pay", "Complex interface"],
        cta: "Visit OurFamilyWizard",
        href: "https://www.ourfamilywizard.com",
        featured: false
    }
];

export default function BestFreeAppsPage() {
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
                            Rankings
                        </span>
                        <span className="text-slate-400">January 28, 2026</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-slate-400">10 min read</span>
                    </div>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
                        5 Co-Parenting Apps <span className="text-indigo-400">Compared</span> for 2026
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed max-w-2xl font-light">
                        A comparison of co-parenting tools available today, evaluated on communication, scheduling, and expense tracking features.
                    </p>
                </div>
            </header>

            {/* Content Body */}
            <div className="w-full max-w-4xl mx-auto px-6 py-16">

                {/* Section 1: Methodology */}
                <section className="mb-16">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 border border-amber-200">
                            <Trophy className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                How We Ranked These Apps
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                        </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed mb-6 pl-0 md:pl-16">
                        We evaluated each app based on four criteria relevant to separated and divorced parents:
                    </p>
                    <div className="pl-0 md:pl-16 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: DollarSign, label: "Expense Tracking", color: "text-emerald-600" },
                            { icon: MessageSquare, label: "Communication", color: "text-blue-500" },
                            { icon: Calendar, label: "Scheduling", color: "text-purple-500" },
                            { icon: ShieldCheck, label: "Court Readiness", color: "text-indigo-600" },
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl border border-slate-100 text-center shadow-sm">
                                <item.icon className={`w-6 h-6 mx-auto mb-2 ${item.color}`} />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 2: The Rankings */}
                <section className="mb-16 space-y-8">
                    {apps.map((app) => (
                        <div key={app.rank} className={`group bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ${app.featured ? 'border-indigo-300 ring-2 ring-indigo-100' : 'border-slate-200 hover:border-indigo-200'}`}>
                            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                                <div className="shrink-0">
                                    <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white ${app.featured ? 'bg-indigo-600' : 'bg-slate-900'}`}>
                                        <span className="text-[10px] font-bold uppercase opacity-50 leading-none">Rank</span>
                                        <span className="text-2xl font-black">{app.rank}</span>
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-2xl font-bold text-slate-900 leading-none">{app.name}</h3>
                                        {app.featured && (
                                            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                                                <Award className="w-3 h-3" /> Best for Expenses
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < app.rating ? 'text-amber-400 fill-current' : 'text-slate-200'}`} />
                                            ))}
                                        </div>
                                        <span className="text-xs text-slate-400 font-medium">| Best for: {app.bestFor}</span>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">
                                        {app.description}
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-2 flex items-center gap-1">
                                                <Check className="w-3 h-3" /> Pros
                                            </h4>
                                            <ul className="text-xs text-slate-500 space-y-1">
                                                {app.pros.map((p, j) => <li key={j}>• {p}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-rose-500 mb-2 flex items-center gap-1">
                                                <X className="w-3 h-3" /> Cons
                                            </h4>
                                            <ul className="text-xs text-slate-400 space-y-1 italic">
                                                {app.cons.map((c, j) => <li key={j}>• {c}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                    <Link href={app.href}>
                                        <Button className={`w-full h-10 rounded-xl font-bold text-xs ${app.featured ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-600 shadow-none'}`}>
                                            {app.cta}
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Section 3: The Verdict Visual */}
                <section className="mb-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 border border-indigo-100">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0">
                            <HelpCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                                Which App Is Right For You?
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/60 backdrop-blur rounded-2xl p-6 border border-indigo-200">
                            <div className="flex items-center gap-2 text-indigo-600 font-bold mb-4">
                                <Users className="w-5 h-5" />
                                Cooperative Co-Parents
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                If both of you are willing to use the same app, consider <strong>AppClose</strong> or <strong>2Houses</strong> for a full communication and scheduling suite.
                            </p>
                        </div>
                        <div className="bg-white/60 backdrop-blur rounded-2xl p-6 border border-slate-900 border-dashed">
                            <div className="flex items-center gap-2 text-slate-900 font-bold mb-4">
                                <ShieldCheck className="w-5 h-5" />
                                Need Expense Documentation
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                If your primary need is tracking shared expenses and creating professional invoices, <strong>FairShare</strong> is designed specifically for this, and works without your co-parent&apos;s involvement.
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
                            No Credit Card Required
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            Start Tracking Expenses for Free
                        </h3>
                        <p className="text-indigo-200 mb-8 max-w-lg mx-auto font-light">
                            FairShare offers a free tier with 3 invoices and full expense tracking. Create your first report in minutes.
                        </p>
                        <Link href="/">
                            <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-xl bg-white text-indigo-700 hover:bg-slate-100 shadow-2xl group transition-all hover:scale-105 active:scale-95 leading-none">
                                Try FairShare Free
                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </section>
            </div>
        </article>
    );
}
