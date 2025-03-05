"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserButton, SignOutButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export default function ChatWaitlistPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col py-12 px-4 sm:px-6 lg:px-8 bg-[#f2eadd]">
      {/* User profile section */}
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <SignOutButton>
          <Button 
            variant="outline" 
            className="border-[#7b3f00]/20 text-[#7b3f00] hover:bg-[#7b3f00]/10 rounded-xl"
          >
            Sign Out
          </Button>
        </SignOutButton>
        <UserButton />
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-[#7b3f00]">Coming Soon!</h2>
            <div className="mt-4 p-6 bg-white/50 backdrop-blur-lg rounded-xl shadow-md border border-[#7b3f00]/20">
              <div className="flex justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#7b3f00]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-lg text-[#7b3f00] mb-4">
                The chat feature is currently under development
              </p>
              <p className="text-sm text-[#7b3f00]/70 mb-6">
                We're working hard to bring you an amazing chat experience. You've been added to our waitlist and will be notified as soon as this feature becomes available.
              </p>
              <div className="bg-[#7b3f00]/10 rounded-lg p-4 text-sm text-[#7b3f00]/80">
                <p className="font-medium">Why the wait?</p>
                <p className="mt-2">
                  We're fine-tuning our chat system to ensure it meets our high standards for security, reliability, and user experience. This feature will be open-sourced soon!
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Link href="/">
                <Button className="bg-[#7b3f00] hover:bg-[#7b3f00]/90 text-white rounded-xl">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}