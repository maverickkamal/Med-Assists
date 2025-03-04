"use client"

import { SignUp } from "@clerk/nextjs"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#f2eadd]">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-[#7b3f00]">Create your account</h2>
          <p className="mt-2 text-sm text-[#7b3f00]/70">Join MedAssist and revolutionize your medical practice</p>
        </div>
        
        <div className="mt-8">
          <SignUp
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-[#7b3f00] hover:bg-[#7b3f00]/90 text-sm text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 py-2",
                card: 
                  "bg-white/50 backdrop-blur-lg rounded-xl shadow-md border border-[#7b3f00]/20",
                headerTitle: 
                  "text-[#7b3f00]",
                headerSubtitle: 
                  "text-[#7b3f00]/70",
                socialButtonsBlockButton: 
                  "border-[#7b3f00]/20 text-[#7b3f00] hover:bg-white/90",
                socialButtonsBlockButtonText: 
                  "text-[#7b3f00]",
                formFieldLabel: 
                  "text-[#7b3f00]",
                formFieldInput: 
                  "rounded-xl border-[#7b3f00]/20 bg-white/30 text-[#7b3f00] placeholder-[#7b3f00]/30 focus:border-[#7b3f00]",
                footerActionText: 
                  "text-[#7b3f00]/70",
                footerActionLink: 
                  "text-[#7b3f00] hover:text-[#7b3f00]/70",
                identityPreviewText: 
                  "text-[#7b3f00]",
                identityPreviewEditButtonIcon: 
                  "text-[#7b3f00]",
              },
            }}
          />
        </div>

        <div className="text-center mt-4">
          <Link href="/" className="font-medium text-[#7b3f00] hover:text-[#7b3f00]/70">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}