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
}: {
    children: React.ReactNode
}) {
    return <main className="h-screen bg-white">{children}</main>
}
