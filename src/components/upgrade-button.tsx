"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePaddle } from "@/components/paddle-provider";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface UpgradeButtonProps {
    className?: string;
    children?: React.ReactNode;
}

export function UpgradeButton({ className, children }: UpgradeButtonProps) {
    const { isLoaded, openCheckout } = usePaddle();
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const handleUpgrade = () => {
        setIsLoading(true);

        const proPriceId = process.env.NEXT_PUBLIC_PADDLE_PRO_PRICE_ID;

        if (!proPriceId) {
            console.error("NEXT_PUBLIC_PADDLE_PRO_PRICE_ID not configured");
            alert("Payment system not configured. Please contact support.");
            setIsLoading(false);
            return;
        }

        openCheckout({
            items: [{ priceId: proPriceId, quantity: 1 }],
            customer: {
                email: user?.emailAddresses?.[0]?.emailAddress,
            },
            customData: {
                user_id: user?.id || "",
            },
            settings: {
                successUrl: `${window.location.origin}/dashboard?upgrade=success`,
                displayMode: "overlay",
            },
        });

        setIsLoading(false);
    };

    return (
        <Button
            onClick={handleUpgrade}
            disabled={!isLoaded || isLoading}
            className={className || "mt-4 bg-indigo-600 hover:bg-indigo-700"}
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                </>
            ) : (
                children || "Upgrade to Pro - $9/mo"
            )}
        </Button>
    );
}
