import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, Activity, FileText, Bot, Github, Twitter, Menu, X } from 'lucide-react';

const Security = () => {
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`relative w-full z-[70] transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="max-w-[90%] xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand name with link to homepage */}
            <Link href="/" className="flex items-center">
              <span className="text-3xl font-bold text-primary">NEX4</span>
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

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="https://github.com/nex4-network" target="_blank" rel="noopener noreferrer" className="group relative">
                <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-background/90 text-primary px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">GitHub</span>
              </a>
              <a href="https://x.com/nex4dev" target="_blank" rel="noopener noreferrer" className="group relative">
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs bg-background/90 text-primary px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">Twitter</span>
              </a>
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
              
              
              <div className="pt-2 flex items-center space-x-4 border-t border-border">
                <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-foreground">Security</h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Our Commitment to Security</h2>
          <p className="text-muted-foreground mb-4">
            At NEX4, we take security seriously. We implement industry-standard security measures to protect your data and ensure a safe experience on our platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Data Protection</h2>
          <p className="text-muted-foreground mb-4">
            We use encryption and secure protocols to protect your data. All sensitive information is encrypted both in transit and at rest.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Security Practices</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Regular security audits and penetration testing</li>
            <li>Secure development practices</li>
            <li>Continuous monitoring for suspicious activities</li>
            <li>Prompt security updates and patches</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Reporting Security Issues</h2>
          <p className="text-muted-foreground mb-4">
            If you discover a security vulnerability or have concerns about security on our platform, please contact us immediately at <a href="mailto:security@nex4.io" className="text-[#2FFFD1] hover:underline">security@nex4.io</a>.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-[#1E293B]">
          <p className="text-sm text-muted-foreground">Last updated: September 3, 2025</p>
        </div>
      </div>
    </div>
  );
};

export default Security;
