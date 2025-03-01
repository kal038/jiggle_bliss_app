import { Database } from "@/lib/database.types";
import { persist} from "zustand/middleware";
import {create} from 'zustand';

type Product = Database['public']['Tables']['products']['Row'];

interface CartItem {
    product: Product;
    quantity: number;
}

interface CartStore {
    items: Record<string, CartItem>;
    totalItems: number;
    addItem: (product: Product) => void;
    decrementItem(productId: string): void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            items: {}, // Record {productId:{product, quantity}}
            totalItems: 0,
            
            // Action: add full product to cart
            addItem: (product: Product) => 
                set((state) => {
                    return {
                        items: {
                            ...state.items, //spread previous items, add new item
                            [product.id]: {
                                product: product,
                                quantity: (state.items[product.id]?.quantity || 0) + 1
                            }
                        },
                        totalItems: state.totalItems + 1
                    };
                }),

            decrementItem: (productId: string) =>
                set((state) => {
                    const currentItem = state.items[productId];
                    if (!currentItem || currentItem.quantity <= 1) {
                        const { [productId]: removed, ...remainingItems } = state.items;
                        return {
                            items: remainingItems,
                            totalItems: state.totalItems - 1
                        };
                    }
                    return {
                        items: {
                            ...state.items,
                            [productId]: {
                                ...currentItem,
                                quantity: currentItem.quantity - 1
                            }
                        },
                        totalItems: state.totalItems - 1
                    };
                }),

            // Action: update product with productId to have quantity
            updateQuantity: (productId: string, newQuantity: number) => 
                set((state) => {
                    return {
                        items: {
                            ...state.items,
                            [productId]: {
                                ...state.items[productId],
                                quantity: newQuantity
                            }
                        },
                        totalItems: state.totalItems +newQuantity
                    };
                }
            ),
            clearCart: () => set({ items: {}, totalItems: 0 })
        }),
        {
            name: 'cart-storage',
        }
    )
);
