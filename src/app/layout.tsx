import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import './globals.css'
import Navbar from '@/components/layout/NavBar'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'
import ProtectedNavBar from '@/components/layout/ProtectedNavBar'
import { AuthProvider } from '@/components/providers/AuthProvider'

const inter = Inter({
    subsets: ['latin'],
})

const toastOptions = {
    success: {
        style: {
            background: 'green',
        },
    },
    error: {
        style: {
            background: 'red',
        },
    },
}

export const metadata: Metadata = {
    title: 'Jiggle Bliss charms, 100% handmade with care',
    description: 'Unique and authentic handbag charms, made by PONJI',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className}`}>
                <AuthProvider>
                    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
                        <ProtectedNavBar />
                    </header>
                    <ThemeProvider attribute="class">
                        <main className="min-h-[calc(100vh-64px)]">
                            {children}
                        </main>
                    </ThemeProvider>
                    <Footer />
                    <Toaster
                        position="top-right"
                        containerStyle={{ top: 70, right: 20 }}
                        toastOptions={toastOptions}
                    />
                </AuthProvider>
            </body>
        </html>
    )
}
