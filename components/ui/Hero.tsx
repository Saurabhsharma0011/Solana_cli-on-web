import React, { useState, useEffect } from 'react';
import { Terminal, BarChart2, BookOpen, Database, ArrowRight, Copy, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Typewriter from 'typewriter-effect';

// Add styles for the fadeIn animation and underline effect
const styles = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out forwards;
}
@keyframes underlineGrow {
  from { width: 0; }
  to { width: 100%; }
}
.cmd-underline {
  position: relative;
}
.cmd-underline:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: #8B5CF6;
  animation: underlineGrow 0.8s ease-in-out forwards;
  animation-delay: 2.5s;
}

/* Glowing effect styles */
.glow-container {
  position: relative;
  overflow: hidden;
}
.glow-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), 
                              rgba(99, 102, 241, 0.12) 0%, 
                              rgba(168, 85, 247, 0.08) 25%, 
                              rgba(236, 72, 153, 0.04) 50%, 
                              rgba(14, 165, 233, 0.02) 75%, 
                              transparent 100%);
  opacity: 0;
  transition: opacity 1.5s ease;
  pointer-events: none;
  animation: glowPulse 8s infinite alternate;
  transform: translate(-50%, -50%);
  width: 200%;
  height: 200%;
  z-index: 0;
}

@keyframes glowPulse {
  0% {
    opacity: 0.1;
    --x: 20%;
    --y: 80%;
    background: radial-gradient(circle at var(--x) var(--y), 
                                rgba(99, 102, 241, 0.15) 0%, 
                                rgba(99, 102, 241, 0.08) 30%, 
                                transparent 70%);
  }
  25% {
    opacity: 0.2;
    --x: 80%;
    --y: 20%;
    background: radial-gradient(circle at var(--x) var(--y), 
                                rgba(168, 85, 247, 0.15) 0%, 
                                rgba(168, 85, 247, 0.08) 30%, 
                                transparent 70%);
  }
  50% {
    opacity: 0.15;
    --x: 30%;
    --y: 50%;
    background: radial-gradient(circle at var(--x) var(--y), 
                                rgba(14, 165, 233, 0.15) 0%, 
                                rgba(14, 165, 233, 0.08) 30%, 
                                transparent 70%);
  }
  75% {
    opacity: 0.18;
    --x: 70%;
    --y: 60%;
    background: radial-gradient(circle at var(--x) var(--y), 
                                rgba(236, 72, 153, 0.15) 0%, 
                                rgba(236, 72, 153, 0.08) 30%, 
                                transparent 70%);
  }
  100% {
    opacity: 0.1;
    --x: 50%;
    --y: 30%;
    background: radial-gradient(circle at var(--x) var(--y), 
                                rgba(99, 102, 241, 0.15) 0%, 
                                rgba(99, 102, 241, 0.08) 30%, 
                                transparent 70%);
  }
}
`;

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1 rounded hover:bg-gray-700 transition-colors"
      title="Copy to clipboard"
    >
      {copied ? 
        <CheckCircle className="h-4 w-4 text-green-400" /> :
        <Copy className="h-4 w-4 text-gray-400 hover:text-white" />
      }
    </button>
  );
};

const TerminalCommand = ({ command, output }: { command: string; output: string }) => {
  const [isTyping, setIsTyping] = useState(true);
  const [showOutput, setShowOutput] = useState(false);
  
  useEffect(() => {
    // Show output after typing is complete with a slight delay
    if (!isTyping) {
      const timer = setTimeout(() => {
        setShowOutput(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);
  
  return (
    <div className="mb-4">
      <div className="flex items-center text-green-400 mb-1">
        <ArrowRight size={16} className="mr-1 text-purple-400" />
        <div className="font-mono">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString(command)
                .callFunction(() => {
                  setIsTyping(false);
                })
                .start();
            }}
            options={{
              delay: 50,
              cursor: ''
            }}
          />
        </div>
        {!isTyping && <CopyButton text={command} />}
      </div>
      {showOutput && (
        <div className="pl-6 text-gray-300 opacity-0 animate-fadeIn">
          {output}
        </div>
      )}
    </div>
  );
};

const Hero = () => {
  return (
    <div className="bg-[#0B1120] text-white py-16 md:py-24">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-block bg-purple-600/20 border border-purple-600/30 text-purple-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
                Professional Solana Development Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <Typewriter
                  onInit={(typewriter) => {
                    typewriter
                      .typeString('The Complete Solana Toolkit for Developers')
                      .callFunction(() => {
                        // Hide cursor when typing is complete
                        document.querySelector('.Typewriter__cursor')?.classList.add('hidden');
                      })
                      .start();
                  }}
                />
              </h1>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                Nex4 brings Solana development and analysis to your browser. Real-time network tracking,
                in-browser CLI tools, and interactive documentation—all in one place.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/terminal" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-center"
              >
                <Terminal size={18} className="mr-2" />
                Try the Terminal
                <ArrowRight size={16} className="ml-2" />
              </Link>
              <Link 
                href="/docs" 
                className="bg-[#1E293B] hover:bg-[#334155] text-white px-5 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-center"
              >
                <BookOpen size={18} className="mr-2" />
                Explore Docs
              </Link>
            </div>
            
            {/* Quick Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start">
                <div className="mt-1 bg-purple-600/20 p-2 rounded">
                  <Terminal size={16} className="text-purple-400" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Web4 Terminal</h3>
                  <p className="text-sm text-gray-400">Browser-based Solana CLI without private keys</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 bg-purple-600/20 p-2 rounded">
                  <BarChart2 size={16} className="text-purple-400" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Live Network Tracker</h3>
                  <p className="text-sm text-gray-400">Real-time Solana network metrics</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 bg-purple-600/20 p-2 rounded">
                  <BookOpen size={16} className="text-purple-400" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Interactive Docs</h3>
                  <p className="text-sm text-gray-400">Run code examples directly in browser</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 bg-purple-600/20 p-2 rounded">
                  <Database size={16} className="text-purple-400" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">Ecosystem Explorer</h3>
                  <p className="text-sm text-gray-400">Discover verified Solana projects</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Terminal Preview */}
          <div className="bg-[#0F172A] border border-[#1E293B] rounded-lg overflow-hidden shadow-2xl shadow-purple-900/20">
            {/* Terminal Header */}
            <div className="bg-[#1E293B] px-4 py-2 flex items-center border-b border-[#334155]">
              <div className="flex space-x-2 mr-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center">
                <Terminal size={14} className="text-purple-400 mr-2" />
                <span className="text-sm">Nex4 Terminal</span>
              </div>
            </div>
            
            {/* Terminal Content */}
            <div className="p-8 font-mono text-sm bg-[#0F172A] h-[280px] overflow-hidden flex flex-col justify-center relative glow-container">
              <div className="text-gray-400 mb-8 text-base relative z-10">
                <span className="text-purple-400 font-semibold">NEX4</span> is available as an npm package:
              </div>
              
              <div className="mb-6 relative z-10">
                <div className="flex items-center text-green-400 mb-4">
                  <ArrowRight size={16} className="mr-2 text-purple-400" />
                  <div className="text-base cmd-underline">
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter
                          .typeString("npm install nex4dev")
                          .start();
                      }}
                      options={{
                        delay: 70,
                        cursor: ''
                      }}
                    />
                  </div>
                  <CopyButton text="npm install nex4dev" />
                </div>
                
                <div className="bg-[#1A2234] p-5 rounded-md border border-[#2D3648] text-gray-300">
                  <div className="flex items-center mb-3">
                    <div className="mr-2 text-purple-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                    </div>
                    <div className="font-medium text-white">The complete toolkit for Solana development</div>
                  </div>
                  <div className="text-sm ml-7">
                    Build, deploy, and test Solana applications with our enterprise-grade SDK.
                  </div>
                </div>
              </div>
              
              <div className="text-gray-500 text-xs relative z-10">
                Supports all major package managers - npm, yarn, and pnpm
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
