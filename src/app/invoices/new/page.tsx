"use client";

import { useState, useMemo, useEffect } from "react";
import { Document, Page, Text, View, StyleSheet, pdf, Font, Svg, Path } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, X, Check, User, Mail, AlertCircle } from "lucide-react";
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
    total_amount?: number;
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

// PDF Styles - Redesigned to match sample invoice
const pdfStyles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        paddingTop: 50,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 80, // Increased to make room for fixed footer
        fontFamily: "Helvetica",
    },
    // Header
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 40,
    },
    logo: {
        fontSize: 18,
        fontFamily: "Helvetica-BoldOblique",
        color: "#4F46E5",
        letterSpacing: -1,
    },
    logoSubtitle: {
        fontSize: 8,
        color: "#94a3b8",
        textTransform: "uppercase",
        letterSpacing: 2,
        marginTop: 4,
    },
    invoiceTitle: {
        fontSize: 18,
        fontFamily: "Helvetica-Bold",
        color: "#1e293b",
        textTransform: "uppercase",
        letterSpacing: 2,
        textAlign: "right",
    },
    invoiceMeta: {
        fontSize: 10,
        color: "#64748b",
        textAlign: "right",
        marginTop: 4,
    },
    // From/To Section
    addressSection: {
        flexDirection: "row",
        marginBottom: 40,
        gap: 40,
    },
    addressBlock: {
        flex: 1,
    },
    addressLabel: {
        fontSize: 8,
        fontFamily: "Helvetica-Bold",
        color: "#4F46E5",
        textTransform: "uppercase",
        letterSpacing: 2,
        marginBottom: 8,
    },
    addressName: {
        fontSize: 12,
        fontFamily: "Helvetica-Bold",
        color: "#1e293b",
        marginBottom: 2,
    },
    addressEmail: {
        fontSize: 10,
        color: "#64748b",
    },
    // Table
    table: {
        marginBottom: 30,
    },
    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 2,
        borderBottomColor: "#1e293b",
        paddingBottom: 10,
        marginBottom: 10,
    },
    tableHeaderText: {
        fontSize: 8,
        fontFamily: "Helvetica-Bold",
        color: "#1e293b",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    tableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#f1f5f9",
        paddingVertical: 14,
    },
    tableCell: {
        fontSize: 10,
        color: "#334155",
    },
    tableCellBold: {
        fontSize: 11,
        fontFamily: "Helvetica-Bold",
        color: "#1e293b",
    },
    tableCellDate: {
        fontSize: 9,
        color: "#94a3b8",
        marginTop: 2,
    },
    categoryBadge: {
        fontSize: 8,
        color: "#64748b",
        backgroundColor: "#f8fafc",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    // Totals
    totalsContainer: {
        alignItems: "flex-end",
        marginBottom: 40,
    },
    totalsBox: {
        width: 220,
        backgroundColor: "#f8fafc",
        padding: 20,
        borderRadius: 8,
    },
    subtotalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    subtotalLabel: {
        fontSize: 10,
        color: "#64748b",
    },
    subtotalValue: {
        fontSize: 11,
        fontFamily: "Helvetica-Bold",
        color: "#1e293b",
    },
    grandTotalRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#e2e8f0",
        paddingTop: 12,
    },
    grandTotalLabel: {
        fontSize: 8,
        fontFamily: "Helvetica-Bold",
        color: "#4F46E5",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    grandTotalValue: {
        fontSize: 28,
        fontFamily: "Helvetica-Bold",
        color: "#1e293b",
        letterSpacing: -1,
    },
    // Payment Instructions
    paymentContainer: {
        backgroundColor: "#EEF2FF",
        padding: 24,
        borderRadius: 12,
        marginBottom: 30,
    },
    paymentHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    paymentIcon: {
        width: 32,
        height: 32,
        backgroundColor: "#4F46E5",
        borderRadius: 8,
        marginRight: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    paymentTitle: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        color: "#4F46E5",
        textTransform: "uppercase",
        letterSpacing: 2,
    },
    paymentLabel: {
        fontSize: 8,
        fontFamily: "Helvetica-Bold",
        color: "#818cf8",
        textTransform: "uppercase",
        letterSpacing: 1,
        marginBottom: 4,
        marginTop: 12,
    },
    paymentValue: {
        fontSize: 11,
        fontFamily: "Helvetica-Bold",
        color: "#334155",
    },
    paymentRow: {
        flexDirection: "row",
        gap: 40,
        marginTop: 16,
        borderTopWidth: 1,
        borderTopColor: "#c7d2fe",
        paddingTop: 16,
    },
    paymentColumn: {
        flex: 1,
    },
    // Footer
    footer: {
        position: "absolute",
        bottom: 40,
        left: 50,
        right: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderTopWidth: 1,
        borderTopColor: "#f1f5f9",
        paddingTop: 16,
    },
    footerText: {
        fontSize: 8,
        color: "#94a3b8",
        fontStyle: "italic",
        maxWidth: 300,
        lineHeight: 1.4,
    },
});

