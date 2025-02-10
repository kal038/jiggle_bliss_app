'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function AuthCallback() {
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Get the code from URL parameters
                const code = searchParams.get('code')

                if (!code) {
                    throw new Error('No code received')
                }

                // Here you would typically:
                // 1. Exchange the code for tokens
                // 2. Store the tokens
                // 3. Redirect to the main application

                // Redirect to home page
                router.push('/')
            } catch (error) {
                console.error('Authentication error:', error)
                router.push('/auth/login?error=callback_failed')
            }
        }

        handleCallback()
    }, [router, searchParams])

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-xl font-semibold">Authenticating...</h1>
                <p>Please wait while we complete your sign-in.</p>
            </div>
        </div>
    )
}
