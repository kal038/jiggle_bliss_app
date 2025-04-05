import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import Image from 'next/image'

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
    return (
        <main className="relative h-screen bg-white">
            {/* Hero image container */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 z-10 bg-black/40" />
                <Image
                    src="/images/hero-login.jpg"
                    alt="Login hero image"
                    className="object-cover"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
            </div>
            <div className="relative z-20">{children}</div>
        </main>
    )
}
