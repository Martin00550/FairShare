"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, CheckCircle2, AlertCircle } from "lucide-react";

interface PaymentSettingsProps {
    currentInstructions: string;
    onSave: (instructions: string) => Promise<void>;
}

export function PaymentSettings({ currentInstructions, onSave }: PaymentSettingsProps) {
    const [instructions, setInstructions] = useState(currentInstructions);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSave = async () => {
        setIsSaving(true);
        setMessage(null);
        try {
            await onSave(instructions);
            setMessage({ type: 'success', text: 'Payment instructions updated' });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update settings' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    How should your ex pay you?
                </label>
                <div className="text-sm text-slate-500 mb-3">
                    This text will be printed at the bottom of every invoice so they know where to send the money.
                </div>
                <Textarea
                    placeholder="e.g. Venmo: @MyName, CashApp: $MyTag, or Bank Account Ending 1234"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="min-h-[100px] resize-y"
                    maxLength={500}
                />
                <div className="text-xs text-slate-400 text-right mt-1">
                    {instructions.length}/500 characters
                </div>
                {message && (
                    <div className={`mt-2 text-sm flex items-center gap-2 ${message.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                        {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {message.text}
                    </div>
                )}
            </div>

            <div className="flex justify-end">
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-indigo-600 hover:bg-indigo-700"
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Instructions
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
