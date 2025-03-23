'use client'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import {
    XMarkIcon,
    TrashIcon,
    PlusIcon,
    MinusIcon,
} from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/useCartStore'
import { Database } from '@/lib/database.types'

type Product = Database['public']['Tables']['products']['Row']

interface CartPanelProps {
    isOpen: boolean
    onClose: () => void
}

interface CartItem {
    product: Product
    quantity: number
}

export default function CartPanel({ isOpen, onClose }: CartPanelProps) {
    const { items, addItem, decrementItem } = useCartStore()
    const cartItems: CartItem[] = Object.values(items)
    const cartTotal = cartItems
        .reduce(
            (total, item) => total + (item.product?.price || 0) * item.quantity,
            0
        )
        .toFixed(2)

    return (
        <Dialog.Root open={isOpen} onOpenChange={onClose}>
            <AnimatePresence>
                {isOpen && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50 bg-black/50"
                            />
                        </Dialog.Overlay>
                        <Dialog.Content asChild>
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 20 }}
                                className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-white shadow-xl"
                            >
                                <div className="flex h-full flex-col">
                                    <div className="flex items-center justify-between border-b px-4 py-4">
                                        <Dialog.Title className="text-lg font-medium">
                                            Your Cart
                                        </Dialog.Title>
                                        <Dialog.Close asChild>
                                            <button className="text-gray-400 hover:text-gray-500">
                                                <XMarkIcon className="h-6 w-6" />
                                            </button>
                                        </Dialog.Close>
                                    </div>

                                    <div className="flex-1 overflow-y-auto p-4">
                                        {cartItems.length === 0 ? (
                                            <p className="text-center text-gray-500">
                                                Your cart is empty
                                            </p>
                                        ) : (
                                            <ul className="divide-y divide-gray-200">
                                                {cartItems.map((item) => (
                                                    <li
                                                        key={item.product?.id}
                                                        className="flex py-6"
                                                    >
                                                        <img
                                                            src={
                                                                item?.product
                                                                    ?.images?.[0]
                                                            }
                                                            alt={
                                                                item?.product
                                                                    ?.name
                                                            }
                                                            className="h-24 w-24 rounded-md object-cover"
                                                        />
                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div className="flex justify-between">
                                                                <h3 className="text-sm font-medium">
                                                                    {
                                                                        item
                                                                            .product
                                                                            ?.name
                                                                    }
                                                                </h3>
                                                                <p className="text-sm font-medium">
                                                                    $
                                                                    {
                                                                        item
                                                                            .product
                                                                            ?.price
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="mt-2 flex items-center justify-between">
                                                                <div className="flex gap-2">
                                                                    {item.quantity >
                                                                    1 ? (
                                                                        <button
                                                                            onClick={() =>
                                                                                decrementItem(
                                                                                    item
                                                                                        .product
                                                                                        ?.id
                                                                                )
                                                                            }
                                                                            className="text-gray-400 hover:text-gray-500"
                                                                        >
                                                                            <MinusIcon className="h-5 w-5" />
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            onClick={() =>
                                                                                decrementItem(
                                                                                    item
                                                                                        .product
                                                                                        ?.id
                                                                                )
                                                                            }
                                                                            className="text-gray-400 hover:text-gray-500"
                                                                        >
                                                                            <TrashIcon className="h-5 w-5" />
                                                                        </button>
                                                                    )}
                                                                    <p className="text-sm text-gray-800">
                                                                        {
                                                                            item.quantity
                                                                        }
                                                                    </p>
                                                                    <button
                                                                        onClick={() =>
                                                                            addItem(
                                                                                item.product
                                                                            )
                                                                        }
                                                                        className="text-gray-400 hover:text-gray-500"
                                                                    >
                                                                        <PlusIcon className="h-5 w-5" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    <div className="border-t p-4">
                                        <div className="flex justify-between text-base font-medium">
                                            <p>Subtotal:</p>
                                            <p>${cartTotal}</p>
                                        </div>
                                        <div className="mt-2 flex justify-between text-sm text-gray-500">
                                            <p>Shipping & Taxes:</p>
                                            <p>Calculated at checkout</p>
                                        </div>
                                        <button
                                            className="mt-4 w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                                            onClick={() => {
                                                /* handle checkout */
                                            }}
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    )
}
