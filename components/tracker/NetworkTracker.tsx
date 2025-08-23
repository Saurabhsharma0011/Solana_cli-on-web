import React from 'react';
import { BarChart2, Clock, Database, CreditCard, Activity, PieChart, RefreshCw } from 'lucide-react';

const NetworkTracker = () => {
  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-lg overflow-hidden">
      {/* Tracker Header */}
      <div className="bg-[#1E293B] px-4 py-3 flex justify-between items-center border-b border-[#334155]">
        <div className="flex items-center space-x-2">
          <BarChart2 size={16} className="text-purple-400" />
          <span className="font-medium text-sm">Solana Network Tracker</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <RefreshCw size={14} className="mr-1 animate-spin" />
          <span>Live Updating</span>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {/* SOL Price */}
        <div className="bg-[#1E293B] rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400 flex items-center">
              <CreditCard size={14} className="mr-1" />
              SOL Price
            </div>
            <div className="text-xs bg-green-600/20 text-green-400 px-2 py-0.5 rounded">+2.4%</div>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">$133.78</span>
            <span className="text-green-400 ml-2 text-sm">↑ $3.15</span>
          </div>
        </div>
        
        {/* TPS */}
        <div className="bg-[#1E293B] rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400 flex items-center">
              <Activity size={14} className="mr-1" />
              Current TPS
            </div>
            <div className="text-xs bg-purple-600/20 text-purple-400 px-2 py-0.5 rounded">LIVE</div>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">3,421</span>
            <span className="text-gray-400 ml-2 text-sm">tx/sec</span>
          </div>
        </div>
        
        {/* Slot */}
        <div className="bg-[#1E293B] rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400 flex items-center">
              <Database size={14} className="mr-1" />
              Current Slot
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold">149,891,349</span>
          </div>
        </div>
        
        {/* Epoch */}
        <div className="bg-[#1E293B] rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400 flex items-center">
              <Clock size={14} className="mr-1" />
              Epoch
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold">347</span>
            <div className="mt-1 w-full bg-gray-700 rounded-full h-1.5">
              <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '94.7%' }}></div>
            </div>
            <span className="text-xs text-gray-400 mt-1">94.7% complete</span>
          </div>
        </div>
      </div>
      
      {/* Active Validators */}
      <div className="p-4 border-t border-[#334155]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium flex items-center">
            <PieChart size={14} className="mr-2 text-purple-400" />
            Active Validators
          </h3>
          <span className="text-sm text-gray-400">1,972 validators</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span>Stake ≥ 1%</span>
            </div>
            <div>14 validators (31.2% of stake)</div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span>0.2% ≤ Stake &lt; 1%</span>
            </div>
            <div>127 validators (41.8% of stake)</div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span>0.1% ≤ Stake &lt; 0.2%</span>
            </div>
            <div>206 validators (14.3% of stake)</div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              <span>Stake &lt; 0.1%</span>
            </div>
            <div>1,625 validators (12.7% of stake)</div>
          </div>
        </div>
        
        {/* Validator Distribution Chart Placeholder */}
        <div className="h-40 mt-4 bg-[#1E293B] rounded-lg flex items-center justify-center">
          <span className="text-sm text-gray-400">Validator Stake Distribution Chart</span>
        </div>
      </div>
      
      {/* Recent Blocks */}
      <div className="p-4 border-t border-[#334155]">
        <h3 className="text-sm font-medium mb-4 flex items-center">
          <Database size={14} className="mr-2 text-purple-400" />
          Recent Blocks
        </h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#334155]">
            <thead>
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Slot</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Leader</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Txs</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i}>
                  <td className="px-3 py-2 whitespace-nowrap text-sm">
                    <span className="text-purple-400">149,891,{349 - i}</span>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-300">
                    {i === 1 ? '12 sec ago' : i === 2 ? '24 sec ago' : i === 3 ? '36 sec ago' : i === 4 ? '48 sec ago' : '60 sec ago'}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm">
                    <div className="truncate max-w-[120px]">Va1idator{i}111111111111111111111111</div>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm">
                    {Math.floor(Math.random() * 3000) + 1000}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NetworkTracker;
