'use server'
// following this implementation: https://github.com/vercel/nextjs-subscription-payments
import { createClient } from '@/utils/supabase/server'
import { get } from 'http'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const getURL = (path: string = '') => {
    // Check if NEXT_PUBLIC_SITE_URL is set and non-empty. Set this to your site URL in production env.
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL &&
        process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
            ? process.env.NEXT_PUBLIC_SITE_URL
            : // If not set, check for NEXT_PUBLIC_VERCEL_URL, which is automatically set by Vercel.
              process?.env?.NEXT_PUBLIC_VERCEL_URL &&
                process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
              ? process.env.NEXT_PUBLIC_VERCEL_URL
              : // If neither is set, default to localhost for local development.
                'http://localhost:3000/'

    // Trim the URL and remove trailing slash if exists.
    url = url.replace(/\/+$/, '')
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`
    // Ensure path starts without a slash to avoid double slashes in the final URL.
    path = path.replace(/^\/+/, '')

    // Concatenate the URL and the path.
    return path ? `${url}/${path}` : url
}

export async function signUp(formData: FormData) {
    const callbackURL = getURL('auth/callback')
    console.log('[Auth] Sign up attempt - Callback URL:', callbackURL) //Should be "http://localhost:3000/auth/callback"
    const email = String(formData.get('email')).trim()
    const password = String(formData.get('password')).trim()
    const supabase = await createClient()

    const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: callbackURL,
        },
    })

    if (error) {
        console.error('[Auth] Sign up failed:', error.message)
        redirect('/error')
    }

    console.log('[Auth] Sign up successful', {
        userId: data.user?.id,
        email: data.user?.email,
        sessionExists: !!data.session, //get boolean value
    })

    redirect('/auth/confirm-email')
}

export async function signInWithPassword(formData: FormData) {
    const cookieStore = cookies()
    const email = String(formData.get('email')).trim()
    const password = String(formData.get('password')).trim()
    let redirectPath: string

    const supabase = await createClient()
    const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        console.error('Error signing up:', error)
        redirect('/error')
    }
    if (data.user) {
        console.log('User signed up:', data.user)
    }
    if (data.session) {
        console.log('Session:', data.session)
    }
    redirect('/')
}

export async function signOut(formData: FormData) {
    const pathName = String(formData.get('pathName')).trim()

    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    return '/'
}
