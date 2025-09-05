"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* Navigation */}
      <nav className="relative w-full z-[70] transition-all duration-300 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-[90%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand name with link to homepage */}
            <Link href="/" className="flex items-center space-x-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mr-1">
                <img src="/IMG_8326.PNG" alt="NEX4 Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-3xl font-bold text-primary">NEX4</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-[90%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="prose prose-invert max-w-none">
          {children}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0B1120] text-white border-t border-[#2FFFD1] pt-10 pb-8">
        <div className="max-w-[90%] xl:max-w-[1400px] mx-auto px-6">
          <div className="border-t border-[#1E293B] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
              <p className="text-gray-500 text-xs">
                © {new Date().getFullYear()} NEX4. All rights reserved.
              </p>
              <div className="flex space-x-4 text-xs">
                <Link href="/legal/terms" className="text-gray-500 hover:text-[#2e7d32] transition-colors">
                  Terms of Service
                </Link>
                <Link href="/legal/privacy" className="text-gray-500 hover:text-[#2e7d32] transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}