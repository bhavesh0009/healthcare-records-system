"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { auth } from "@/lib/firebase"
import { cn } from "@/lib/utils"

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const pathname = usePathname()
    return (
        <Link
            href={href}
            className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === href
                    ? "text-black dark:text-white"
                    : "text-muted-foreground"
            )}
        >
            {children}
        </Link>
    )
}

export function Navbar() {
    const { user } = useAuth()

    const handleSignOut = async () => {
        try {
            await auth.signOut()
        } catch (error) {
            console.error("Error signing out:", error)
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 hidden md:flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block">
                            HealthRecord
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {user ? (
                            <>
                                <NavLink href="/dashboard">Dashboard</NavLink>
                                <NavLink href="/upload">Upload</NavLink>
                                <NavLink href="/timeline">Timeline</NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink href="/about">About</NavLink>
                                <NavLink href="/contact">Contact</NavLink>
                            </>
                        )}
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <nav className="flex items-center">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground">
                                    {user.displayName || user.email}
                                </span>
                                <Button variant="outline" onClick={handleSignOut}>
                                    Sign Out
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login">
                                    <Button variant="ghost">Login</Button>
                                </Link>
                                <Link href="/signup">
                                    <Button>Sign Up</Button>
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
} 