'use client'
import { useAuthStore } from '@/store/useAuthStore'
import { createClient } from '@/utils/supabase/client'
import { useEffect } from 'react'

interface AuthProviderProps {
    children: React.ReactNode
}

// AuthProvider is a component that wraps the children with the AuthProvider
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser) // selector to only get fetchCurrentUser
    const supabase = createClient() //create supabase browser client
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
