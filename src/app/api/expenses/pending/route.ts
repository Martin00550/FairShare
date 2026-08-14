import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { NextResponse } from "next/server";


export async function GET() {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user's split percentage
    const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("split_percentage")
        .eq("id", userId)
        .single();

    const splitPercentage = profile?.split_percentage || 50;

    const { data: expenses, error } = await supabaseAdmin
        .from("expenses")
        .select("id, date, merchant, category, split_amount, total_amount, status")
        .eq("user_id", userId)
        .eq("status", "pending")
        .order("date", { ascending: false });

    if (error) {
        console.error("Error fetching pending expenses:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ expenses: expenses || [], splitPercentage });
}
