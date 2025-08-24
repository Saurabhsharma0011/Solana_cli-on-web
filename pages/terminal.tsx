import { Geist, Geist_Mono } from "next/font/google";
import Layout from "../components/layout/Layout";
import Terminal from "../components/terminal/Terminal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function TerminalPage() {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans`}>
      <Layout title="TESTING dev Terminal - Browser-Based Solana CLI" description="Use Solana CLI commands directly in your browser with TESTING dev's Web4 Terminal. No private keys required.">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Web4 Terminal</h1>
            <p className="text-gray-400">
              A browser-based Solana CLI experience. Run Solana commands directly in your browser without requiring private keys.
            </p>
          </div>
          
          <div className="h-[70vh]">
            <Terminal />
          </div>
          
          <div className="mt-8 bg-[#1E293B] border border-[#334155] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">About Web4 Terminal</h2>
            <p className="text-gray-300 mb-4">
              The TESTING dev Web4 Terminal provides a sandboxed, read-only environment for interacting with the Solana blockchain. 
              It's powered by secure RPC connections and doesn't require any private keys, making it perfect for learning, 
              research, and quick blockchain queries.
            </p>
            
            <h3 className="text-lg font-medium mb-2">Solana CLI Installation</h3>
            <p className="text-gray-300 mb-3">
              You can simulate the installation of Solana CLI directly in the terminal using any of these commands:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="bg-[#0B1120] p-3 rounded border border-[#334155]">
                <div className="text-sm font-medium mb-1">Linux / macOS (using curl):</div>
                <code className="text-xs text-purple-400 break-all">sh -c "curl -sSfL https://release.solana.com/stable/install | sh"</code>
              </div>
              <div className="bg-[#0B1120] p-3 rounded border border-[#334155]">
                <div className="text-sm font-medium mb-1">Debian / Ubuntu:</div>
                <code className="text-xs text-purple-400">apt-get install solana-cli</code>
              </div>
              <div className="bg-[#0B1120] p-3 rounded border border-[#334155]">
                <div className="text-sm font-medium mb-1">macOS (using Homebrew):</div>
                <code className="text-xs text-purple-400">brew install solana</code>
              </div>
              <div className="bg-[#0B1120] p-3 rounded border border-[#334155]">
                <div className="text-sm font-medium mb-1">Check installed version:</div>
                <code className="text-xs text-purple-400">solana --version</code>
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-2">Available Commands</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
              <li><code className="bg-[#0B1120] px-2 py-1 rounded">solana balance</code> - Check SOL balance</li>
              <li><code className="bg-[#0B1120] px-2 py-1 rounded">solana validators</code> - List active validators</li>
              <li><code className="bg-[#0B1120] px-2 py-1 rounded">solana block-height</code> - Get current block height</li>
              <li><code className="bg-[#0B1120] px-2 py-1 rounded">solana epoch-info</code> - Get current epoch information</li>
              <li><code className="bg-[#0B1120] px-2 py-1 rounded">solana transaction-count</code> - Get transaction count</li>
              <li><code className="bg-[#0B1120] px-2 py-1 rounded">solana slot</code> - Get current slot</li>
              <li><code className="bg-[#0B1120] px-2 py-1 rounded">solana supply</code> - Get current SOL supply</li>
              <li><code className="bg-[#0B1120] px-2 py-1 rounded">solana -h</code> - Show solana command help</li>
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
}
