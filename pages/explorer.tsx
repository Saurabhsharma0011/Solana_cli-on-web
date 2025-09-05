import React, { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { Search, Filter, ArrowUpDown, Eye, ArrowRight, Terminal, Activity, FileText, Bot, Github, Twitter, Menu, X } from "lucide-react";
import WalletSelector from "../components/ui/WalletSelector";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ExplorerPage() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    <div className={`${geistSans.className} ${geistMono.className} font-sans min-h-screen bg-background text-foreground`}>
      {/* Navigation */}
      <nav
        className={`relative w-full z-[70] transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-[90%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo with link to homepage */}
            <Link href="/" className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img src="/IMG_8326.PNG" alt="NEX4DEV Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold text-primary">NEX4DEV</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/terminal"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors relative group"
              >
                <Terminal className="w-4 h-4" />
                <span>Terminal</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/tracker"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors relative group"
              >
                <Activity className="w-4 h-4" />
                <span>Tracker</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <a
                href="#documentation"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors relative group"
              >
                <FileText className="w-4 h-4" />
                <span>Documentation</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="/#bot"
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors relative group"
              >
                <Bot className="w-4 h-4" />
                <span>NEX4 BOT</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            {/* Connect Wallet Button */}
            <div className="hidden md:flex items-center space-x-4">
              <WalletSelector />
              <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-foreground">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-sm pt-4 pb-6 px-6 absolute top-16 left-0 right-0 border-b border-border z-50">
            <div className="flex flex-col space-y-4">
              <Link href="/terminal" className="flex items-center space-x-2 hover:text-primary transition-colors py-2">
                <Terminal size={18} />
                <span>Terminal</span>
              </Link>
              <Link href="/tracker" className="flex items-center space-x-2 hover:text-primary transition-colors py-2">
                <Activity size={18} />
                <span>Tracker</span>
              </Link>
              <a href="#documentation" className="flex items-center space-x-2 hover:text-primary transition-colors py-2">
                <FileText size={18} />
                <span>Documentation</span>
              </a>
              <a href="/#bot" className="flex items-center space-x-2 hover:text-primary transition-colors py-2">
                <Bot size={18} />
                <span>NEX4 BOT</span>
              </a>
              
              <div className="mt-2">
                <WalletSelector />
              </div>
              
              <div className="pt-2 flex items-center space-x-4 border-t border-border">
                <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Ecosystem Explorer</h1>
            <p className="text-gray-400">
              Discover and analyze Solana tokens, pools, and verified projects.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-4 mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for token, project, or address..."
                className="block w-full pl-10 pr-3 py-3 bg-[#0F172A] border border-[#334155] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Search
                </button>
              </div>
            </div>
            <div className="flex items-center mt-3 text-sm text-gray-400">
              <Filter size={14} className="mr-1" />
              <span>Filters:</span>
              <button className="ml-2 bg-[#0F172A] px-2 py-1 rounded hover:bg-purple-600/20 hover:text-purple-400 transition-colors">Tokens</button>
              <button className="ml-2 bg-[#0F172A] px-2 py-1 rounded hover:bg-purple-600/20 hover:text-purple-400 transition-colors">NFTs</button>
              <button className="ml-2 bg-[#0F172A] px-2 py-1 rounded hover:bg-purple-600/20 hover:text-purple-400 transition-colors">DeFi</button>
              <button className="ml-2 bg-[#0F172A] px-2 py-1 rounded hover:bg-purple-600/20 hover:text-purple-400 transition-colors">dApps</button>
            </div>
          </div>
          
          {/* Token List */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-lg overflow-hidden mb-8">
            <div className="p-4 border-b border-[#334155] flex justify-between items-center">
              <h2 className="text-xl font-semibold">Top Solana Tokens</h2>
              <div className="flex items-center text-sm text-gray-400">
                <span>Sort by:</span>
                <button className="ml-2 flex items-center hover:text-purple-400 transition-colors">
                  Market Cap <ArrowUpDown size={14} className="ml-1" />
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#334155]">
                <thead className="bg-[#0F172A]">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Token
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      24h Change
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Market Cap
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#334155]">
                  {[
                    { name: "Solana", symbol: "SOL", price: "$133.78", change: "+2.4%", marketCap: "$59.8B", isPositive: true },
                    { name: "Jito", symbol: "JTO", price: "$3.62", change: "+1.8%", marketCap: "$418.3M", isPositive: true },
                    { name: "Bonk", symbol: "BONK", price: "$0.00002812", change: "-3.5%", marketCap: "$1.7B", isPositive: false },
                    { name: "Raydium", symbol: "RAY", price: "$1.23", change: "+0.7%", marketCap: "$315.4M", isPositive: true },
                    { name: "Marinade", symbol: "MNDE", price: "$0.87", change: "-1.2%", marketCap: "$98.3M", isPositive: false },
                  ].map((token, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 bg-purple-600/20 rounded-full flex items-center justify-center text-xs font-bold">
                            {token.symbol.substring(0, 2)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">{token.name}</div>
                            <div className="text-sm text-gray-400">{token.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {token.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={token.isPositive ? "text-green-400" : "text-red-400"}>
                          {token.change}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {token.marketCap}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-purple-400 hover:text-purple-300 transition-colors">
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Projects List */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-lg overflow-hidden">
            <div className="p-4 border-b border-[#334155]">
              <h2 className="text-xl font-semibold">Featured Solana Projects</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {[
                { name: "Jupiter", category: "DEX Aggregator", description: "The key liquidity aggregator for Solana, offering the best swap rates across all Solana DEXs." },
                { name: "Marinade Finance", category: "Staking", description: "Liquid staking protocol that lets users stake SOL while maintaining liquidity through mSOL." },
                { name: "Kamino Finance", category: "DeFi", description: "Automated liquidity management protocol for concentrated liquidity positions." },
                { name: "Zeta Markets", category: "Derivatives", description: "Derivatives exchange built on Solana offering options and futures trading." },
                { name: "Drift Protocol", category: "Perpetuals", description: "Decentralized exchange that lets users trade perpetual swaps with deep liquidity." },
                { name: "Helium", category: "IoT Network", description: "Decentralized wireless network powered by blockchain, now migrated to Solana." },
              ].map((project, idx) => (
                <div key={idx} className="bg-[#0F172A] border border-[#334155] rounded-lg p-4 hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center text-xs font-bold">
                      {project.name.substring(0, 2)}
                    </div>
                    <div className="ml-2">
                      <div className="font-medium">{project.name}</div>
                      <div className="text-xs text-purple-400">{project.category}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">{project.description}</p>
                  <a href="#" className="text-sm text-purple-400 flex items-center hover:underline">
                    View details <ArrowRight size={14} className="ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
