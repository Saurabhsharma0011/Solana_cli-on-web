import React from 'react';
import Link from 'next/link';
import { Terminal, ChevronRight } from 'lucide-react';

const CTA = () => {
  return (
    <div className="bg-[#0B1120] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/20 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Supercharge Your Solana Development?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Experience the power of Nex4 today. Start building, exploring, and analyzing on Solana with our professional browser-based platform.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/terminal" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-center"
              >
                <Terminal size={18} className="mr-2" />
                Try the Terminal
              </Link>
              <Link 
                href="/docs" 
                className="bg-[#1E293B] hover:bg-[#334155] text-white px-6 py-3 rounded-lg text-base font-medium transition-colors flex items-center justify-center"
              >
                Explore the Docs
                <ChevronRight size={18} className="ml-1" />
              </Link>
            </div>
            
            <div className="mt-8 text-sm text-gray-400">
              No wallet required to start. Connect any Solana wallet for advanced features.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
