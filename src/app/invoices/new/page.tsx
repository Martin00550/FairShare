"use client";

import { useState, useMemo, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, X, Check } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { checkAndIncrementLimit } from "@/actions/check-limit";
import { saveGeneratedInvoice } from "@/actions/save-invoice";
import { getPaymentInstructions } from "@/actions/profile-settings";
import { useRouter } from "next/navigation";

interface Expense {
    id: string;
    date: string;
    merchant: string;
    category: string;
    split_amount: number;
    status: string;
}

const categoryColors: Record<string, string> = {
    Education: "bg-blue-100 text-blue-700",
    Medical: "bg-green-100 text-green-700",
    Healthcare: "bg-green-100 text-green-700",
    Clothing: "bg-purple-100 text-purple-700",
    Living: "bg-purple-100 text-purple-700",
    Other: "bg-slate-100 text-slate-700",
};

// PDF Styles
const pdfStyles = StyleSheet.create({
    page: { flexDirection: "column", backgroundColor: "#FFFFFF", padding: 40, fontFamily: "Helvetica" },
    header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 30, borderBottomWidth: 2, borderBottomColor: "#4F46E5", paddingBottom: 20 },
    title: { fontSize: 24, fontWeight: "bold", color: "#1e293b" },
    subtitle: { fontSize: 10, color: "#64748b", marginTop: 4 },
    invoiceNum: { fontSize: 10, color: "#64748b", textAlign: "right" },
    invoiceDate: { fontSize: 10, color: "#1e293b", textAlign: "right", marginTop: 4 },
    table: { marginTop: 20 },
    tableHeader: { flexDirection: "row", backgroundColor: "#f8fafc", padding: 10, borderRadius: 4 },
    tableHeaderText: { fontSize: 10, fontWeight: "bold", color: "#64748b", textTransform: "uppercase" },
    tableRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#f1f5f9", padding: 12 },
    tableCell: { fontSize: 10, color: "#334155" },
    totalSection: { marginTop: 30, padding: 20, backgroundColor: "#f8fafc", borderRadius: 8 },
    totalLabel: { fontSize: 12, color: "#64748b", marginBottom: 4 },
    totalAmount: { fontSize: 28, fontWeight: "bold", color: "#4F46E5" },
    paymentSection: { marginTop: 20, padding: 20, borderTopWidth: 1, borderTopColor: "#f1f5f9" },
    paymentTitle: { fontSize: 10, fontWeight: "bold", color: "#64748b", textTransform: "uppercase", marginBottom: 8 },
    paymentText: { fontSize: 10, color: "#334155" },
    footer: { position: "absolute", bottom: 30, left: 40, right: 40, textAlign: "center", fontSize: 8, color: "#94a3b8" },
});

