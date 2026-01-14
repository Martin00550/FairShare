import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50">
            <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-700">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-indigo-700 font-serif animate-pulse">
                    FairShare
                </h1>
                <div className="flex items-center gap-2 text-indigo-300 font-sans text-sm font-bold tracking-widest uppercase">
                    <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                    <span>Loading</span>
                </div>
            </div>
        </div>
    );
}
