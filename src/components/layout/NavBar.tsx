'use client'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import {
    MagnifyingGlassIcon,
    ShoppingCartIcon,
} from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'
import CartPanel from '../cart/CartPanel'
import type { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const navLinkStyles =
    'text-gray-600 px-3 py-1.5 rounded-md transition-all duration-300 hover:cursor-pointer hover:bg-gray-100 hover:shadow-sm dark:text-gray-300 dark:hover:bg-gray-800'

interface NavbarProps {
    user: User | null
    isLoading: boolean
}

export default function Navbar({ user, isLoading }: NavbarProps) {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const totalItems = useCartStore((state) => state.getTotalItems())
    const clearCart = useCartStore((state) => state.clearCart)
    const signOut = useAuthStore((state) => state.signOut)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleSignOut = async () => {
        try {
            clearCart()
            await signOut()
        } catch (error) {
            console.error('Error signing out', error)
        }
    }

    if (!mounted) {
        return null // Avoid theme flash during hydration
    }

    return (
        <>
            <nav className="mx-auto max-w-7xl bg-blue-100/80 px-4 font-sans dark:bg-gray-900 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Left Side - Logo & Navigation */}
                    <div className="flex items-center space-x-8">
                        <Link
                            href="/"
                            className="dark:text-white0 max-w-lg text-xl font-semibold tracking-tight text-gray-800 transition-colors duration-300 hover:cursor-pointer hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400 xl:text-2xl"
                        >
                            <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 transition-colors duration-300 hover:cursor-pointer hover:text-blue-500 hover:underline dark:text-gray-300 dark:hover:text-blue-400 xl:text-2xl">
                                Jiggle Bliss
                            </h1>
                        </Link>
                        <div className="hidden items-center space-x-6 md:flex">
                            <Link href="/products" className={navLinkStyles}>
                                Shop All
                            </Link>
                            {/* Search Bar */}
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <MagnifyingGlassIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="Search products..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Auth & Cart */}
                    <div className="flex items-center">
                        <div className="border-r border-gray-300 pr-4 dark:border-gray-700"></div>
                        <div className="flex items-center space-x-6 pl-4">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        {`Hello ${user.email}`}
                                    </span>
                                    <button
                                        onClick={handleSignOut}
                                        className={navLinkStyles}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/auth/login"
                                    className={navLinkStyles}
                                >
                                    Login
                                </Link>
                            )}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="relative"
                            >
                                <ShoppingCartIcon className="h-6 w-6 text-gray-600 hover:text-blue-500 dark:text-gray-300" />
                                {totalItems > 0 && (
                                    <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <CartPanel
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </>
    )
}
