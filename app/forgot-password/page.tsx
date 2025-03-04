"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Password reset functionality will be implemented with Clerk
      
      // Simulate API call
      setTimeout(() => {
        // Always show success message, even if email doesn't exist
        // This is for security reasons
        setIsSubmitted(true)
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      })
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#f2eadd]">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-[#7b3f00]">Check your email</h2>
            <div className="mt-4 p-6 bg-white/50 backdrop-blur-lg rounded-xl shadow-md border border-[#7b3f00]/20">
              <div className="flex justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#7b3f00]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-lg text-[#7b3f00] mb-4">
                Password reset instructions sent
              </p>
              <p className="text-sm text-[#7b3f00]/70 mb-6">
                If an account with the email <span className="font-medium">{email}</span> exists, we've sent instructions to reset your password. Please check your inbox.
              </p>
              <div className="bg-[#7b3f00]/10 rounded-lg p-4 text-sm text-[#7b3f00]/80">
                <p className="font-medium">Haven't received the email?</p>
                <p className="mt-2">
                  Please check your spam folder. If you still haven't received it, you can try again in a few minutes.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/login">
                <Button className="bg-[#7b3f00] hover:bg-[#7b3f00]/90 text-white rounded-xl">
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#f2eadd]">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-[#7b3f00]">Forgot Your Password?</h2>
          <p className="mt-2 text-sm text-[#7b3f00]/70">Enter your email to receive a password reset link</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white/50 backdrop-blur-lg p-8 rounded-xl shadow-md border border-[#7b3f00]/20">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email-address" className="block text-sm font-medium text-[#7b3f00]">
                Email address
              </Label>
              <Input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-xl border-[#7b3f00]/20 bg-white/30 text-[#7b3f00] placeholder-[#7b3f00]/30 focus:border-[#7b3f00] focus:ring-[#7b3f00] transition-all duration-200"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#7b3f00] hover:bg-[#7b3f00]/90 hover:shadow-md transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                "Reset Password"
              )}
            </Button>
          </div>
        </form>

        <div className="text-center mt-4">
          <Link href="/login" className="font-medium text-[#7b3f00] hover:text-[#7b3f00]/70">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}