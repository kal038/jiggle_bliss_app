'use client'
import { useAuthStore } from '@/store/useAuthStore'
import Navbar from './NavBar'

export default function ProtectedNavBar() {
    const user = useAuthStore((state) => state.user)
    const isLoading = useAuthStore((state) => state.isLoading)

    return <Navbar user={user} isLoading={isLoading} />
}
