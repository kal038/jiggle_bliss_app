export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <main className="h-screen bg-white">{children}</main>
}
