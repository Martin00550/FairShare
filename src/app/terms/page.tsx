import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsOfService() {
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
                        <FileText className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-bold font-serif text-slate-900 italic">Terms of Service</h1>
                    <p className="text-slate-500 font-medium">Last Updated: January 15, 2026</p>
                </div>

                <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed font-sans">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using FairShare ("the Service"), you agree to be bound by these Terms of Service.
                            The Service is operated by Martin Vasko, Trnava, Slovakia. If you do not agree to these terms,
                            please do not use the Service.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">2. Description of Service</h2>
                        <p>
                            FairShare is a tool designed to help co-parents track shared expenses by scanning receipts and generating
                            professional PDF invoices. The Service is provided "as is" and is intended for informational and organizational
                            purposes only.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">3. User Responsibilities</h2>
                        <p>
                            You are responsible for:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Maintaining the confidentiality of your account credentials.</li>
                            <li>The accuracy of the data and receipts you upload to the Service.</li>
                            <li>Ensuring that your use of the Service complies with all applicable laws and any existing legal agreements (e.g., court orders).</li>
                            <li>Your own communication and interactions with co-parents; FairShare provides documentation tools but does not mediate legal disputes.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">4. Subscriptions and Payments</h2>
                        <p>
                            FairShare offers both free and paid subscription plans. Paid plans are billed on a recurring basis.
                            Payments are processed by Paddle. You may cancel your subscription at any time through your account settings.
                            Cancellations will take effect at the end of the current billing cycle.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">5. Intellectual Property</h2>
                        <p>
                            The design, code, and content of FairShare (excluding user-uploaded data) are the property of Martin Vasko.
                            You are granted a limited, non-exclusive license to use the Service for its intended purpose.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">6. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, Martin Vasko shall not be liable for any indirect, incidental,
                            special, or consequential damages resulting from the use or inability to use the Service.
                            While we strive for accuracy in our AI scanning, you should always verify the extracted data before
                            sending an invoice.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">7. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these terms at any time. We will notify users of any significant changes
                            by posting the updated terms on this page. Your continued use of the Service after such changes constitutes
                            your acceptance of the new terms.
                        </p>
                    </section>

                    <section className="space-y-4 font-normal">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">8. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms of Service, please contact us:
                        </p>
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
