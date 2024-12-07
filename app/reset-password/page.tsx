"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function ResetPassword() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail(auth, email)
      toast({
        title: "Password reset email sent",
        variant: "default",
      })
    } catch (error: any) {
      toast({
        title: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">Reset Password</Button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}