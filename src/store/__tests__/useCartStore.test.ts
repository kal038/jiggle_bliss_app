import { Database } from '@/lib/database.types'
import { useCartStore } from '../useCartStore'
import { beforeEach, describe, expect, it } from 'vitest'

type Product = Database['public']['Tables']['products']['Row']

//TODO: fix totalItems since it doesn't exist anymore

const mockProduct1: Product = {
    id: '2',
    name: 'Test Product 2',
    price: 20.99,
    description: 'Test description 2',
    created_at: new Date().toISOString(),
    updated_at: null,
    archived: false,
    currency: 'USD',
    images: ['test-image-2.jpg'],
    stock: null,
    stripe_price_id: null,
    stripe_product_id: null,
}
const mockProduct2: Product = {
    id: '2',
    name: 'Test Product 2',
    price: 20.99,
    description: 'Test description 2',
    created_at: new Date().toISOString(),
    updated_at: null,
    archived: false,
    currency: 'USD',
    images: ['test-image-2.jpg'],
    stock: null,
    stripe_price_id: null,
    stripe_product_id: null,
}

describe('useCartStore', () => {
    beforeEach(() => {
        useCartStore.getState().clearCart()
    })

    it('should initialize with empty cart', () => {
        const state = useCartStore.getState()
        expect(state.items).toEqual({})
        expect(state.totalItems).toBe(0)
    })

    it('should add item to cart', () => {
        const { addItem } = useCartStore.getState()
        addItem(mockProduct1)

        const state = useCartStore.getState()
        expect(state.items[mockProduct1.id]).toEqual({
            product: mockProduct1,
            quantity: 1,
        })
        expect(state.totalItems).toBe(1)
    })

    it('should increment quantity for existing item', () => {
        const { addItem } = useCartStore.getState()
        addItem(mockProduct1)
        addItem(mockProduct1)

        const state = useCartStore.getState()
        expect(state.items[mockProduct1.id].quantity).toBe(2)
        expect(state.totalItems).toBe(2)
    })

    it('should decrement item quantity', () => {
        const { addItem, decrementItem } = useCartStore.getState()
        addItem(mockProduct1)
        addItem(mockProduct1)
        decrementItem(mockProduct1.id)

        const state = useCartStore.getState()
        expect(state.items[mockProduct1.id].quantity).toBe(1)
        expect(state.totalItems).toBe(1)
    })

    it('should remove item when decrementing last item', () => {
        const { addItem, decrementItem } = useCartStore.getState()
        addItem(mockProduct1)
        decrementItem(mockProduct1.id)

        const state = useCartStore.getState()
        expect(state.items[mockProduct1.id]).toBeUndefined()
        expect(state.totalItems).toBe(0)
    })

    it('should handle multiple products in cart', () => {
        const { addItem } = useCartStore.getState()
        addItem(mockProduct1)
        addItem(mockProduct2)

        const state = useCartStore.getState()
        expect(Object.keys(state.items).length).toBe(2)
        expect(state.totalItems).toBe(2)
    })

    it('should clear cart', () => {
        const { addItem, clearCart } = useCartStore.getState()
        addItem(mockProduct1)
        addItem(mockProduct2)
        clearCart()

        const state = useCartStore.getState()
        expect(state.items).toEqual({})
        expect(state.totalItems).toBe(0)
    })
})
