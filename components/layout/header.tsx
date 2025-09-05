import React from "react"
import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header className="w-full py-4">
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/IMG_8326.PNG" 
            alt="Nex4 Logo" 
            width={40} 
            height={40} 
            className="w-8 h-8 md:w-10 md:h-10" 
          />
          <span className="text-foreground font-bold text-xl md:text-2xl">Nex4</span>
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/terminal" className="text-muted-foreground hover:text-foreground transition-colors">
            Terminal
          </Link>
          <Link href="/tracker" className="text-muted-foreground hover:text-foreground transition-colors">
            Tracker
          </Link>
          <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
            Documentation
          </Link>
          <Link href="/explorer" className="text-muted-foreground hover:text-foreground transition-colors">
            Explorer
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link 
            href="/terminal" 
            className="hidden md:inline-flex bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Launch App
          </Link>
        </div>
      </div>
    </header>
  )
}
