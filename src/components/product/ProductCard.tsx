'use client'
import Image from 'next/image'
import { Database } from '@/lib/database.types'
import { useState } from 'react'

type Product = Database['public']['Tables']['products']['Row']

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const [quantity, setQuantity] = useState(0)
    const handleAddToCart = () => {
        setQuantity(quantity + 1)
    }
    return (
        <div className="w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl">
            <div className="relative">
                <img
                    src="https://placehold.co/400x300"
                    alt="Product"
                    className="h-52 w-full object-cover"
                />
                {/* <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white">
                        Sale
                    </span> */}
            </div>

            <div className="space-y-4 p-5">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">
                        classNameic T-Shirt
                    </h3>
                    <p className="mt-1 text-gray-500">Premium cotton blend</p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-2xl font-bold text-gray-900">
                            $49.99
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                            $69.99
                        </p>
                    </div>

                    {/* <div className="flex items-center gap-1">
                            <div className="text-yellow-400">★★★★</div>
                            <div className="text-gray-300">★</div>
                            <span className="ml-1 text-sm text-gray-600">
                                (42)
                            </span>
                        </div> */}
                </div>

                <button className="w-full rounded-lg bg-indigo-600 py-3 font-medium text-white transition-colors hover:bg-indigo-700">
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
