import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPolicy() {
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
                        <Shield className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-bold font-serif text-slate-900 italic">Privacy Policy</h1>
                    <p className="text-slate-500 font-medium">Last Updated: January 15, 2026</p>
                </div>

                <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed font-sans">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">1. Introduction</h2>
                        <p>
                            Welcome to FairShare. We are committed to protecting your personal information and your right to privacy.
                            This Privacy Policy explains how we collect, use, and safeguard your data when you use our service.
                            FairShare is operated by Martin Vasko, with a registered office at Ulica Jozefa Adamca 9983/24, 917 01 Trnava, Slovakia (IČO: 56440553).
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">2. Information We Collect</h2>
                        <p>
                            We collect information that you provide directly to us when you create an account, upload receipts, or contact us for support.
                            This includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Account Information:</strong> Name, email address, and authentication details (via Clerk).</li>
                            <li><strong>Expense Data:</strong> Date, amount, category, and images or PDFs of receipts you upload.</li>
                            <li><strong>Payment Information:</strong> Handled securely by our payment processor, Paddle. We do not store your credit card details on our servers.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">3. How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Provide and maintain our service.</li>
                            <li>Process your receipt uploads using AI technology to extract relevant data.</li>
                            <li>Generate professional PDF invoices for your records.</li>
                            <li>Communicate with you about your account and updates to our service.</li>
                            <li>Ensure security and prevent fraud.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">4. Data Storage and Security</h2>
                        <p>
                            We take the security of your data seriously. Your information is stored securely in our database (Supabase)
                            and any uploaded files are kept in protected cloud storage. We use encryption to protect
                            your data during transmission and at rest.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">5. GDPR Compliance</h2>
                        <p>
                            For users in the European Economic Area (EEA), we process your personal data in accordance with the
                            General Data Protection Regulation (GDPR). You have the right to access, correct, or delete your personal
                            information at any time. To exercise these rights, please contact us at support@fairshare.app.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">6. Third-Party Services</h2>
                        <p>
                            We use third-party services to help us operate:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>Clerk:</strong> For secure user authentication.</li>
                            <li><strong>Supabase:</strong> For database and file storage.</li>
                            <li><strong>Paddle:</strong> For payment processing and subscription management.</li>
                            <li><strong>AI Providers:</strong> To process and analyze receipt images.</li>
                        </ul>
                    </section>

                    <section className="space-y-4 font-normal">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">7. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at:
                        </p>
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
                            <p className="font-bold text-slate-900">Martin Vasko</p>
                            <p>Ulica Jozefa Adamca 9983/24</p>
                            <p>917 01 Trnava, Slovakia</p>
                            <p>Email: <a href="mailto:hello@getfairshare.cloud" className="text-indigo-600 hover:underline">hello@getfairshare.cloud</a></p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
