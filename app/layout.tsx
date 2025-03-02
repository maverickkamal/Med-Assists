import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MedAssist",
  description: "AI-powered medical assistant for enhanced diagnostics",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/nucleo-icons/css/nucleo-icons.css" />
      </head>
      <body className={`${inter.className} text-white`}>
        <div className="fixed inset-0 z-[-1]">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
          <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black opacity-70" />
        </div>
        {children}
      </body>
    </html>
  )
}

