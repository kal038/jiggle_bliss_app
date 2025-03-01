'use client'

import { useState } from 'react'
import Image from 'next/image'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

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
    const [fullName, setFullName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        setIsLoading(true)

        // Add this line to test loading state
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const supabase = createClientComponentClient()
        try {
            // Validate email
            const validationErrorEmail = validateEmail(email)
            // Validate password
            const validationErrorPassword = validatePassword(password)
            if (validationErrorPassword) {
                setError(validationErrorPassword)
                return
            }

            if (isSignUp) {
                // Validate confirm password
                if (password !== confirmPassword) {
                    setError('Passwords do not match')
                    return
                }
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                    },
                })
                if (error) throw error
                setSuccess(true)
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                setSuccess(true)
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.')
            console.error('Unexpected login error: ', error)
        } finally {
            setIsLoading(false)
        }
        // all checks passed at this point
    }
    const renderMessages = () => (
        <div className="mt-4">
            {error && (
                <div
                    className={`rounded-md p-4 text-sm ${
                        error.includes('check your email')
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                    }`}
                >
                    {error}
                </div>
            )}
        </div>
    )

    const renderForm = () => (
        <form className="mt-4 space-y-4 sm:mt-8" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" className="sr-only">
                    Email address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="relative block w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        if (error) setError('')
                    }}
                    disabled={isLoading}
                />
            </div>
            <div>
                <label htmlFor="password" className="sr-only">
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="relative block w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        if (error) setError('')
                    }}
                    disabled={isLoading}
                />
            </div>
            {isSignUp && (
                <div>
                    <label htmlFor="confirmPassword" className="sr-only">
                        Confirm password
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        className="relative block w-full appearance-none rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
            )}
            <div>
                <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 sm:py-2 sm:text-sm"
                    disabled={isLoading}
                >
                    {isLoading
                        ? 'Processing...'
                        : isSignUp
                          ? 'Create Account'
                          : 'Sign In'}
                </button>
            </div>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
            </div>
            <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="group relative flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                {isSignUp
                    ? 'Already have an account? Sign in instead'
                    : 'Create an account'}
            </button>
        </form>
    )

    return (
        <main className="relative min-h-screen w-full">
            {/* Hero image container */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-black/40" />
                <Image
                    src="/images/hero-login.jpg"
                    alt="Login hero image"
                    className="object-cover"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
            </div>

            {/* Form container */}
            <div className="absolute inset-0 flex items-center justify-center px-4 py-6 sm:p-6">
                <div className="w-full max-w-md space-y-6 rounded-xl bg-white/90 p-6 shadow-xl backdrop-blur-sm sm:space-y-8 sm:p-8">
                    <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
                        {isSignUp
                            ? 'This is going to be fun!'
                            : 'Sign in to your account'}
                    </h2>

                    {renderMessages()}
                    {renderForm()}
                </div>
            </div>
        </main>
    )
}
