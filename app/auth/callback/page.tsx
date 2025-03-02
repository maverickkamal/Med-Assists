"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth error:', error)
          window.location.href = "/login?error=Unable to authenticate"
          return
        }

        if (session) {
          // Always redirect to chat page after successful auth
          window.location.href = "/chat"
        } else {
          window.location.href = "/login"
        }
      } catch (error) {
        console.error('Callback error:', error)
        window.location.href = "/login?error=Authentication failed"
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f2eadd]">
      <div className="animate-pulse text-[#7b3f00]">
        Completing authentication...
      </div>
    </div>
  )
}