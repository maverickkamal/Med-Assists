import Link from "next/link"
import { Github, Twitter, Mail, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#7b3f00]/10 backdrop-blur-md py-6 border-t border-[#7b3f00]/20">
      <div className="container mx-auto px-4 flex flex-col items-center sm:flex-row sm:justify-between">
        {/* Copyright info on the left */}
        <div className="text-center sm:text-left">
          <p className="text-[#7b3f00]/80">&copy; 2025 MedAssist. All rights reserved.</p>
          <p className="mt-2 text-[#7b3f00]/60">Developed by MaverickKamal</p>
        </div>

        {/* Socials on the right */}
        <div className="mt-4 sm:mt-0 flex items-center justify-center space-x-4">
          <Link 
            href="https://github.com/maverickkamal/medassist" 
            className="text-[#7b3f00]/60 hover:text-[#7b3f00] transition-colors"
          >
            <Github className="w-5 h-5" />
          </Link>
          <Link 
            href="https://x.com/mav3rickism" 
            className="text-[#7b3f00]/60 hover:text-[#7b3f00] transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </Link>
          <Link 
            href="https://instagram.com/maverickkamal_" 
            className="text-[#7b3f00]/60 hover:text-[#7b3f00] transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </Link>
          <Link 
            href="https://linkedin.com/in/musa-kamaludeen" 
            className="text-[#7b3f00]/60 hover:text-[#7b3f00] transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </Link>
          <Link 
            href="mailto:kamaludeenmoussa@gmail.com" 
            className="text-[#7b3f00]/60 hover:text-[#7b3f00] transition-colors"
          >
            <Mail className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

