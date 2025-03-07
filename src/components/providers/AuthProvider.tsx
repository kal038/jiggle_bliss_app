'use client'
import { useAuthStore } from '@/store/useAuthStore'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect } from 'react'

// inline props for children
// AuthProvider is a component that wraps the children with the AuthProvider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser) // selector to only get fetchCurrentUser
    const supabase = createClientComponentClient()
    // useEffect on user change
    useEffect(() => {
        fetchCurrentUser()
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('event', event)
            console.log('session', session) // logs the event and session
            fetchCurrentUser()
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [fetchCurrentUser])

    return children //renders the children
}
