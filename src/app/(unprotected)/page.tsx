import { createClient } from '@/utils/supabase/server'
import type { Database } from '@/lib/database.types'
import ProductCard from '@/components/product/ProductCard'
import Link from 'next/link'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

type Product = Database['public']['Tables']['products']['Row']

export async function GET(request: NextRequest) {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')

    if (code) {
        const supabase = await createClient()
        await supabase.auth.exchangeCodeForSession(code)
        return NextResponse.redirect(new URL('/', request.url))
    }

    // If no code, NextJS will continue to render the page component
    return NextResponse.next()
}

export default async function HomePage() {
    const supabase = await createClient()

    //TODO: hit an api route to get the products instead of calling supabase directly
    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .limit(3) // Show only featured products on home page
        .order('created_at', { ascending: false })

    if (error) {
        console.error(error)
    }

    return (
        <main className="flex-1">
            {/* Hero Section */}
            <div className="bg-blue-100/80 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome to Jiggle Bliss
                    </h1>
                    <p className="mt-4 text-xl text-gray-600">
                        Discover our handcrafted charms and accessories
                    </p>
                </div>
            </div>

            {/* Featured Products Section */}
            <div className="py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Featured Products
                    </h2>
                    <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {products?.map((product: Product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Link
                            href="/products"
                            className="inline-block rounded-md bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700"
                        >
                            View All Products
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
