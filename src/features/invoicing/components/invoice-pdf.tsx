"use client";

import { Page, Text, View, Document, StyleSheet, Image, Font } from "@react-pdf/renderer";

// Register Inter font if possible, or use standard fonts. 
// For simplicity and speed, using standard Helvetica/Times.
// Font.register({ family: 'Inter', src: '...' });

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: "Helvetica",
        fontSize: 10,
        color: "#333",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        paddingBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 10,
        color: "#666",
    },
    section: {
        marginBottom: 10,
    },
    label: {
        fontSize: 8,
        color: "#999",
        marginBottom: 2,
        textTransform: "uppercase",
    },
    value: {
        fontSize: 10,
        marginBottom: 8,
    },
    table: {
        display: "flex",
        width: "auto",
        marginTop: 20,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#eee",
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
        alignItems: "center",
    },
    tableHeader: {
        backgroundColor: "#f9fafb",
        fontWeight: "bold",
    },
    tableCol: {
        width: "25%",
        padding: 8,
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 9,
    },
    totalSection: {
        marginTop: 20,
        alignItems: "flex-end",
    },
    totalRow: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "#333",
        paddingTop: 5,
        marginTop: 5,
    },
    appendix: {
        marginTop: 40,
        pageBreakBefore: true,
    },
    receiptImage: {
        maxWidth: "100%",
        maxHeight: 400,
        objectFit: "contain",
        marginBottom: 20,
        border: "1px solid #eee",
    },
});

interface InvoicePDFProps {
    id: string;
    date: string;
    billTo: string;
    expenses: any[];
    totalDue: number;
}

export function InvoicePDF({ id, date, billTo, expenses, totalDue }: InvoicePDFProps) {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>INVOICE</Text>
                        <Text style={styles.subtitle}>#{id}</Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                        <Text style={styles.label}>Date</Text>
                        <Text style={styles.value}>{date}</Text>
                    </View>
                </View>

                {/* Bill To */}
                <View style={styles.section}>
                    <Text style={styles.label}>Bill To</Text>
                    <Text style={styles.value}>{billTo || "Co-Parent / Ex-Partner"}</Text>
                </View>

                {/* Table */}
                <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Date</Text></View>
                        <View style={{ ...styles.tableCol, width: "35%" }}><Text style={styles.tableCell}>Merchant</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Total</Text></View>
                        <View style={styles.tableCol}><Text style={styles.tableCell}>Your Share</Text></View>
                    </View>

                    {expenses.map((expense) => (
                        <View style={styles.tableRow} key={expense.id}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{new Date(expense.date).toLocaleDateString()}</Text>
                            </View>
                            <View style={{ ...styles.tableCol, width: "35%" }}>
                                <Text style={styles.tableCell}>{expense.merchant}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>${Number(expense.total_amount).toFixed(2)}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>${Number(expense.split_amount).toFixed(2)}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Footer */}
                <View style={styles.totalSection}>
                    <View style={styles.totalRow}>
                        <Text style={{ fontSize: 14, fontWeight: "bold", marginRight: 10 }}>Total Payable:</Text>
                        <Text style={{ fontSize: 14, fontWeight: "bold" }}>${totalDue.toFixed(2)}</Text>
                    </View>
                </View>

                {/* Appendix */}
                {/* Only render if we have images? We are client-side so we need to fetch them? 
            PDF generation might struggle with images if CORS is not set up on storage. 
            Receipt images from Supabase Storage usually need public URL or signed URL. 
            Assuming `expense.image_url` is accessible.
        */}
                {expenses.some(e => e.image_url) && (
                    <View style={styles.appendix}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 20 }}>Evidence Appendix</Text>
                        {expenses.map((e, i) => (
                            e.image_url ? (
                                <View key={i} break={i > 0}>
                                    <Text style={{ marginBottom: 5, fontSize: 10 }}>Exhibit #{i + 1}: {e.merchant}</Text>
                                    {/* Note: In real setup, ensure image CORS allows PDF renderer access */}
                                </View>
                            ) : null
                        ))}
                    </View>
                )}
            </Page>
        </Document>
    );
}
