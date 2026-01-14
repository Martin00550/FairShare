"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { scanReceipt } from "@/actions/scan-receipt";
import { Loader2, Upload, Check, Sparkles, X, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { saveExpenseAction } from "@/actions/save-expense";
import { getSplitPercentage } from "@/actions/profile-settings";

interface ScannedData {
    merchant: string;
    date: string;
    total_amount: number;
    split_amount: number;
    category?: string;
}

// Toast component for better UX
function Toast({ message, type, onClose }: { message: string; type: "success" | "error"; onClose: () => void }) {
    return (
        <div className={`fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg ${type === "success" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
            }`}>
            {type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-medium">{message}</span>
            <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

export function Scanner() {
    const { userId } = useAuth();
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [data, setData] = useState<ScannedData | null>(null);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
    const [splitPercentage, setSplitPercentage] = useState(50);

    // Fetch user's configured split percentage on mount
    useEffect(() => {
        async function fetchSplit() {
            const split = await getSplitPercentage();
            setSplitPercentage(split);
        }
        fetchSplit();
    }, []);

    const showToast = (message: string, type: "success" | "error") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 4000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const f = e.target.files[0];
            setFile(f);
            setPreview(URL.createObjectURL(f));
        }
    };

    const handleScan = async () => {
        if (!file) return;
        setIsScanning(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const result = await scanReceipt(formData);
            if (result.success) {
                // Use user's configured split percentage
                const splitAmount = result.data.total_amount * (splitPercentage / 100);
                setData({ ...result.data, split_amount: splitAmount });
                showToast("Receipt scanned successfully!", "success");
            } else {
                showToast("Scan failed. Please try a clearer image.", "error");
            }
        } catch (error) {
            showToast("Scan failed. Please try again.", "error");
        } finally {
            setIsScanning(false);
        }
    };

    const handleSave = async () => {
        if (!data || !userId) return;
        setIsSaving(true);
        try {
            // Recalculate split with current percentage before saving
            const finalData = {
                ...data,
                split_amount: data.total_amount * (splitPercentage / 100)
            };

            const response = await saveExpenseAction(finalData, userId);

            if (response && response.error) {
                showToast("Error saving: " + response.error, "error");
            } else {
                showToast("Receipt saved to your expenses!", "success");
                setFile(null);
                setPreview(null);
                setData(null);
                // Trigger page refresh to show new expense
                window.location.reload();
            }

        } catch (e) {
            console.error(e);
            showToast("Failed to save. Please try again.", "error");
        } finally {
            setIsSaving(false);
        }
    };

    // Calculate split amount dynamically based on current total and configured percentage
    const currentSplitAmount = data ? data.total_amount * (splitPercentage / 100) : 0;

    return (
        <div className="space-y-6">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {!data ? (
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center space-y-4 text-center hover:bg-slate-50 transition-colors">
                    {preview ? (
                        <div className="relative w-full max-w-sm aspect-3/4 rounded-2xl overflow-hidden border-2 border-indigo-100 shadow-2xl group">
                            <img src={preview} alt="Receipt Preview" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
                            {isScanning && (
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="w-full h-1 bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.8)] animate-scan relative z-20" />
                                    <div className="absolute inset-0 bg-indigo-500/10 backdrop-blur-[1px]" />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-6 bg-indigo-50 rounded-3xl text-indigo-600 animate-float">
                            <Upload className="w-10 h-10" />
                        </div>
                    )}

                    <div className="space-y-2">
                        <h3 className="font-bold text-xl text-slate-900">{preview ? "Great shot!" : "Upload Receipt"}</h3>
                        <p className="text-sm text-slate-500 max-w-[200px] mx-auto">
                            {preview ? "Ready to let the AI do its thing?" : "Take a photo or upload a file from your device"}
                        </p>
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="receipt-upload"
                        onChange={handleFileChange}
                    />

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs transition-all">
                        <Button
                            variant="outline"
                            className="h-12 rounded-xl font-bold border-slate-200 hover:bg-slate-50"
                            onClick={() => document.getElementById("receipt-upload")?.click()}
                        >
                            {preview ? "Retake Photo" : "Select File"}
                        </Button>
                        {preview && (
                            <Button
                                className="h-12 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100"
                                onClick={handleScan}
                                disabled={isScanning}
                            >
                                {isScanning ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                                {isScanning ? "AI is reading..." : "Scan with AI"}
                            </Button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xl space-y-6 animate-success-pop">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                <Check className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900">Scan successful</h3>
                        </div>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600" onClick={() => setData(null)}>Retake</Button>
                    </div>

                    <div className="grid gap-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Merchant</label>
                            <input
                                type="text"
                                value={data.merchant}
                                onChange={(e) => setData({ ...data, merchant: e.target.value })}
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Date</label>
                                <input
                                    type="date"
                                    value={data.date}
                                    onChange={(e) => setData({ ...data, date: e.target.value })}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Total Amount</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={data.total_amount}
                                        onChange={(e) => setData({ ...data, total_amount: parseFloat(e.target.value) || 0 })}
                                        className="w-full p-3 pl-7 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-bold"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-5 bg-indigo-600 rounded-2xl flex justify-between items-center text-white shadow-lg shadow-indigo-100 relative overflow-hidden group">
                            <div className="relative z-10">
                                <span className="text-xs font-black uppercase tracking-[0.2em] opacity-70">Your Share ({splitPercentage}%)</span>
                                <p className="text-2xl font-black">${currentSplitAmount.toFixed(2)}</p>
                            </div>
                            <Sparkles className="w-8 h-8 opacity-20 group-hover:scale-125 transition-transform duration-500" />
                            {/* Decorative glow */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12" />
                        </div>

                        <Button
                            className="w-full h-14 text-lg font-black rounded-2xl bg-slate-900 hover:bg-black shadow-xl transition-all hover:-translate-y-1"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Check className="w-5 h-5 mr-2" />}
                            {isSaving ? "Saving..." : "Save to Expenses"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
