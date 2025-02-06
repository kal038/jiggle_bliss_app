import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Left Side - Logo & Navigation */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold">
            E-Shop
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/products" className="hover:text-gray-600">
              Products
            </Link>
            <Link href="/about" className="hover:text-gray-600">
              About
            </Link>
          </div>
        </div>

        {/* Right Side - Auth & Cart */}
        <div className="flex items-center gap-6">
          <div> Placeholder</div>
          <div> Cartholder</div>
        </div>
      </div>
    </nav>
  );
}
