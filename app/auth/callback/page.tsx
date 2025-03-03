"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { toast } from "@/components/ui/use-toast"

export default function AuthCallbackPage() {
  const [isProcessing, setIsProcessing] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Clear any loading state
        setIsProcessing(true)
        
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Auth session error:', sessionError)
          setErrorMsg('Unable to authenticate. Please try again.')
          setTimeout(() => {
            window.location.href = "/login?error=Unable to authenticate"
          }, 2000)
          return
        }

        if (session) {
          // Always redirect to chat page after successful auth
          console.log('Authentication successful, redirecting to chat')
          setIsProcessing(false)
          // Use replace to prevent back button from returning to the callback page
          window.location.replace("/chat")
        } else {
          console.error('No session found after OAuth')
          setErrorMsg('Authentication failed. Please try again.')
          setTimeout(() => {
            window.location.href = "/login"
          }, 2000)
        }
      } catch (error) {
        console.error('Callback error:', error)
        setErrorMsg('An unexpected error occurred. Please try again.')
        setTimeout(() => {
          window.location.href = "/login?error=Authentication failed"
        }, 2000)
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2eadd]">
      <div className="text-center p-6 bg-white/50 backdrop-blur-lg rounded-xl shadow-md border border-[#7b3f00]/20 max-w-md">
        {errorMsg ? (
          <div className="text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-xl font-bold text-[#7b3f00] mb-2">Authentication Error</h3>
            <p className="text-[#7b3f00]/70">{errorMsg}</p>
            <p className="text-[#7b3f00]/70 mt-2">Redirecting you back to login...</p>
          </div>
        ) : (
          <div>
            <div className="animate-pulse flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#7b3f00]/70 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-[#7b3f00] mb-2">Completing authentication...</h3>
              <p className="text-[#7b3f00]/70">Please wait while we sign you in.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}