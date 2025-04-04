import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
export async function GET(request: NextRequest) {
    console.log('Auth callback route running')
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
        const supabase = await createClient()
        await supabase.auth.exchangeCodeForSession(code)
    }

    // Redirect to the home page or any other page you want
    const redirectUrl = 'http://localhost:3000' // Fallback to localhost if origin is not available

    return NextResponse.redirect(redirectUrl)
}
