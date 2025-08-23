import React from 'react';
import Link from 'next/link';
import { Github, Twitter, BookOpen, Terminal, Server, Code, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-white border-t border-[#1E293B] pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="font-bold text-sm">T4</span>
              </div>
              <span className="font-bold text-xl">TESTING dev</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              A professional browser-based platform for Solana developers and researchers.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/nex4-network" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={20} className="text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="https://twitter.com/nex4_network" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={20} className="text-gray-400 hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase text-gray-400 mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terminal" className="text-gray-300 hover:text-white text-sm flex items-center">
                  <Terminal size={14} className="mr-2" />
                  Terminal
                </Link>
              </li>
              <li>
                <Link href="/tracker" className="text-gray-300 hover:text-white text-sm flex items-center">
                  <Server size={14} className="mr-2" />
                  Network Tracker
                </Link>
              </li>
              <li>
                <Link href="/explorer" className="text-gray-300 hover:text-white text-sm flex items-center">
                  <Code size={14} className="mr-2" />
                  Explorer
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase text-gray-400 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/docs" className="text-gray-300 hover:text-white text-sm flex items-center">
                  <BookOpen size={14} className="mr-2" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-gray-300 hover:text-white text-sm flex items-center">
                  <Code size={14} className="mr-2" />
                  API Reference
                </Link>
              </li>
              <li>
                <a href="https://solana.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-sm flex items-center">
                  <ExternalLink size={14} className="mr-2" />
                  Solana Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase text-gray-400 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-gray-300 hover:text-white text-sm">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1E293B] mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-xs mb-4 md:mb-0">
            © {new Date().getFullYear()} TESTING dev Network. All rights reserved.
          </p>
          <div className="text-gray-500 text-xs">
            Built with 💜 for the Solana ecosystem
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
