import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/footer/Footer'
import './globals.css'
import Navbar from '@/components/layout/NavBar'
import { Toaster } from 'react-hot-toast'
const inter = Inter({
    subsets: ['latin'],
})

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
        <html lang="en">
            <body className={`${inter.className}`}>
                <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
                    <Navbar />
                </header>
                <main className="min-h-[calc(100vh-64px)]">{children}</main>
                <Footer />
                <Toaster
                    position="top-right"
                    containerStyle={{ top: 70, right: 20 }}
                    toastOptions={{
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
                    }}
                />
            </body>
        </html>
    )
}
