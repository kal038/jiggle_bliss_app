'use client'
import Image from 'next/image'
import { Database } from '@/lib/database.types'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useCartStore } from '@/store/useCartStore'

type Product = Database['public']['Tables']['products']['Row']

interface ProductCardProps {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    const [quantity, setQuantity] = useState(0)
    const addItem = useCartStore((state) => state.addItem)
    const items = useCartStore((state) => state.items)
    const decrementItem = useCartStore((state) => state.decrementItem)
    const handleIncrementCart = () => {
        addItem(product)
        setQuantity(quantity + 1)
        toast.success(`${product.name} added to cart`, {
            duration: 2000,
            style: { background: '#333', color: '#fff', borderRadius: '10px' },
        })
    }

    const handleDecrementCart = () => {
        decrementItem(product.id)
        setQuantity(quantity - 1)
        toast.error(`${product.name} removed`, {
            duration: 2000,
            style: { background: '#333', color: '#fff', borderRadius: '10px' },
        })
    }

    return (
        <div className="w-full max-w-sm overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl">
            <div className="relative">
                <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="h-52 w-full object-cover"
                />
                {/* <span className="absolute right-3 top-3 rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white">
                        Sale
                    </span> */}
            </div>

            <div className="space-y-4 p-5">
                <div>
                    <h3 className="text-xl font-bold text-gray-900">
                        {product.name}
                    </h3>
                    <p className="mt-1 text-gray-500">{product.description}</p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-2xl font-bold text-gray-900">
                            {product.price}
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                            {product.price}
                        </p>
                    </div>
                </div>
                (
                <button
                    onClick={handleIncrementCart}
                    className="w-full rounded-lg bg-indigo-600 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
                >
                    Add to Cart
                </button>
                )
            </div>
        </div>
    )
}
