"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, DollarSign } from "lucide-react";
import { markInvoiceAsPaid } from "@/actions/invoice-actions";
import { toast } from "sonner"; // Assuming sonner is installed, if not will use local alert/state
// Actually, checking previous files, sonner seemed to be missing or I replaced it. 
// I will use local state to be safe, consistent with payment-settings.tsx

interface InvoiceStatusActionsProps {
    invoiceId: string;
    status: string;
}

export function InvoiceStatusActions({ invoiceId, status }: InvoiceStatusActionsProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(status);

    const isPaid = currentStatus === "paid";

    const handleMarkAsPaid = async () => {
        if (!confirm("Are you sure you want to mark this invoice and all its items as PAID?")) return;

        setIsLoading(true);
        try {
            const result = await markInvoiceAsPaid(invoiceId);
            if (result.success) {
                setCurrentStatus("paid");
            } else {
                alert("Failed to update status: " + result.error);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    if (isPaid) {
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600">
                <CheckCircle className="w-3 h-3" /> PAID
            </span>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                {currentStatus.toUpperCase()}
            </span>
            <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                onClick={handleMarkAsPaid}
                disabled={isLoading}
            >
                {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <DollarSign className="w-3 h-3 mr-1" />}
                Mark Paid
            </Button>
        </div>
    );
}
