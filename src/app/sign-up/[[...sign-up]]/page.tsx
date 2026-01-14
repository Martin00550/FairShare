"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Get Started Free</h1>
                    <p className="text-slate-500 mt-2">Create your FairShare account in seconds</p>
                </div>
                <SignUp
                    appearance={{
                        elements: {
                            rootBox: "w-full",
                            card: "shadow-xl border border-slate-100 rounded-2xl",
                            headerTitle: "hidden",
                            headerSubtitle: "hidden",
                            socialButtonsBlockButton: "border border-slate-200 hover:bg-slate-50",
                            formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white",
                            footerActionLink: "text-indigo-600 hover:text-indigo-700",
                        }
                    }}
                    routing="path"
                    path="/sign-up"
                    signInUrl="/sign-in"
                    forceRedirectUrl="/dashboard"
                />
            </div>
        </div>
    );
}
