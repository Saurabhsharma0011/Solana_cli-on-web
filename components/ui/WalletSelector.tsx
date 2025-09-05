import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useWallet } from '../../context/WalletContext';

// Define types for wallet providers
declare global {
  interface Window {
    phantom?: {
      solana?: {
        connect: () => Promise<{ publicKey: { toString: () => string } }>;
        disconnect: () => Promise<void>;
        signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
        isConnected: boolean;
        publicKey?: { toString: () => string };
      };
    };
    solflare?: {
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
      isConnected: boolean;
      publicKey?: { toString: () => string };
    };
    magicEden?: {
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
      isConnected: boolean;
      publicKey?: { toString: () => string };
    };
  }
}

// Generic wallet adapter interface
interface WalletAdapter {
  connect: () => Promise<any>;
  disconnect: () => Promise<void>;
  signMessage: (message: Uint8Array) => Promise<any>;
  isConnected: boolean;
  publicKey?: { toString: () => string } | null;
}

// Wallet types
interface WalletInfo {
  name: string;
  icon: string;
  downloadUrl: string;
  detectionFunction: () => boolean;
  getAdapter: () => WalletAdapter | null;
}

interface WalletSelectorProps {
  className?: string;
}

export default function WalletSelector({ className = '' }: WalletSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [detectedWallets, setDetectedWallets] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentAdapter, setCurrentAdapter] = useState<WalletAdapter | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  
  // Use the wallet context instead of local state
  const { isWalletConnected, walletAddress, walletName, connectWallet, disconnectWallet } = useWallet();

  // Create wallet adapters with standardized interfaces
  const createPhantomAdapter = (): WalletAdapter | null => {
    if (typeof window === 'undefined' || !window.phantom?.solana) return null;
    
    const provider = window.phantom.solana;
    return {
      connect: async () => {
        const response = await provider.connect();
        return { publicKey: response.publicKey };
      },
      disconnect: async () => await provider.disconnect(),
      signMessage: async (message: Uint8Array) => await provider.signMessage(message),
      isConnected: provider.isConnected ?? false,
      publicKey: provider.publicKey || null
    };
  };

  const createSolflareAdapter = (): WalletAdapter | null => {
    if (typeof window === 'undefined' || !window.solflare) return null;
    
    const provider = window.solflare;
    return {
      connect: async () => {
        const response = await provider.connect();
        return { publicKey: response.publicKey };
      },
      disconnect: async () => await provider.disconnect(),
      signMessage: async (message: Uint8Array) => {
        // TypeScript doesn't recognize signMessage on the interface, but it should be available
        // @ts-ignore - Solflare has signMessage, but TypeScript doesn't know about it
        return await provider.signMessage(message);
      },
      isConnected: provider.isConnected ?? false,
      // @ts-ignore - Solflare has publicKey, but TypeScript doesn't know about it
      publicKey: provider.publicKey || null
    };
  };

  const createMagicEdenAdapter = (): WalletAdapter | null => {
    if (typeof window === 'undefined' || !window.magicEden) return null;
    
    const provider = window.magicEden;
    return {
      connect: async () => {
        const response = await provider.connect();
        return { publicKey: response.publicKey };
      },
      disconnect: async () => await provider.disconnect(),
      signMessage: async (message: Uint8Array) => {
        // TypeScript doesn't recognize signMessage on the interface, but it should be available
        // @ts-ignore - Magic Eden has signMessage, but TypeScript doesn't know about it
        return await provider.signMessage(message);
      },
      isConnected: provider.isConnected ?? false,
      // @ts-ignore - Magic Eden has publicKey, but TypeScript doesn't know about it
      publicKey: provider.publicKey || null
    };
  };

  // Define wallets with their adapters
