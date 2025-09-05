"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for wallet context
interface WalletContextType {
  isWalletConnected: boolean;
  walletAddress: string | null;
  walletName: string | null;
  connectWallet: (name: string, address: string) => void;
  disconnectWallet: () => void;
}

// Create default context
const defaultWalletContext: WalletContextType = {
  isWalletConnected: false,
  walletAddress: null,
  walletName: null,
  connectWallet: () => {},
  disconnectWallet: () => {},
};

// Create the context
const WalletContext = createContext<WalletContextType>(defaultWalletContext);

// Hook for easy context consumption
export const useWallet = () => useContext(WalletContext);

// Provider props type
interface WalletProviderProps {
  children: ReactNode;
}

// Provider component
export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletName, setWalletName] = useState<string | null>(null);
  
  // Check localStorage for existing wallet session on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedWalletAddress = localStorage.getItem('walletAddress');
      const savedWalletName = localStorage.getItem('walletName');
      
      if (savedWalletAddress && savedWalletName) {
        // Check if the wallet is actually still connected
        const checkWalletStillConnected = async () => {
          let isStillConnected = false;
          
          // Check Phantom
          if (savedWalletName === 'Phantom' && window.phantom?.solana) {
            isStillConnected = window.phantom.solana.isConnected || false;
          }
          // Check Solflare
          else if (savedWalletName === 'Solflare' && window.solflare) {
            isStillConnected = window.solflare.isConnected || false;
          }
          // Check Magic Eden
          else if (savedWalletName === 'Magic Eden' && window.magicEden) {
            isStillConnected = window.magicEden.isConnected || false;
          }
          
          if (isStillConnected) {
            setIsWalletConnected(true);
            setWalletAddress(savedWalletAddress);
            setWalletName(savedWalletName);
          } else {
            // If wallet is no longer connected, clear the session
            localStorage.removeItem('walletAddress');
            localStorage.removeItem('walletName');
          }
        };
        
        checkWalletStillConnected();
      }
    }
  }, []);
  
  // Connect wallet function
  const connectWallet = (name: string, address: string) => {
    setIsWalletConnected(true);
    setWalletAddress(address);
    setWalletName(name);
    
    // Save to localStorage for persistence
    localStorage.setItem('walletAddress', address);
    localStorage.setItem('walletName', name);
    
    // Dispatch global event
    const walletConnectedEvent = new CustomEvent('wallet-connected', {
      detail: { wallet: name, address }
    });
    window.dispatchEvent(walletConnectedEvent);
  };
  
  // Disconnect wallet function
  const disconnectWallet = async () => {
    // Attempt to disconnect from the actual wallet provider
    try {
      if (walletName === 'Phantom' && window.phantom?.solana) {
        await window.phantom.solana.disconnect();
      } else if (walletName === 'Solflare' && window.solflare) {
        await window.solflare.disconnect();
      } else if (walletName === 'Magic Eden' && window.magicEden) {
        await window.magicEden.disconnect();
      }
    } catch (error) {
      console.error('Error disconnecting from wallet provider:', error);
    }
    
    // Clear the application state
    setIsWalletConnected(false);
    setWalletAddress(null);
    setWalletName(null);
    
    // Clear localStorage session
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('walletName');
    
    // Dispatch global event
    const walletDisconnectedEvent = new CustomEvent('wallet-disconnected');
    window.dispatchEvent(walletDisconnectedEvent);
  };
  
  // Context value
  const value = {
    isWalletConnected,
    walletAddress,
    walletName,
    connectWallet,
    disconnectWallet,
  };
  
  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
