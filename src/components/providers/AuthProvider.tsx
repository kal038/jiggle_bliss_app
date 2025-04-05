'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/store/useAuthStore'

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const initializeAuthListener = useAuthStore(
        (state) => state.initializeAuthListener
    )

    useEffect(() => {
        // Initialize the auth listener and get cleanup function
        const unsubscribe = initializeAuthListener()

        // Clean up on unmount
        return unsubscribe
    }, [initializeAuthListener])

    return <>{children}</>
}
