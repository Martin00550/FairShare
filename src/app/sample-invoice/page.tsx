import { Button } from "@/components/ui/button";
import { ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SampleInvoicePage() {
    return (
        <div className="min-h-screen bg-stone-100 flex flex-col items-center py-12 px-4 shadow-inner">
            {/* Header Controls */}
            <div className="max-w-[800px] w-full mb-8 flex items-center justify-between">
                <Link href="/">
                    <Button variant="ghost" className="gap-2 text-slate-600 hover:text-indigo-600">
                        <ChevronLeft className="w-4 h-4" />
                        Back to Home
                    </Button>
                </Link>
                <Link href="/sign-up">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2 shadow-lg shadow-indigo-100 h-12 px-6 text-base font-bold rounded-xl hover:scale-[1.02] transition-transform">
                        Start For Free
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>

            {/* The "PDF" Container */}
            <div className="max-w-[800px] w-full bg-white shadow-2xl rounded-sm relative overflow-hidden ring-1 ring-slate-200">
                <img
                    src="https://res.cloudinary.com/dwgsy6bvo/image/upload/e_sharpen:150/FairShare-Invoice-1769106028239_page-0001_ik6e1s.jpg"
                    alt="FairShare Sample Invoice"
                    className="w-full h-auto"
                />
            </div>

            {/* Bottom Note */}
            <div className="mt-8 text-center text-slate-500 text-sm italic">
                This is a visual preview of FairShare's organized PDF generation.
            </div>
        </div>
    );
}
