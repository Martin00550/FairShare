import { getAnnouncement } from "@/actions/admin-actions";
import { Info, AlertTriangle, CheckCircle } from "lucide-react";

export async function AnnouncementBanner() {
    const announcement = await getAnnouncement();

    if (!announcement || !announcement.is_active || !announcement.content) {
        return null;
    }

    const { content, type } = announcement;

    const styles = {
        info: "bg-indigo-600 border-indigo-500 text-white",
        warning: "bg-amber-500 border-amber-400 text-white",
        success: "bg-emerald-600 border-emerald-500 text-white",
    }[type as 'info' | 'warning' | 'success'] || "bg-indigo-600 text-white";

    const Icon = {
        info: Info,
        warning: AlertTriangle,
        success: CheckCircle,
    }[type as 'info' | 'warning' | 'success'] || Info;

    return (
        <div className={`w-full border-b px-4 py-2.5 flex items-center justify-center gap-3 text-sm font-bold shadow-sm relative z-50 ${styles}`}>
            <Icon className="w-4 h-4" />
            <p className="tracking-tight">{content}</p>
        </div>
    );
}
