import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/Icon"

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-[#f2eadd]/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-[#7b3f00]">
          MedAssist
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="https://github.com/maverickkamal/medassist" className="text-slate-600 hover:text-cyan-600">
            <Icon name="github" className="w-6 h-6" />
          </Link>
                    <Link href="/login">
            <Button variant="ghost" className="text-[#7b3f00] hover:bg-[#f2eadd] text-sm">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-[#7b3f00] text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

