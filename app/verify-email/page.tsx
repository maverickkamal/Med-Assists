"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function VerifyEmailPage() {
  const [email, setEmail] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    // Get email from localStorage that was saved during signup
    const storedEmail = localStorage.getItem("verificationEmail")
    if (storedEmail) {
      setEmail(storedEmail)
    }
  }, [])

  const handleResendEmail = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "No email address found. Please try signing up again.",
        variant: "destructive"
      })
      return
    }

    try {
      // Email verification functionality will be implemented with Clerk
      toast({
        title: "Email Sent",
        description: "Verification email has been resent. Please check your inbox."
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#f2eadd]">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-[#7b3f00]">Verify Your Email</h2>
          <div className="mt-4 p-6 bg-white/50 backdrop-blur-lg rounded-xl shadow-md border border-[#7b3f00]/20">
            <div className="flex justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#7b3f00]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-lg text-[#7b3f00] mb-4">
              Please verify your email address
            </p>
            <p className="text-sm text-[#7b3f00]/70 mb-6">
              We've sent a verification link to your email address. Please click the link in the email to verify your account and complete the registration process.
            </p>
            <div className="bg-[#7b3f00]/10 rounded-lg p-4 text-sm text-[#7b3f00]/80">
              <p className="font-medium">Haven't received the email?</p>
              <p className="mt-2">
                Please check your spam folder. If you still haven't received it, you can request a new verification email by clicking the button below.
              </p>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <Button 
              className="w-full bg-[#7b3f00] hover:bg-[#7b3f00]/90 text-white rounded-xl"
              onClick={handleResendEmail}
            >
              Resend Verification Email
            </Button>
            <Link href="/login" className="w-full">
              <Button 
                variant="outline" 
                className="w-full border-[#7b3f00]/20 text-[#7b3f00] hover:bg-[#7b3f00]/10 rounded-xl"
              >
                Return to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}