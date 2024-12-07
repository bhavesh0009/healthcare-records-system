import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Healthcare Records Management System',
  description: 'Manage your healthcare records securely and efficiently',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}