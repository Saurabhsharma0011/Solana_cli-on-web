import React from 'react';
import Link from 'next/link';
import { Github, Twitter, BookOpen, Terminal, Server, Code, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0B1120] text-white border-t border-[#2FFFD1] pt-10 pb-8">
      <div className="max-w-[90%] xl:max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img src="/IMG_8326.PNG" alt="NEX4 Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-2xl -ml-4">NEX4</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              A professional browser-based platform for Solana developers and researchers.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/nex4-network" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={20} className="text-gray-400 hover:text-white transition-colors" />
              </a>
              <a href="https://x.com/nex4dev" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
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
                <Link href="/privacy" className="text-[#2FFFD1] hover:text-white text-sm flex items-center">
                  <span className="relative">
                    Privacy Policy
                    <span className="absolute -top-1 -right-2 w-2 h-2 bg-[#2FFFD1] rounded-full"></span>
                  </span>
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
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mb-4 md:mb-0">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} NEX4. All rights reserved.
            </p>
            <div className="flex space-x-4 text-xs">
              <Link href="/terms" className="text-gray-500 hover:text-[#2FFFD1] transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-[#2FFFD1] transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-500 text-xs">
              Built for the Solana ecosystem
            </span>
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img src="/IMG_8326.PNG" alt="NEX4 Logo" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
