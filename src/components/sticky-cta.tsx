"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function StickyCta() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling down 400px (approx height of hero content)
            const show = window.scrollY > 400;
            setIsVisible(show);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className={cn(
            "fixed bottom-4 left-4 right-4 z-50 md:hidden transition-all duration-500 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        )}>
            <Link href="/sign-up">
                <Button size="lg" className="w-full h-14 bg-indigo-600 text-white font-bold text-lg shadow-xl shadow-indigo-900/20 rounded-xl">
                    Start For Free
                </Button>
            </Link>
        </div>
    );
}
