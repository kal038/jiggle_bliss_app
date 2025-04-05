'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ConfirmEmail() {
    const [email, setEmail] = useState<string>('')

    useEffect(() => {
        const storedEmail = localStorage.getItem('confirmationEmail')
        if (storedEmail) {
            setEmail(storedEmail)
        }
    }, [])

    return (
        <div className="flex h-screen w-full items-center justify-center">
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
                                href="/auth/login"
                                className="text-indigo-600 hover:text-indigo-500"
                            >
                                let us send you another email
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
    )
}
