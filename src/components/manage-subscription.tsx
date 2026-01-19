"use client";

import { Settings, CreditCard, XCircle } from "lucide-react";
import { CreemPortal } from "@creem_io/nextjs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ManageSubscriptionProps {
    customerId: string;
}

export function ManageSubscription({ customerId }: ManageSubscriptionProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                    <Settings className="w-4 h-4" />
                    Manage Subscription
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuLabel>Subscription Options</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Creem Portal handles both update and cancel nicely */}
                <CreemPortal customerId={customerId}>
                    <DropdownMenuItem className="cursor-pointer">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Update Payment Method
                    </DropdownMenuItem>
                </CreemPortal>

                <CreemPortal customerId={customerId}>
                    <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 cursor-pointer"
                    >
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel Subscription
                    </DropdownMenuItem>
                </CreemPortal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
