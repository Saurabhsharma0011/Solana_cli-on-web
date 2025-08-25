import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import { Code, Copy, ExternalLink } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ApiPage() {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans`}>
      <Layout title="NEX4 API Reference - Solana Development" description="Comprehensive API reference for Solana blockchain development with examples and documentation.">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">API Reference</h1>
            <p className="text-gray-400">
              Complete reference documentation for NEX4 platform and Solana APIs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-4 sticky top-24">
                <h3 className="font-medium mb-4 text-lg">API Reference</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 uppercase mb-2">NEX4 Platform</h4>
                    <nav className="space-y-1">
                      <a href="#rest-api" className="block text-purple-400 py-1.5 text-sm">REST API</a>
                      <a href="#websocket-api" className="block text-gray-300 hover:text-purple-400 transition-colors py-1.5 text-sm">WebSocket API</a>
                      <a href="#authentication" className="block text-gray-300 hover:text-purple-400 transition-colors py-1.5 text-sm">Authentication</a>
                    </nav>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 uppercase mb-2">Solana APIs</h4>
                    <nav className="space-y-1">
                      <a href="#web3js" className="block text-gray-300 hover:text-purple-400 transition-colors py-1.5 text-sm">Web3.js</a>
                      <a href="#rpc-api" className="block text-gray-300 hover:text-purple-400 transition-colors py-1.5 text-sm">JSON RPC API</a>
                      <a href="#token-api" className="block text-gray-300 hover:text-purple-400 transition-colors py-1.5 text-sm">Token API</a>
                    </nav>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 uppercase mb-2">Resources</h4>
                    <nav className="space-y-1">
                      <a href="#sdks" className="block text-gray-300 hover:text-purple-400 transition-colors py-1.5 text-sm">SDKs & Libraries</a>
                      <a href="#examples" className="block text-gray-300 hover:text-purple-400 transition-colors py-1.5 text-sm">Code Examples</a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div id="rest-api" className="bg-[#1E293B] border border-[#334155] rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold">REST API</h2>
                  <a href="https://docs.solana.com/api" target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-purple-400 hover:underline">
                    Official Docs <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
                
                <p className="text-gray-300 mb-6">
                  The NEX4 REST API provides HTTP endpoints for retrieving data from the Solana blockchain and interacting with NEX4-specific features.
                </p>
                
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-4">Base URL</h3>
                  <div className="bg-[#0B1120] p-3 rounded-md font-mono text-sm flex justify-between items-center">
                    <code className="text-gray-300">https://api.nex4.network/v1</code>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-4">Authentication</h3>
                  <p className="text-gray-300 mb-4">
                    API requests require an API key to be included in the request headers:
                  </p>
                  <div className="bg-[#0B1120] p-3 rounded-md font-mono text-sm mb-4">
                    <code className="text-gray-300">
                      X-API-Key: your_api_key_here
                    </code>
                  </div>
                  <p className="text-gray-300">
                    You can obtain an API key from your NEX4 account dashboard.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-4">Endpoints</h3>
                  
                  {/* Endpoint Item */}
                  <div className="border border-[#334155] rounded-md p-4 mb-4">
                    <div className="flex items-center mb-2">
                      <span className="bg-green-600 text-white text-xs px-2 py-1 rounded mr-2">GET</span>
                      <code className="font-mono text-sm">/account/{"{address}"}</code>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      Retrieves information about a Solana account by its address.
                    </p>
                    
                    <div className="bg-[#0B1120] p-3 rounded-md font-mono text-sm mb-3">
                      <pre className="text-gray-300">
{`// Request
GET /account/8YLKoCu8rFzBGkzgCbpSTk3DHmpwMwoeZ1qrisXQDmw

// Response
{
  "address": "8YLKoCu8rFzBGkzgCbpSTk3DHmpwMwoeZ1qrisXQDmw",
  "lamports": 1500000000,
  "owner": "11111111111111111111111111111111",
  "executable": false,
  "rentEpoch": 347
}`}
                      </pre>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Code size={14} className="text-purple-400 mr-1" />
                      <a href="#" className="text-purple-400 hover:underline">View example</a>
                    </div>
                  </div>
                  
                  {/* Endpoint Item */}
                  <div className="border border-[#334155] rounded-md p-4 mb-4">
                    <div className="flex items-center mb-2">
                      <span className="bg-green-600 text-white text-xs px-2 py-1 rounded mr-2">GET</span>
                      <code className="font-mono text-sm">/token/{"{mint}"}/holders</code>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      Retrieves a list of token holders for a specific token mint address.
                    </p>
                    
                    <div className="bg-[#0B1120] p-3 rounded-md font-mono text-sm mb-3">
                      <pre className="text-gray-300">
{`// Request
GET /token/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/holders?limit=2

// Response
{
  "mint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "symbol": "USDC",
  "holders": [
    {
      "address": "8YLKoCu8rFzBGkzgCbpSTk3DHmpwMwoeZ1qrisXQDmw",
      "amount": "15000000000",
      "decimals": 6
    },
    {
      "address": "4uQeVj5tqViQh7yWWGStvkEG1Zmhx6uasJtWCJziofM",
      "amount": "8720000000",
      "decimals": 6
    }
  ],
  "pagination": {
    "limit": 2,
    "offset": 0,
    "total": 1248
  }
}`}
                      </pre>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Code size={14} className="text-purple-400 mr-1" />
                      <a href="#" className="text-purple-400 hover:underline">View example</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div id="websocket-api" className="bg-[#1E293B] border border-[#334155] rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">WebSocket API</h2>
                <p className="text-gray-300 mb-6">
                  The NEX4 WebSocket API allows you to subscribe to real-time updates from the Solana blockchain. 
                  This is useful for tracking account changes, new transactions, and price updates without polling.
                </p>
                
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-4">WebSocket Endpoint</h3>
                  <div className="bg-[#0B1120] p-3 rounded-md font-mono text-sm flex justify-between items-center">
                    <code className="text-gray-300">wss://ws.nex4.network/v1</code>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium mb-4">Subscription Example</h3>
                  <div className="bg-[#0B1120] p-3 rounded-md font-mono text-sm mb-4">
                    <pre className="text-gray-300">
{`// Subscribe to account updates
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "accountSubscribe",
  "params": [
    "8YLKoCu8rFzBGkzgCbpSTk3DHmpwMwoeZ1qrisXQDmw",
    {
      "encoding": "jsonParsed",
      "commitment": "confirmed"
    }
  ]
}

// Subscription response
{
  "jsonrpc": "2.0",
  "result": 23784,
  "id": 1
}`}
                    </pre>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    When the subscribed account changes, you&apos;ll receive a notification with the updated data:
                  </p>
                  
                  <div className="bg-[#0B1120] p-3 rounded-md font-mono text-sm">
                    <pre className="text-gray-300">
{`{
  "jsonrpc": "2.0",
  "method": "accountNotification",
  "params": {
    "result": {
      "context": {
        "slot": 149891350
      },
      "value": {
        "data": ["base64-encoded-data", "base64"],
        "executable": false,
        "lamports": 1600000000,  // Changed from 1500000000
        "owner": "11111111111111111111111111111111",
        "rentEpoch": 347
      }
    },
    "subscription": 23784
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Link href="/docs" className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-base font-medium transition-colors">
                  Explore Full Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
