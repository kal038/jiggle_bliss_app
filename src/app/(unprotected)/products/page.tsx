import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import ProductCard from '@/components/product/ProductCard'

type Product = Database['public']['Tables']['products']['Row']

export default async function ProductsPage() {
    //init supa client for a server component
    const supabase = await createClient()
    //fetch all products straight from DB
    const { data: products, error } = await supabase
        .from('products')
        .select('*')
    if (error) {
        console.error('Failed to fetch products', error)
        throw new Error('Failed to fetch products')
    }
    if (!products) {
        return (
            <div className="py-12 text-center">
                <h2 className="text-xl font-semibold">No products available</h2>
            </div>
        )
    }
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/*embedd script  to loop over products and render them with ProductCard*/}
                {products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
