import { Database } from '@/lib/database.types'
import { devtools, persist } from 'zustand/middleware'
import { create } from 'zustand'

type Product = Database['public']['Tables']['products']['Row']

interface CartItem {
    product: Product
    quantity: number
}

interface CartStore {
    items: Record<string, CartItem>
    getTotalItems: () => number
    addItem: (product: Product) => void
    decrementItem(productId: string): void
    clearCart: () => void
}

export const useCartStore = create<CartStore>()(
    devtools(
        persist(
            (set, get) => ({
                items: {}, // Record {productId:{product, quantity}}

                getTotalItems: () => {
                    const state = get()
                    return Object.values(state.items).reduce(
                        (total, item) => total + item.quantity,
                        0
                    )
                },

                // Action: add full product to cart
                addItem: (product: Product) =>
                    set((state) => {
                        return {
                            items: {
                                ...state.items,
                                [product.id]: {
                                    product: product,
                                    quantity:
                                        (state.items[product.id]?.quantity ||
                                            0) + 1,
                                },
                            },
                        }
                    }),

                decrementItem: (productId: string) =>
                    set((state) => {
                        const currentItem = state.items[productId]
                        if (!currentItem || currentItem.quantity <= 1) {
                            const { [productId]: removed, ...remainingItems } =
                                state.items
                            return {
                                items: remainingItems,
                            }
                        }
                        return {
                            items: {
                                ...state.items,
                                [productId]: {
                                    ...currentItem,
                                    quantity: currentItem.quantity - 1,
                                },
                            },
                        }
                    }),

                updateQuantity: (productId: string, newQuantity: number) =>
                    set((state) => {
                        return {
                            items: {
                                ...state.items,
                                [productId]: {
                                    ...state.items[productId],
                                    quantity: newQuantity,
                                },
                            },
                        }
                    }),

                clearCart: () => set({ items: {} }),
            }),
            {
                name: 'cart-storage',
            }
        ),
        { name: 'CartStore', enabled: true }
    )
)
