import Image from 'next/image'
import { Database } from '@/lib/database.types'
type Product = Database['public']['Tables']['products']['Row']

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-lg">
            <img
                src={(product.images ?? [])[0]}
                alt={product.name}
                className="h-56 w-full object-cover object-center"
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                    {product.name}
                </h2>
                <p className="mt-2 text-gray-600">${product.price}</p>
                <button className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                    Add to cart
                </button>
            </div>
        </div>
    )
}
