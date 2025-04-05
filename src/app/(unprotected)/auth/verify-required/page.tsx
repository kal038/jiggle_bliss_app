import Link from 'next/link'

export default function VerifyRequired() {
    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h1 className="text-center text-2xl font-bold">
                    Email Verification Required
                </h1>

                <div className="mt-4 rounded-md bg-yellow-50 p-4 text-sm">
                    <p className="text-yellow-700">
                        Please check your email and click the verification link
                        before logging in.
                    </p>
                </div>

                <p className="mt-4 text-gray-600">
                    We've sent a verification link to your email address. Click
                    the link to verify your account.
                </p>

                <p className="mt-2 text-gray-600">
                    If you don't see the email, check your spam folder.
                </p>

                <div className="mt-6 flex flex-col space-y-4">
                    <Link
                        href="/auth/login"
                        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-center text-white hover:bg-indigo-700"
                    >
                        Return to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
