import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/security";
import { getAdminStats, getAnnouncement } from "@/actions/admin-actions";
import { Users, CreditCard, Receipt, TrendingUp, Star, Clock, Megaphone } from "lucide-react";
import { AnnouncementForm } from "./announcement-form";
import { SystemErrors } from "./system-errors";
import { getErrorLogs } from "@/actions/system-logging";

export default async function AdminPage() {
    const user = await currentUser();
    const email = user?.emailAddresses?.[0]?.emailAddress;

    if (!isAdmin(email)) {
        redirect("/dashboard");
    }

    const stats = await getAdminStats();
    const announcement = await getAnnouncement();
    const errorLogs = await getErrorLogs(20, false);

    const currentAnnouncement = announcement || { content: "", is_active: false, type: "info" };

    if ("error" in stats) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-2xl border border-red-100 shadow-sm max-w-md w-full text-center">
                    <p className="text-red-500 font-bold mb-2">Error Loading Stats</p>
                    <p className="text-slate-500 text-sm">{stats.error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 pb-24 md:pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                {/* Header */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 font-serif">Admin Command Center</h1>
                        <p className="text-slate-500 mt-1">Global performance and user activity.</p>
                    </div>
                    <div className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 flex items-center gap-2">
                        <Star className="w-4 h-4 fill-white" />
                        Admin Access Verified
                    </div>
                </div>

                {/* Announcement Section */}
                <div className="mb-8 max-w-2xl">
                    <AnnouncementForm
                        currentContent={currentAnnouncement.content}
                        currentIsActive={currentAnnouncement.is_active}
                        currentType={currentAnnouncement.type}
                    />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Users"
                        value={stats.totalUsers}
                        icon={<Users className="w-6 h-6" />}
                        color="bg-blue-50 text-blue-600"
                    />
                    <StatCard
                        title="Pro Users"
                        value={stats.proUsers}
                        icon={<Star className="w-6 h-6" />}
                        color="bg-emerald-50 text-emerald-600"
                        subtitle={`${((stats.proUsers / (stats.totalUsers || 1)) * 100).toFixed(1)}% conversion`}
                    />
                    <StatCard
                        title="Expenses Scanned"
                        value={stats.totalExpenses}
                        icon={<Receipt className="w-6 h-6" />}
                        color="bg-indigo-50 text-indigo-600"
                    />
                    <StatCard
                        title="Total Volume"
                        value={`$${stats.totalVolume.toLocaleString()}`}
                        icon={<TrendingUp className="w-6 h-6" />}
                        color="bg-amber-50 text-amber-600"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Users */}
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-slate-400" />
                                Recent Activity
                            </h3>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Last 10 Users</span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-400 font-black border-b border-slate-100">
                                        <th className="px-6 py-4">User Email</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Signed Up</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {stats.recentUsers.map((u, i) => (
                                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-slate-900">{u.email}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                {u.is_pro ? (
                                                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-lg uppercase tracking-wider">Pro</span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-wider">Free</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-slate-500">
                                                {new Date(u.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Actions / More Stats */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-4">Platform Overview</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                    <span className="text-sm text-slate-500">Total Invoices</span>
                                    <span className="font-bold text-slate-900">{stats.totalInvoices}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                    <span className="text-sm text-slate-500">Avg. Volume/User</span>
                                    <span className="font-bold text-slate-900">${(stats.totalVolume / (stats.totalUsers || 1)).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-sm text-slate-500">Infrastructure</span>
                                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase">Healthy</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-100">
                            <p className="text-indigo-100 text-sm font-bold uppercase tracking-widest mb-1">Estimated MRR</p>
                            <h4 className="text-3xl font-black">${(stats.proUsers * 9).toLocaleString()}</h4>
                            <p className="text-indigo-200 text-xs mt-4">Based on $9/month per pro user.</p>
                        </div>
                    </div>
                </div>

                {/* System Errors Section */}
                <div className="mb-8">
                    <SystemErrors initialLogs={errorLogs} />
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, color, subtitle }: { title: string, value: string | number, icon: React.ReactNode, color: string, subtitle?: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-indigo-200 transition-all">
            <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1 relative z-10">{title}</p>
            <h3 className="text-2xl font-black text-slate-900 relative z-10">{value}</h3>
            {subtitle && <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{subtitle}</p>}
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -mr-12 -mt-12 group-hover:bg-indigo-50 transition-colors" />
        </div>
    );
}
