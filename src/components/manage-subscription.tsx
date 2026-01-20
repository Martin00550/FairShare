"use client";

import { useState } from "react";
import { Settings, CreditCard, XCircle, ExternalLink, Loader2 } from "lucide-react";
import { usePaddle } from "@/components/paddle-provider";
import { getSubscriptionUpdateUrl, cancelSubscription } from "@/actions/paddle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface ManageSubscriptionProps {
    subscriptionId: string;
}

export function ManageSubscription({ subscriptionId }: ManageSubscriptionProps) {
    const { isLoaded, openCheckout } = usePaddle();
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdatePayment = async () => {
        setIsLoading(true);
        try {
            const result = await getSubscriptionUpdateUrl(subscriptionId);
            if (result.error) throw new Error(result.error);

            if (result.transactionId) {
                openCheckout({
                    // @ts-ignore
                    transactionId: result.transactionId,
                    settings: {
                        displayMode: "overlay",
                        successUrl: window.location.href,
                    }
                });
            }
        } catch (error: any) {
            toast.error(error.message || "Failed to open payment portal");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelSubscription = async () => {
        if (!confirm("Are you sure you want to cancel your Pro subscription? You will lose access to Pro features at the end of your billing period.")) {
            return;
        }

        setIsLoading(true);
        try {
            const result = await cancelSubscription(subscriptionId);
            if (result.error) throw new Error(result.error);
            toast.success("Subscription canceled successfully.");
        } catch (error: any) {
            toast.error(error.message || "Failed to cancel subscription");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    disabled={!isLoaded || isLoading}
                    className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors disabled:opacity-50"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Settings className="w-4 h-4" />}
                    Manage Subscription
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuLabel>Subscription Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleUpdatePayment} className="cursor-pointer">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Update Payment Method
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleCancelSubscription}
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel Subscription
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
