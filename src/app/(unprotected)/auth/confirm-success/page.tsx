'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ConfirmEmail() {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="mx-auto w-full max-w-md rounded-xl bg-white/90 p-8 shadow-xl backdrop-blur-sm">
                <div className="text-center">
                    <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
                        Email Confirmed!
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Your email has been successfully verified. You can now
                        log in to your account.
                    </p>
                    <div className="mt-6">
                        <Link
                            href="/auth/login"
                            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
                        >
                            Go to Login Page
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
