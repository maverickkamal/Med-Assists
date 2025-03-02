"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  // Check if we have a valid reset token in the URL
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      // If no session or access token, redirect to login
      if (!data.session?.access_token) {
        toast({
          title: "Error",
          description: "Invalid or expired reset link. Please request a new one.",
          variant: "destructive"
        })
        router.push("/forgot-password")
      }
    }
    
    checkSession()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate passwords match
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }

    // Validate password strength
    if (password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        })
        setIsLoading(false)
        return
      }

      // Password reset successful
      setIsSuccess(true)
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      })
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#f2eadd]">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-[#7b3f00]">Password Reset Successful</h2>
            <div className="mt-4 p-6 bg-white/50 backdrop-blur-lg rounded-xl shadow-md border border-[#7b3f00]/20">
              <div className="flex justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#7b3f00]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-lg text-[#7b3f00] mb-4">
                Your password has been reset successfully
              </p>
              <p className="text-sm text-[#7b3f00]/70 mb-6">
                You can now use your new password to log in to your account. You will be redirected to the login page in a few seconds.
              </p>
            </div>
            <div className="mt-6">
              <Link href="/login">
                <Button className="bg-[#7b3f00] hover:bg-[#7b3f00]/90 text-white rounded-xl">
                  Go to Login
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
          <h2 className="mt-6 text-3xl font-extrabold text-[#7b3f00]">Reset Your Password</h2>
          <p className="mt-2 text-sm text-[#7b3f00]/70">Enter a new password for your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white/50 backdrop-blur-lg p-8 rounded-xl shadow-md border border-[#7b3f00]/20">
          <div className="space-y-4">
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-[#7b3f00]">
                New Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full rounded-xl border-[#7b3f00]/20 bg-white/30 text-[#7b3f00] placeholder-[#7b3f00]/30 focus:border-[#7b3f00] focus:ring-[#7b3f00] transition-all duration-200"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="mt-1 text-xs text-[#7b3f00]/70">
                Password must be at least 8 characters long, include uppercase, number, and special character
              </p>
            </div>

            <div>
              <Label htmlFor="confirm-password" className="block text-sm font-medium text-[#7b3f00]">
                Confirm New Password
              </Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full rounded-xl border-[#7b3f00]/20 bg-white/30 text-[#7b3f00] placeholder-[#7b3f00]/30 focus:border-[#7b3f00] focus:ring-[#7b3f00] transition-all duration-200"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                  Resetting...
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