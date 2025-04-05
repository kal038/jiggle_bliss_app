import { create } from 'zustand'
import { createClient } from '@/utils/supabase/client'
import type { User, Subscription } from '@supabase/supabase-js'
import { devtools } from 'zustand/middleware'

export interface AuthState {
    user: User | null
    isLoading: boolean
    fetchCurrentUser: () => Promise<void>
    signOut: () => Promise<void>
    initializeAuthListener: () => () => void // Returns cleanup function
}

export const useAuthStore = create<AuthState>()(
    devtools(
        (set, get) => {
            const supabase = createClient()
            return {
                user: null,
                isLoading: true,
                fetchCurrentUser: async () => {
                    try {
                        const {
                            data: { session },
                            error,
                        } = await supabase.auth.getSession()
                        if (error) throw error
                        set({ user: session?.user || null, isLoading: false })
                    } catch (error) {
                        console.error('Error fetching user:', error)
                        set({ user: null, isLoading: false })
                    }
                },
                signOut: async () => {
                    try {
                        await supabase.auth.signOut()
                        set({ user: null, isLoading: false })
                    } catch (error) {
                        console.error('Error signing out', error)
                        set({ user: null, isLoading: false })
                    }
                },
                initializeAuthListener: () => {
                    // Immediately fetch the current session
                    get().fetchCurrentUser()

                    // Set up auth state change listener
                    const {
                        data: { subscription },
                    } = supabase.auth.onAuthStateChange((event, session) => {
                        console.log('Auth state changed:', event)
                        set({
                            user: session?.user || null,
                            isLoading: false,
                        })
                    })

                    // Return cleanup function to unsubscribe
                    return () => {
                        subscription.unsubscribe()
                    }
                },
            }
        },
        { name: 'AuthStore', enabled: true }
    )
)
