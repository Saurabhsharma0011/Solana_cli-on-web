"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import {
  Terminal,
  Activity,
  Search,
  Github,
  Twitter,
  Linkedin,
  Copy,
  Check,
  ChevronRight,
  Code,
  Zap,
  Shield,
  Layers,
  RefreshCw,
  Play,
  Bot,
  FileText,
  Star,
  CheckCircle,
  X,
  ArrowRight,
  Sparkles,
  Rocket,
  Crown,
  Gem,
  Menu
} from "lucide-react"

export default function NEX4Landing() {
  const [copied, setCopied] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("quickstart")
  const [isOpen, setIsOpen] = useState(false)
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  const fullText = "$NEX CA"
  const baseIconClass = "base-icon-class" // Declare the variable here

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const copyToClipboard = (text = "npm create nex4@latest") => {
    navigator.clipboard.writeText(text === "contract" ? "$NEX CA" : text)
    if (text !== "contract") {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`relative w-full z-[70] transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-[95%] sm:max-w-[90%] xl:max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Brand name with link to homepage */}
            <Link href="/" className="flex items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                <img src="/IMG_8326.PNG" alt="NEX4 Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl sm:text-3xl font-bold text-primary -ml-4">NEX4</span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link
                href="/terminal"
                className="flex items-center space-x-1 xl:space-x-2 text-foreground hover:text-primary transition-colors relative group text-sm xl:text-base"
              >
                <Terminal className="w-3 h-3 xl:w-4 xl:h-4" />
                <span>Terminal</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/tracker"
                className="flex items-center space-x-1 xl:space-x-2 text-foreground hover:text-primary transition-colors relative group text-sm xl:text-base"
              >
                <Activity className="w-3 h-3 xl:w-4 xl:h-4" />
                <span>Tracker</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <a
                href="https://docs.nex4.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 xl:space-x-2 text-foreground hover:text-primary transition-colors relative group text-sm xl:text-base"
              >
                <FileText className="w-3 h-3 xl:w-4 xl:h-4" />
                <span>Docs</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="/#bot"
                className="flex items-center space-x-1 xl:space-x-2 text-foreground hover:text-primary transition-colors relative group text-sm xl:text-base"
              >
                <Bot className="w-3 h-3 xl:w-4 xl:h-4" />
                <span>NEX4 BOT</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            {/* Social Links */}
            <div className="hidden lg:flex items-center space-x-5 xl:space-x-6">
              <a href="https://t.me/NEX4dev" target="_blank" rel="noopener noreferrer" className="group relative">
                <img src="/TG (2).png" alt="Telegram" className="w-4 h-4 xl:w-5 xl:h-5" />
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-background/90 text-primary px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">Telegram</span>
              </a>
              <a href="https://x.com/nex4dev" target="_blank" rel="noopener noreferrer" className="group relative">
                <img src="/X logo.png" alt="X" className="w-5 h-5 xl:w-6 xl:h-6" />
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-background/90 text-primary px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">Twitter</span>
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button onClick={toggleMenu} className="text-white p-1">
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-[#0B1120] pt-3 pb-4 px-4 sm:px-6 absolute top-14 sm:top-16 left-0 right-0 border-b border-border z-50">
            <div className="flex flex-col space-y-3">
              <Link href="/terminal" className="flex items-center space-x-2 hover:text-primary transition-colors py-2 text-sm">
                <Terminal size={16} />
                <span>Terminal</span>
              </Link>
              <Link href="/tracker" className="flex items-center space-x-2 hover:text-primary transition-colors py-2 text-sm">
                <Activity size={16} />
                <span>Tracker</span>
              </Link>
              <a href="https://docs.nex4.dev/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-primary transition-colors py-2 text-sm">
                <FileText size={16} />
                <span>Docs</span>
              </a>
              <a href="/#bot" className="flex items-center space-x-2 hover:text-primary transition-colors py-2 text-sm">
                <Bot size={16} />
                <span>NEX4 BOT</span>
              </a>
              
              <div className="pt-4 flex justify-center space-x-6 border-t border-border">
                <a href="https://t.me/NEX4dev" target="_blank" rel="noopener noreferrer">
                  <img src="/TG (2).png" alt="Telegram" className="w-4 h-4" />
                </a>
                <a href="https://x.com/nex4dev" target="_blank" rel="noopener noreferrer">
                  <img src="/X logo.png" alt="X" className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 lg:pb-28 px-3 sm:px-4 lg:px-8 relative overflow-hidden w-full">
        {/* Premium floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-primary/60 rounded-full animate-floating-particles"></div>
          <div
            className="absolute top-40 right-20 w-1 h-1 bg-secondary/50 rounded-full animate-floating-particles"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-primary/40 rounded-full animate-floating-particles"
            style={{ animationDelay: "4s" }}
          ></div>
          <div
            className="absolute top-32 right-1/3 w-1 h-1 bg-accent/60 rounded-full animate-floating-particles"
            style={{ animationDelay: "6s" }}
          ></div>
          <div
            className="absolute bottom-40 left-1/2 w-2 h-2 bg-primary/30 rounded-full animate-floating-particles"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-60 right-10 w-1.5 h-1.5 bg-secondary/40 rounded-full animate-floating-particles"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="max-w-[95%] sm:max-w-[90%] xl:max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left side - Content */}
            <div className="animate-fade-in-up text-center lg:text-left">
              <Badge className="mb-4 sm:mb-6 bg-primary/10 text-primary border-primary/20 animate-premium-breathing">
                NEX4 v1.0 is out <ChevronRight className="w-3 h-3 ml-1" />
              </Badge>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
                <span className="text-primary">The</span> <span className="text-white">Web4</span> Studio{" "}
                <span className="text-primary">for</span> <span className="text-primary">Solana</span>{" "}
                <span className="text-primary">Developers</span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 text-pretty leading-relaxed max-w-xl mx-auto lg:mx-0">
                NEX4 brings raw real-time Solana data, a browser-based CLI, and developer-ready tools — all in one
                seamless Web4 platform
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 items-center lg:items-start">
                <Link href="/terminal">
                  <Button size="lg" className="animate-premium-breathing w-full sm:w-auto">
                    Get Started
                  </Button>
                </Link>
                <div className="relative flex items-center justify-between rounded-md px-3 py-2 ml-0 sm:ml-2 shadow-sm shadow-[#2e7d32]/20 w-full sm:w-[180px] md:w-[220px] lg:w-[250px] bg-[#2e7d32]/20 border border-[#2e7d32]/60">
                  <span className="flex-1 z-10 font-mono text-sm relative min-w-[140px] md:min-w-[180px]">
                    {fullText}
                  </span>
                  <Button variant="ghost" size="sm" onClick={(e) => { e.preventDefault(); copyToClipboard("contract"); }} className="h-6 w-6 p-0 z-10">
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              {/* Terminal Command */}
              <div className="code-highlight rounded-lg p-4 font-mono text-sm max-w-md mx-auto lg:mx-0">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">$</span>
                  <span className="flex-1 ml-2">npm i nex4</span>
                  <Button variant="ghost" size="sm" onClick={(e) => { e.preventDefault(); copyToClipboard(); }} className="h-6 w-6 p-0">
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2 ml-4 text-center lg:text-left">
                install advance solana modules next into you complier
              </p>
            </div>
            
            {/* Right side - Code example */}
            <div className="relative mt-8 lg:mt-0 group/code h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#2e7d32]/30 to-[#00dc82]/20 opacity-50 rounded-lg blur-xl group-hover/code:opacity-70 transition-opacity animate-pulse"></div>
              <div className="absolute inset-0 bg-[#2e7d32]/5 rounded-lg"></div>
              <div className="relative bg-[#1a1a1a]/90 border border-[#2e7d32]/40 group-hover/code:border-[#2e7d32]/60 rounded-lg overflow-hidden shadow-xl transition-colors h-[400px] sm:h-[450px] lg:h-[500px] flex flex-col">
                {/* Tab header */}
                <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-[#2e7d32]/30 bg-[#1a1a1a]/80 backdrop-blur-sm shrink-0">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto">
                      <div 
                        onClick={() => setActiveTab("quickstart")}
                        className={`px-2 sm:px-3 py-1 rounded text-xs font-mono cursor-pointer transition-colors whitespace-nowrap ${
                          activeTab === "quickstart" 
                            ? "bg-[#2e7d32]/20 text-[#2e7d32] border-b-2 border-[#2e7d32]" 
                            : "text-muted-foreground hover:text-[#2e7d32] hover:bg-[#2e7d32]/10"
                        }`}
                      >
                        quickstart.ts
                      </div>
                      <div 
                        onClick={() => setActiveTab("config")}
                        className={`px-2 sm:px-3 py-1 rounded text-xs font-mono cursor-pointer transition-colors whitespace-nowrap ${
                          activeTab === "config" 
                            ? "bg-[#2e7d32]/20 text-[#2e7d32] border-b-2 border-[#2e7d32]" 
                            : "text-muted-foreground hover:text-[#2e7d32] hover:bg-[#2e7d32]/10"
                        }`}
                      >
                        config.ts
                      </div>
                      <div 
                        onClick={() => setActiveTab("terminal")}
                        className={`px-2 sm:px-3 py-1 rounded text-xs font-mono cursor-pointer transition-colors whitespace-nowrap ${
                          activeTab === "terminal" 
                            ? "bg-[#2e7d32]/20 text-[#2e7d32] border-b-2 border-[#2e7d32]" 
                            : "text-muted-foreground hover:text-[#2e7d32] hover:bg-[#2e7d32]/10"
                        }`}
                      >
                        terminal.ts
                      </div>
                      <div 
                        onClick={() => setActiveTab("network")}
                        className={`hidden sm:block px-2 sm:px-3 py-1 rounded text-xs font-mono cursor-pointer transition-colors whitespace-nowrap ${
                          activeTab === "network" 
                            ? "bg-[#2e7d32]/20 text-[#2e7d32] border-b-2 border-[#2e7d32]" 
                            : "text-muted-foreground hover:text-[#2e7d32] hover:bg-[#2e7d32]/10"
                        }`}
                      >
                        network.ts
                      </div>
                      <div 
                        onClick={() => setActiveTab("data")}
                        className={`hidden md:block px-2 sm:px-3 py-1 rounded text-xs font-mono cursor-pointer transition-colors whitespace-nowrap ${
                          activeTab === "data" 
                            ? "bg-[#2e7d32]/20 text-[#2e7d32] border-b-2 border-[#2e7d32]" 
                            : "text-muted-foreground hover:text-[#2e7d32] hover:bg-[#2e7d32]/10"
                        }`}
                      >
                        data.ts
                      </div>
                  </div>
                  <div className="w-4"></div>
                </div>
                
                {/* Code content - Vertical Style */}
                <div className="p-3 sm:p-4 font-mono text-xs sm:text-sm text-white overflow-auto h-full flex-1 bg-[#1a1a1a]/80 backdrop-blur-sm">
                  {activeTab === "quickstart" && (
                    <div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">1</div>
                        <div>
                          <span className="text-blue-400">import</span> <span className="text-white">{"{"}</span> 
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">2</div>
                        <div className="ml-2">
                          <span className="text-green-400">createTerminal</span><span className="text-white">,</span> 
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">3</div>
                        <div className="ml-2">
                          <span className="text-green-400">createNetworkMonitor</span><span className="text-white">,</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">4</div>
                        <div className="ml-2">
                          <span className="text-green-400">Network</span> 
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">5</div>
                        <div>
                          <span className="text-white">{"}"}</span> <span className="text-blue-400">from</span> <span className="text-orange-400">'nex4dev'</span><span className="text-white">;</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">6</div>
                        <div></div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">7</div>
                        <div>
                          <span className="text-gray-400">// Create a network monitor</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">8</div>
                        <div>
                          <span className="text-blue-400">const</span> <span className="text-violet-400">monitor</span> <span className="text-white">=</span> <span className="text-green-400">createNetworkMonitor</span><span className="text-white">({"{"}</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">9</div>
                        <div className="ml-2">
                          <span className="text-violet-400">network</span><span className="text-white">:</span> <span className="text-green-400">Network</span><span className="text-white">.</span><span className="text-green-400">DEVNET</span><span className="text-white">,</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">10</div>
                        <div className="ml-2">
                          <span className="text-violet-400">refreshInterval</span><span className="text-white">:</span> <span className="text-orange-400">10000</span> <span className="text-gray-400">// 10 seconds</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">11</div>
                        <div>
                          <span className="text-white">{"}"})</span><span className="text-white">;</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">12</div>
                        <div></div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">13</div>
                        <div>
                          <span className="text-gray-400">// Start monitoring</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">14</div>
                        <div>
                          <span className="text-violet-400">monitor</span><span className="text-white">.</span><span className="text-green-400">start</span><span className="text-white">();</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === "config" && (
                    <div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">1</div>
                        <div>
                          <span className="text-blue-400">import</span> <span className="text-white">{"{"}</span> 
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">2</div>
                        <div className="ml-2">
                          <span className="text-green-400">createConnection</span><span className="text-white">,</span> 
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">3</div>
                        <div className="ml-2">
                          <span className="text-green-400">switchNetwork</span><span className="text-white">,</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">4</div>
                        <div className="ml-2">
                          <span className="text-green-400">Network</span> 
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">5</div>
                        <div>
                          <span className="text-white">{"}"}</span> <span className="text-blue-400">from</span> <span className="text-orange-400">'nex4dev'</span><span className="text-white">;</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">6</div>
                        <div></div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">7</div>
                        <div>
                          <span className="text-gray-400">// Create a connection to Devnet</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">8</div>
                        <div>
                          <span className="text-blue-400">const</span> <span className="text-violet-400">connection</span> <span className="text-white">=</span> <span className="text-green-400">createConnection</span><span className="text-white">({"{"}</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">9</div>
                        <div className="ml-2">
                          <span className="text-violet-400">network</span><span className="text-white">:</span> <span className="text-green-400">Network</span><span className="text-white">.</span><span className="text-green-400">DEVNET</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">10</div>
                        <div>
                          <span className="text-white">{"}"})</span><span className="text-white">;</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">11</div>
                        <div></div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">12</div>
                        <div>
                          <span className="text-gray-400">// Switch to Mainnet</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">13</div>
                        <div>
                          <span className="text-blue-400">const</span> <span className="text-violet-400">mainnetConfig</span> <span className="text-white">=</span> <span className="text-green-400">switchNetwork</span><span className="text-white">(</span><span className="text-green-400">Network</span><span className="text-white">.</span><span className="text-green-400">MAINNET</span><span className="text-white">);</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === "terminal" && (
                    <div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">1</div>
                        <div>
                          <span className="text-blue-400">import</span> <span className="text-white">{"{"}</span> <span className="text-green-400">createTerminal</span> <span className="text-white">{"}"}</span> <span className="text-blue-400">from</span> <span className="text-orange-400">'nex4'</span><span className="text-white">;</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">2</div>
                        <div></div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">3</div>
                        <div>
                          <span className="text-blue-400">const</span> <span className="text-violet-400">terminal</span> <span className="text-white">=</span> <span className="text-green-400">createTerminal</span><span className="text-white">({"{"}</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">4</div>
                        <div className="ml-2">
                          <span className="text-violet-400">container</span><span className="text-white">:</span> <span className="text-orange-400">'terminal-container'</span><span className="text-white">,</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">5</div>
                        <div className="ml-2">
                          <span className="text-violet-400">theme</span><span className="text-white">:</span> <span className="text-orange-400">'dark'</span><span className="text-white">,</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">6</div>
                        <div className="ml-2">
                          <span className="text-violet-400">prompt</span><span className="text-white">:</span> <span className="text-orange-400">'solana&gt; '</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">7</div>
                        <div>
                          <span className="text-white">{"}"})</span><span className="text-white">;</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">8</div>
                        <div></div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">9</div>
                        <div>
                          <span className="text-violet-400">terminal</span><span className="text-white">.</span><span className="text-green-400">executeCommand</span><span className="text-white">(</span><span className="text-orange-400">'solana validators'</span><span className="text-white">)</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">10</div>
                        <div className="ml-2">
                          <span className="text-white">.</span><span className="text-green-400">then</span><span className="text-white">(</span><span className="text-violet-400">result</span> <span className="text-white">{`=>`}</span> <span className="text-white">{"{"}</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">11</div>
                        <div className="ml-4">
                          <span className="text-green-400">console</span><span className="text-white">.</span><span className="text-green-400">log</span><span className="text-white">(</span><span className="text-violet-400">result</span><span className="text-white">.</span><span className="text-violet-400">output</span><span className="text-white">);</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">12</div>
                        <div className="ml-2">
                          <span className="text-white">{"}"});</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === "network" && (
                    <div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">1</div>
                        <div>
                          <span className="text-blue-400">import</span> <span className="text-white">{"{"}</span> <span className="text-green-400">createNetworkMonitor</span><span className="text-white">,</span> <span className="text-green-400">Network</span> <span className="text-white">{"}"}</span> <span className="text-blue-400">from</span> <span className="text-orange-400">'nex4'</span><span className="text-white">;</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">2</div>
                        <div></div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">3</div>
                        <div>
                          <span className="text-blue-400">const</span> <span className="text-violet-400">monitor</span> <span className="text-white">=</span> <span className="text-green-400">createNetworkMonitor</span><span className="text-white">({"{"}</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">4</div>
                        <div className="ml-2">
                          <span className="text-violet-400">network</span><span className="text-white">:</span> <span className="text-green-400">Network</span><span className="text-white">.</span><span className="text-green-400">MAINNET</span><span className="text-white">,</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">5</div>
                        <div className="ml-2">
                          <span className="text-violet-400">fetchPrice</span><span className="text-white">:</span> <span className="text-blue-400">true</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">6</div>
                        <div>
                          <span className="text-white">{"}"})</span><span className="text-white">;</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">7</div>
                        <div></div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">8</div>
                        <div>
                          <span className="text-violet-400">monitor</span><span className="text-white">.</span><span className="text-green-400">start</span><span className="text-white">();</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">9</div>
                        <div>
                          <span className="text-violet-400">monitor</span><span className="text-white">.</span><span className="text-green-400">on</span><span className="text-white">(</span><span className="text-orange-400">'update'</span><span className="text-white">,</span> <span className="text-white">(</span><span className="text-violet-400">status</span><span className="text-white">)</span> <span className="text-white">{`=>`}</span> <span className="text-white">{"{"}</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">10</div>
                        <div className="ml-2">
                          <span className="text-green-400">console</span><span className="text-white">.</span><span className="text-green-400">log</span><span className="text-white">(</span><span className="text-violet-400">status</span><span className="text-white">);</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">11</div>
                        <div>
                          <span className="text-white">{"}"})</span><span className="text-white">;</span>
                        </div>
                    </div>
                  </div>
                  )}
                  
                  {activeTab === "data" && (
                    <div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">1</div>
                        <div>
                          <span className="text-blue-400">import</span> <span className="text-white">{"{"}</span> <span className="text-green-400">createDataService</span> <span className="text-white">{"}"}</span> <span className="text-blue-400">from</span> <span className="text-orange-400">'nex4'</span><span className="text-white">;</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">2</div>
                        <div></div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">3</div>
                        <div>
                          <span className="text-blue-400">const</span> <span className="text-violet-400">dataService</span> <span className="text-white">=</span> <span className="text-green-400">createDataService</span><span className="text-white">();</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">4</div>
                        <div></div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">5</div>
                        <div>
                          <span className="text-gray-400">// Get account data</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">6</div>
                        <div>
                          <span className="text-violet-400">dataService</span><span className="text-white">.</span><span className="text-green-400">getAccountData</span><span className="text-white">(</span><span className="text-orange-400">'Your wallet address'</span><span className="text-white">)</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">7</div>
                        <div className="ml-2">
                          <span className="text-white">.</span><span className="text-green-400">then</span><span className="text-white">(</span><span className="text-violet-400">data</span> <span className="text-white">{`=>`}</span> <span className="text-white">{"{"}</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">8</div>
                        <div className="ml-4">
                          <span className="text-green-400">console</span><span className="text-white">.</span><span className="text-green-400">log</span><span className="text-white">(</span><span className="text-violet-400">data</span><span className="text-white">);</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">9</div>
                        <div className="ml-2">
                          <span className="text-white">{"}"});</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">10</div>
                        <div></div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">11</div>
                        <div>
                          <span className="text-gray-400">// Get transaction details</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">12</div>
                        <div>
                          <span className="text-violet-400">dataService</span><span className="text-white">.</span><span className="text-green-400">getTransaction</span><span className="text-white">(</span><span className="text-orange-400">'transaction_signature'</span><span className="text-white">)</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">13</div>
                        <div className="ml-2">
                          <span className="text-white">.</span><span className="text-green-400">then</span><span className="text-white">(</span><span className="text-violet-400">tx</span> <span className="text-white">{`=>`}</span> <span className="text-white">{"{"}</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">14</div>
                        <div className="ml-4">
                          <span className="text-green-400">console</span><span className="text-white">.</span><span className="text-green-400">log</span><span className="text-white">(</span><span className="text-violet-400">tx</span><span className="text-white">);</span>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="text-gray-500 w-6 text-right mr-4 select-none">15</div>
                        <div className="ml-2">
                          <span className="text-white">{"}"});</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Footer */}
                <div className="border-t border-[#2e7d32]/30 px-4 py-2 bg-[#1a1a1a]/80 backdrop-blur-sm mt-auto shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="text-xs bg-[#2e7d32]/10 text-[#2e7d32] border-[#2e7d32]/20">
                        <span className="mr-1">•</span> Vue
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-[#2196f3]/10 text-[#2196f3] border-[#2196f3]/20">
                        <span className="mr-1">•</span> TypeScript
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-[#00dc82]/10 text-[#00dc82] border-[#00dc82]/20">
                        <span className="mr-1">•</span> NEX4
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <div className="relative group">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          disabled
                          className="h-6 text-xs text-muted-foreground cursor-not-allowed"
                        >
                          <Play className="w-3 h-3 mr-1" /> Run Example
                        </Button>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded">
                          <div className="bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center">
                            <span className="mr-1">🔒</span> Locked
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 px-3 sm:px-4 lg:px-8 bg-muted/30">
        <div className="max-w-[95%] sm:max-w-[90%] xl:max-w-[1400px] mx-auto">
          <div className="mb-12 sm:mb-16 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">Enable features as you grow</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-4xl leading-relaxed mx-auto lg:mx-0">
              NEX4 provides a comprehensive suite of tools for Solana developers and researchers. Our platform
              offers powerful features for blockchain interaction, network monitoring, and AI-assisted development
              that scale with your project's needs. We've designed NEX4 to be accessible for developers of all skill levels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* Row 1 - 4 cards */}
            {[
              {
                icon: Terminal,
                title: "Web4 Terminal",
                description: "Browser-based Solana CLI terminal with full command support — no private key exposure required.",
              },
              {
                icon: Activity,
                title: "Network Tracker",
                description:
                  "Real-time monitoring of Solana network metrics including TPS, validator performance, and transaction volume.",
              },
              {
                icon: Bot,
                title: "NEX4 BOT",
                description:
                  "AI-powered assistant with specialized commands for Solana development, wallet analysis, and market insights.",
              },
              {
                icon: Layers,
                title: "Transaction Analysis",
                description:
                  "Detailed transaction breakdown with visual representations of on-chain activity and wallet interactions.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border group"
              >
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* Row 2 - 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {[
              {
                icon: Shield,
                title: "Wallet Security",
                description: "Secure wallet integration with no private key exposure, supporting multiple connection methods.",
              },
              {
                icon: Zap,
                title: "Performance Metrics",
                description: "Track and analyze Solana network performance with detailed metrics and historical comparisons.",
              },
              {
                icon: FileText,
                title: "Resources Hub",
                description: "Comprehensive guides and resources for Solana development, from beginner to advanced topics.",
              },
              {
                icon: Rocket,
                title: "Validator Analytics",
                description: "In-depth analysis of validator performance, stake distribution, and network participation.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border group"
              >
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* Row 3 - 3 cards + CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: RefreshCw,
                title: "Real-time Updates",
                description: "Live data feeds with instant updates on network status, transactions, and market conditions.",
              },
              {
                icon: Sparkles,
                title: "AI Trade Analysis",
                description: "Advanced AI-powered analysis of trading patterns and market trends on Solana.",
              },
              {
                icon: Code,
                title: "Developer Tools",
                description: "Comprehensive toolkit for Solana developers including code snippets, templates, and debugging tools.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border-border group"
              >
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}

            <Card className="p-4 sm:p-6 bg-primary/5 border-primary/20 flex flex-col justify-center items-start">
              <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 text-foreground">Deep dive into NEX4 now</h3>
              <a href="https://docs.nex4.dev/" target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm">
                  Start reading docs
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </Card>
          </div>
        </div>
      </section>

      {/* NEX4BOT Section */}
      <section id="bot" className="py-16 sm:py-20 px-3 sm:px-4 lg:px-8 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-[95%] sm:max-w-[90%] xl:max-w-[1400px] mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center justify-center mb-4">
              <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-primary mr-2" />
              <Badge className="bg-primary/10 text-primary border-primary/20">
                AI-Powered Assistant
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#2e7d32] via-[#00dc82] to-[#2e7d32] text-transparent bg-clip-text animate-gradient-x">
              Meet NEX4BOT - Your Web4 Studio Assistant
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Supercharge your Solana development with our intelligent AI assistant. Choose the tier that fits your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 auto-rows-fr">
            {/* Free Tier */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-background via-[#2e7d32]/30 to-background rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-300"></div>
              <div className="relative bg-card border border-border rounded-lg overflow-hidden h-full">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center">
                      <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-primary mr-2 sm:mr-3" />
                      <h3 className="text-xl sm:text-2xl font-bold">Free Tier</h3>
                    </div>
                    <Badge className="bg-muted text-muted-foreground text-xs sm:text-sm">Community</Badge>
                  </div>
                  
                  <div className="mb-4 sm:mb-6">
                    <div className="text-2xl sm:text-3xl font-bold mb-1">$0<span className="text-base sm:text-lg font-normal text-muted-foreground">/month</span></div>
                    <p className="text-muted-foreground text-sm sm:text-base">Perfect for getting started</p>
                    <p className="text-muted-foreground opacity-0 text-sm sm:text-base">Hidden spacer line</p>
                  </div>
                  
                  <a href="https://t.me/nex4studiobot" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full mb-6 sm:mb-8 bg-muted hover:bg-muted/80 text-foreground border border-border text-sm sm:text-base">
                      Get Started <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="font-medium mb-2 text-sm sm:text-base">Free Tier Commands:</div>
                    
                    <div className="flex items-start">
                      <Code className="w-4 h-4 sm:w-5 sm:h-5 text-primary mr-2 sm:mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-sm sm:text-base">/web4</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Intelligence Pulse Dispatcher (IPD)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Code className="w-5 h-5 text-primary mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">/dailyreport</p>
                        <p className="text-sm text-muted-foreground">Solana Macro-Economic Digest (SMED)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Code className="w-5 h-5 text-primary mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">/portfolio &lt;wallet&gt;</p>
                        <p className="text-sm text-muted-foreground">Deterministic Portfolio Analyzer (DPA)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Code className="w-5 h-5 text-primary mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">/activity &lt;wallet&gt;</p>
                        <p className="text-sm text-muted-foreground">Chronological Transaction Mapper (CTM)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Code className="w-5 h-5 text-primary mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">/network &lt;wallet&gt;</p>
                        <p className="text-sm text-muted-foreground">Graph-Linked Relational Engine (GLRE)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Code className="w-5 h-5 text-primary mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">/validator</p>
                        <p className="text-sm text-muted-foreground">Consensus Validator Metrics Console (CVMC)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Code className="w-5 h-5 text-primary mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">/fees</p>
                        <p className="text-sm text-muted-foreground">Transaction Congestion Estimation Layer (TCEL)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Code className="w-5 h-5 text-primary mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">/alerts sol on|off</p>
                        <p className="text-sm text-muted-foreground">Dynamic Price Monitoring Engine (DPME)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Code className="w-5 h-5 text-primary mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">/ask &lt;query&gt;</p>
                        <p className="text-sm text-muted-foreground">NEX4 Web4 Knowledge Core (NWKC)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start opacity-0">
                      <Code className="w-5 h-5 text-primary mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Placeholder</p>
                        <p className="text-sm text-muted-foreground">Hidden spacer for equal card height</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Premium Tier */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2e7d32] to-[#00dc82] rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-300 animate-pulse-subtle"></div>
              <div className="relative bg-card border border-[#2e7d32]/30 rounded-lg overflow-hidden h-full">
                <div className="absolute top-0 right-0">
                  <div className="bg-[#2e7d32] text-white px-6 sm:px-8 py-1 rotate-45 translate-x-2 translate-y-3 font-medium text-xs">
                    POPULAR
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div className="flex items-center">
                      <Gem className="w-6 h-6 sm:w-8 sm:h-8 text-[#00dc82] mr-2 sm:mr-3" />
                      <h3 className="text-xl sm:text-2xl font-bold">Premium Tier</h3>
                    </div>
                    <Badge className="bg-[#2e7d32]/20 text-[#00dc82] border-[#2e7d32]/30 text-xs sm:text-sm">
                      <Sparkles className="w-3 h-3 mr-1" /> Pro
                    </Badge>
                  </div>
                  
                  <div className="mb-4 sm:mb-6">
                    <div className="text-2xl sm:text-3xl font-bold mb-1">Premium<span className="text-base sm:text-lg font-normal text-muted-foreground ml-2">Access</span></div>
                    <p className="text-muted-foreground text-sm sm:text-base">Pre registration open, will end on Sept 21st</p>
                    <p className="text-muted-foreground text-sm sm:text-base">Premium bot will launch in early October</p>
                  </div>
                  <a href="https://t.me/NEX4PremiumBot" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full mb-6 sm:mb-8 bg-gradient-to-r from-[#2e7d32] to-[#00dc82] hover:opacity-90 text-white border-none animate-premium-breathing text-sm sm:text-base">
                      Register Now
                    </Button>
                  </a>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="font-medium mb-2 text-sm sm:text-base">Premium Tier Modules:</div>
                    
                    <div className="flex items-start">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#00dc82] mr-2 sm:mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium text-sm sm:text-base">AI Trade Copilot</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">Autonomous Trade Strategy Synthesizer (ATSS)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-[#00dc82] mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Mock Order Terminal</p>
                        <p className="text-sm text-muted-foreground">Simulated Execution Interface Layer (SEIL)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-[#00dc82] mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Multi-Chart Terminal</p>
                        <p className="text-sm text-muted-foreground">Predictive Visualization Environment (PVE)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-[#00dc82] mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Copy Trading Simulation</p>
                        <p className="text-sm text-muted-foreground">Whale Activity Replication Engine (WARE)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-[#00dc82] mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Deep Wallet Forensics</p>
                        <p className="text-sm text-muted-foreground">Behavioral Wallet Analysis Module (BWAM)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-[#00dc82] mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">On-Chain Alpha Feeds</p>
                        <p className="text-sm text-muted-foreground">Anomalous Liquidity Intelligence Network (ALIN)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-[#00dc82] mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Smart Alerts</p>
                        <p className="text-sm text-muted-foreground">Custom Condition Trigger System (CCTS)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-[#00dc82] mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Prediction Engine</p>
                        <p className="text-sm text-muted-foreground">Probabilistic Market Outcome Analyzer (PMOA)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-[#00dc82] mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Historical Intelligence</p>
                        <p className="text-sm text-muted-foreground">Temporal Intelligence Archive (TIA)</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-[#00dc82] mr-3 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-medium">Premium Reports</p>
                        <p className="text-sm text-muted-foreground">Extended Market Mood Index (EMMI)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1120] text-white border-t border-[#2FFFD1] pt-8 sm:pt-10 pb-6 sm:pb-8">
        <div className="max-w-[95%] sm:max-w-[90%] xl:max-w-[1400px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Logo and description */}
            <div className="col-span-1 text-center sm:text-left">
              <Link href="/" className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden">
                  <img src="/IMG_8326.PNG" alt="NEX4 Logo" className="w-full h-full object-cover" />
                </div>
                <span className="font-bold text-lg sm:text-2xl">NEX4</span>
              </Link>
              <p className="text-gray-400 text-xs sm:text-sm mb-4">
                A professional browser-based platform for Solana developers and researchers.
              </p>
            </div>

            {/* Product Links */}
            <div className="col-span-1 text-center sm:text-left">
              <h3 className="text-xs sm:text-sm font-semibold uppercase text-gray-400 mb-3 sm:mb-4">Product</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <Link href="/terminal" className="text-gray-300 hover:text-[#2e7d32] transition-colors text-xs sm:text-sm flex items-center justify-center sm:justify-start">
                    <Terminal className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Terminal
                  </Link>
                </li>
                <li>
                  <Link href="/tracker" className="text-gray-300 hover:text-[#2e7d32] transition-colors text-xs sm:text-sm flex items-center justify-center sm:justify-start">
                    <Activity className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Network Tracker
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      alert("This feature will be introduced in v2.0");
                    }} 
                    className="text-gray-300 hover:text-[#2e7d32] transition-colors text-xs sm:text-sm flex items-center justify-center sm:justify-start cursor-pointer bg-transparent border-0 p-0"
                  >
                    <Search className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Explorer
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources Links */}
            <div className="col-span-1 text-center sm:text-left">
              <h3 className="text-xs sm:text-sm font-semibold uppercase text-gray-400 mb-3 sm:mb-4">Resources</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a href="https://docs.nex4.dev/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#2e7d32] transition-colors text-xs sm:text-sm flex items-center justify-center sm:justify-start">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Docs
                  </a>
                </li>
                <li>
                  <a href="#bot" className="text-gray-300 hover:text-[#2e7d32] transition-colors text-xs sm:text-sm flex items-center justify-center sm:justify-start">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    NEX4 BOT
                  </a>
                </li>
                <li>
                  <a href="https://docs.solana.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#2e7d32] transition-colors text-xs sm:text-sm flex items-center justify-center sm:justify-start">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex items-center justify-center">
                      <img src="/solana-svgrepo-com.svg" alt="Solana" className="w-full h-full object-contain brightness-0 invert" />
                    </div>
                    Solana Docs
                  </a>
                </li>
                <li>
                  <a href="/NEX4.pdf" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#2e7d32] transition-colors text-xs sm:text-sm flex items-center justify-center sm:justify-start">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    Whitepaper
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Social Links */}
            <div className="col-span-1 text-center sm:text-left">
              <h3 className="text-xs sm:text-sm font-semibold uppercase text-gray-400 mb-3 sm:mb-4">Social</h3>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a href="https://t.me/NEX4dev" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#2e7d32] transition-colors text-xs sm:text-sm flex items-center justify-center sm:justify-start">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex items-center justify-center">
                      <img src="/telegram.png" alt="Telegram" className="w-full h-full object-contain brightness-0 invert" />
                    </div>
                    Telegram
                  </a>
                </li>
                <li>
                  <a href="https://x.com/nex4dev" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#2e7d32] transition-colors text-xs sm:text-sm flex items-center justify-center sm:justify-start">
                    <Twitter className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://dexscreener.com/solana/nex4" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#2e7d32] transition-colors text-xs sm:text-sm flex items-center justify-center sm:justify-start">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex items-center justify-center">
                      <img src="/dexsrenner.png" alt="Dexscreener" className="w-full h-full object-contain brightness-0 invert" />
                    </div>
                    Dexscreener
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-[#1E293B] mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:justify-between">
            <div className="flex flex-col items-center space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4">
              <p className="text-gray-500 text-xs text-center">
                © {new Date().getFullYear()} NEX4. All rights reserved.
              </p>
              <div className="flex space-x-3 sm:space-x-4 text-xs">
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
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
                <img src="/IMG_8326.PNG" alt="NEX4 Logo" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
