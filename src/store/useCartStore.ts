import { Database } from "@/lib/database.types";
import { persist} from "zustand/middleware";
import {create} from 'zustand';

type Product = Database['public']['Tables']['products']['Row'];

interface CartItem {
    product: Product;
}

interface CartStore {
    items: Record<string, CartItem>;
    totalItems: number;
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    // updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set) => ({
            items: {}, // prodictId -> CartItem
            totalItems: 0,
            
            // Action: add full product to cart
            addItem: (product: Product) => 
                set((state) => ({
                    items: {
                        ...state.items, //spread previous items, add new item
                        [product.id]: {
                            product: product
                        }
                    },
                    totalItems: state.totalItems + 1
                })),
            
            // Action: remove item by productId
            removeItem: (productId: string) => 
                set((state) => {
                    const { [productId]: removed, ...items } = state.items;
                    return {
                        items,
                        totalItems: state.totalItems - 1
                    };
                }),


            // // Action: update item with productId with new quantity
            // updateQuantity: (productId: string, quantity: number) => 
            //     set((state) => ({
            //         items: {
            //             ...state.items,
            //             [productId]: {
            //                 ...state.items[productId],
            //                 quantity
            //             }
            //         },
            //         total: state.total + (quantity - (state.items[productId]?.quantity || 0))
            //     })),

            clearCart: () => set({ items: {}, totalItems: 0 })
        }),
        {
            name: 'cart-storage',
        }
    )
);
