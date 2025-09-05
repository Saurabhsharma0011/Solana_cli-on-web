import React, { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import Link from "next/link";
import TerminalComponent from "../components/terminal/Terminal";
import { Terminal, Activity, FileText, Bot, Github, Twitter, Menu, X, Search, AlertTriangle } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function TerminalPage() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // No wallet connection needed
  const isWalletConnected = false;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen bg-[#0B1120] text-white`}>
      <Head>
        <title>Nex4 Terminal - Browser-Based Solana CLI</title>
        <meta name="description" content="Use Solana CLI commands directly in your browser with Nex4's Web4 Terminal. No private keys required." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/IMG_8326.PNG" />
      </Head>

      {/* Navigation */}
      <nav
        className={`relative w-full z-[70] transition-all duration-300 ${
          scrolled ? "bg-[#0B1120]/95 backdrop-blur-sm border-b border-[#2e7d32]" : "bg-transparent"
        }`}
      >
        <div className="max-w-[90%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16 relative">
            {/* Brand name with link to homepage */}
            <Link href="/" className="flex items-center absolute left-0 space-x-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden mr-1">
                <img src="/IMG_8326.PNG" alt="NEX4 Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-3xl font-bold text-[#2e7d32]">NEX4</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-12 px-4">
              <Link
                href="/terminal"
                className="flex items-center space-x-2 text-[#2e7d32] transition-colors relative group"
              >
                <Terminal className="w-4 h-4" />
                <span>Terminal</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2e7d32]"></span>
              </Link>
              <Link
                href="/tracker"
                className="flex items-center space-x-2 text-white hover:text-[#2e7d32] transition-colors relative group"
              >
                <Activity className="w-4 h-4" />
                <span>Tracker</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2e7d32] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <a
                href="https://docs.nex4.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-white hover:text-[#2e7d32] transition-colors relative group"
              >
                <FileText className="w-4 h-4" />
                <span>Docs</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2e7d32] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="/#bot"
                className="flex items-center space-x-2 text-white hover:text-[#2e7d32] transition-colors relative group"
              >
                <Bot className="w-4 h-4" />
                <span>NEX4 BOT</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2e7d32] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            
            {/* Mobile Menu Button */}
            <div className="md:hidden absolute right-0">
              <button onClick={toggleMenu} className="text-white">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-[#0B1120]/95 backdrop-blur-sm pt-4 pb-6 px-6 absolute top-16 left-0 right-0 border-b border-[#2e7d32] z-50">
            <div className="flex flex-col space-y-4">
              <Link href="/terminal" className="flex items-center space-x-2 text-[#2e7d32] transition-colors py-2">
                <Terminal size={18} />
                <span>Terminal</span>
              </Link>
              <Link href="/tracker" className="flex items-center space-x-2 text-white hover:text-[#2e7d32] transition-colors py-2">
                <Activity size={18} />
                <span>Tracker</span>
              </Link>
              <a href="https://docs.nex4.dev/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-white hover:text-[#2e7d32] transition-colors py-2">
                <FileText size={18} />
                <span>Docs</span>
              </a>
              <a href="/#bot" className="flex items-center space-x-2 text-white hover:text-[#2e7d32] transition-colors py-2">
                <Bot size={18} />
                <span>NEX4 BOT</span>
              </a>
              
              
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-[90%] xl:max-w-[1400px] mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-3">
              <span className="text-[#2e7d32]">Web4</span> Terminal
            </h1>
            <p className="text-gray-400 text-lg">
              A browser-based Solana CLI experience. Run Solana commands directly in your browser without requiring private keys.
            </p>
          </div>
          
          <div className="h-[70vh]">
            <TerminalComponent isWalletConnected={false} />
          </div>
          
          <div className="mt-8 bg-[#071118] border border-[#2e7d32]/50 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">About Web4 Terminal</h2>
            <p className="text-gray-300 mb-4">
              The Nex4 Web4 Terminal provides a sandboxed, read-only environment for interacting with the Solana blockchain. 
              It&apos;s powered by secure RPC connections and doesn&apos;t require any private keys, making it perfect for learning, 
              research, and quick blockchain queries.
            </p>
            
            <h3 className="text-lg font-medium mb-2">Solana CLI Installation</h3>
            <p className="text-gray-300 mb-3">
              You can simulate the installation of Solana CLI directly in the terminal using any of these commands:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="bg-[#0B1120] p-3 rounded border border-[#2e7d32]/50">
                <div className="text-sm font-medium mb-1">Linux / macOS (using curl):</div>
                <code className="text-xs text-[#2e7d32] break-all">sh -c &quot;curl -sSfL https://release.solana.com/stable/install | sh&quot;</code>
              </div>
              <div className="bg-[#0B1120] p-3 rounded border border-[#2e7d32]/50">
                <div className="text-sm font-medium mb-1">Debian / Ubuntu:</div>
                <code className="text-xs text-[#2e7d32]">apt-get install solana-cli</code>
              </div>
              <div className="bg-[#0B1120] p-3 rounded border border-[#2e7d32]/50">
                <div className="text-sm font-medium mb-1">macOS (using Homebrew):</div>
                <code className="text-xs text-[#2e7d32]">brew install solana</code>
              </div>
              <div className="bg-[#0B1120] p-3 rounded border border-[#2e7d32]/50">
                <div className="text-sm font-medium mb-1">Check installed version:</div>
                <code className="text-xs text-[#2e7d32]">solana --version</code>
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-2">Available Commands</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
              <li><code className="bg-[#0B1120] px-2 py-1 rounded text-[#2e7d32]">solana balance</code> - Check SOL balance</li>
              <li><code className="bg-[#0B1120] px-2 py-1 rounded text-[#2e7d32]">solana validators</code> - List active validators</li>
              <li><code className="bg-[#0B1120] px-2 py-1 rounded text-[#2e7d32]">solana block-height</code> - Get current block height</li>
              <li><code className="bg-[#0B1120] px-2 py-1 rounded text-[#2e7d32]">solana epoch-info</code> - Get current epoch information</li>
              <li><code className="bg-[#0B1120] px-2 py-1 rounded text-[#2e7d32]">solana transaction-count</code> - Get transaction count</li>
              <li><code className="bg-[#0B1120] px-2 py-1 rounded text-[#2e7d32]">solana slot</code> - Get current slot</li>
              <li><code className="bg-[#0B1120] px-2 py-1 rounded text-[#2e7d32]">solana supply</code> - Get current SOL supply</li>
              <li><code className="bg-[#0B1120] px-2 py-1 rounded text-[#2e7d32]">solana -h</code> - Show solana command help</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1120] text-white border-t border-[#2e7d32] pt-10 pb-8">
        <div className="max-w-[90%] xl:max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and description */}
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="/IMG_8326.PNG" alt="NEX4 Logo" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-xl">NEX4</span>
              </Link>
              <p className="text-gray-400 text-sm mb-4">
                A professional browser-based platform for Solana developers and researchers.
              </p>
            </div>

            {/* Product Links */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold uppercase text-gray-400 mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/terminal" className="text-gray-300 hover:text-[#2e7d32] transition-colors text-sm flex items-center">
                    <Terminal className="w-4 h-4 mr-2" />
                    Terminal
                  </Link>
                </li>
                <li>
                  <Link href="/tracker" className="text-gray-300 hover:text-[#2e7d32] transition-colors text-sm flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    Network Tracker
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      alert("This feature will be introduced in v2.0");
                    }} 
                    className="text-gray-300 hover:text-[#2e7d32] transition-colors text-sm flex items-center cursor-pointer bg-transparent border-0 p-0"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Explorer
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold uppercase text-gray-400 mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://docs.nex4.dev/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#2e7d32] transition-colors text-sm flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Docs
                  </a>
                </li>
                <li>
                  <a href="#bot" className="text-gray-300 hover:text-[#2e7d32] transition-colors text-sm flex items-center">
                    <Bot className="w-4 h-4 mr-2" />
                    NEX4 BOT
                  </a>
                </li>
                <li>
                  <a href="https://docs.solana.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#2e7d32] transition-colors text-sm flex items-center">
                    <div className="w-4 h-4 mr-2 flex items-center justify-center">
                      <img src="/solana-svgrepo-com.svg" alt="Solana" className="w-full h-full object-contain brightness-0 invert" />
                    </div>
                    Solana Docs
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Social Links */}
            <div className="col-span-1">
              <h3 className="text-sm font-semibold uppercase text-gray-400 mb-4">Social</h3>
              <ul className="space-y-3">
                <li>
                  <a href="https://t.me/NEX4dev" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#2e7d32] transition-colors text-sm flex items-center">
                    <div className="w-5 h-5 mr-2 flex items-center justify-center">
                      <img src="/TG (2).png" alt="Telegram" className="w-full h-full object-contain" />
                    </div>
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="https://x.com/nex4dev" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#2e7d32] transition-colors text-sm flex items-center">
                    <Twitter className="w-5 h-5 mr-2" />
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://dexscreener.com/solana/nex4" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#2e7d32] transition-colors text-sm flex items-center">
                    <div className="w-5 h-5 mr-2 flex items-center justify-center">
                      <img src="/dexsrenner.png" alt="Dexscreener" className="w-full h-full object-contain brightness-0 invert" />
                    </div>
                    Dexscreener
                  </a>
                </li>
              </ul>
            </div>

          </div>

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
            <div className="flex items-center space-x-2">
              <span className="text-gray-500 text-xs">
                Built for the Solana ecosystem
              </span>
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <img src="/IMG_8326.PNG" alt="NEX4 Logo" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
