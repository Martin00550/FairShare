"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Save, CheckCircle } from "lucide-react";

interface SplitSettingsProps {
    currentSplit: number;
    onSave: (newSplit: number) => Promise<void>;
}

export function SplitSettings({ currentSplit, onSave }: SplitSettingsProps) {
    const router = useRouter();
    const [split, setSplit] = useState(currentSplit);
    const [isPending, startTransition] = useTransition();
    const [saved, setSaved] = useState(false);

    const presets = [50, 60, 70, 75, 80];

    const handleSave = () => {
        startTransition(async () => {
            await onSave(split);
            setSaved(true);
            // Refresh the page to get updated data from server
            router.refresh();
            setTimeout(() => setSaved(false), 2000);
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="text-sm font-semibold text-slate-700 mb-3 block">
                    Your share of expenses (co-parent pays the rest)
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                    {presets.map((preset) => (
                        <button
                            key={preset}
                            onClick={() => setSplit(preset)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${split === preset
                                ? "bg-indigo-600 text-white shadow-md"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                }`}
                        >
                            {preset}%
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <input
                        type="range"
                        min="10"
                        max="90"
                        step="5"
                        value={split}
                        onChange={(e) => setSplit(Number(e.target.value))}
                        className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                    <div className="w-20 text-center">
                        <span className="text-2xl font-bold text-indigo-600">{split}%</span>
                    </div>
                </div>
                <p className="text-sm text-slate-500 mt-2">
                    You: {split}% • Co-parent: {100 - split}%
                </p>
            </div>

            <div className="flex items-center gap-4">
                <Button
                    onClick={handleSave}
                    disabled={isPending || split === currentSplit}
                    className="bg-indigo-600 hover:bg-indigo-700"
                >
                    {saved ? (
                        <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Saved!
                        </>
                    ) : (
                        <>
                            <Save className="w-4 h-4 mr-2" />
                            {isPending ? "Saving..." : "Save Split Settings"}
                        </>
                    )}
                </Button>
            </div>
        </div>
    );
}
