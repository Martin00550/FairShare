import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog - Co-Parenting Tips & Expense Tracking Guides",
    description: "Expert guides on co-parenting expenses, unilateral tracking, and getting reimbursed. Learn how to document expenses professionally.",
};

// Blog posts data - in a real app, this would come from a CMS or MDX files
const blogPosts = [
    {
        slug: "why-text-messages-fail",
        title: "Why Text Messages Fail: Move From Arguments to Invoices",
        excerpt: "Stop relying on screenshots. Learn why professional documentation is superior for family court evidence.",
        date: "2026-02-02",
        category: "Advice",
        readTime: "5 min read",
    },
    {
        slug: "best-free-co-parenting-apps-2026",
        title: "The 5 Best Free Co-Parenting Apps in 2026 (Ranked)",
        excerpt: "Don't pay for premium features you don't need. We ranked the top free apps based on expense tracking and court readiness.",
        date: "2026-01-28",
        category: "Review",
        readTime: "6 min read",
    },
    {
        slug: "how-to-track-shared-expenses-mom-guide",
        title: "A Mom's Guide to Tracking Shared Expenses Your Ex Can't Ignore",
        excerpt: "The 'Shoebox Strategy' doesn't work. Discover the 3-step method to creating an undeniable financial audit trail.",
        date: "2026-01-24",
        category: "Guide",
        readTime: "8 min read",
    },
    {
        slug: "what-is-unilateral-co-parenting",
        title: "What Is Unilateral Co-Parenting? Apps That Don't Require Your Ex",
        excerpt: "Learn about unilateral co-parenting tools that let you track expenses without needing permission or cooperation from your co-parent.",
        date: "2026-01-20",
        category: "Guide",
        readTime: "7 min read",
    },
    {
        slug: "best-free-alternative-to-talkingparents",
        title: "The Best Free Alternative to TalkingParents for Expense Tracking",
        excerpt: "Looking for a TalkingParents alternative that won't break the bank? Discover why FairShare is the top choice for expense-focused co-parents.",
        date: "2026-01-18",
        category: "Comparison",
        readTime: "5 min read",
    },
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-stone-50">
            {/* Hero */}
            <section className="w-full max-w-4xl mx-auto px-6 py-16">
                <div className="text-center space-y-4">
                    <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">
                        Resources
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-serif text-slate-900">
                        The FairShare Blog
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Expert guides on managing shared expenses, documenting costs, and getting reimbursed without the drama.
                    </p>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="w-full max-w-4xl mx-auto px-6 pb-24">
                <div className="grid gap-8">
                    {blogPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group block bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-xl hover:border-indigo-200 transition-all"
                        >
                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                                    {post.category}
                                </span>
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                            </div>
                            <h2 className="text-2xl font-bold font-serif text-slate-900 group-hover:text-indigo-600 transition-colors mb-3">
                                {post.title}
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                {post.excerpt}
                            </p>
                            <div className="mt-6 text-indigo-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                                Read Article
                                <span>→</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
