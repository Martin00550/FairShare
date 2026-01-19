import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShieldCheck, Scale, FileText, Lock, ArrowRight, HelpCircle } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FairShare",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "The stress-free way to manage shared co-parenting expenses and generate unilateral child support invoices.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "120"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is FairShare documentation court-ready?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. FairShare generates standardized, professional PDF invoices with attached receipt evidence and timestamps. Lawyers and judges prefer this 'digital paper trail' over messy text message threads or handwritten lists."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use FairShare even if my co-parent refuses to use it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. FairShare is designed for unilateral use. You can track expenses, store receipts, and send official invoices to your co-parent's email. They don't need an account for you to maintain a professional legal record."
        }
      },
      {
        "@type": "Question",
        "name": "How does the AI receipt scanning work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When you upload a photo or PDF of a receipt, our AI automatically extracts the date, vendor, category, and total amount. This reduces manual entry errors and ensures your records are consistently formatted."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data and my child's information secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Security is our priority. We use industry-standard encryption, secure authentication via Clerk, and protected cloud storage for all sensitive documents and data."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need an invite from my co-parent to start?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. You can start tracking and generating invoices immediately. FairShare empowers you to maintain your boundaries and records independently."
        }
      }
    ]
  };

  return (
    <div className="flex flex-col bg-stone-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">Unilateral Co-Parenting Tool</span>
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight text-slate-900 font-serif">
                Stop Texting Him For Money. <br className="hidden md:block" />
                Just Send The Invoice.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-lg">
                Don't let your money disappear in a text thread. Turn your shoebox of receipts into a clear audit trail that documents exactly what you are owed.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <SignedOut>
                <Link href="/sign-up">
                  <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] transition-transform shadow-xl shadow-indigo-200">
                    Create Free Invoice
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link href="/dashboard">
                  <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] transition-transform shadow-xl shadow-indigo-200">
                    Go to Dashboard
                  </Button>
                </Link>
              </SignedIn>
              <Link href="/sample-invoice">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold rounded-xl bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">
                  See Sample PDF
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              Professional Documentation Standard
            </div>
          </div>

          {/* Hero Visual - Problem-Only (The Text Chaos) */}
          <div className="relative group h-full min-h-[400px] lg:min-h-0">
            <div className="absolute -inset-4 bg-linear-to-tr from-red-500/10 to-transparent rounded-3xl blur-3xl group-hover:opacity-75 transition-opacity"></div>
            <div className="relative h-full bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-2 p-4 border-b border-slate-100 bg-slate-50">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse"></div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">The Reality of Text-Based Tracking</div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 flex flex-col gap-4 bg-slate-50/50">
                <div className="bg-white p-4 rounded-2xl shadow-sm text-sm self-start max-w-[85%] border border-slate-100">
                  Hey, did u see the bill for camp? It was $450
                </div>
                <div className="bg-indigo-100 p-4 rounded-2xl shadow-sm text-sm self-end max-w-[85%] text-indigo-700 font-medium">
                  Which camp? I didn&apos;t agree to that.
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm text-sm self-start max-w-[85%] border border-slate-100">
                  I sent u the screenshot 2 weeks ago! check ur messages
                </div>
                <div className="bg-indigo-100 p-4 rounded-2xl shadow-sm text-sm self-end max-w-[85%] text-indigo-700 font-medium">
                  I&apos;m busy, talk later. stop spamming me
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm text-sm self-start max-w-[85%] border border-slate-100 text-slate-400 italic">
                  ...
                </div>
              </div>

              {/* Footer - The Problem */}
              <div className="p-4 border-t border-red-100 bg-red-50/50 flex items-center justify-center gap-3">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="text-red-500 text-xs">✕</span>
                </div>
                <div className="text-sm font-bold text-red-600/80">Disorganized records. Hard to track. Easy to ignore.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Reality Numbers - Authority Proof */}
      <section className="w-full bg-slate-900 py-20 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col gap-4 mb-16 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-serif italic text-indigo-100">The Reality Numbers</h2>
            <p className="text-indigo-200/70 text-lg max-w-2xl">The data behind why professional documentation isn&apos;t just helpful—it&apos;s necessary.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-4 p-8 bg-white/5 rounded-3xl border border-white/10">
              <div className="text-6xl font-bold text-indigo-400 font-serif">43.5%</div>
              <p className="text-lg text-indigo-50 font-medium">Of custodial parents do not receive the full support they are owed.</p>
              <span className="text-xs text-indigo-300/50 uppercase tracking-widest mt-auto">Source: US Census Bureau</span>
            </div>
            <div className="flex flex-col gap-4 p-8 bg-white/5 rounded-3xl border border-white/10">
              <div className="text-6xl font-bold text-indigo-400 font-serif">$30B+</div>
              <p className="text-lg text-indigo-50 font-medium">In unpaid child support debt currently exceeds thirty billion dollars in the US.</p>
              <span className="text-xs text-indigo-300/50 uppercase tracking-widest mt-auto">Source: Office of Child Support Services</span>
            </div>
            <div className="flex flex-col gap-4 p-8 bg-white/5 rounded-3xl border border-white/10">
              <div className="text-6xl font-bold text-indigo-400 font-serif">$310k</div>
              <p className="text-lg text-indigo-50 font-medium">The estimated cost to raise a child today, excluding college expenses.</p>
              <span className="text-xs text-indigo-300/50 uppercase tracking-widest mt-auto">Source: Brookings Institute</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mechanism Proof Section */}
      <section id="logic" className="w-full bg-white py-24 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="flex flex-col gap-4 max-w-3xl">
            <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">Mechanism Proof</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-serif">The Architecture of Accountability</h2>
            <p className="text-slate-600 text-lg">FairShare isn&apos;t just an app; it&apos;s a documentation engine designed to meet the rigorous standards required for financial clarity.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Unilateral Integrity",
                desc: "Does not require co-parent participation. You maintain the record independently, ensuring it remains secure and organized."
              },
              {
                icon: Scale,
                title: "Legal Formatting",
                desc: "Exports use standardized accounting formats. We convert raw receipts into professional line-item evidence."
              },
              {
                icon: FileText,
                title: "Permanent History",
                desc: "Every invoice and attached receipt creates a permanent digital audit trail that proves when and what was shared, removing 'I never saw that' as an excuse."
              }
            ].map((item, i) => (
              <div key={i} className="bg-stone-50 p-8 rounded-2xl border border-slate-100 flex flex-col gap-4 hover:shadow-xl transition-shadow group">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-serif">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="works" className="w-full py-24">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          <div className="text-center flex flex-col gap-4 items-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-serif">3 Steps to Financial Peace</h2>
            <div className="h-1.5 w-24 bg-indigo-600 rounded-full"></div>
          </div>
          <div className="grid lg:grid-cols-3 gap-0 relative">
            {[
              {
                num: "1",
                title: "Scan Receipt",
                desc: "Snap a photo of any receipt. AI extracts the merchant, date, and total amount for you."
              },
              {
                num: "2",
                title: "Verify Details",
                desc: "Review the extracted data for accuracy. The original receipt is automatically attached as proof."
              },
              {
                num: "3",
                title: "Export & Send",
                desc: "Generate a professional PDF invoice. Email it directly or save it for your permanent legal records."
              }
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-6 p-8 relative z-10">
                <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg shadow-indigo-300">
                  {step.num}
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold mb-2 font-serif">{step.title}</h4>
                  <p className="text-slate-500">{step.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden lg:block absolute top-16 -right-4 w-full h-[2px] bg-slate-200 -z-10"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-indigo-900 text-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-16 relative z-10">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight font-serif">Simple, honest pricing</h2>
            <p className="text-indigo-200 text-xl">Start for free, upgrade when you realize how much peace of mind you have.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto text-left">
            {/* Free Plan */}
            <div className="bg-white/5 backdrop-blur-md p-10 rounded-3xl border border-white/10 space-y-8 flex flex-col hover:bg-white/10 transition-colors">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold font-serif">Standard</h3>
                <p className="text-indigo-200 text-sm">Everything you need to scan and track.</p>
                <div className="text-5xl font-bold pt-2">$0</div>
              </div>
              <ul className="space-y-4 flex-1">
                {[
                  "3 Free Invoices",
                  "AI Receipt Scanning",
                  "Cloud Shoebox Storage",
                  "Professional PDF Exports",
                  "History Tracking"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-indigo-100">
                    <CheckCircle className="w-5 h-5 text-indigo-400/80 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="w-full">
                <Button variant="outline" className="w-full h-12 rounded-xl bg-transparent border-white/20 hover:bg-white/10 text-white font-bold">
                  Start Scanning
                </Button>
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-white p-10 rounded-3xl space-y-8 flex flex-col text-slate-900 shadow-2xl relative scale-105 md:scale-110">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold font-serif">Pro Account</h3>
                <p className="text-slate-500 text-sm">For complete peace of mind and history.</p>
                <div className="text-5xl font-bold pt-2">$9<span className="text-xl font-normal text-slate-400">/mo</span></div>
              </div>
              <ul className="space-y-4 flex-1">
                {[
                  "Unlimited Invoices",
                  "AI Receipt Scanning",
                  "Cloud Shoebox Storage",
                  "Professional PDF Exports",
                  "History Tracking"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="w-full">
                <Button className="w-full h-12 rounded-xl shadow-lg shadow-indigo-100 font-bold bg-indigo-600 hover:bg-indigo-700">Upgrade to Pro</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,var(--color-indigo-500)_0%,transparent_50%)] opacity-30 pointer-events-none" />
      </section>

      {/* FAQ Section */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-serif italic">Questions And Answers</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Everything you need to know about professionalizing your co-parenting records.</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Is FairShare documentation court-ready?",
                a: "Yes. FairShare generates standardized, professional PDF invoices with attached receipt evidence and timestamps. Lawyers and judges prefer this 'digital paper trail' over messy text message threads or handwritten lists."
              },
              {
                q: "Can I use FairShare even if my co-parent refuses to use it?",
                a: "Absolutely. FairShare is designed for unilateral use. You can track expenses, store receipts, and send official invoices to your co-parent's email. They don't need an account for you to maintain a professional legal record."
              },
              {
                q: "How does the AI receipt scanning work?",
                a: "When you upload a photo or PDF of a receipt, our AI automatically extracts the date, vendor, category, and total amount. This reduces manual entry errors and ensures your records are consistently formatted."
              },
              {
                q: "Is my data and my child's information secure?",
                a: "Security is our priority. We use industry-standard encryption, secure authentication via Clerk, and protected cloud storage for all sensitive documents and data."
              },
              {
                q: "Do I need an invite from my co-parent to start?",
                a: "No. You can start tracking and generating invoices immediately. FairShare empowers you to maintain your boundaries and records independently."
              },
              {
                q: "What's the difference between the Free and Pro plans?",
                a: "The Standard plan is free and includes 3 invoices, AI scanning, and history tracking. Pro ($9/mo) gives you unlimited everything—unlimited invoices, unlimited history, and a full archive of your records for complete peace of mind."
              }
            ].map((faq, i) => (
              <details key={i} className="group bg-stone-50 rounded-2xl border border-slate-100 overflow-hidden transition-all hover:border-indigo-200">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <span className="text-lg font-bold font-serif pr-8">{faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center transition-transform group-open:rotate-180">
                    <ArrowRight className="w-4 h-4 text-indigo-600 rotate-90" />
                  </div>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed font-sans">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full max-w-6xl mx-auto px-6 py-24">
        <div className="bg-indigo-600 rounded-3xl p-12 lg:p-20 flex flex-col items-center text-center gap-8 shadow-2xl shadow-indigo-200 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-3xl relative z-10 font-serif">
            Take the emotion out of co-parenting expenses today.
          </h2>
          <p className="text-white/90 text-lg md:text-xl max-w-xl relative z-10">
            Join the co-parents trading text arguments for professional financial documentation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <SignedOut>
              <Link href="/sign-up">
                <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 hover:scale-105 transition-transform shadow-xl">
                  Start Your First Invoice
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-xl bg-white text-indigo-600 hover:bg-indigo-50 hover:scale-105 transition-transform shadow-xl">
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
            <Link href="#pricing">
              <Button size="lg" className="h-14 px-10 text-lg font-bold rounded-xl bg-indigo-700 border-2 border-white/30 text-white hover:bg-indigo-500 transition-colors">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-100 py-16">
        <div className="max-w-6xl w-full mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-indigo-600">
              <h2 className="text-lg font-bold tracking-tight font-serif">FairShare</h2>
            </div>
            <p className="text-sm text-slate-500">Professionalizing co-parenting finances for a calmer tomorrow.</p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400">Product</h4>
            <Link className="text-sm text-slate-600 hover:text-indigo-600" href="#logic">Features</Link>
            <Link className="text-sm text-slate-600 hover:text-indigo-600" href="#works">How it Works</Link>
            <Link className="text-sm text-slate-600 hover:text-indigo-600" href="#pricing">Pricing</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400">Resources</h4>
            <Link className="text-sm text-slate-600 hover:text-indigo-600" href="/refund">Refund Policy</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400">Company</h4>
            <Link className="text-sm text-slate-600 hover:text-indigo-600" href="/privacy">Privacy Policy</Link>
            <Link className="text-sm text-slate-600 hover:text-indigo-600" href="/terms">Terms of Service</Link>
            <Link className="text-sm text-slate-600 hover:text-indigo-600" href="/contact">Contact Us</Link>
          </div>
        </div>

        {/* Creem Compliance & Extra Info */}
        <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
            <div className="space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                <span className="font-bold text-slate-500 uppercase tracking-wider block mb-1">AI Disclosure & Affiliation</span>
                FairShare is an independent service built on top of advanced AI models to simplify expense management. Our platform offers a user-friendly interface to enhance usability and provide specialized documentation features. We are an independent product and are not affiliated with, endorsed by, or sponsored by Google, OpenAI, or any other model providers.
              </p>
              <div className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">
                © {new Date().getFullYear()} Martin Vasko • Trnava, Slovakia • IČO: 56440553
              </div>
            </div>
            <div className="flex md:justify-end">
              <div className="bg-slate-50 rounded-lg px-4 py-2 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block">Need help?</span>
                <a href="mailto:hello@getfairshare.cloud" className="text-sm font-bold text-indigo-600 hover:text-indigo-700">hello@getfairshare.cloud</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
