import React from 'react';
import { Terminal, BarChart2, BookOpen, Database, Shield, Zap, RefreshCw, Globe } from 'lucide-react';

const Features = () => {
  return (
    <div className="bg-[#0F172A] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Tools for Solana Developers</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            TESTING dev combines essential Solana development tools in one professional platform, 
            making blockchain development and analysis more accessible and efficient.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature: Terminal */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-6 hover:border-purple-500/50 transition-colors">
            <div className="bg-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Terminal size={24} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Web4 Terminal</h3>
            <p className="text-gray-400 mb-4">
              A browser-based Solana CLI that works without requiring private keys. Execute read-only 
              commands directly in your browser using secure RPC connections.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Sandboxed, read-only environment</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>RPC-powered, no private keys needed</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Familiar CLI syntax and output</span>
              </li>
            </ul>
          </div>
          
          {/* Feature: Network Tracker */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-6 hover:border-purple-500/50 transition-colors">
            <div className="bg-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BarChart2 size={24} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Live Network Tracker</h3>
            <p className="text-gray-400 mb-4">
              Monitor Solana network performance in real-time with detailed metrics on price, 
              TPS, validators, and block production.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Real-time price and TPS tracking</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Validator performance metrics</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Epoch and slot progress indicators</span>
              </li>
            </ul>
          </div>
          
          {/* Feature: Interactive Docs */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-6 hover:border-purple-500/50 transition-colors">
            <div className="bg-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BookOpen size={24} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Interactive Documentation</h3>
            <p className="text-gray-400 mb-4">
              Browse comprehensive Solana documentation with runnable code examples directly 
              in your browser for immediate testing.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Live code execution in browser</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Comprehensive API references</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Step-by-step tutorials</span>
              </li>
            </ul>
          </div>
          
          {/* Feature: Explorer */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-6 hover:border-purple-500/50 transition-colors">
            <div className="bg-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Database size={24} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Ecosystem Explorer</h3>
            <p className="text-gray-400 mb-4">
              Discover verified Solana projects, tokens, and protocols with detailed 
              information and analysis tools.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Token and pool explorers</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Verified project directory</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>DeFi protocols analysis</span>
              </li>
            </ul>
          </div>
          
          {/* Feature: Network Switching */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-6 hover:border-purple-500/50 transition-colors">
            <div className="bg-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <RefreshCw size={24} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Seamless Network Switching</h3>
            <p className="text-gray-400 mb-4">
              Easily toggle between Devnet (with free test SOL) and Mainnet for development
              and production use.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>One-click network switching</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Devnet airdrop integration</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Consistent UI across networks</span>
              </li>
            </ul>
          </div>
          
          {/* Feature: Transparency */}
          <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-6 hover:border-purple-500/50 transition-colors">
            <div className="bg-purple-600/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield size={24} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Research Transparency</h3>
            <p className="text-gray-400 mb-4">
              Create snapshots and proof links to record auditable research and 
              classroom sessions for complete transparency.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Terminal session snapshots</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Shareable proof links</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>Audit trail for research</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
