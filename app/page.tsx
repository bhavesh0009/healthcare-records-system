import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] bg-gray-50">
            <div className="max-w-3xl px-4 py-8 text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                    Manage Your Health Records Securely
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Store, organize, and access your medical records all in one place. 
                    Keep your health information secure and easily accessible whenever you need it.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link href="/signup">
                        <Button size="lg">Get Started</Button>
                    </Link>
                    <Link href="/about">
                        <Button variant="outline" size="lg">
                            Learn More
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

