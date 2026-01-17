"use client";



interface Expense {
    id: string;
    date: string;
    merchant: string;
    category: string | null;
    split_amount: number;
    status: string;
}

const categoryColors: Record<string, string> = {
    Healthcare: "bg-green-100 text-green-700",
    Medical: "bg-green-100 text-green-700",
    Education: "bg-blue-100 text-blue-700",
    Living: "bg-purple-100 text-purple-700",
    Clothing: "bg-orange-100 text-orange-700",
    Other: "bg-slate-100 text-slate-700",
};

interface ExpenseTableProps {
    expenses: Expense[];
}

export function ExpenseTable({ expenses }: ExpenseTableProps) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Desktop Table - Hidden on Mobile */}
            <div className="hidden sm:block">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Merchant</th>
                            <th className="px-6 py-4 hidden md:table-cell">Category</th>
                            <th className="px-6 py-4 text-right">Your Share</th>
                            <th className="px-6 py-4 text-right">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {expenses.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                    No expenses found. Start by scanning your first receipt above.
                                </td>
                            </tr>
                        ) : (
                            expenses.map((expense) => (
                                <tr key={expense.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {new Date(expense.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-semibold text-slate-900">{expense.merchant}</span>
                                    </td>
                                    <td className="px-6 py-4 hidden md:table-cell">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${categoryColors[expense.category || "Other"] || categoryColors.Other}`}>
                                            {expense.category || "Other"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="font-bold text-indigo-600">${Number(expense.split_amount || 0).toFixed(2)}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${expense.status === 'pending'
                                            ? 'bg-slate-100 text-slate-800'
                                            : 'bg-blue-100 text-blue-800'
                                            }`}>
                                            {expense.status === 'pending' ? 'Pending' : 'Invoiced'}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card List - Visible only on Mobile */}
            <div className="sm:hidden divide-y divide-slate-100">
                {expenses.length === 0 ? (
                    <div className="px-6 py-12 text-center text-slate-500">
                        No expenses found. Start by scanning your first receipt above.
                    </div>
                ) : (
                    expenses.map((expense) => (
                        <div key={expense.id} className="p-4 hover:bg-slate-50 transition-colors space-y-3">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <p className="font-bold text-slate-900 leading-tight">{expense.merchant}</p>
                                    <p className="text-[11px] text-slate-500 font-medium">
                                        {new Date(expense.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="font-black text-indigo-600 text-lg leading-none">
                                        ${Number(expense.split_amount || 0).toFixed(2)}
                                    </p>
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${expense.status === 'pending'
                                        ? 'bg-slate-100 text-slate-600'
                                        : 'bg-indigo-100 text-indigo-700'
                                        }`}>
                                        {expense.status === 'pending' ? 'Pending' : 'Invoiced'}
                                    </span>
                                </div>
                            </div>
                            {expense.category && (
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${categoryColors[expense.category] || categoryColors.Other}`}>
                                        {expense.category}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
