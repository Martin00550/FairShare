"use client";

import { useState, useTransition } from "react";
import { CheckCircle, DollarSign, Loader2 } from "lucide-react";
import { markExpenseAsPaid } from "@/actions/profile-settings";

interface MarkAsPaidButtonProps {
    expenseId: string;
    currentStatus: string;
    onStatusChange?: () => void;
}

export function MarkAsPaidButton({ expenseId, currentStatus, onStatusChange }: MarkAsPaidButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState(currentStatus);

    if (status === "paid") {
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600">
                <CheckCircle className="w-3 h-3" /> Paid
            </span>
        );
    }

    if (status === "invoiced") {
        return (
            <button
                onClick={() => {
                    startTransition(async () => {
                        const result = await markExpenseAsPaid(expenseId);
                        if (result.success) {
                            setStatus("paid");
                            onStatusChange?.();
                        }
                    });
                }}
                disabled={isPending}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors cursor-pointer"
            >
                {isPending ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                    <DollarSign className="w-3 h-3" />
                )}
                {isPending ? "..." : "Mark Paid"}
            </button>
        );
    }

    // Pending status
    return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
            Pending
        </span>
    );
}
