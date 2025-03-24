import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import ProductCard from '@/components/product/ProductCard'
import Link from 'next/link'

export default async function HomePage() {
    const supabase = createServerComponentClient<Database>({ cookies })

    //TODO: hit an api route to get the products
    const { data: products, error } = await supabase
        .from('products')
        .select('*')
        .limit(4) // Show only 6 products on homepage
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
                        {products?.map((product) => (
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
