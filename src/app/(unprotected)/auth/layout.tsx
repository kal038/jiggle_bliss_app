export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="h-screen bg-gray-50 [&>*:first-child]:h-full">
            {children}
        </main>
    )
}
