'use client'
import Link from 'next/link'
import { useState } from 'react'
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navLinkStyles =
    'text-gray-600 px-3 py-1.5 rounded-md transition-all duration-300 hover:cursor-pointer hover:bg-gray-100 hover:shadow-sm dark:text-gray-300 dark:hover:bg-gray-800'

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState('')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <>
            <nav className="mx-auto max-w-7xl bg-blue-100/80 px-4 font-sans sm:px-6 lg:px-8 dark:bg-gray-900">
                <div className="flex h-16 items-center justify-between">
                    {/* Left Side - Logo & Navigation */}
                    <div className="flex items-center">
                        <Link href="/" className="mr-4">
                            <h1 className="text-lg font-semibold tracking-tight text-gray-800 transition-colors duration-300 hover:text-blue-500 xl:text-2xl dark:text-gray-300">
                                Jiggle Bliss
                            </h1>
                        </Link>
                        <div className="hidden items-center space-x-6 md:flex">
                            <Link href="/products" className={navLinkStyles}>
                                Catalog
                            </Link>
                            {/* Desktop Search Bar */}
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="Search products..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Auth & Cart */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden md:flex md:items-center md:space-x-6">
                            <Link href="/auth/login" className={navLinkStyles}>
                                Login
                            </Link>
                        </div>
                        <Link href="/cart" className={navLinkStyles}>
                            Cart
                        </Link>
                        {/* Mobile menu button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 md:hidden"
                        >
                            {isMobileMenuOpen ? (
                                <XMarkIcon className="h-6 w-6" />
                            ) : (
                                <Bars3Icon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-x-0 top-16 z-50 bg-white px-4 py-4 shadow-lg md:hidden dark:bg-gray-900">
                    {/* Mobile Search */}
                    <div className="relative mb-4">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Search products..."
                        />
                    </div>
                    <div className="flex flex-col space-y-3">
                        <Link href="/products" className={navLinkStyles}>
                            Catalog
                        </Link>
                        <Link href="/auth/login" className={navLinkStyles}>
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}
