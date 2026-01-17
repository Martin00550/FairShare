"use client";

import { useState } from "react";
import { Settings, CreditCard, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import { usePaddle } from "@/components/paddle-provider";
import { getSubscriptionUpdateUrl, cancelSubscription } from "@/actions/paddle";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface ManageSubscriptionProps {
    subscriptionId: string;
}

export function ManageSubscription({ subscriptionId }: ManageSubscriptionProps) {
    const { openCheckout } = usePaddle();
    const [isLoading, setIsLoading] = useState(false);
    const [showCancelDialog, setShowCancelDialog] = useState(false);

    const handleUpdatePaymentMethod = async () => {
        setIsLoading(true);
        try {
            const { transactionId } = await getSubscriptionUpdateUrl(subscriptionId);
            openCheckout({
                transactionId,
            } as any); // Type cast as necessary if types are strict
        } catch (error) {
            console.error(error);
            toast.error("Failed to load payment update form");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelSubscription = async () => {
        setIsLoading(true);
        try {
            await cancelSubscription(subscriptionId);
            toast.success("Subscription canceled successfully");
            setShowCancelDialog(false);
            // Optional: trigger a page reload or state update if needed
        } catch (error) {
            console.error(error);
            toast.error("Failed to cancel subscription");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Settings className="w-4 h-4" />
                        )}
                        Manage Subscription
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Subscription Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleUpdatePaymentMethod}>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Update Payment Method
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setShowCancelDialog(true)}
                        className="text-red-600 focus:text-red-600"
                    >
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel Subscription
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-red-600">
                            <AlertTriangle className="w-5 h-5" />
                            Cancel Subscription?
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to cancel your Pro subscription?
                            <br /><br />
                            You will lose access to unlimited invoices and premium features at the end of your current billing period.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setShowCancelDialog(false)}
                            disabled={isLoading}
                        >
                            Keep Subscription
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleCancelSubscription}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            ) : null}
                            Confirm Cancellation
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