interface InvoicePDFProps {
    expenses: Expense[];
    userName: string;
    userEmail: string;
    recipientName: string;
    recipientEmail: string;
    paymentInstructions: string;
    splitPercentage: number;
}

const InvoicePDF = ({
    expenses,
    userName,
    userEmail,
    recipientName,
    recipientEmail,
    paymentInstructions,
    splitPercentage
}: InvoicePDFProps) => {
    const invoiceNumber = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`;
    const invoiceDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const total = expenses.reduce((sum, e) => sum + (e.split_amount || 0), 0);



    return (
        <Document>
            <Page size="A4" style={pdfStyles.page}>
                {/* Header */}
                <View style={pdfStyles.header}>
                    <View>
                        <Text style={pdfStyles.logo}>FairShare</Text>
                        <Text style={pdfStyles.logoSubtitle}>Official Expense Report</Text>
                    </View>
                    <View>
                        <Text style={pdfStyles.invoiceTitle}>Invoice</Text>
                        <Text style={pdfStyles.invoiceMeta}>#{invoiceNumber}</Text>
                        <Text style={pdfStyles.invoiceMeta}>{invoiceDate}</Text>
                    </View>
                </View>

                {/* From / Bill To */}
                <View style={pdfStyles.addressSection}>
                    <View style={pdfStyles.addressBlock}>
                        <Text style={pdfStyles.addressLabel}>From</Text>
                        <Text style={pdfStyles.addressName}>{userName}</Text>
                        <Text style={pdfStyles.addressEmail}>{userEmail}</Text>
                    </View>
                    <View style={pdfStyles.addressBlock}>
                        <Text style={pdfStyles.addressLabel}>Bill To</Text>
                        <Text style={pdfStyles.addressName}>{recipientName || "Co-Parent"}</Text>
                        <Text style={pdfStyles.addressEmail}>{recipientEmail || "—"}</Text>
                    </View>
                </View>

                {/* Expenses Table */}
                <View style={pdfStyles.table}>
                    <View style={pdfStyles.tableHeader} fixed>
                        <Text style={[pdfStyles.tableHeaderText, { width: "35%" }]}>Date/Merchant</Text>
                        <Text style={[pdfStyles.tableHeaderText, { width: "15%" }]}>Category</Text>
                        <Text style={[pdfStyles.tableHeaderText, { width: "15%", textAlign: "right" }]}>Total</Text>
                        <Text style={[pdfStyles.tableHeaderText, { width: "35%", textAlign: "right" }]}>Recipient Share ({splitPercentage}%)</Text>
                    </View>
                    {expenses.map((exp) => (
                        <View key={exp.id} style={pdfStyles.tableRow}>
                            <View style={{ width: "35%" }}>
                                <Text style={pdfStyles.tableCellBold}>{exp.merchant}</Text>
                                <Text style={pdfStyles.tableCellDate}>
                                    {new Date(exp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </Text>
                            </View>
                            <View style={{ width: "15%" }}>
                                <Text style={pdfStyles.categoryBadge}>{exp.category || "Other"}</Text>
                            </View>
                            <Text style={[pdfStyles.tableCell, { width: "15%", textAlign: "right" }]}>
                                ${(exp.total_amount || exp.split_amount * (100 / splitPercentage)).toFixed(2)}
                            </Text>
                            <Text style={[pdfStyles.tableCellBold, { width: "35%", textAlign: "right" }]}>
                                ${Number(exp.split_amount).toFixed(2)}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Totals */}
                <View style={pdfStyles.totalsContainer} wrap={false}>
                    <View style={pdfStyles.totalsBox}>
                        <View style={pdfStyles.subtotalRow}>
                            <Text style={pdfStyles.subtotalLabel}>Subtotal Due</Text>
                            <Text style={pdfStyles.subtotalValue}>${total.toFixed(2)}</Text>
                        </View>
                        <View style={pdfStyles.grandTotalRow}>
                            <Text style={pdfStyles.grandTotalLabel}>Grand Total</Text>
                            <Text style={pdfStyles.grandTotalValue}>${total.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>

                {/* Payment Instructions */}
                {paymentInstructions && (
                    <View style={pdfStyles.paymentContainer} wrap={false}>
                        <View style={pdfStyles.paymentHeader}>
                            <View style={pdfStyles.paymentIcon}>
                                <Svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" fill="#4F46E5" />
                                    <Path d="M9 12l2 2 4-4" fill="none" />
                                </Svg>
                            </View>
                            <Text style={pdfStyles.paymentTitle}>Payment Instructions</Text>
                        </View>

                        <View>
                            {paymentInstructions.split('\n').filter(l => l.trim()).map((line, i) => (
                                <Text key={i} style={[pdfStyles.paymentValue, { marginBottom: 2 }]}>{line}</Text>
                            ))}
                        </View>
                    </View>
                )}

                {/* Footer */}
                <View style={pdfStyles.footer} fixed>
                    <Text style={pdfStyles.footerText}>
                        Generated by FairShare. This report forms a professional financial record of shared parenting expenses. All attached receipts are cross-referenced in the digital archive.
                    </Text>
                </View>
            </Page>
        </Document>
    );
};


export default function NewInvoicePage() {
    const { user } = useUser();
    const router = useRouter();
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isGenerating, setIsGenerating] = useState(false);
    const [showPaywall, setShowPaywall] = useState(false);
    const [paymentInstructions, setPaymentInstructions] = useState("");

    // New: Recipient fields for "Bill To"
    const [recipientName, setRecipientName] = useState("");
    const [recipientEmail, setRecipientEmail] = useState("");
    const [splitPercentage, setSplitPercentage] = useState(50);

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
                    setSplitPercentage(data.splitPercentage || 50);
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
                    userName={user?.fullName || user?.firstName || "User"}
                    userEmail={user?.emailAddresses?.[0]?.emailAddress || ""}
                    recipientName={recipientName}
                    recipientEmail={recipientEmail}
                    paymentInstructions={paymentInstructions}
                    splitPercentage={splitPercentage}
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

                {/* Bill To Section */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6 shadow-sm">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 font-serif flex items-center gap-2">
                        <User className="w-5 h-5 text-indigo-600" />
                        Bill To (Recipient)
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400">Co-Parent Name</label>
                            <input
                                type="text"
                                value={recipientName}
                                onChange={(e) => setRecipientName(e.target.value)}
                                placeholder="e.g. Michael Jenkins"
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                Co-Parent Email
                            </label>
                            <input
                                type="email"
                                value={recipientEmail}
                                onChange={(e) => setRecipientEmail(e.target.value)}
                                placeholder="e.g. coparent@email.com"
                                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                            />
                        </div>
                    </div>
                </div>

                {/* Payment Instructions Preview */}
                {!paymentInstructions && (
                    <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 flex items-center gap-4">
                        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                        <div className="flex-1">
                            <p className="text-sm font-bold text-slate-900">Payment instructions not set</p>
                            <p className="text-xs text-slate-600">Add your Zelle, Venmo, or bank details so they appear on the invoice.</p>
                        </div>
                        <Link href="/profile">
                            <Button variant="outline" size="sm" className="border-amber-200 text-amber-700 hover:bg-amber-100">
                                Add Now
                            </Button>
                        </Link>
                    </div>
                )}

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
                            <h3 className="text-2xl font-bold mb-1">You've Used All 3 Free Invoices!</h3>
                            <p className="text-indigo-100 text-sm">Upgrade to Pro for unlimited invoicing.</p>
                        </div>
                        <div className="p-8">
                            <div className="space-y-4 mb-8">
                                {["Unlimited Invoices", "AI Receipt Scanning", "Cloud Shoebox Storage", "Professional PDF Exports", "History Tracking"].map((feature) => (
                                    <div key={feature} className="flex items-start gap-3">
                                        <Check className="w-5 h-5 text-indigo-600 mt-0.5" />
                                        <p className="font-bold text-sm">{feature}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="bg-stone-50 rounded-xl p-4 text-center mb-6 border border-slate-100">
                                <span className="text-3xl font-bold text-indigo-600">$9</span>
                                <span className="text-slate-500 font-medium">/month</span>
                                <p className="text-xs text-slate-500 mt-1">Cancel anytime.</p>
                            </div>
                            <Link href="/pricing" className="block">
                                <Button className="w-full bg-indigo-600 hover:bg-indigo-700 py-4 font-bold text-lg">
                                    Upgrade Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
