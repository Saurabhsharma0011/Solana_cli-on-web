import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ChevronDown, Terminal, BarChart2, BookOpen, Database, Github } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#0F172A] text-white py-4 px-6 sticky top-0 z-50 border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="font-bold text-sm">T4</span>
          </div>
          <span className="font-bold text-xl">TESTING dev</span>
          <div className="hidden md:flex items-center ml-2 bg-[#1E293B] text-xs px-2 py-0.5 rounded">
            <span className="text-green-400">MAINNET</span>
            <ChevronDown size={14} />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/terminal" className="flex items-center space-x-1 hover:text-purple-400 transition-colors">
            <Terminal size={16} />
            <span>Terminal</span>
          </Link>
          <Link href="/tracker" className="flex items-center space-x-1 hover:text-purple-400 transition-colors">
            <BarChart2 size={16} />
            <span>Network Tracker</span>
          </Link>
          <Link href="/docs" className="flex items-center space-x-1 hover:text-purple-400 transition-colors">
            <BookOpen size={16} />
            <span>Docs</span>
          </Link>
          <Link href="/explorer" className="flex items-center space-x-1 hover:text-purple-400 transition-colors">
            <Database size={16} />
            <span>Explorer</span>
          </Link>
        </div>

        {/* Connect Button */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="https://github.com/nex4-network" target="_blank" rel="noopener noreferrer">
            <Github size={20} className="text-gray-400 hover:text-white transition-colors" />
          </a>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Connect Wallet
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-[#0F172A] pt-4 pb-6 px-6 absolute top-16 left-0 right-0 border-b border-[#1E293B]">
          <div className="flex flex-col space-y-4">
            <Link href="/terminal" className="flex items-center space-x-2 hover:text-purple-400 transition-colors py-2">
              <Terminal size={18} />
              <span>Terminal</span>
            </Link>
            <Link href="/tracker" className="flex items-center space-x-2 hover:text-purple-400 transition-colors py-2">
              <BarChart2 size={18} />
              <span>Network Tracker</span>
            </Link>
            <Link href="/docs" className="flex items-center space-x-2 hover:text-purple-400 transition-colors py-2">
              <BookOpen size={18} />
              <span>Docs</span>
            </Link>
            <Link href="/explorer" className="flex items-center space-x-2 hover:text-purple-400 transition-colors py-2">
              <Database size={18} />
              <span>Explorer</span>
            </Link>
            <div className="pt-2">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full">
                Connect Wallet
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
