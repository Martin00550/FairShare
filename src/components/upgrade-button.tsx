"use client";

import { Button } from "@/components/ui/button";
import { CreemCheckout } from "@creem_io/nextjs";
import { useUser } from "@clerk/nextjs";

interface UpgradeButtonProps {
    className?: string;
}

export function UpgradeButton({ className }: UpgradeButtonProps) {
    const { user } = useUser();
    const productId = process.env.NEXT_PUBLIC_CREEM_PRODUCT_ID;

    if (!productId) {
        return (
            <Button disabled className={className || "mt-4 bg-indigo-600"}>
                Upgrade Not Configured
            </Button>
        );
    }

    return (
        <CreemCheckout
            productId={productId}
            successUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}/dashboard?upgrade=success`}
            referenceId={user?.id || ""}
            customer={{
                email: user?.emailAddresses?.[0]?.emailAddress || "",
                name: user?.fullName || "",
            }}
        >
            <Button
                className={className || "mt-4 bg-indigo-600 hover:bg-indigo-700"}
            >
                Upgrade to Pro - $9/mo
            </Button>
        </CreemCheckout>
    );
}
