import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { expenseIds } = await request.json();

        if (!expenseIds || !Array.isArray(expenseIds) || expenseIds.length === 0) {
            return NextResponse.json({ error: "No expense IDs provided" }, { status: 400 });
        }

        // Update expenses to invoiced status
        const { error } = await supabaseAdmin
            .from("expenses")
            .update({ status: "invoiced" })
            .eq("user_id", userId)
            .in("id", expenseIds);

        if (error) {
            console.error("Error marking expenses as invoiced:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
