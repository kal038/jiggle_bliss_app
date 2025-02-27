import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import {cookies} from 'next/headers'
import { NextResponse, NextRequest } from "next/server";
import type { Database } from "@/lib/database.types";

export async function GET(request: NextRequest) {
    const requestUrl: URL = new URL(request.nextUrl)
    const code = requestUrl.searchParams.get('code')
    if (code) {
        const cookieStore = cookies()
        const supabase = createRouteHandlerClient<Database>({cookies})
        await supabase.auth.exchangeCodeForSession(code)

    }

    return NextResponse.redirect(requestUrl.origin)
}