const InvoicePDF = ({ expenses, userName, paymentInstructions }: { expenses: Expense[]; userName: string; paymentInstructions: string }) => (
    <Document>
        <Page size="A4" style={pdfStyles.page}>
            <View style={pdfStyles.header}>
                <View>
                    <Text style={pdfStyles.title}>FairShare Invoice</Text>
                    <Text style={pdfStyles.subtitle}>Professional Co-Parenting Expense Report</Text>
                </View>
                <View>
                    <Text style={pdfStyles.invoiceNum}>INV-{Date.now().toString().slice(-6)}</Text>
                    <Text style={pdfStyles.invoiceDate}>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</Text>
                </View>
            </View>
            <View style={pdfStyles.table}>
                <View style={pdfStyles.tableHeader}>
                    <Text style={[pdfStyles.tableHeaderText, { width: "25%" }]}>Date</Text>
                    <Text style={[pdfStyles.tableHeaderText, { width: "40%" }]}>Description</Text>
                    <Text style={[pdfStyles.tableHeaderText, { width: "20%" }]}>Category</Text>
                    <Text style={[pdfStyles.tableHeaderText, { width: "15%", textAlign: "right" }]}>Amount</Text>
                </View>
                {expenses.map((exp) => (
                    <View key={exp.id} style={pdfStyles.tableRow}>
                        <Text style={[pdfStyles.tableCell, { width: "25%" }]}>
                            {new Date(exp.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </Text>
                        <Text style={[pdfStyles.tableCell, { width: "40%", fontWeight: "bold" }]}>{exp.merchant}</Text>
                        <Text style={[pdfStyles.tableCell, { width: "20%" }]}>{exp.category || "Other"}</Text>
                        <Text style={[pdfStyles.tableCell, { width: "15%", textAlign: "right" }]}>${Number(exp.split_amount).toFixed(2)}</Text>
                    </View>
                ))}
            </View>
            <View style={pdfStyles.totalSection}>
                <Text style={pdfStyles.totalLabel}>Total Due</Text>
                <Text style={pdfStyles.totalAmount}>
                    ${expenses.reduce((sum, e) => sum + (e.split_amount || 0), 0).toFixed(2)}
                </Text>
            </View>
            {paymentInstructions && (
                <View style={pdfStyles.paymentSection}>
                    <Text style={pdfStyles.paymentTitle}>Payment Instructions</Text>
                    <Text style={pdfStyles.paymentText}>{paymentInstructions}</Text>
                </View>
            )}
            <Text style={pdfStyles.footer}>
                Generated by FairShare - The #1 Co-Parenting Expense Tracker
            </Text>
        </Page>
    </Document>
);


export default function NewInvoicePage() {
    const { user } = useUser();
    const router = useRouter();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isGenerating, setIsGenerating] = useState(false);
    const [showPaywall, setShowPaywall] = useState(false);
    const [paymentInstructions, setPaymentInstructions] = useState("");

    useEffect(() => {
        getPaymentInstructions().then(setPaymentInstructions);
    }, []);

    // Fetch pending expenses on mount
    useEffect(() => {
        async function fetchExpenses() {
            try {
                const res = await fetch("/api/expenses/pending");
                if (res.ok) {
                    const data = await res.json();
                    setExpenses(data.expenses || []);
                }
            } catch (error) {
                console.error("Failed to fetch expenses:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchExpenses();
    }, []);

    const selectedTotal = useMemo(() =>
        expenses.filter(e => selectedIds.has(e.id)).reduce((sum, e) => sum + Number(e.split_amount), 0),
        [selectedIds, expenses]
    );

    const toggleSelection = (id: string) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) newSet.delete(id);
            else newSet.add(id);
            return newSet;
        });
    };

    const toggleAll = () => {
        if (selectedIds.size === expenses.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(expenses.map(e => e.id)));
        }
    };

    const handleGenerate = async () => {
        if (selectedIds.size === 0) return;

        setIsGenerating(true);
        try {
            // Check and increment limit
            const limitResult = await checkAndIncrementLimit();

            if (!limitResult.allowed) {
                if (limitResult.reason === "limit_reached") {
                    setShowPaywall(true);
                    return;
                }
                alert("Unable to generate invoice. Please try again.");
                return;
            }

            // Generate PDF
            const selectedExpenses = expenses.filter(e => selectedIds.has(e.id));
            const blob = await pdf(
                <InvoicePDF
                    expenses={selectedExpenses}
                    userName={user?.firstName || "User"}
                    paymentInstructions={paymentInstructions}
                />
            ).toBlob();

            // Download local copy
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `FairShare-Invoice-${Date.now()}.pdf`;
            a.click();
            URL.revokeObjectURL(url);

            // 1. Convert blob to serialized buffer
            const arrayBuffer = await blob.arrayBuffer();
            const pdfBuffer = Array.from(new Uint8Array(arrayBuffer));

            // 2. Save to persistent storage via server action
            const result = await saveGeneratedInvoice({
                pdfBuffer,
                expenseIds: Array.from(selectedIds),
                totalDue: selectedTotal
            });

            if (result.error) {
                console.error("Failed to save invoice:", result.error);
                alert("Invoice was downloaded, but failed to save in history. " + result.error);
            } else {
                // Success! Redirect to history
                router.push("/invoices?success=true");
            }
        } catch (error) {
            console.error("PDF generation failed:", error);
            alert("Failed to generate PDF. Please check your console for details.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 pb-32 md:pb-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">Generate PDF Invoice</h1>
                        <p className="text-slate-500 mt-1">Select expenses to include in your official co-parenting document.</p>
                    </div>
                </div>

                {/* Expenses Table */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    {isLoading ? (
                        <div className="p-12 text-center">
                            <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600 mb-3" />
                            <p className="text-slate-500">Loading expenses...</p>
                        </div>
                    ) : expenses.length === 0 ? (
                        <div className="p-12 text-center">
                            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <p className="text-slate-500 mb-4">No pending expenses to invoice.</p>
                            <Link href="/expenses">
                                <Button className="bg-indigo-600 hover:bg-indigo-700">Add Your First Expense</Button>
                            </Link>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200">
                                    <th className="p-4 w-12 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.size === expenses.length && expenses.length > 0}
                                            onChange={toggleAll}
                                            className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                    </th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Description</th>
                                    <th className="px-4 py-3 hidden sm:table-cell">Category</th>
                                    <th className="px-4 py-3 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {expenses.map((expense) => (
                                    <tr key={expense.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4 text-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.has(expense.id)}
                                                onChange={() => toggleSelection(expense.id)}
                                                className="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                        </td>
                                        <td className="px-4 py-4 text-sm text-slate-500">
                                            {new Date(expense.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="font-semibold text-slate-900">{expense.merchant}</span>
                                        </td>
                                        <td className="px-4 py-4 hidden sm:table-cell">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[expense.category] || categoryColors.Other}`}>
                                                {expense.category || "Other"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <span className="font-bold text-slate-900">${Number(expense.split_amount).toFixed(2)}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Sticky Bottom Bar */}
            {expenses.length > 0 && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-30 md:pb-4 pb-20">
                    <div className="max-w-5xl mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Items Selected</span>
                                <span className="text-lg font-bold text-slate-900">{selectedIds.size} items</span>
                            </div>
                            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                            <div className="hidden sm:flex flex-col">
                                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total to Bill</span>
                                <span className="text-lg font-bold text-indigo-600">${selectedTotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <Button
                                onClick={handleGenerate}
                                disabled={selectedIds.size === 0 || isGenerating}
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 font-bold flex items-center gap-2 shadow-md"
                            >
                                {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileText className="w-5 h-5" />}
                                <span className="hidden sm:inline">Generate Invoice</span>
                                <span className="sm:hidden">Generate</span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Paywall Modal */}
            {showPaywall && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm px-4">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative">
                        <button onClick={() => setShowPaywall(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                        <div className="bg-indigo-600 p-8 text-center text-white">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-1">You've Used All 5 Free Invoices!</h3>
                            <p className="text-indigo-100 text-sm">Upgrade to Pro for unlimited invoicing.</p>
                        </div>
                        <div className="p-8">
                            <div className="space-y-4 mb-8">
                                {["Unlimited Invoices", "Court-Ready Reports", "Receipt Attachments", "Priority Support"].map((feature) => (
                                    <div key={feature} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-indigo-600 mt-0.5" />
                                        <p className="font-bold text-sm">{feature}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-stone-50 rounded-xl p-4 text-center mb-6 border border-slate-100">
                                <span className="text-3xl font-bold text-indigo-600">$9</span>
                                <span className="text-slate-500 font-medium">/month</span>
                                <p className="text-xs text-slate-500 mt-1">Cancel anytime. 7-day free trial.</p>
                            </div>
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 py-4 font-bold text-lg">
                                Upgrade Now
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
