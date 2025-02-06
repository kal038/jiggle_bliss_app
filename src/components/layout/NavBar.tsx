import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="mx-auto max-w-7xl bg-blue-100/80 px-4 font-sans sm:px-6 lg:px-8 dark:bg-gray-900">
            <div className="flex h-16 items-center justify-between">
                {/* Left Side - Logo & Navigation */}
                <div className="flex items-center space-x-8">
                    <Link
                        href="/"
                        className="dark:text-white0 max-w-lg text-xl font-semibold tracking-tight text-gray-800 transition-colors duration-300 hover:cursor-pointer hover:text-blue-500 hover:underline xl:text-2xl dark:text-gray-300 dark:hover:text-blue-400"
                    >
                        <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 transition-colors duration-300 hover:cursor-pointer hover:text-blue-500 hover:underline xl:text-2xl dark:text-gray-300 dark:hover:text-blue-400">
                            Jiggle Bliss
                        </h1>
                    </Link>
                    <div className="hidden space-x-6 md:flex">
                        <Link
                            href="/products"
                            className="text-m bg-white font-bold text-black hover:bg-gray-200 hover:text-gray-600 dark:bg-black dark:text-white dark:hover:bg-gray-800"
                        >
                            Products
                        </Link>
                    </div>
                </div>

                {/* Right Side - Auth & Cart */}
                <div className="flex items-center gap-6">
                    <div className="text-m bg-white font-bold text-black hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-gray-800">
                        <Link
                            href="/"
                            className="bg-white font-bold text-black text-inherit hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-gray-800"
                        >
                            Login
                        </Link>
                    </div>
                    <div className="text-m bg-white font-bold text-black dark:bg-black dark:text-white">
                        <Link
                            href="/"
                            className="bg-white font-bold text-black text-inherit hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-gray-800"
                        >
                            Cart()
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
