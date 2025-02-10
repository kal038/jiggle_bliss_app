import { NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

import type { Database } from '@/lib/database.types'
import type { NextRequest } from 'next/server'


export async function middleware(request: NextRequest) { //middleware function, input is a NextRequest object, return a NextResponse object
    // Basic middleware logic
    const response = NextResponse.next()
    
    // Add custom headers
    response.headers.set('x-middleware-cache', 'no-cache')

    // Create a Supabase Client using cookes

    const supabase = createMiddlewareClient<Database>({ req: request, res: response })

    // Refresh session if expired
    await supabase.auth.getSession()
    
    // You can perform checks on the request here
    // const pathname = request.nextUrl.pathname
    // if (pathname.startsWith('/api/')) {
    //   // Handle API routes
    // }

    return response
}

// Configure which routes use this middleware
export const config = {
    matcher: [
        /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}