"use client";

import { useState } from "react";
import { resolveErrorAndArchive, ErrorSeverity } from "@/actions/system-logging";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, Clock, Terminal, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

interface ErrorLog {
    id: string;
    message: string;
    stack?: string;
    context: string;
    severity: ErrorSeverity;
    created_at: string;
    user_id?: string;
    metadata?: any;
}

interface Props {
    initialLogs: ErrorLog[] | { error: string };
}

export function SystemErrors({ initialLogs }: Props) {
    const [logs, setLogs] = useState<ErrorLog[]>(Array.isArray(initialLogs) ? initialLogs : []);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const handleResolve = async (id: string) => {
        const res = await resolveErrorAndArchive(id);
        if (res.error) {
            toast.error(res.error);
        } else {
            toast.success("Error resolved");
            setLogs(logs.filter(log => log.id !== id));
        }
    };

    if (logs.length === 0) {
        return (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mx-auto mb-4">
                    <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900">System Healthy</h3>
                <p className="text-slate-500 text-sm mt-1">No active error logs found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <h3 className="font-bold text-slate-900">System Errors</h3>
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-black rounded-full">
                        {logs.length}
                    </span>
                </div>
            </div>

            <div className="divide-y divide-slate-100">
                {logs.map((log) => (
                    <div key={log.id} className="group hover:bg-slate-50 transition-colors">
                        <div className="p-4 sm:px-6 flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${log.severity === 'critical' ? 'bg-red-600 text-white' :
                                            log.severity === 'warning' ? 'bg-amber-100 text-amber-700' :
                                                'bg-slate-200 text-slate-600'
                                        }`}>
                                        {log.severity}
                                    </span>
                                    <span className="text-xs font-mono text-slate-400">{log.context}</span>
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {new Date(log.created_at).toLocaleString()}
                                    </span>
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm truncate pr-4">{log.message}</h4>
                                {log.user_id && (
                                    <p className="text-xs text-slate-400 mt-0.5">User: {log.user_id}</p>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                                    className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600"
                                >
                                    {expandedId === log.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => handleResolve(log.id)}
                                    className="h-8 text-xs font-bold bg-white border border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 shadow-sm"
                                >
                                    Resolve
                                </Button>
                            </div>
                        </div>

                        {expandedId === log.id && (
                            <div className="px-6 pb-4 pt-0">
                                <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                                    {log.metadata && Object.keys(log.metadata).length > 0 && (
                                        <div className="mb-4 pb-4 border-b border-slate-800">
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Metadata</p>
                                            <pre className="text-xs text-emerald-400 font-mono">
                                                {JSON.stringify(log.metadata, null, 2)}
                                            </pre>
                                        </div>
                                    )}
                                    {log.stack && (
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                <Terminal className="w-3 h-3" /> Stack Trace
                                            </p>
                                            <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                                                {log.stack}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
