'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ConfirmEmail() {
    const [email, setEmail] = useState<string>('')

    useEffect(() => {
        // Try to get email from localStorage or query params
        const storedEmail = localStorage.getItem('confirmationEmail')
        if (storedEmail) {
            setEmail(storedEmail)
        }
    }, [])

    return (
        <main className="relative min-h-screen w-full">
            {/* Content container */}
            <div className="absolute inset-0 flex items-center justify-center px-6 py-12">
                <div className="mx-auto w-full max-w-md rounded-xl bg-white/90 p-8 shadow-xl backdrop-blur-sm">
                    <div className="text-center">
                        <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
                            Check your email
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            {email ? (
                                <>
                                    We've sent a confirmation link to{' '}
                                    <strong>{email}</strong>
                                </>
                            ) : (
                                "We've sent a confirmation link to your email address"
                            )}
                        </p>
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-500">
                                        Didn't receive an email?
                                    </span>
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-gray-600">
                                Check your spam folder or{' '}
                                <Link
                                    href="/auth/sign-up"
                                    className="text-indigo-600 hover:text-indigo-500"
                                >
                                    try with different email
                                </Link>
                            </p>
                        </div>
                        <div className="mt-6">
                            <Link
                                href="/auth/login"
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Return to login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
