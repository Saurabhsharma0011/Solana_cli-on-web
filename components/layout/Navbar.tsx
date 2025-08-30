import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ChevronDown, Terminal, BarChart2, BookOpen, Database, Github, ExternalLink, Check, Wallet } from 'lucide-react';
import { getWalletBalance, getEnhancedTransactions } from '../../services/heliusService';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [networkMenuOpen, setNetworkMenuOpen] = useState(false);
  const [walletMenuOpen, setWalletMenuOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState('mainnet');
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [displayAddress, setDisplayAddress] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);

  const networkMenuRef = useRef<HTMLDivElement>(null);
  const walletMenuRef = useRef<HTMLDivElement>(null);

  // Add a new effect to fetch wallet balance and transactions when wallet is connected
  useEffect(() => {
    const fetchWalletData = async () => {
      if (walletConnected && walletAddress) {
        try {
          setIsLoadingBalance(true);
          
          // Fetch wallet balance
          const balance = await getWalletBalance(walletAddress, selectedNetwork as 'mainnet' | 'devnet');
          setWalletBalance(balance);
          
          // Fetch recent transactions
          const txns = await getEnhancedTransactions(walletAddress, selectedNetwork as 'mainnet' | 'devnet', 5);
          setTransactions(txns);
        } catch (error) {
          console.error('Error fetching wallet data:', error);
        } finally {
          setIsLoadingBalance(false);
        }
      }
    };

    fetchWalletData();
  }, [walletConnected, walletAddress, selectedNetwork]);

  // Effect to refetch wallet data when network changes
  useEffect(() => {
    if (walletConnected && walletAddress) {
      const fetchWalletData = async () => {
        try {
          setIsLoadingBalance(true);
          
          // Fetch wallet balance
          const balance = await getWalletBalance(walletAddress, selectedNetwork as 'mainnet' | 'devnet');
          setWalletBalance(balance);
          
          // Fetch recent transactions
          const txns = await getEnhancedTransactions(walletAddress, selectedNetwork as 'mainnet' | 'devnet', 5);
          setTransactions(txns);
        } catch (error) {
          console.error('Error fetching wallet data after network change:', error);
        } finally {
          setIsLoadingBalance(false);
        }
      };

      fetchWalletData();
    }
  }, [selectedNetwork]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (networkMenuRef.current && !networkMenuRef.current.contains(event.target as Node)) {
        setNetworkMenuOpen(false);
      }
      if (walletMenuRef.current && !walletMenuRef.current.contains(event.target as Node)) {
        setWalletMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNetworkMenu = () => {
    setNetworkMenuOpen(!networkMenuOpen);
  };

  const toggleWalletMenu = () => {
    setWalletMenuOpen(!walletMenuOpen);
  };

  const selectNetwork = (network: string) => {
    setSelectedNetwork(network);
    setNetworkMenuOpen(false);
  };

  const connectWallet = async () => {
    try {
      // Check if Phantom is installed
      const isPhantomInstalled = window.phantom?.solana?.isPhantom;
      
      if (!isPhantomInstalled) {
        window.open('https://phantom.app/', '_blank');
        return;
      }

      // Connect to Phantom
      const provider = window.phantom?.solana;
      
      if (provider) {
        const response = await provider.connect();
        const address = response.publicKey.toString();
        
        setWalletConnected(true);
        setWalletAddress(address);
        
        // Format the address for display (first 4 + last 4 chars)
        const formattedAddress = `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
        setDisplayAddress(formattedAddress);
      }
    } catch (error) {
      console.error('Error connecting to Phantom wallet:', error);
    }
  };

  const disconnectWallet = () => {
    if (window.phantom?.solana) {
      window.phantom.solana.disconnect();
    }
    setWalletConnected(false);
    setWalletAddress('');
    setDisplayAddress('');
    setWalletBalance(0);
    setTransactions([]);
    setWalletMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Format SOL balance to 4 decimal places
  const formatSol = (amount: number) => {
    return (amount / 1000000000).toFixed(4);
  };

  // Format transaction date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  // Helper to determine transaction type
  const getTransactionType = (tx: any) => {
    if (!tx) return 'Unknown';
    
    // Simple detection logic - can be expanded
    if (tx.type === 'TRANSFER') return 'Transfer';
    if (tx.type === 'SWAP') return 'Swap';
    if (tx.type === 'NFT_SALE') return 'NFT Sale';
    if (tx.type === 'NFT_MINT') return 'NFT Mint';
    
    return 'Transaction';
  };
  
  return (
    <nav className="bg-[#0F172A] text-white py-4 px-6 sticky top-0 z-50 border-b border-[#1E293B]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center">
            <Image src="/Nnewlogo.png" alt="Nex4 Logo" width={40} height={40} className="rounded-full" />
          </div>
          <span className="font-bold text-xl">Nex4</span>
          <div 
            className="hidden md:flex items-center ml-2 bg-[#1E293B] hover:bg-[#334155] text-xs px-2 py-0.5 rounded cursor-pointer relative"
            onClick={toggleNetworkMenu}
            ref={networkMenuRef}
          >
            <span className={selectedNetwork === 'mainnet' ? "text-green-400" : "text-yellow-400"}>
              {selectedNetwork === 'mainnet' ? 'MAINNET' : 'DEVNET'}
            </span>
            <ChevronDown size={14} />
            
            {networkMenuOpen && (
              <div className="absolute top-full left-0 mt-1 bg-[#1E293B] border border-[#334155] rounded shadow-lg w-32 z-50">
                <div 
                  className="flex items-center justify-between px-3 py-2 hover:bg-[#334155] cursor-pointer"
                  onClick={() => selectNetwork('mainnet')}
                >
                  <span className="text-green-400">MAINNET</span>
                  {selectedNetwork === 'mainnet' && <Check size={14} className="text-green-400" />}
                </div>
                <div 
                  className="flex items-center justify-between px-3 py-2 hover:bg-[#334155] cursor-pointer"
                  onClick={() => selectNetwork('devnet')}
                >
                  <span className="text-yellow-400">DEVNET</span>
                  {selectedNetwork === 'devnet' && <Check size={14} className="text-yellow-400" />}
                </div>
              </div>
            )}
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
          
          {!walletConnected ? (
            <button 
              onClick={connectWallet}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
            >
              <Image src="/phantom.svg" width={20} height={20} alt="Phantom" className="mr-2 rounded-full" />
              Connect Phantom
            </button>
          ) : (
            <div className="relative" ref={walletMenuRef}>
              <button 
                onClick={toggleWalletMenu}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
              >
                <Image src="/phantom.svg" width={20} height={20} alt="Phantom" className="mr-2 rounded-full" />
                {displayAddress}
                <ChevronDown size={14} className="ml-2" />
              </button>
              
              {walletMenuOpen && (
                <div className="absolute top-full right-0 mt-1 bg-[#1E293B] border border-[#334155] rounded shadow-lg w-80 z-50">
                  <div className="px-3 py-2 border-b border-[#334155]">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">Wallet Balance</span>
                      {isLoadingBalance ? (
                        <span className="text-xs text-gray-500">Loading...</span>
                      ) : (
                        <span className="font-medium">{formatSol(walletBalance)} SOL</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 truncate">{walletAddress}</div>
                  </div>
                  
                  {transactions.length > 0 && (
                    <div className="max-h-60 overflow-y-auto">
                      <div className="px-3 py-2 text-sm text-gray-400">Recent Transactions</div>
                      {transactions.map((tx, index) => (
                        <a 
                          key={index}
                          href={`https://explorer.solana.com/tx/${tx.signature}${selectedNetwork === 'devnet' ? '?cluster=devnet' : ''}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 hover:bg-[#334155] block border-t border-[#334155]"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{getTransactionType(tx)}</span>
                            <span className="text-xs text-gray-400">{formatDate(tx.timestamp || Date.now()/1000)}</span>
                          </div>
                          <div className="text-xs text-gray-500 truncate mt-1">
                            {tx.signature.substring(0, 8)}...{tx.signature.substring(tx.signature.length - 8)}
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                  
                  <div className="border-t border-[#334155]">
                    <a 
                      href={`https://explorer.solana.com/address/${walletAddress}${selectedNetwork === 'devnet' ? '?cluster=devnet' : ''}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-2 hover:bg-[#334155] cursor-pointer"
                    >
                      <span>View on Explorer</span>
                      <ExternalLink size={14} />
                    </a>
                    <div 
                      className="flex items-center px-3 py-2 hover:bg-[#334155] cursor-pointer text-red-400"
                      onClick={disconnectWallet}
                    >
                      Disconnect
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
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
            
            <div className="py-2 border-t border-[#1E293B]">
              <div className="text-sm text-gray-400 mb-2">Network</div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => selectNetwork('mainnet')}
                  className={`flex items-center justify-center px-3 py-2 rounded border ${
                    selectedNetwork === 'mainnet'
                      ? 'border-green-500 bg-green-500/10 text-green-400'
                      : 'border-[#334155] hover:bg-[#334155]'
                  }`}
                >
                  MAINNET
                </button>
                <button
                  onClick={() => selectNetwork('devnet')}
                  className={`flex items-center justify-center px-3 py-2 rounded border ${
                    selectedNetwork === 'devnet'
                      ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                      : 'border-[#334155] hover:bg-[#334155]'
                  }`}
                >
                  DEVNET
                </button>
              </div>
            </div>
            
            <div className="pt-2">
              {!walletConnected ? (
                <button 
                  onClick={connectWallet}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full flex items-center justify-center"
                >
                  <Image src="/phantom.svg" width={20} height={20} alt="Phantom" className="mr-2 rounded-full" />
                  Connect Phantom
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="bg-[#1E293B] text-white p-3 rounded-lg text-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span>Wallet</span>
                      <span className="font-medium">{formatSol(walletBalance)} SOL</span>
                    </div>
                    <div className="text-xs text-gray-400 break-all">
                      {walletAddress}
                    </div>
                  </div>
                  
                  {transactions.length > 0 && (
                    <div className="bg-[#1E293B] p-3 rounded-lg max-h-60 overflow-y-auto">
                      <div className="text-sm mb-2">Recent Transactions</div>
                      {transactions.slice(0, 3).map((tx, index) => (
                        <a 
                          key={index}
                          href={`https://explorer.solana.com/tx/${tx.signature}${selectedNetwork === 'devnet' ? '?cluster=devnet' : ''}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block py-2 border-t border-[#334155]"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{getTransactionType(tx)}</span>
                            <span className="text-xs text-gray-400">{formatDate(tx.timestamp || Date.now()/1000)}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2">
                    <a 
                      href={`https://explorer.solana.com/address/${walletAddress}${selectedNetwork === 'devnet' ? '?cluster=devnet' : ''}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center bg-[#1E293B] hover:bg-[#334155] text-white px-2 py-2 rounded text-xs"
                    >
                      View on Explorer
                    </a>
                    <button 
                      onClick={disconnectWallet}
                      className="bg-[#1E293B] hover:bg-[#334155] text-red-400 px-2 py-2 rounded text-xs"
                    >
                      Disconnect
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
