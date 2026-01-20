"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-stone-50 py-12 px-6">
            <div className="max-w-4xl mx-auto space-y-12">
                <Link href="/">
                    <Button variant="ghost" className="group text-slate-600 hover:text-indigo-600">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Button>
                </Link>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Side: Info */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-2xl">
                                <MessageSquare className="w-8 h-8" />
                            </div>
                            <h1 className="text-4xl font-bold font-serif text-slate-900 italic">Get in Touch</h1>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Have questions about FairShare? We're here to help you organize your co-parenting finances.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-xl shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Email Us</h3>
                                    <a href="mailto:hello@getfairshare.cloud" className="text-indigo-600 font-semibold hover:underline">
                                        hello@getfairshare.cloud
                                    </a>
                                </div>
                            </div>

                            <div className="p-6 bg-indigo-600 rounded-3xl text-white space-y-4 shadow-xl shadow-indigo-200">
                                <h3 className="font-bold text-xl font-serif italic text-indigo-100">Official Company Info</h3>
                                <div className="space-y-1 text-indigo-100/90 text-sm">
                                    <p className="font-bold text-white">Martin Vasko</p>
                                    <p>Ulica Jozefa Adamca 9983/24</p>
                                    <p>917 01 Trnava, Slovakia</p>
                                    <p className="pt-2">IČO: 56440553</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-2xl space-y-6">
                        <h2 className="text-2xl font-bold font-serif text-slate-900">Send a Message</h2>
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="first-name" className="text-sm font-bold text-slate-700">First Name</label>
                                    <input
                                        type="text"
                                        id="first-name"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-stone-50/50"
                                        placeholder="Jane"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="last-name" className="text-sm font-bold text-slate-700">Last Name</label>
                                    <input
                                        type="text"
                                        id="last-name"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-stone-50/50"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold text-slate-700">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-stone-50/50"
                                    placeholder="jane@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-bold text-slate-700">Subject</label>
                                <select
                                    id="subject"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-stone-50/50 appearance-none"
                                >
                                    <option>General Inquiry</option>
                                    <option>Technical Support</option>
                                    <option>Billing Question</option>
                                    <option>Feature Request</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-bold text-slate-700">Message</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all bg-stone-50/50 resize-none"
                                    placeholder="How can we help you today?"
                                />
                            </div>
                            <Button className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2">
                                <Send className="w-4 h-4" />
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
