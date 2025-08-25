import { Geist, Geist_Mono } from "next/font/google";
import Layout from "../components/layout/Layout";
import NetworkTracker from "../components/tracker/NetworkTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function TrackerPage() {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans`}>
      <Layout title="Nex4 Network Tracker - Live Solana Metrics" description="Monitor Solana network performance in real-time with detailed metrics on price, TPS, validators, and block production.">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Live Network Tracker</h1>
            <p className="text-gray-400">
              Real-time monitoring of Solana network performance, metrics, and validator activity.
            </p>
          </div>
          
          <NetworkTracker />
          
          <div className="mt-8 bg-[#1E293B] border border-[#334155] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">About Network Tracker</h2>
            <p className="text-gray-300 mb-4">
              The Nex4 Network Tracker provides a comprehensive real-time view of the Solana blockchain. 
              Monitor key metrics like SOL price, transactions per second (TPS), current slot and epoch information, 
              and validator performance all in one place.
            </p>
            <h3 className="text-lg font-medium mb-2">Featured Metrics</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
              <li><span className="text-purple-400">Price Tracking:</span> Live SOL price with percentage changes</li>
              <li><span className="text-purple-400">TPS Monitor:</span> Current transactions per second</li>
              <li><span className="text-purple-400">Slot & Epoch Info:</span> Current slot, epoch, and progress</li>
              <li><span className="text-purple-400">Validator Distribution:</span> Stake distribution across validators</li>
              <li><span className="text-purple-400">Recent Blocks:</span> Latest blocks with transaction counts</li>
              <li><span className="text-purple-400">Network Health:</span> Overall health and performance indicators</li>
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
}
