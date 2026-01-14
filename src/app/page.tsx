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

  return (
    <div className="flex flex-col bg-stone-50">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-indigo-600 font-bold text-sm uppercase tracking-widest">Unilateral Co-Parenting Tool</span>
              <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] tracking-tight text-slate-900 font-serif">
                Stop Texting Him For Money. Send An Official Invoice.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-lg">
                Turn messy arguments into professional records. No collaboration required. We handle the structure, you maintain the boundaries.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <SignedOut>
                <Link href="/sign-up">
                  <Button size="lg" className="h-14 px-8 text-lg font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02] transition-transform shadow-xl shadow-indigo-200">
                    Get Started Now
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
              <Link href="#works">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold rounded-xl bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">
                  See Sample PDF
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              Court-Ready Documentation Standard
            </div>
          </div>

          {/* Hero Visual - Chaos vs Clarity */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-linear-to-tr from-indigo-500/20 to-transparent rounded-3xl blur-2xl group-hover:opacity-75 transition-opacity"></div>
            <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden aspect-4/3 flex items-center justify-center p-8">
              <div className="grid grid-cols-2 gap-4 h-full w-full">
                {/* Chaos side */}
                <div className="bg-slate-100 rounded-lg p-4 flex flex-col gap-3 relative overflow-hidden">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Chaos</div>
                  <div className="bg-white p-2 rounded-md shadow-sm text-[11px] self-start max-w-[80%]">Hey, did u see the bill for camp?</div>
                  <div className="bg-indigo-100 p-2 rounded-md shadow-sm text-[11px] self-end max-w-[80%] text-indigo-700">Which camp? I didn't agree to that.</div>
                  <div className="bg-white p-2 rounded-md shadow-sm text-[11px] self-start max-w-[80%]">I sent u the screenshot 2 weeks ago!</div>
                  <div className="bg-indigo-100 p-2 rounded-md shadow-sm text-[11px] self-end max-w-[80%] text-indigo-700">I'm busy, talk later.</div>
                  <div className="absolute inset-0 bg-slate-50/40 backdrop-grayscale pointer-events-none"></div>
                </div>
                {/* Clarity side */}
                <div className="bg-white border-2 border-indigo-600 rounded-lg p-4 flex flex-col gap-4 shadow-xl">
                  <div className="flex justify-between items-center border-b pb-2 border-slate-200">
                    <div className="text-[10px] font-bold text-indigo-600 italic font-serif">FairShare</div>
                    <div className="text-[8px] font-bold text-slate-400">INV-2023-082</div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-2 w-1/2 bg-slate-200 rounded"></div>
                    <div className="h-4 w-3/4 bg-slate-100 rounded"></div>
                  </div>
                  <div className="mt-auto pt-4 flex justify-between">
                    <div className="text-[10px] font-bold">Total Due</div>
                    <div className="text-[10px] font-bold text-indigo-600">$450.00</div>
                  </div>
                  <div className="bg-indigo-600 text-white text-center text-[8px] font-bold py-1.5 rounded uppercase">Official PDF Document</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Logic Section */}
      <section id="logic" className="w-full bg-white py-24">
        <div className="max-w-6xl mx-auto px-6 space-y-12">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-serif">The Logic: Why Unilateral Works</h2>
            <p className="text-slate-600 text-lg">Communication with a high-conflict co-parent is a negotiation minefield. FairShare shifts the dynamic from asking for permission to documenting facts.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "No Collaboration Required",
                desc: "Stop waiting for their 'OK'. Document expenses, attach receipts, and generate invoices on your own timeline."
              },
              {
                icon: Scale,
                title: "Court-Ready Records",
                desc: "Standardized formats that lawyers and judges appreciate. Professionalism is harder to argue with than a text message."
              },
              {
                icon: Lock,
                title: "Emotional Distance",
                desc: "Remove the back-and-forth. Send a single, professional document and let the record speak for itself."
              }
            ].map((item, i) => (
              <div key={i} className="bg-stone-50 p-8 rounded-2xl border border-slate-100 flex flex-col gap-4 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-xl">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-serif">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed">{item.desc}</p>
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
                title: "Input Expense",
                desc: "Add the date, category (medical, school, etc.), and total amount. Quick and simple."
              },
              {
                num: "2",
                title: "Attach Receipt",
                desc: "Snap a photo or upload a PDF. We link it directly to the expense for bulletproof evidence."
              },
              {
                num: "3",
                title: "Export & Send",
                desc: "Generate a branded PDF invoice. Email it directly or save it for your legal records."
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
                  "5 Free Invoices",
                  "AI Receipt Scanning",
                  "Cloud Shoebox Storage",
                  "Professional PDF Exports"
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
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] px-4 py-1.5 rounded-full font-bold tracking-widest uppercase shadow-lg">Recommended</div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold font-serif">Pro Account</h3>
                <p className="text-slate-500 text-sm">For complete peace of mind and history.</p>
                <div className="text-5xl font-bold pt-2">$9<span className="text-xl font-normal text-slate-400">/mo</span></div>
              </div>
              <ul className="space-y-4 flex-1">
                {[
                  "Unlimited Invoices",
                  "Priority AI Processing",
                  "Unlimited Receipt Vault",
                  "Court-Ready Audit Trails",
                  "Multiple Child Profiles"
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
            Join 5,000+ co-parents who have traded text arguments for professional financial documentation.
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
            <Link className="text-sm text-slate-600 hover:text-indigo-600" href="mailto:support@fairshare.app">Help Center</Link>
            <Link className="text-sm text-slate-600 hover:text-indigo-600" href="#logic">The Logic</Link>
            <Link className="text-sm text-slate-600 hover:text-indigo-600" href="#">Legal Compliance</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-slate-400">Company</h4>
            <Link className="text-sm text-slate-600 hover:text-indigo-600" href="/privacy">Privacy Policy</Link>
            <Link className="text-sm text-slate-600 hover:text-indigo-600" href="/terms">Terms of Service</Link>
            <Link className="text-sm text-slate-600 hover:text-indigo-600" href="mailto:support@fairshare.app">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
