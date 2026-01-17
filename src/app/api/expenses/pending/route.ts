import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
