"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUpWithEmail, signUpWithGoogle } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast" // If you have a toast component
import { AuthResponse } from '@/types/auth'

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Store email for verification page
    localStorage.setItem("verificationEmail", email)
    
    const { data, error }: AuthResponse = await signUpWithEmail(email, password, firstName, lastName)
    
    if (error) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during signup",
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }

    toast({
      title: "Success!",
      description: "Please check your email to confirm your account."
    })
    router.push("/verify-email")
    setIsLoading(false)
  }

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true)
      const { data, error } = await signUpWithGoogle()
      
      if (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Authentication failed",
          variant: "destructive"
        })
        setIsLoading(false)
        return
      }

      if (data?.url) {
        // Redirect to the OAuth provider's login page
        window.location.href = data.url
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      })
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#f2eadd]">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-[#7b3f00]">Create your account</h2>
          <p className="mt-2 text-sm text-[#7b3f00]/70">Join MedAssist and revolutionize your medical practice</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white/50 backdrop-blur-lg p-8 rounded-xl shadow-md border border-[#7b3f00]/20">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="first-name" className="block text-sm font-medium text-[#7b3f00]">
                  First name
                </Label>
                <Input
                  id="first-name"
                  name="first-name"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-xl border-[#7b3f00]/20 bg-white/30 text-[#7b3f00] placeholder-[#7b3f00]/30 focus:border-[#7b3f00] focus:ring-[#7b3f00] transition-all duration-200"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="last-name" className="block text-sm font-medium text-[#7b3f00]">
                  Last name
                </Label>
                <Input
                  id="last-name"
                  name="last-name"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-xl border-[#7b3f00]/20 bg-white/30 text-[#7b3f00] placeholder-[#7b3f00]/30 focus:border-[#7b3f00] focus:ring-[#7b3f00] transition-all duration-200"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            
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
            
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-[#7b3f00]">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 block w-full rounded-xl border-[#7b3f00]/20 bg-white/30 text-[#7b3f00] placeholder-[#7b3f00]/30 focus:border-[#7b3f00] focus:ring-[#7b3f00] transition-all duration-200"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#7b3f00] hover:bg-[#7b3f00]/90 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7b3f00]"
            >
              Sign up
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#7b3f00]/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#f2eadd] text-[#7b3f00]/70">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleGoogleSignUp}
              className="w-full flex items-center justify-center px-4 py-2 rounded-xl shadow-sm text-sm font-medium text-[#7b3f00] bg-white hover:bg-white/90 border border-[#7b3f00]/20 transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </Button>
          </div>
        </div>

        <div className="text-center mt-4">
          <Link href="/login" className="font-medium text-[#7b3f00] hover:text-[#7b3f00]/70">
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

