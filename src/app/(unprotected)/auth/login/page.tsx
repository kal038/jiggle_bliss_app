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

const validatePassword = (password: string): string | null => {
    /*
    Return an error string if the password is invalid, else return null to indicate no error.
    */
    if (!password) return 'Password is required'
    if (password.length < 8) return 'Password must be at least 8 characters'
    if (password.length > 255) return 'Password is too long'

    const hasUpper = /[A-Z]/.test(password)
    const hasNum = /[0-9]/.test(password)
    const hasSpecial = /[!@#$%^]/.test(password)

    if (!hasUpper || !hasNum || !hasSpecial)
        return 'Password must contain at least one uppercase letter, one number, and one special character in !, @, #, $, %, ^'

    return null
}

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        setIsLoading(true)
        try {
            // Validate email
            const validationErrorEmail = validateEmail(email)
            if (validationErrorEmail) {
                setError(validationErrorEmail)
                return
            }
            // Validate password
            const validationErrorPassword = validatePassword(password)
            if (validationErrorPassword) {
                setError(validationErrorPassword)
                return
            }

            setSuccess(true)
        } catch (error) {
            setError('An unexpected error occurred. Please try again.')
            console.error('Unexpected login error: ', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-end bg-gray-50 pr-32">
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
                    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
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
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    if (error) {
                                        setError('')
                                    }
                                }}
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="relative block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    if (error) {
                                        setError('')
                                    }
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
                                {isLoading ? 'Signing you in...' : 'Sign In'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
