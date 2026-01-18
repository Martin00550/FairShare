"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Receipt, FileText, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton, SignedIn, SignedOut, SignInButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export function NavBar() {
    const pathname = usePathname();

    const links = [
        { href: "/dashboard", label: "Home", icon: Home },
        { href: "/expenses", label: "Expenses", icon: Receipt },
        { href: "/invoices", label: "Invoices", icon: FileText },
        // Profile is handled by UserButton usually, but we can have a profile page too.
        // Prompt says "Profile" tab.
        { href: "/profile", label: "Profile", icon: User },
    ];

    return (
        <>
            {/* Top Header (Visible on all screens) */}
            <header className="h-16 border-b border-slate-200/50 bg-white/80 backdrop-blur-md px-4 md:px-6 sticky top-0 z-50">
                <div className="h-full flex items-center justify-between md:grid md:grid-cols-3">
                    {/* Left - Logo */}
                    <div className="flex items-center">
                        <Link href={pathname === "/" ? "/" : "/dashboard"} className="text-2xl font-bold tracking-tight text-indigo-700 flex items-center gap-2 font-serif hover:opacity-80 transition-opacity">
                            FairShare
                        </Link>
                    </div>

                    {/* Center - Navigation */}
                    <nav className="hidden md:flex items-center justify-center gap-6">
                        {pathname === "/" ? (
                            <>
                                {["Features", "Pricing", "FAQ"].map((item) => (
                                    <Link
                                        key={item}
                                        href={`/#${item.toLowerCase()}`}
                                        className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
                                    >
                                        {item}
                                    </Link>
                                ))}
                            </>
                        ) : (
                            <>
                                <SignedIn>
                                    {links.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={cn(
                                                "text-sm font-semibold transition-all hover:text-indigo-600",
                                                pathname === link.href ? "text-indigo-600" : "text-slate-500"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </SignedIn>
                                <SignedOut>
                                    {["Features", "Pricing", "FAQ"].map((item) => (
                                        <Link
                                            key={item}
                                            href={`/#${item.toLowerCase()}`}
                                            className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </SignedOut>
                            </>
                        )}
                    </nav>

                    {/* Right - Actions */}
                    <div className="flex items-center gap-4 justify-end">
                        <ClerkLoading>
                            <div className="h-9 w-24 bg-slate-100 rounded-xl animate-pulse" />
                        </ClerkLoading>
                        <ClerkLoaded>
                            <SignedIn>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="text-slate-600 px-3 py-2 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors">
                                        Log In
                                    </button>
                                </SignInButton>
                                <Link href="/sign-up">
                                    <button className="bg-indigo-600 text-white px-4 md:px-5 py-2 rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all hover:-translate-y-0.5 whitespace-nowrap">
                                        Get Started
                                    </button>
                                </Link>
                            </SignedOut>
                        </ClerkLoaded>
                    </div>
                </div>
            </header>

            {/* Mobile Bottom Nav */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white/95 backdrop-blur-md pb-safe z-50">
                <SignedIn>
                    <nav className="grid grid-cols-4 h-18 py-2">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "flex flex-col items-center justify-center gap-1 relative transition-all duration-200",
                                        isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
                                    )}
                                >
                                    <div className={cn(
                                        "p-2 rounded-xl transition-all duration-200",
                                        isActive && "bg-indigo-100"
                                    )}>
                                        <Icon className={cn("h-5 w-5", isActive && "scale-110")} />
                                    </div>
                                    <span className={cn(
                                        "text-[10px] font-semibold",
                                        isActive && "font-bold"
                                    )}>{link.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </SignedIn>
            </div>
        </>
    );
}
