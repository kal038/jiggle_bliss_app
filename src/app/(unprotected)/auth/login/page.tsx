'use client'

import { useState } from 'react'

const validateEmail = (email: string): string | null => {
    /*
    Return an error string if the email is invalid, else return null to indicate no error.
    */
    if (!email) return 'Email is required'
    if (email.length > 255) return 'Email is too long'
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (!emailRegex.test(email)) return 'Invalid email format'
    return null
}

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess(false)

        // Validate email
        const validationError = validateEmail(email)
        if (validationError) {
            setError(validationError)
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch('/api/auth/magic-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.toLowerCase().trim() }),
            })

            if (response.ok) {
                setSuccess(true)
                setEmail('')
            } else {
                const data = await response.json()
                setError(data.error || 'Failed to send magic link')
            }
        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow">
                <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
                    Sign in to your account
                </h2>

                {error && (
                    <div className="text-center text-red-500">{error}</div>
                )}

                {success ? (
                    <div className="rounded-md bg-green-50 p-4">
                        <div className="text-center text-green-800">
                            Check your email for the magic link to sign in!
                        </div>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setError('')
                                }}
                                disabled={isLoading}
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send Magic Link'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
