import React from 'react';
import { Terminal, BarChart2, BookOpen, Database, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Typewriter from 'typewriter-effect';

const Hero = () => {
  return (
    <div className="bg-[#0B1120] text-white py-16 md:py-24">
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
            <div className="p-4 font-mono text-sm">
              <div className="text-green-400 mb-3">Welcome to NEX4 Terminal</div>
              
              <div className="mb-3">
                <div className="flex items-center text-green-400 mb-1">
                  <ArrowRight size={16} className="mr-1" />
                  <span>solana balance</span>
                </div>
                <div className="pl-6 text-gray-300">Balance: 1000.000000000 SOL</div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center text-green-400 mb-1">
                  <ArrowRight size={16} className="mr-1" />
                  <span>solana slot</span>
                </div>
                <div className="pl-6 text-gray-300">Current Slot: 149891349</div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center text-green-400 mb-1">
                  <ArrowRight size={16} className="mr-1" />
                  <span>solana epoch-info</span>
                </div>
                <div className="pl-6 text-gray-300">
                  <div>Current Epoch: 347</div>
                  <div>Slot: 149891349</div>
                  <div>Slots in Epoch: 432000</div>
                  <div>Epoch Progress: 94.7%</div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center text-green-400">
                  <ArrowRight size={16} className="mr-1" />
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
