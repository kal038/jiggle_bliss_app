'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ConfirmEmail() {
    const [countdown, setCountdown] = useState(5)
    const router = useRouter()

    useEffect(() => {
        // Set up countdown timer
        const timer = setInterval(() => {
            setCountdown((prev) => Math.max(0, prev - 1))
        }, 1000)

        // Set up redirect after 5 seconds
        const redirectTimer = setTimeout(() => {
            router.push('/')
        }, 5000)

        // Cleanup timers
        return () => {
            clearInterval(timer)
            clearTimeout(redirectTimer)
        }
    }, [router])

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="mx-auto w-full max-w-md rounded-xl bg-white/90 p-8 shadow-xl backdrop-blur-sm">
                <div className="text-center">
                    <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
                        Email Confirmed!
                    </h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Your email has been successfully verified. Enjoy
                        shopping!
                    </p>

                    <div className="mt-4 text-sm text-gray-500">
                        Redirecting to home page in{' '}
                        <span className="font-medium text-indigo-600">
                            {countdown}
                        </span>{' '}
                        seconds...
                    </div>
                </div>
            </div>
        </div>
    )
}
