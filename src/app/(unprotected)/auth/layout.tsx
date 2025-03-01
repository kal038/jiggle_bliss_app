import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'

const inter = Inter({
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Authentication - Jiggle Bliss',
    description: 'Sign in or create an account with Jiggle Bliss',
}

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div
            className={`${inter.className} min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50`}
        >
            {children}
        </div>
    )
}
