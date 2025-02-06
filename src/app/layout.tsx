import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/layout/NavBar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jiggle Bliss charms, 100% handmade with care",
  description: "Unique and authentic handbag charms, made by PONJI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
          <Navbar />
        </header>
        <main className="min-h-[calc(100vh-64px)]">{children}</main>
        <footer className="bg-blue-100/80 font-sans dark:bg-gray-900">
          <div className="container px-6 py-12 mx-auto">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
              <div className="sm:col-span-2">
                <h1 className="max-w-lg text-xl font-semibold tracking-tight text-gray-800 xl:text-2xl dark:text-white">
                  Subscribe our newsletter to get an update.
                </h1>

                <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                  <input
                    id="email"
                    type="text"
                    className="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300"
                    placeholder="Email Address"
                  />

                  <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wider text-white transition-colors duration-300 transform md:w-auto md:mx-4 focus:outline-none bg-gray-800 rounded-lg hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80">
                    Subscribe
                  </button>
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  Quick Links
                </p>

                <div className="flex flex-col items-start mt-5 space-y-2">
                  <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
                    Home
                  </p>
                  <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
                    Our Philosophy
                  </p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  Industries
                </p>

                <div className="flex flex-col items-start mt-5 space-y-2">
                  <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
                    Retail & E-Commerce
                  </p>
                  <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
                    Information Technology
                  </p>
                  <p className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">
                    Finance & Insurance
                  </p>
                </div>
              </div>
            </div>

            <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-700 h-2" />

            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <Link
                  href="https://www.instagram.com/jiggle.bliss/"
                  target="_blank"
                  className="hover:opacity-80"
                >
                  <Image
                    src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg"
                    width="30"
                    height="30"
                    alt="Instagram"
                  />
                </Link>
                <Link
                  href="https://line.me"
                  target="_blank"
                  className="hover:opacity-80"
                >
                  <Image
                    src="https://www.svgrepo.com/show/452049/line.svg"
                    width="30"
                    height="30"
                    alt="LINE"
                  />
                </Link>
                <Link
                  href="https://www.tiktok.com/@ponjitheart"
                  target="_blank"
                  className="hover:opacity-80"
                >
                  <Image
                    src="https://www.svgrepo.com/show/487139/brand-tiktok-sq.svg"
                    width="30"
                    height="30"
                    alt="TikTok"
                  />
                </Link>
              </div>
            </div>
            <p className="font-sans text-gray-50 p-8 text-start md:text-center md:text-lg md:p-4">
              © 2025 JiggleBliss Inc. , A PONJI Product. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
