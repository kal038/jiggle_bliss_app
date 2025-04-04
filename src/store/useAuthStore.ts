import { create } from 'zustand'
import { createClient } from '@/utils/supabase/client'
import type { User } from '@supabase/supabase-js'

export interface AuthState {
    user: User | null
    isLoading: boolean
    fetchCurrentUser: () => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => {
    const supabase = createClient()
    return {
        user: null,
        isLoading: true,
        fetchCurrentUser: async () => {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession() //getSession is fine since we are using the client, does not need to validate if session is active
            if (error) throw error
            set({ user: session?.user || null, isLoading: false })
        },
        signIn: async (email, password) => {
            try {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                })
                if (error) throw error
                await get().fetchCurrentUser()
            } catch (error) {
                console.error('Sign in error:', error)
                throw error
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
    }
})
