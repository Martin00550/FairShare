"use client";
import { useState } from "react";
import { updateAnnouncement } from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Megaphone, Save, Loader2, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface Props {
    currentContent: string;
    currentIsActive: boolean;
    currentType: string;
}

export function AnnouncementForm({ currentContent, currentIsActive, currentType }: Props) {
    const [content, setContent] = useState(currentContent);
    const [isActive, setIsActive] = useState(currentIsActive);
    const [type, setType] = useState(currentType);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await updateAnnouncement(content, isActive, type);
            if (res.error) {
                toast.error(res.error);
            } else {
                toast.success("Announcement updated successfully!");
                // No need to reload, state is already updated locally
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                    <Megaphone className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-900 font-serif">Global Announcement</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Broadcast to all users</p>
                </div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Message Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Type your message here... (e.g. Scheduled maintenance at 2 PM)"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 transition-all font-medium min-h-[100px]"
                    />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Banner Type</label>
                        <div className="flex gap-2">
                            {(['info', 'warning', 'success'] as const).map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setType(t)}
                                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 border ${type === t
                                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    {t === 'info' && <Info className="w-3 h-3" />}
                                    {t === 'warning' && <AlertTriangle className="w-3 h-3" />}
                                    {t === 'success' && <CheckCircle className="w-3 h-3" />}
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Visibility</label>
                        <button
                            onClick={() => setIsActive(!isActive)}
                            className={`w-full py-2 px-4 rounded-lg text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 border ${isActive
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm'
                                    : 'bg-slate-50 text-slate-500 border-slate-200'
                                }`}
                        >
                            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                            {isActive ? 'Live (Visible to all)' : 'Draft (Hidden)'}
                        </button>
                    </div>
                </div>

                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full h-12 bg-slate-900 hover:bg-black font-black text-sm rounded-xl mt-2 transition-all hover:-translate-y-1 shadow-lg shadow-slate-100"
                >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    {isSaving ? "Saving..." : "Update Announcement"}
                </Button>
            </div>
        </div>
    );
}