const wallets: WalletInfo[] = [
  {
    name: 'Phantom',
    icon: '/phantom.svg',
    downloadUrl: 'https://phantom.app/download',
      detectionFunction: () => typeof window !== 'undefined' && window?.phantom?.solana !== undefined,
      getAdapter: createPhantomAdapter
  },
  {
    name: 'Solflare',
    icon: '/solflare.png',
    downloadUrl: 'https://solflare.com/download',
      detectionFunction: () => typeof window !== 'undefined' && window?.solflare !== undefined,
      getAdapter: createSolflareAdapter
  },
  {
    name: 'Magic Eden',
    icon: '/magic-eden.png',
    downloadUrl: 'https://magiceden.io/wallet',
      detectionFunction: () => typeof window !== 'undefined' && window?.magicEden !== undefined,
      getAdapter: createMagicEdenAdapter
    }
  ];

  // Detect installed wallets and check if already connected
  useEffect(() => {
    const installed = wallets
      .filter(wallet => wallet.detectionFunction())
      .map(wallet => wallet.name);
    
    setDetectedWallets(installed);
  }, []);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Format wallet address for display
  const formatAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.substring(0, 4)}...${address.substring(address.length - 4)}`;
  };

  // Handle wallet connection or redirection
  const handleWalletClick = async (wallet: WalletInfo) => {
    if (detectedWallets.includes(wallet.name)) {
      try {
        setIsConnecting(true);
        const adapter = wallet.getAdapter();
        
        if (!adapter) {
          console.error(`Failed to create adapter for ${wallet.name}`);
          return;
        }
        
        // Connect to the wallet
        console.log(`Connecting to ${wallet.name}...`);
        
        try {
          // Connect and get the public key
          const response = await adapter.connect();
          const publicKey = response.publicKey.toString();
          
          // Create a message for signing to verify ownership
          const message = new TextEncoder().encode(
            `Welcome to NEX4! Please sign this message to verify your wallet ownership.\n\nThis signature will not trigger any blockchain transactions or incur any fees.\n\nTimestamp: ${Date.now()}`
          );
          
          try {
            // Request signature from user
            await adapter.signMessage(message);
            
            // If signature successful, use the context to connect
            connectWallet(wallet.name, publicKey);
            setCurrentAdapter(adapter);
            console.log(`Connected to ${wallet.name} wallet: ${publicKey}`);
            
          } catch (signError) {
            console.error(`User declined to sign message: ${signError}`);
            // Disconnect if user rejected signing
            try {
              await adapter.disconnect();
            } catch (disconnectError) {
              console.error(`Error disconnecting after signature rejection: ${disconnectError}`);
            }
          }
        } catch (connectionError) {
          console.error(`Error connecting to ${wallet.name}: ${connectionError}`);
        }
      } catch (error) {
        console.error(`Unexpected error with ${wallet.name}:`, error);
      } finally {
        setIsConnecting(false);
        setIsOpen(false);
      }
    } else {
      // Redirect to download page
      window.open(wallet.downloadUrl, '_blank', 'noopener,noreferrer');
      console.log(`Redirecting to download ${wallet.name}...`);
      setIsOpen(false);
    }
  };

  // Handle wallet disconnection using context
  const handleDisconnect = () => {
    disconnectWallet();
    setIsOpen(false); // Close the dropdown after disconnecting
  };

  return (
    <div className={`relative ${className}`} ref={popupRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isWalletConnected 
            ? 'bg-[#1a2e1a] hover:bg-[#1f3f1f]' 
            : 'bg-[#2e7d32] hover:bg-[#00dc82]'
        } text-white font-medium px-4 py-2 rounded-lg flex items-center justify-center transition-colors w-full`}
        disabled={isConnecting}
      >
        {isConnecting ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Connecting...
          </div>
        ) : isWalletConnected ? (
          <div className="flex items-center">
            <div className="w-5 h-5 mr-2 relative flex-shrink-0 rounded-full overflow-hidden">
              {wallets.find(w => w.name === walletName) && (
                <Image
                  src={wallets.find(w => w.name === walletName)!.icon}
                  alt={walletName || ''}
                  width={20}
                  height={20}
                  className="object-contain"
                />
              )}
            </div>
            {formatAddress(walletAddress)}
          </div>
        ) : (
          <>
        <img src="/wallet-svgrepo-com.svg" alt="Wallet" className="w-4 h-4 mr-2 invert" />
        Connect Wallet
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-[#1c1c1c] border border-[#333] rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-3 border-b border-[#333]">
            <h3 className="text-white font-medium">
              {isWalletConnected ? 'Wallet Connected' : 'Select Wallet'}
            </h3>
          </div>
          
          {isWalletConnected ? (
            <div className="p-4">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 mr-3 relative flex-shrink-0 rounded-full overflow-hidden bg-[#2a2a2a] flex items-center justify-center p-1">
                  {wallets.find(w => w.name === walletName) && (
                    <Image
                      src={wallets.find(w => w.name === walletName)!.icon}
                      alt={walletName || ''}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  )}
                </div>
                <div>
                  <p className="text-white font-medium">{walletName}</p>
                  <p className="text-xs text-gray-400 break-all">{walletAddress}</p>
                </div>
              </div>
              
              <button
                onClick={handleDisconnect}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Disconnect Wallet
              </button>
            </div>
          ) : (
            <>
          <div className="p-2">
            {wallets.map((wallet) => (
              <div
                key={wallet.name}
                onClick={() => handleWalletClick(wallet)}
                className="flex items-center p-3 rounded-md transition-all hover:bg-[#333] cursor-pointer group"
              >
                <div className="w-10 h-10 mr-3 relative flex-shrink-0 rounded-full overflow-hidden bg-[#2a2a2a] flex items-center justify-center p-1">
                  <Image
                    src={wallet.icon}
                    alt={wallet.name}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-white font-medium group-hover:text-[#00dc82] transition-colors">
                    {wallet.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {detectedWallets.includes(wallet.name) ? "Detected" : "Not installed"}
                  </p>
                </div>
                <div className="flex-shrink-0 ml-2">
                  {detectedWallets.includes(wallet.name) ? (
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  ) : (
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-[#242424] text-xs text-center text-gray-400">
            {detectedWallets.length > 0
              ? "Click to connect to detected wallets"
              : "Install a wallet to get started"}
          </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}