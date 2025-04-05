import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
    console.log('Middleware running for:', req.nextUrl.pathname)
    // Create a Supabase client using the request and response objects
    let res = NextResponse.next({
        request: req,
    })
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return req.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        req.cookies.set(name, value)
                    )
                    res = NextResponse.next({
                        request: req,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        res.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // Do not run code between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.
    // IMPORTANT: DO NOT REMOVE auth.getUser()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Log user data
    console.log('👤 User authenticated:', !!user)
    if (user) {
        console.log('📧 User email:', user.email)
        console.log('🆔 User ID:', user.id)
        console.log('✅ Email verified:', !!user.email_confirmed_at)
    } else {
        console.log('❌ No user found in session')
    }
    // Define protected routes, these are routes that require a session server side
    const protectedRoutes = ['/dashboard', '/account', '/settings']
    const isProtectedRoute = protectedRoutes.some((route) =>
        req.nextUrl.pathname.startsWith(route)
    )

    if (isProtectedRoute && !user) {
        // If the user is not logged in and tries to access a protected route, redirect to the login page
        return NextResponse.redirect(new URL('/login', req.url))
    }

    return res
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
