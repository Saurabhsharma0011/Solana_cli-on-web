import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Copy, ChevronRight, RefreshCw, AlertTriangle } from 'lucide-react';
import CommandWithCopy from '../ui/CommandWithCopy';

// Define the types for our command history
interface CommandEntry {
  command: string;
  output: string | React.ReactNode;
  isError?: boolean;
}

// Simple key/value store for simulated state
interface TerminalState {
  keypair?: {
    publicKey: string;
    privateKey: string;
  };
  solanaCliInstalled: boolean;
  network: 'mainnet-beta' | 'devnet' | 'testnet';
  
  // Token marketplace state
  marketplace?: {
    address: string;
    admin: string;
    feePercentage: number;
    isInitialized: boolean;
    totalVolume: number;
    totalFeesCollected: number;
  };
  
  // Sell orders state
  sellOrders: {
    id: string;
    seller: string;
    tokenMint: string;
    amount: number;
    pricePerToken: number;
    createdAt: number;
    isActive: boolean;
  }[];
  
  // Token mints with balances
  tokens: {
    mint: string;
    symbol: string;
    name: string;
    supply: number;
    decimals: number;
    balance?: number;
  }[];
}

interface TerminalProps {
  // We can keep this prop for backwards compatibility but we'll use the context internally
  isWalletConnected?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({ isWalletConnected: propIsWalletConnected }) => {
  // No wallet connection needed
  const isWalletConnected = false;
  
  // Always false now that wallet connection is removed
  const walletConnected = false;
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandEntry[]>([
    {
      command: 'welcome',
      output: (
        <div className="text-green-400 mb-2">
          <div className="mb-1">Welcome to Nex4 Terminal - Solana CLI in your browser</div>
          <div className="text-gray-400 text-sm mb-2">
            Type <span className="text-yellow-300">help</span> to see available commands
          </div>
          {!walletConnected && (
            <div className="text-orange-400 text-sm flex items-start space-x-2">
              <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-semibold">Wallet Connection Required</div>
                <div>Connect your wallet to use full terminal functionality.</div>
                <div>Only <span className="text-yellow-300">help</span> and <span className="text-yellow-300">clear</span> commands are available without wallet connection.</div>
              </div>
            </div>
          )}
        </div>
      ),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Terminal state to keep track of installed CLI and generated keypairs
  const [terminalState, setTerminalState] = useState<TerminalState>({
    solanaCliInstalled: false,
    network: 'mainnet-beta',
    sellOrders: [],
    tokens: [
      {
        mint: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        symbol: "SOL",
        name: "Solana",
        supply: 555000000,
        decimals: 9,
        balance: 1000
      },
      {
        mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        symbol: "USDC",
        name: "USD Coin",
        supply: 5000000000,
        decimals: 6,
        balance: 10000
      },
      {
        mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        symbol: "USDT",
        name: "Tether",
        supply: 4000000000,
        decimals: 6,
        balance: 10000
      }
    ]
  });
  
  // Helper function to render Solana CLI not found error with copy button
  const solanaCLINotFoundError = () => (
    <div className="text-red-400">
      Error: Solana CLI not found. Install it first with <CommandWithCopy command='sh -c "curl -sSfL https://release.solana.com/stable/install | sh"' />
    </div>
  );

  // Available CLI commands
  const availableCommands = {
    help: () => (
      <div className="space-y-1">
        <div className="text-yellow-300 font-semibold">Available Commands:</div>
        <div className="flex items-center">
          <span className="text-purple-400 mr-2">help</span> - Show this help menu
          {!isWalletConnected && <span className="text-green-400 text-xs ml-2">(Available without wallet)</span>}
        </div>
        <div className="flex items-center">
          <span className="text-purple-400 mr-2">clear</span> - Clear terminal
          {!isWalletConnected && <span className="text-green-400 text-xs ml-2">(Available without wallet)</span>}
        </div>
        
        {!isWalletConnected && (
          <div className="text-orange-400 text-sm mt-2 mb-2 flex items-start space-x-2">
            <AlertTriangle size={16} className="mt-0.5 flex-shrink-0" />
            <div>
              <div className="font-semibold">Note: The following commands require wallet connection</div>
            </div>
          </div>
        )}
        
        <div><span className="text-purple-400">solana balance</span> - Check SOL balance</div>
        <div><span className="text-purple-400">solana validators</span> - List active validators</div>
        <div><span className="text-purple-400">solana block-height</span> - Get current block height</div>
        <div><span className="text-purple-400">solana epoch-info</span> - Get current epoch information</div>
        <div><span className="text-purple-400">solana transaction-count</span> - Get current transaction count</div>
        <div><span className="text-purple-400">solana slot</span> - Get current slot</div>
        <div><span className="text-purple-400">solana supply</span> - Get current SOL supply</div>
        <div><span className="text-purple-400">solana airdrop [amount]</span> - Request an airdrop of SOL (devnet/testnet only)</div>
        <div><span className="text-purple-400">solana -h</span> - Show solana command help</div>
        <div><span className="text-purple-400">solana --version</span> - Show Solana CLI version</div>
        <div><span className="text-purple-400">solana config set</span> - Set Solana configuration</div>
        <div><span className="text-purple-400">solana config get</span> - Get Solana configuration</div>
        <div><span className="text-purple-400">solana-keygen new</span> - Generate new simulated keypair</div>
        <div><span className="text-purple-400">solana-keygen real</span> - Generate real Solana keypair (cryptographically secure)</div>
        <div><span className="text-purple-400">solana-keygen pubkey</span> - Show public key</div>
        <div><span className="text-purple-400">solana-keygen export</span> - Export keypair for wallet import</div>
        <div className="flex items-center">
          <span className="text-purple-400 mr-2">sh -c &quot;curl -sSfL https://release.solana.com/stable/install | sh&quot;</span> - Install Solana CLI
          <CommandWithCopy command='sh -c "curl -sSfL https://release.solana.com/stable/install | sh"' className="ml-2" />
        </div>
        <div><span className="text-purple-400">apt-get install solana-cli</span> - Install Solana CLI on Debian/Ubuntu</div>
        
        <div className="text-yellow-300 font-semibold mt-4">Token Marketplace Commands:</div>
        <div><span className="text-purple-400">marketplace init --fee [percent]</span> - Initialize token marketplace</div>
        <div><span className="text-purple-400">marketplace info</span> - Get marketplace information</div>
        <div><span className="text-purple-400">marketplace sell [amount] [token] [price]</span> - Create sell order</div>
        <div><span className="text-purple-400">marketplace buy [order_id] [amount]</span> - Buy tokens from an order</div>
        <div><span className="text-purple-400">marketplace orders</span> - List all active sell orders</div>
        <div><span className="text-purple-400">marketplace cancel [order_id]</span> - Cancel a sell order</div>
        <div><span className="text-purple-400">marketplace update-price [order_id] [new_price]</span> - Update order price</div>
        <div><span className="text-purple-400">tokens</span> - List available tokens and balances</div>
        <div className="text-gray-400 mt-2 text-sm">
          Note: Marketplace commands require devnet. Switch with <span className="text-yellow-300">solana config set --url devnet</span>
        </div>
      </div>
    ),
    clear: () => {
      setCommandHistory([]);
      return '';
    },
    'solana balance': async () => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      if (!terminalState.keypair) {
        return (
          <div className="text-red-400">
            Error: No keypair found. Generate one first with <span className="text-yellow-300">solana-keygen new</span> or <span className="text-yellow-300">solana-keygen real</span>
          </div>
        );
      }
      
      // Set loading state
      setIsLoading(true);
      
      try {
        // Call our API endpoint to get the real balance
        const response = await fetch('/api/fetch-balance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            address: terminalState.keypair.publicKey,
            network: terminalState.network 
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch balance');
        }
        
        const data = await response.json();
        
        // Clear loading state
        setIsLoading(false);
        
        // Update the token balance in the state
        const updatedTokens = terminalState.tokens.map(token => {
          if (token.symbol === 'SOL') {
            return {
              ...token,
              balance: data.balance
            };
          }
          return token;
        });
        
        setTerminalState({
          ...terminalState,
          tokens: updatedTokens
        });
        
        return (
          <div className="space-y-1">
            <div className="text-gray-400">Address: <span className="text-yellow-300">{terminalState.keypair.publicKey}</span></div>
            <div className="text-gray-400">Balance: <span className="text-yellow-300">{data.balance} SOL</span></div>
            <div className="text-gray-400">Network: <span className="text-yellow-300">{terminalState.network}</span></div>
            {terminalState.network === 'devnet' || terminalState.network === 'testnet' ? (
              <div className="text-gray-400 text-sm mt-2">
                You can request an airdrop with <span className="text-yellow-300">solana airdrop [amount]</span>
              </div>
            ) : (
              <div className="text-gray-400 text-sm mt-2">
                This is the real mainnet balance for this address.
              </div>
            )}
          </div>
        );
      } catch (_error) {
        // Clear loading state
        setIsLoading(false);
        
        // Fallback to static balance
        return (
          <div className="text-red-400">
            Error fetching balance. Please try again or check the network connection.
          </div>
        );
      }
    },
    'solana validators': () => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      return (
        <div className="space-y-1">
          <div className="grid grid-cols-4 gap-2 text-sm font-semibold border-b border-gray-700 pb-1">
            <div>Identity</div>
            <div>Vote Account</div>
            <div>Commission</div>
            <div>Last Vote</div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-sm">
            <div className="truncate">Va1idator1111111111111111111111111111111111</div>
            <div className="truncate">Vote111111111111111111111111111111111111</div>
            <div>10%</div>
            <div>12683021</div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-sm">
            <div className="truncate">Va1idator2222222222222222222222222222222222</div>
            <div className="truncate">Vote222222222222222222222222222222222222</div>
            <div>5%</div>
            <div>12683020</div>
          </div>
          <div className="grid grid-cols-4 gap-2 text-sm">
            <div className="truncate">Va1idator3333333333333333333333333333333333</div>
            <div className="truncate">Vote333333333333333333333333333333333333</div>
            <div>0%</div>
            <div>12683019</div>
          </div>
        </div>
      );
    },
    'solana block-height': () => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      return 'Current Block Height: 172,391,847';
    },
    'solana epoch-info': () => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      return (
        <div className="space-y-1">
          <div>Current Epoch: 347</div>
          <div>Slot: 149891349</div>
          <div>Slots in Epoch: 432000</div>
          <div>Epoch Progress: 94.7%</div>
        </div>
      );
    },
    'solana transaction-count': () => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      return 'Transaction Count: 186,539,402,837';
    },
    'solana slot': () => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      return 'Current Slot: 149891349';
    },
    'solana supply': () => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      return (
        <div className="space-y-1">
          <div>Total Supply: 555,000,000 SOL</div>
          <div>Circulating Supply: 424,394,685 SOL</div>
          <div>Non-Circulating Supply: 130,605,315 SOL</div>
        </div>
      );
    },
    'solana -h': () => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      return (
        <div className="space-y-1">
          <div className="text-yellow-300 font-semibold">Solana CLI Usage:</div>
          <div><span className="text-purple-400">solana balance [address]</span> - Get wallet balance</div>
          <div><span className="text-purple-400">solana validators</span> - Show validator info</div>
          <div><span className="text-purple-400">solana transaction-count</span> - Get current transaction count</div>
          <div><span className="text-purple-400">solana slot</span> - Get current slot</div>
          <div><span className="text-purple-400">solana block-height</span> - Get current block height</div>
          <div><span className="text-purple-400">solana epoch-info</span> - Get current epoch information</div>
          <div><span className="text-purple-400">solana supply</span> - Get current SOL supply</div>
          <div><span className="text-purple-400">solana config get</span> - Get current configuration</div>
          <div><span className="text-purple-400">solana config set --url [URL]</span> - Set RPC URL</div>
          
          <div className="text-yellow-300 font-semibold mt-3">Marketplace Extensions:</div>
          <div><span className="text-purple-400">marketplace init --fee [percent]</span> - Initialize marketplace</div>
          <div><span className="text-purple-400">marketplace sell [amount] [token] [price]</span> - Create sell order</div>
          <div><span className="text-purple-400">tokens</span> - List available tokens and balances</div>
        </div>
      );
    },
    'solana --version': () => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      return 'solana-cli 1.17.5 (src:devbuild; feat:3488713168)';
    },
    
    'solana config get': () => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      return (
        <div className="space-y-1">
          <div>Config File: ~/.config/solana/cli/config.yml</div>
          <div>RPC URL: {terminalState.network === 'mainnet-beta' ? 'https://api.mainnet-beta.solana.com' : 
                          terminalState.network === 'devnet' ? 'https://api.devnet.solana.com' :
                          'https://api.testnet.solana.com'}</div>
          <div>WebSocket URL: {terminalState.network === 'mainnet-beta' ? 'wss://api.mainnet-beta.solana.com' : 
                               terminalState.network === 'devnet' ? 'wss://api.devnet.solana.com' :
                               'wss://api.testnet.solana.com'} (computed)</div>
          <div>Keypair Path: {terminalState.keypair ? '~/.config/solana/id.json' : 'None configured'}</div>
          <div>Commitment: confirmed</div>
        </div>
      );
    },
    
    'solana config set': (args?: string) => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      const argsString = args || '';
      
      if (argsString.includes('--url') || argsString.includes('-u')) {
        let newNetwork = terminalState.network;
        
        if (argsString.includes('devnet')) {
          newNetwork = 'devnet';
        } else if (argsString.includes('testnet')) {
          newNetwork = 'testnet';
        } else if (argsString.includes('mainnet')) {
          newNetwork = 'mainnet-beta';
        }
        
        setTerminalState({
          ...terminalState,
          network: newNetwork as 'mainnet-beta' | 'devnet' | 'testnet'
        });
        
        return `Config updated to ${newNetwork}`;
      }
      
      return 'Config file updated';
    },
    
    'solana-keygen new': () => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      // Generate a random public key (simplified for demo)
      const generateRandomHex = (length: number) => {
        let result = '';
        const characters = '0123456789abcdef';
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      };
      
      const publicKey = generateRandomHex(44);
      const privateKey = generateRandomHex(88);
      
      setTerminalState({
        ...terminalState,
        keypair: {
          publicKey,
          privateKey
        }
      });
      
      return (
        <div className="space-y-1">
          <div className="text-yellow-300">Generating a new simulated keypair</div>
          <div className="text-gray-400 mt-1">For added security, enter a BIP39 passphrase</div>
          <div className="text-gray-400">NOTE! This passphrase improves security of the recovery seed phrase NOT the keypair file itself, which is stored as insecure plain text</div>
          <div className="text-gray-400 mb-2">[Empty for no passphrase]:</div>
          <div className="text-gray-400">Wrote new keypair to ~/.config/solana/id.json</div>
          <div className="text-gray-400">======================================================================</div>
          <div className="text-yellow-300">pubkey: {publicKey.substring(0, 44)}</div>
          <div className="text-gray-400">======================================================================</div>
          <div className="text-gray-400 mt-1">Save this seed phrase and your BIP39 passphrase to recover your new keypair:</div>
          <div className="text-yellow-300 mt-1 mb-1">gesture thrive hub security impulse roast youth snow deploy ready cement electric select spot column insect</div>
          <div className="text-gray-400">======================================================================</div>
          <div className="text-gray-400 mt-2">
            Note: This is a simulated keypair for educational purposes. For a real cryptographically secure keypair, use <span className="text-yellow-300">solana-keygen real</span>
          </div>
        </div>
      );
    },
    
    'solana-keygen pubkey': () => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      if (!terminalState.keypair) {
        return (
          <div className="text-red-400">
            No keypair found. Generate one first with <span className="text-yellow-300">solana-keygen new</span>
          </div>
        );
      }
      
      return terminalState.keypair.publicKey;
    },
    
    'solana-keygen export': async () => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      if (!terminalState.keypair) {
        return (
          <div className="text-red-400">
            No keypair found. Generate one first with <span className="text-yellow-300">solana-keygen new</span> or <span className="text-yellow-300">solana-keygen real</span>
          </div>
        );
      }
      
      // For real keypairs, we'll use the API to get the formatted private key
      const isRealKeypair = terminalState.keypair.publicKey.length > 40; // Simplified check
      
      if (isRealKeypair) {
        // Set loading state
        setIsLoading(true);
        
        try {
          // Call our API endpoint to get keypair information
          const response = await fetch('/api/generate-keypair', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              network: terminalState.network 
            })
          });
          
          if (!response.ok) {
            throw new Error('Failed to get keypair information');
          }
          
          const keypairData = await response.json();
          
          // Clear loading state
          setIsLoading(false);
          
          // Format the private key array for display
          const privateKeyFormatted = JSON.stringify(keypairData.privateKeyArray);
          
          return (
            <div className="space-y-2">
              <div className="text-yellow-300 font-semibold">Keypair Export</div>
              
              <div className="text-gray-400 mt-2">Network: <span className="text-yellow-300">{terminalState.network}</span></div>
              <div className="text-gray-400">Public Key: <span className="text-yellow-300">{terminalState.keypair.publicKey}</span></div>
              
              <div className="text-gray-400 mt-3 font-semibold">Secret Key (Base58 format):</div>
              <div className="bg-gray-800 p-2 rounded text-yellow-300 text-xs overflow-x-auto">
                {terminalState.keypair.privateKey}
              </div>
              
              <div className="text-gray-400 mt-3 font-semibold">Secret Key (Array format for Phantom import):</div>
              <div className="bg-gray-800 p-2 rounded text-yellow-300 text-xs overflow-x-auto">
                {privateKeyFormatted}
              </div>
              
              <div className="text-gray-400 mt-3 font-semibold">Import Instructions:</div>
              <div className="text-gray-400 text-sm">
                <div>1. To import into Phantom wallet: Settings → Add/Connect wallet → Import private key → Paste the array format</div>
                <div>2. For Solflare: Add wallet → Import wallet → Paste the Base58 secret key</div>
              </div>
              
              <div className="text-gray-400 mt-2 text-sm">
                This is a real Solana keypair that can be imported into any Solana wallet.
              </div>
            </div>
          );
        } catch (_error) {
          // Clear loading state
          setIsLoading(false);
          
          return (
            <div className="text-red-400">
              Error: Failed to export keypair. Please try again.
            </div>
          );
        }
      } else {
        // For simulated keypairs, show a message
        return (
          <div className="space-y-2">
            <div className="text-yellow-300 font-semibold">Keypair Export</div>
            
            <div className="text-gray-400 mt-2">Network: <span className="text-yellow-300">{terminalState.network}</span></div>
            <div className="text-gray-400">Public Key: <span className="text-yellow-300">{terminalState.keypair.publicKey}</span></div>
            
            <div className="text-gray-400 mt-3 font-semibold">Secret Key:</div>
            <div className="bg-gray-800 p-2 rounded text-yellow-300 text-xs overflow-x-auto">
              {terminalState.keypair.privateKey}
            </div>
            
            <div className="text-red-400 mt-3">
              Warning: This is a simulated keypair and cannot be used with real Solana wallets.
              For a real cryptographically secure keypair, use <span className="text-yellow-300">solana-keygen real</span>
            </div>
          </div>
        );
      }
    },
    
    'solana-keygen real': async () => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      // Set loading state
      setIsLoading(true);
      
      try {
        // Call our API endpoint to generate a real Solana keypair with current network
        const response = await fetch('/api/generate-keypair', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            network: terminalState.network 
          })
        });
        
        if (!response.ok) {
          throw new Error('Failed to generate keypair');
        }
        
        const keypairData = await response.json();
        
        // Update the terminal state with the real keypair
        setTerminalState({
          ...terminalState,
          keypair: {
            publicKey: keypairData.publicKey,
            privateKey: keypairData.secretKey
          }
        });
        
        // Clear loading state
        setIsLoading(false);
        
        // Format the private key array for display
        const privateKeyFormatted = JSON.stringify(keypairData.privateKeyArray);
        
        // Create import instructions based on network
        const networkInfo = terminalState.network === 'mainnet-beta' 
          ? "This keypair is configured for mainnet. Real SOL can be received at this address."
          : terminalState.network === 'devnet'
          ? "This keypair is configured for devnet. You can airdrop test SOL with 'solana airdrop 2'."
          : "This keypair is configured for testnet. You can airdrop test SOL with 'solana airdrop 2'.";
        
        return (
          <div className="space-y-1">
            <div className="text-yellow-300">Generating a new real Solana keypair on {terminalState.network}</div>
            <div className="text-green-400">✓ Keypair generated successfully!</div>
            <div className="text-gray-400">Wrote new keypair to ~/.config/solana/id.json</div>
            
            <div className="text-gray-400 mt-3">Network: <span className="text-yellow-300">{terminalState.network}</span></div>
            <div className="text-gray-400">{networkInfo}</div>
            
            <div className="text-gray-400 mt-3">Public Key: <span className="text-yellow-300">{keypairData.publicKey}</span></div>
            <div className="text-gray-400">Current Balance: <span className="text-yellow-300">{keypairData.balance} SOL</span></div>
            
            <div className="text-gray-400 mt-3 font-semibold">Secret Key (Base58 format):</div>
            <div className="bg-gray-800 p-2 rounded text-yellow-300 text-xs overflow-x-auto">
              {keypairData.secretKey}
            </div>
            
            <div className="text-gray-400 mt-3 font-semibold">Secret Key (Array format for Phantom import):</div>
            <div className="bg-gray-800 p-2 rounded text-yellow-300 text-xs overflow-x-auto">
              {privateKeyFormatted}
            </div>
            
            <div className="text-gray-400 mt-3 font-semibold">Import Instructions:</div>
            <div className="text-gray-400 text-sm">
              <div>1. To import into Phantom wallet: Settings → Add/Connect wallet → Import private key → Paste the array format</div>
              <div>2. For Solflare: Add wallet → Import wallet → Paste the Base58 secret key</div>
              <div>3. For Solana CLI: Use <span className="text-yellow-300">solana-keygen recover</span> (Not implemented in this demo)</div>
            </div>
            
            <div className="text-gray-400 mt-2">
              Use <span className="text-yellow-300">solana-keygen pubkey</span> to display your public key anytime.
            </div>
          </div>
        );
      } catch (_error) {
        // Clear loading state
        setIsLoading(false);
        
        return (
          <div className="text-red-400">
            Error: Failed to generate real Solana keypair. Please try again.
          </div>
        );
      }
    },
    
    'sh -c curl -sSfL https://release.solana.com/stable/install': () => {
      const output = (
        <div className="space-y-1">
          <div className="text-yellow-300">Downloading latest Solana release...</div>
          <div className="text-gray-400 mt-1">✓ Downloaded release v1.17.5</div>
          <div className="text-gray-400">✓ Verified hash</div>
          <div className="text-gray-400">✓ Extracted archive</div>
          <div className="text-gray-400">✓ Installed at ~/.local/share/solana/install/active_release</div>
          <div className="text-gray-400">✓ Updated PATH environment variable</div>
          <div className="text-green-400 mt-2 font-semibold">Solana CLI v1.17.5 installed successfully!</div>
          <div className="text-gray-400 mt-1">To verify installation, run: <span className="text-yellow-300">solana --version</span></div>
        </div>
      );
      
      // Update the state to reflect that Solana CLI is installed
      setTerminalState({
        ...terminalState,
        solanaCliInstalled: true
      });
      
      return output;
    },
    
    'apt-get install solana-cli': () => {
      const output = (
        <div className="space-y-1">
          <div className="text-gray-400">Reading package lists... Done</div>
          <div className="text-gray-400">Building dependency tree... Done</div>
          <div className="text-gray-400">Reading state information... Done</div>
          <div className="text-gray-400">The following NEW packages will be installed:</div>
          <div className="text-gray-400 ml-4">solana-cli</div>
          <div className="text-gray-400">0 upgraded, 1 newly installed, 0 to remove and 0 not upgraded.</div>
          <div className="text-gray-400">Need to get 24.5 MB of archives.</div>
          <div className="text-gray-400">After this operation, 86.2 MB of additional disk space will be used.</div>
          <div className="text-gray-400">Get:1 https://apt.solanalabs.com/stable solana-cli 1.17.5 [24.5 MB]</div>
          <div className="text-gray-400">Fetched 24.5 MB in 3s (8,167 kB/s)</div>
          <div className="text-gray-400">Selecting previously unselected package solana-cli.</div>
          <div className="text-gray-400">Preparing to unpack .../solana-cli_1.17.5_amd64.deb ...</div>
          <div className="text-gray-400">Unpacking solana-cli (1.17.5) ...</div>
          <div className="text-gray-400">Setting up solana-cli (1.17.5) ...</div>
          <div className="text-green-400 mt-2 font-semibold">Solana CLI installed successfully!</div>
          <div className="text-gray-400 mt-1">To verify installation, run: <span className="text-yellow-300">solana --version</span></div>
        </div>
      );
      
      // Update the state to reflect that Solana CLI is installed
      setTerminalState({
        ...terminalState,
        solanaCliInstalled: true
      });
      
      return output;
    },
    
    // Token Marketplace Commands
    'marketplace init': (args?: string) => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      if (!terminalState.keypair) {
        return (
          <div className="text-red-400">
            Error: No keypair found. Generate one first with <span className="text-yellow-300">solana-keygen new</span>
          </div>
        );
      }
      
      // Ensure we're on devnet for marketplace operations
      if (terminalState.network !== 'devnet') {
        return (
          <div className="text-red-400">
            Error: Marketplace operations are only available on devnet. Please switch to devnet first with <span className="text-yellow-300">solana config set --url devnet</span>
          </div>
        );
      }
      
      const argsString = args || '';
      const feeMatch = argsString.match(/--fee\s+(\d+)/);
      
      if (!feeMatch) {
        return (
          <div className="text-red-400">
            Error: Missing fee percentage. Usage: marketplace init --fee [percentage]
          </div>
        );
      }
      
      const feePercentage = parseInt(feeMatch[1], 10);
      
      if (isNaN(feePercentage) || feePercentage < 0 || feePercentage > 1000) {
        return (
          <div className="text-red-400">
            Error: Invalid fee percentage. Must be between 0 and 1000 (0-10%)
          </div>
        );
      }
      
      // Generate a marketplace address
      const generateRandomHex = (length: number) => {
        let result = '';
        const characters = '0123456789abcdef';
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
      };
      
      const marketplaceAddress = generateRandomHex(44);
      
      // Update the terminal state with the new marketplace
      setTerminalState({
        ...terminalState,
        marketplace: {
          address: marketplaceAddress,
          admin: terminalState.keypair.publicKey,
          feePercentage,
          isInitialized: true,
          totalVolume: 0,
          totalFeesCollected: 0
        }
      });
      
      return (
        <div className="space-y-1">
          <div className="text-green-400">✓ Marketplace initialized successfully on devnet</div>
          <div>Marketplace Address: <span className="text-yellow-300">{marketplaceAddress}</span></div>
          <div>Admin: <span className="text-yellow-300">{terminalState.keypair.publicKey}</span></div>
          <div>Fee Percentage: <span className="text-yellow-300">{feePercentage/100}%</span></div>
          <div className="text-gray-400 mt-2">
            To test the marketplace, you can request test tokens with: <span className="text-yellow-300">solana airdrop 1</span>
          </div>
        </div>
      );
    },
    
    'marketplace info': () => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      // Ensure we're on devnet for marketplace operations
      if (terminalState.network !== 'devnet') {
        return (
          <div className="text-red-400">
            Error: Marketplace operations are only available on devnet. Please switch to devnet first with <span className="text-yellow-300">solana config set --url devnet</span>
          </div>
        );
      }
      
      if (!terminalState.marketplace || !terminalState.marketplace.isInitialized) {
        return (
          <div className="text-red-400">
            Error: Marketplace not initialized. Initialize it first with <span className="text-yellow-300">marketplace init --fee [percentage]</span>
          </div>
        );
      }
      
      return (
        <div className="space-y-1">
          <div className="text-yellow-300 font-semibold">Marketplace Information:</div>
          <div>Address: <span className="text-gray-300">{terminalState.marketplace.address}</span></div>
          <div>Admin: <span className="text-gray-300">{terminalState.marketplace.admin}</span></div>
          <div>Fee Percentage: <span className="text-gray-300">{terminalState.marketplace.feePercentage/100}%</span></div>
          <div>Total Volume: <span className="text-gray-300">{terminalState.marketplace.totalVolume} lamports</span></div>
          <div>Total Fees Collected: <span className="text-gray-300">{terminalState.marketplace.totalFeesCollected} lamports</span></div>
          <div>Active Orders: <span className="text-gray-300">{terminalState.sellOrders.filter(o => o.isActive).length}</span></div>
        </div>
      );
    },
    
    'marketplace sell': (args?: string) => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      if (!terminalState.keypair) {
        return (
          <div className="text-red-400">
            Error: No keypair found. Generate one first with <span className="text-yellow-300">solana-keygen new</span>
          </div>
        );
      }
      
      // Ensure we're on devnet for marketplace operations
      if (terminalState.network !== 'devnet') {
        return (
          <div className="text-red-400">
            Error: Marketplace operations are only available on devnet. Please switch to devnet first with <span className="text-yellow-300">solana config set --url devnet</span>
          </div>
        );
      }
      
      if (!terminalState.marketplace || !terminalState.marketplace.isInitialized) {
        return (
          <div className="text-red-400">
            Error: Marketplace not initialized. Initialize it first with <span className="text-yellow-300">marketplace init --fee [percentage]</span>
          </div>
        );
      }
      
      const argsString = args || '';
      const argParts = argsString.trim().split(/\s+/);
      
      if (argParts.length < 3) {
        return (
          <div className="text-red-400">
            Error: Invalid arguments. Usage: marketplace sell [amount] [token] [price]
          </div>
        );
      }
      
      const amount = parseFloat(argParts[0]);
      const tokenSymbol = argParts[1].toUpperCase();
      const price = parseFloat(argParts[2]);
      
      if (isNaN(amount) || amount <= 0) {
        return (
          <div className="text-red-400">
            Error: Invalid amount. Must be a positive number.
          </div>
        );
      }
      
      if (isNaN(price) || price <= 0) {
        return (
          <div className="text-red-400">
            Error: Invalid price. Must be a positive number.
          </div>
        );
      }
      
      // Find the token
      const token = terminalState.tokens.find(t => t.symbol === tokenSymbol);
      
      if (!token) {
        return (
          <div className="text-red-400">
            Error: Unknown token: {tokenSymbol}. Use the &apos;tokens&apos; command to see available tokens.
          </div>
        );
      }
      
      if (!token.balance || token.balance < amount) {
        return (
          <div className="text-red-400">
            Error: Insufficient {tokenSymbol} balance. Current balance: {token.balance || 0}
          </div>
        );
      }
      
      // Create the sell order
      const orderId = `order_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
      
      const newOrder = {
        id: orderId,
        seller: terminalState.keypair.publicKey,
        tokenMint: token.mint,
        amount,
        pricePerToken: price,
        createdAt: Date.now(),
        isActive: true
      };
      
      // Update token balance
      const updatedTokens = terminalState.tokens.map(t => {
        if (t.mint === token.mint) {
          return {
            ...t,
            balance: (t.balance || 0) - amount
          };
        }
        return t;
      });
      
      // Update the terminal state with the new order and updated balances
      setTerminalState({
        ...terminalState,
        sellOrders: [...terminalState.sellOrders, newOrder],
        tokens: updatedTokens
      });
      
      return (
        <div className="space-y-1">
          <div className="text-green-400">✓ Sell order created successfully</div>
          <div>Order ID: <span className="text-yellow-300">{orderId}</span></div>
          <div>Amount: <span className="text-gray-300">{amount} {tokenSymbol}</span></div>
          <div>Price: <span className="text-gray-300">{price} lamports per token</span></div>
          <div>Total: <span className="text-gray-300">{amount * price} lamports</span></div>
        </div>
      );
    },
    
    'marketplace buy': (args?: string) => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      if (!terminalState.keypair) {
        return (
          <div className="text-red-400">
            Error: No keypair found. Generate one first with <span className="text-yellow-300">solana-keygen new</span>
          </div>
        );
      }
      
      // Ensure we're on devnet for marketplace operations
      if (terminalState.network !== 'devnet') {
        return (
          <div className="text-red-400">
            Error: Marketplace operations are only available on devnet. Please switch to devnet first with <span className="text-yellow-300">solana config set --url devnet</span>
          </div>
        );
      }
      
      if (!terminalState.marketplace || !terminalState.marketplace.isInitialized) {
        return (
          <div className="text-red-400">
            Error: Marketplace not initialized. Initialize it first with <span className="text-yellow-300">marketplace init --fee [percentage]</span>
          </div>
        );
      }
      
      const argsString = args || '';
      const argParts = argsString.trim().split(/\s+/);
      
      if (argParts.length < 2) {
        return (
          <div className="text-red-400">
            Error: Invalid arguments. Usage: marketplace buy [order_id] [amount]
          </div>
        );
      }
      
      const orderId = argParts[0];
      const amount = parseFloat(argParts[1]);
      
      if (isNaN(amount) || amount <= 0) {
        return (
          <div className="text-red-400">
            Error: Invalid amount. Must be a positive number.
          </div>
        );
      }
      
      // Find the order
      const order = terminalState.sellOrders.find(o => o.id === orderId && o.isActive);
      
      if (!order) {
        return (
          <div className="text-red-400">
            Error: Order not found or not active. Use &apos;marketplace orders&apos; to see available orders.
          </div>
        );
      }
      
      if (order.amount < amount) {
        return (
          <div className="text-red-400">
            Error: Insufficient tokens in order. Available: {order.amount}
          </div>
        );
      }
      
      // Find the token
      const token = terminalState.tokens.find(t => t.mint === order.tokenMint);
      
      if (!token) {
        return (
          <div className="text-red-400">
            Error: Token information not found.
          </div>
        );
      }
      
      // Calculate the total price and fee
      const totalPrice = amount * order.pricePerToken;
      const fee = totalPrice * (terminalState.marketplace.feePercentage / 10000);
      const sellerAmount = totalPrice - fee;
      
      // Check if buyer has enough SOL
      const solToken = terminalState.tokens.find(t => t.symbol === 'SOL');
      if (!solToken || !solToken.balance || solToken.balance < totalPrice / 1_000_000_000) {
        return (
          <div className="text-red-400">
            Error: Insufficient SOL balance. Required: {totalPrice / 1_000_000_000} SOL
          </div>
        );
      }
      
      // Update order
      const updatedOrders = terminalState.sellOrders.map(o => {
        if (o.id === orderId) {
          const newAmount = o.amount - amount;
          return {
            ...o,
            amount: newAmount,
            isActive: newAmount > 0
          };
        }
        return o;
      });
      
      // Update token balances
      const updatedTokens = terminalState.tokens.map(t => {
        if (t.symbol === 'SOL') {
          // Decrease buyer's SOL balance
          return {
            ...t,
            balance: (t.balance || 0) - (totalPrice / 1_000_000_000)
          };
        }
        if (t.mint === token.mint) {
          // Increase buyer's token balance
          return {
            ...t,
            balance: (t.balance || 0) + amount
          };
        }
        return t;
      });
      
      // Update marketplace stats
      const updatedMarketplace = {
        ...terminalState.marketplace,
        totalVolume: terminalState.marketplace.totalVolume + totalPrice,
        totalFeesCollected: terminalState.marketplace.totalFeesCollected + fee
      };
      
      // Update the terminal state
      setTerminalState({
        ...terminalState,
        sellOrders: updatedOrders,
        tokens: updatedTokens,
        marketplace: updatedMarketplace
      });
      
      return (
        <div className="space-y-1">
          <div className="text-green-400">✓ Purchase successful</div>
          <div>Order ID: <span className="text-yellow-300">{orderId}</span></div>
          <div>Amount: <span className="text-gray-300">{amount} {token.symbol}</span></div>
          <div>Price: <span className="text-gray-300">{order.pricePerToken} lamports per token</span></div>
          <div>Total Price: <span className="text-gray-300">{totalPrice} lamports</span></div>
          <div>Fee ({terminalState.marketplace.feePercentage/100}%): <span className="text-gray-300">{fee} lamports</span></div>
          <div>Seller Receives: <span className="text-gray-300">{sellerAmount} lamports</span></div>
          <div className="text-gray-400 mt-2">Tokens transferred to your wallet.</div>
        </div>
      );
    },
    
    'marketplace orders': () => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      // Ensure we're on devnet for marketplace operations
      if (terminalState.network !== 'devnet') {
        return (
          <div className="text-red-400">
            Error: Marketplace operations are only available on devnet. Please switch to devnet first with <span className="text-yellow-300">solana config set --url devnet</span>
          </div>
        );
      }
      
      if (!terminalState.marketplace || !terminalState.marketplace.isInitialized) {
        return (
          <div className="text-red-400">
            Error: Marketplace not initialized. Initialize it first with <span className="text-yellow-300">marketplace init --fee [percentage]</span>
          </div>
        );
      }
      
      const activeOrders = terminalState.sellOrders.filter(o => o.isActive);
      
      if (activeOrders.length === 0) {
        return (
          <div className="text-gray-400">
            No active orders found.
          </div>
        );
      }
      
      return (
        <div className="space-y-2">
          <div className="text-yellow-300 font-semibold">Active Sell Orders:</div>
          <div className="space-y-3">
            {activeOrders.map((order, index) => {
              const token = terminalState.tokens.find(t => t.mint === order.tokenMint);
              return (
                <div key={index} className="border border-[#2FFFD1] rounded p-2 bg-[#071118]">
                  <div>Order ID: <span className="text-yellow-300">{order.id}</span></div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>Seller: <span className="text-gray-300 truncate">{order.seller}</span></div>
                    <div>Created: <span className="text-gray-300">{new Date(order.createdAt).toLocaleString()}</span></div>
                    <div>Token: <span className="text-gray-300">{token?.symbol || 'Unknown'}</span></div>
                    <div>Amount: <span className="text-gray-300">{order.amount}</span></div>
                    <div>Price: <span className="text-gray-300">{order.pricePerToken} lamports/token</span></div>
                    <div>Total: <span className="text-gray-300">{order.amount * order.pricePerToken} lamports</span></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    },
    
    'marketplace cancel': (args?: string) => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      if (!terminalState.keypair) {
        return (
          <div className="text-red-400">
            Error: No keypair found. Generate one first with <span className="text-yellow-300">solana-keygen new</span>
          </div>
        );
      }
      
      // Ensure we're on devnet for marketplace operations
      if (terminalState.network !== 'devnet') {
        return (
          <div className="text-red-400">
            Error: Marketplace operations are only available on devnet. Please switch to devnet first with <span className="text-yellow-300">solana config set --url devnet</span>
          </div>
        );
      }
      
      if (!terminalState.marketplace || !terminalState.marketplace.isInitialized) {
        return (
          <div className="text-red-400">
            Error: Marketplace not initialized. Initialize it first with <span className="text-yellow-300">marketplace init --fee [percentage]</span>
          </div>
        );
      }
      
      const argsString = args || '';
      const orderId = argsString.trim();
      
      if (!orderId) {
        return (
          <div className="text-red-400">
            Error: Order ID is required. Usage: marketplace cancel [order_id]
          </div>
        );
      }
      
      // Find the order
      const order = terminalState.sellOrders.find(o => o.id === orderId && o.isActive);
      
      if (!order) {
        return (
          <div className="text-red-400">
            Error: Order not found or not active. Use &apos;marketplace orders&apos; to see available orders.
          </div>
        );
      }
      
      // Check if caller is the seller
      if (order.seller !== terminalState.keypair.publicKey) {
        return (
          <div className="text-red-400">
            Error: Not authorized. Only the seller can cancel their orders.
          </div>
        );
      }
      
      // Find the token
      const token = terminalState.tokens.find(t => t.mint === order.tokenMint);
      
      if (!token) {
        return (
          <div className="text-red-400">
            Error: Token information not found.
          </div>
        );
      }
      
      // Update order status
      const updatedOrders = terminalState.sellOrders.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            isActive: false
          };
        }
        return o;
      });
      
      // Refund tokens to seller
      const updatedTokens = terminalState.tokens.map(t => {
        if (t.mint === order.tokenMint) {
          return {
            ...t,
            balance: (t.balance || 0) + order.amount
          };
        }
        return t;
      });
      
      // Update the terminal state
      setTerminalState({
        ...terminalState,
        sellOrders: updatedOrders,
        tokens: updatedTokens
      });
      
      return (
        <div className="space-y-1">
          <div className="text-green-400">✓ Order cancelled successfully</div>
          <div>Order ID: <span className="text-yellow-300">{orderId}</span></div>
          <div>Returned Tokens: <span className="text-gray-300">{order.amount} {token.symbol}</span></div>
        </div>
      );
    },
    
    'marketplace update-price': (args?: string) => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      if (!terminalState.keypair) {
        return (
          <div className="text-red-400">
            Error: No keypair found. Generate one first with <span className="text-yellow-300">solana-keygen new</span>
          </div>
        );
      }
      
      // Ensure we're on devnet for marketplace operations
      if (terminalState.network !== 'devnet') {
        return (
          <div className="text-red-400">
            Error: Marketplace operations are only available on devnet. Please switch to devnet first with <span className="text-yellow-300">solana config set --url devnet</span>
          </div>
        );
      }
      
      if (!terminalState.marketplace || !terminalState.marketplace.isInitialized) {
        return (
          <div className="text-red-400">
            Error: Marketplace not initialized. Initialize it first with <span className="text-yellow-300">marketplace init --fee [percentage]</span>
          </div>
        );
      }
      
      const argsString = args || '';
      const argParts = argsString.trim().split(/\s+/);
      
      if (argParts.length < 2) {
        return (
          <div className="text-red-400">
            Error: Invalid arguments. Usage: marketplace update-price [order_id] [new_price]
          </div>
        );
      }
      
      const orderId = argParts[0];
      const newPrice = parseFloat(argParts[1]);
      
      if (isNaN(newPrice) || newPrice <= 0) {
        return (
          <div className="text-red-400">
            Error: Invalid price. Must be a positive number.
          </div>
        );
      }
      
      // Find the order
      const order = terminalState.sellOrders.find(o => o.id === orderId && o.isActive);
      
      if (!order) {
        return (
          <div className="text-red-400">
            Error: Order not found or not active. Use &apos;marketplace orders&apos; to see available orders.
          </div>
        );
      }
      
      // Check if caller is the seller
      if (order.seller !== terminalState.keypair.publicKey) {
        return (
          <div className="text-red-400">
            Error: Not authorized. Only the seller can update their orders.
          </div>
        );
      }
      
      // Update order price
      const updatedOrders = terminalState.sellOrders.map(o => {
        if (o.id === orderId) {
          return {
            ...o,
            pricePerToken: newPrice
          };
        }
        return o;
      });
      
      // Update the terminal state
      setTerminalState({
        ...terminalState,
        sellOrders: updatedOrders
      });
      
      return (
        <div className="space-y-1">
          <div className="text-green-400">✓ Order price updated successfully</div>
          <div>Order ID: <span className="text-yellow-300">{orderId}</span></div>
          <div>New Price: <span className="text-gray-300">{newPrice} lamports per token</span></div>
          <div>Total: <span className="text-gray-300">{order.amount * newPrice} lamports</span></div>
        </div>
      );
    },
    
    'tokens': () => {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      if (!terminalState.keypair) {
        return (
          <div className="text-red-400">
            Error: No keypair found. Generate one first with <span className="text-yellow-300">solana-keygen new</span>
          </div>
        );
      }
      
      // Ensure we're on devnet for marketplace operations
      if (terminalState.network !== 'devnet') {
        return (
          <div className="text-red-400">
            Error: Marketplace operations are only available on devnet. Please switch to devnet first with <span className="text-yellow-300">solana config set --url devnet</span>
          </div>
        );
      }
      
      return (
        <div className="space-y-2">
          <div className="text-yellow-300 font-semibold">Available Tokens:</div>
          <div className="space-y-1">
            {terminalState.tokens.map((token, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <div><span className="text-purple-400">{token.symbol}</span></div>
                <div><span className="text-gray-300">{token.name}</span></div>
                <div>Balance: <span className="text-gray-300">{token.balance?.toLocaleString() || '0'}</span></div>
              </div>
            ))}
          </div>
          <div className="text-gray-400 mt-2 text-sm">
            Use these tokens with the marketplace commands.
          </div>
        </div>
      );
    },
  };

  // Scroll to bottom when command history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Focus input when clicked on terminal
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Process command
  const processCommand = async (cmd: string) => {
    const normalizedCmd = cmd.trim();
    const cmdLower = normalizedCmd.toLowerCase();
    
    // Simulate network delay
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);

    if (normalizedCmd === '') {
      return '';
    }
    
    // Allow only 'help' and 'clear' commands without wallet connection
    if (!walletConnected && cmdLower !== 'help' && cmdLower !== 'clear') {
      return (
        <div className="text-orange-400 flex items-start space-x-2">
          <AlertTriangle size={18} className="mt-1 flex-shrink-0" />
          <div>
            <div className="font-semibold mb-1">Wallet Connection Required</div>
            <div className="text-sm">
              Please connect your wallet to use this command. You can only use <span className="text-yellow-300">help</span> and <span className="text-yellow-300">clear</span> commands without connecting a wallet.
            </div>
          </div>
        </div>
      );
    }
    
    // Extract command and arguments
    const parts = normalizedCmd.split(' ');
    const args = parts.slice(1).join(' ');
    
    // Special case for solana-keygen
    if (cmdLower.startsWith('solana-keygen')) {
      const keygenCmd = cmdLower.split(' ').slice(0, 2).join(' ');
      
      if (keygenCmd === 'solana-keygen new') {
        return availableCommands['solana-keygen new']();
      }
      
      if (keygenCmd === 'solana-keygen pubkey') {
        return availableCommands['solana-keygen pubkey']();
      }
      
      if (keygenCmd === 'solana-keygen real') {
        return await availableCommands['solana-keygen real']();
      }
      
      if (keygenCmd === 'solana-keygen export') {
        return await availableCommands['solana-keygen export']();
      }
    }

    // Special case for solana config
    if (cmdLower.startsWith('solana config')) {
      const configCmd = cmdLower.split(' ').slice(0, 2).join(' ');
      
      if (configCmd === 'solana config') {
        if (cmdLower.includes('get')) {
          return availableCommands['solana config get']();
        }
        
        if (cmdLower.includes('set')) {
          return availableCommands['solana config set'](args);
        }
      }
    }

    // Check if the command exists
    const commandHandler = Object.entries(availableCommands).find(
      ([key]) => cmdLower === key || cmdLower.startsWith(`${key} `)
    );

    if (commandHandler) {
      return commandHandler[1]();
    }

    // Handle curl installation command variations
    if (cmdLower.includes('curl') && cmdLower.includes('release.solana.com') && cmdLower.includes('install')) {
      const result = availableCommands['sh -c curl -sSfL https://release.solana.com/stable/install']();
      
      // Update the terminal state to reflect that Solana CLI is installed
      setTerminalState({
        ...terminalState,
        solanaCliInstalled: true
      });
      
      return result;
    }

    // Handle apt installation variations
    if ((cmdLower.includes('apt') || cmdLower.includes('apt-get')) && 
        (cmdLower.includes('install') && cmdLower.includes('solana'))) {
      const result = availableCommands['apt-get install solana-cli']();
      
      // Update the terminal state to reflect that Solana CLI is installed
      setTerminalState({
        ...terminalState,
        solanaCliInstalled: true
      });
      
      return result;
    }

    // Handle brew installation
    if (cmdLower.includes('brew') && cmdLower.includes('install') && cmdLower.includes('solana')) {
      const output = (
        <div className="space-y-1">
          <div className="text-gray-400">==&amp;gt; Downloading https://github.com/solana-labs/solana/releases/download/v1.17.5/solana-release-x86_64-apple-darwin.tar.bz2</div>
          <div className="text-gray-400">==&amp;gt; Downloading from https://github-releases.githubusercontent.com/solana-release-x86_64-apple-darwin.tar.bz2</div>
          <div className="text-gray-400">######################################################################## 100.0%</div>
          <div className="text-gray-400">==&amp;gt; Installing solana</div>
          <div className="text-gray-400">==&amp;gt; Caveats</div>
          <div className="text-gray-400">Homebrew&apos;s post-install process has been completed</div>
          <div className="text-green-400 mt-2 font-semibold">Solana CLI installed successfully!</div>
          <div className="text-gray-400 mt-1">To verify installation, run: <span className="text-yellow-300">solana --version</span></div>
        </div>
      );
      
      // Update the terminal state to reflect that Solana CLI is installed
      setTerminalState({
        ...terminalState,
        solanaCliInstalled: true
      });
      
      return output;
    }

    // Handle solana airdrop command
    if (cmdLower.startsWith('solana airdrop')) {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      if (!terminalState.keypair) {
        return (
          <div className="text-red-400">
            Error: No keypair found. Generate one first with <span className="text-yellow-300">solana-keygen new</span> or <span className="text-yellow-300">solana-keygen real</span>
          </div>
        );
      }
      
      // Airdrop is only available on devnet and testnet
      if (terminalState.network !== 'devnet' && terminalState.network !== 'testnet') {
        return (
          <div className="text-red-400">
            Error: Airdrop is only available on devnet or testnet. Please switch to devnet with <span className="text-yellow-300">solana config set --url devnet</span>
          </div>
        );
      }
      
      // Parse the amount
      const airdropArgs = normalizedCmd.split(' ').slice(2);
      let amount = 1; // Default to 1 SOL
      
      if (airdropArgs.length > 0) {
        const parsedAmount = parseFloat(airdropArgs[0]);
        if (!isNaN(parsedAmount) && parsedAmount > 0) {
          // Limit to 2 SOL per airdrop request
          amount = Math.min(parsedAmount, 2);
        }
      }
      
      // For real keypairs, use the API to request a real airdrop
      const isRealKeypair = terminalState.keypair.publicKey.length > 40; // Simplified check
      
      if (isRealKeypair) {
        // Set loading state to true while waiting for response
        setIsLoading(true);
        
        try {
          // Call our API endpoint to request a real airdrop
          const response = await fetch('/api/request-airdrop', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              address: terminalState.keypair.publicKey,
              amount,
              network: terminalState.network 
            })
          });
          
          // Clear loading state
          setIsLoading(false);
          
          if (!response.ok) {
            const errorData = await response.json();
            return (
              <div className="text-red-400">
                Error: {errorData.error || 'Failed to request airdrop'}
              </div>
            );
          }
          
          const data = await response.json();
          
          // Update the token balance in the state
          const updatedTokens = terminalState.tokens.map(token => {
            if (token.symbol === 'SOL') {
              return {
                ...token,
                balance: data.balance
              };
            }
            return token;
          });
          
          setTerminalState({
            ...terminalState,
            tokens: updatedTokens
          });
          
          return (
            <div className="space-y-1">
              <div className="text-green-400">✓ Airdrop successful</div>
              <div>Signature: <span className="text-gray-300">{data.signature}</span></div>
              <div className="mt-1">
                <span className="text-gray-300">{data.amount} SOL</span> has been airdropped to <span className="text-yellow-300">{terminalState.keypair.publicKey}</span>
              </div>
              <div className="text-gray-400">Network: <span className="text-yellow-300">{terminalState.network}</span></div>
              <div className="text-gray-400">Current Balance: <span className="text-yellow-300">{data.balance} SOL</span></div>
              
              <div className="text-gray-400 text-sm mt-3">
                <div className="text-green-400 font-semibold">✓ This is a real airdrop on the {terminalState.network}.</div>
                <div>These SOL are available in any wallet you import this keypair into.</div>
                <div>You can check your balance with <span className="text-yellow-300">solana balance</span></div>
                {terminalState.network === 'devnet' && (
                  <div className="mt-1">Now you can initialize a marketplace with <span className="text-yellow-300">marketplace init --fee [percentage]</span></div>
                )}
              </div>
            </div>
          );
        } catch (error) {
          // Clear loading state
          setIsLoading(false);
          
          return (
            <div className="text-red-400">
              Error: Failed to request airdrop. Please try again.
            </div>
          );
        }
      } else {
        // For simulated keypairs, simulate an airdrop
        // Find the SOL token
        const updatedTokens = terminalState.tokens.map(token => {
          if (token.symbol === 'SOL') {
            return {
              ...token,
              balance: (token.balance || 0) + amount
            };
          }
          return token;
        });
        
        // Update the terminal state
        setTerminalState({
          ...terminalState,
          tokens: updatedTokens
        });
        
        // Generate a pseudo-random signature for the transaction
        const generateRandomSignature = () => {
          const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
          let result = '';
          for (let i = 0; i < 87; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          return result;
        };
        
        const signature = generateRandomSignature();
        
        return (
          <div className="space-y-1">
            <div className="text-green-400">✓ Airdrop successful (simulated)</div>
            <div>Signature: <span className="text-gray-300">{signature}</span></div>
            <div className="mt-1">
              <span className="text-gray-300">{amount} SOL</span> has been airdropped to <span className="text-yellow-300">{terminalState.keypair.publicKey}</span>
            </div>
            <div className="text-gray-400">Network: <span className="text-yellow-300">{terminalState.network}</span></div>
            
            <div className="text-gray-400 text-sm mt-1">
              <div className="text-yellow-300 font-semibold">⚠️ This is a simulated keypair and airdrop.</div>
              <div>For a real cryptographically secure keypair and airdrop, use <span className="text-yellow-300">solana-keygen real</span></div>
            </div>
          </div>
        );
      }
    }
    
    // If command starts with solana but isn't recognized
    if (cmdLower.startsWith('solana')) {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      return (
        <div className="text-red-400">
          Error: Unknown solana command. Type <span className="text-yellow-300">solana -h</span> for available commands.
        </div>
      );
    }
    
    // If command starts with solana-keygen but isn't recognized
    if (cmdLower.startsWith('solana-keygen')) {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      return (
        <div className="text-red-400">
          Error: Unknown solana-keygen command. Available commands: new, pubkey.
        </div>
      );
    }
    
    // Handle marketplace commands
    if (cmdLower.startsWith('marketplace')) {
      if (cmdLower === 'marketplace info') {
        return availableCommands['marketplace info']();
      }
      
      if (cmdLower === 'marketplace orders') {
        return availableCommands['marketplace orders']();
      }
      
      if (cmdLower.startsWith('marketplace init')) {
        return availableCommands['marketplace init'](args);
      }
      
      if (cmdLower.startsWith('marketplace sell')) {
        return availableCommands['marketplace sell'](args);
      }
      
      if (cmdLower.startsWith('marketplace buy')) {
        return availableCommands['marketplace buy'](args);
      }
      
      if (cmdLower.startsWith('marketplace cancel')) {
        return availableCommands['marketplace cancel'](args);
      }
      
      if (cmdLower.startsWith('marketplace update-price')) {
        return availableCommands['marketplace update-price'](args);
      }
      
      return (
        <div className="text-red-400">
          Error: Unknown marketplace command. Type <span className="text-yellow-300">help</span> to see available commands.
        </div>
      );
    }
    
    // Handle tokens command
    if (cmdLower === 'tokens') {
      return availableCommands['tokens']();
    }
    if (cmdLower.startsWith('solana airdrop')) {
      if (!terminalState.solanaCliInstalled) {
        return solanaCLINotFoundError();
      }
      
      if (!terminalState.keypair) {
        return (
          <div className="text-red-400">
            Error: No keypair found. Generate one first with <span className="text-yellow-300">solana-keygen new</span> or <span className="text-yellow-300">solana-keygen real</span>
          </div>
        );
      }
      
      // Airdrop is only available on devnet and testnet
      if (terminalState.network !== 'devnet' && terminalState.network !== 'testnet') {
        return (
          <div className="text-red-400">
            Error: Airdrop is only available on devnet or testnet. Please switch to devnet with <span className="text-yellow-300">solana config set --url devnet</span>
          </div>
        );
      }
      
      // Parse the amount
      const airdropArgs = normalizedCmd.split(' ').slice(2);
      let amount = 1; // Default to 1 SOL
      
      if (airdropArgs.length > 0) {
        const parsedAmount = parseFloat(airdropArgs[0]);
        if (!isNaN(parsedAmount) && parsedAmount > 0) {
          // Limit to 2 SOL per airdrop request
          amount = Math.min(parsedAmount, 2);
        }
      }
      
      // For real keypairs, use the API to request a real airdrop
      const isRealKeypair = terminalState.keypair.publicKey.length > 40; // Simplified check
      
      if (isRealKeypair) {
        // Set loading state to true while waiting for response
        setIsLoading(true);
        
        try {
          // Call our API endpoint to request a real airdrop
          const response = await fetch('/api/request-airdrop', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              address: terminalState.keypair.publicKey,
              amount,
              network: terminalState.network 
            })
          });
          
          // Clear loading state
          setIsLoading(false);
          
          if (!response.ok) {
            const errorData = await response.json();
            return (
              <div className="text-red-400">
                Error: {errorData.error || 'Failed to request airdrop'}
              </div>
            );
          }
          
          const data = await response.json();
          
          // Update the token balance in the state
          const updatedTokens = terminalState.tokens.map(token => {
            if (token.symbol === 'SOL') {
              return {
                ...token,
                balance: data.balance
              };
            }
            return token;
          });
          
          setTerminalState({
            ...terminalState,
            tokens: updatedTokens
          });
          
          return (
            <div className="space-y-1">
              <div className="text-green-400">✓ Airdrop successful</div>
              <div>Signature: <span className="text-gray-300">{data.signature}</span></div>
              <div className="mt-1">
                <span className="text-gray-300">{data.amount} SOL</span> has been airdropped to <span className="text-yellow-300">{terminalState.keypair.publicKey}</span>
              </div>
              <div className="text-gray-400">Network: <span className="text-yellow-300">{terminalState.network}</span></div>
              <div className="text-gray-400">Current Balance: <span className="text-yellow-300">{data.balance} SOL</span></div>
              
              <div className="text-gray-400 text-sm mt-3">
                <div className="text-green-400 font-semibold">✓ This is a real airdrop on the {terminalState.network}.</div>
                <div>These SOL are available in any wallet you import this keypair into.</div>
                <div>You can check your balance with <span className="text-yellow-300">solana balance</span></div>
                {terminalState.network === 'devnet' && (
                  <div className="mt-1">Now you can initialize a marketplace with <span className="text-yellow-300">marketplace init --fee [percentage]</span></div>
                )}
              </div>
            </div>
          );
        } catch (error) {
          // Clear loading state
          setIsLoading(false);
          
          return (
            <div className="text-red-400">
              Error: Failed to request airdrop. Please try again.
            </div>
          );
        }
      } else {
        // For simulated keypairs, simulate an airdrop
        // Find the SOL token
        const updatedTokens = terminalState.tokens.map(token => {
          if (token.symbol === 'SOL') {
            return {
              ...token,
              balance: (token.balance || 0) + amount
            };
          }
          return token;
        });
        
        // Update the terminal state
        setTerminalState({
          ...terminalState,
          tokens: updatedTokens
        });
        
        // Generate a pseudo-random signature for the transaction
        const generateRandomSignature = () => {
          const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
          let result = '';
          for (let i = 0; i < 87; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          return result;
        };
        
        const signature = generateRandomSignature();
        
        return (
          <div className="space-y-1">
            <div className="text-green-400">✓ Airdrop successful (simulated)</div>
            <div>Signature: <span className="text-gray-300">{signature}</span></div>
            <div className="mt-1">
              <span className="text-gray-300">{amount} SOL</span> has been airdropped to <span className="text-yellow-300">{terminalState.keypair.publicKey}</span>
            </div>
            <div className="text-gray-400">Network: <span className="text-yellow-300">{terminalState.network}</span></div>
            
            <div className="text-gray-400 text-sm mt-1">
              <div className="text-yellow-300 font-semibold">⚠️ This is a simulated keypair and airdrop.</div>
              <div>For a real cryptographically secure keypair and airdrop, use <span className="text-yellow-300">solana-keygen real</span></div>
            </div>
          </div>
        );
      }
    }

    // Default for unknown commands
    return (
      <div className="text-red-400">
        Command not found: {cmd}. Type <span className="text-yellow-300">help</span> for available commands.
      </div>
    );
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const command = inputValue.trim();
    
    // Add command to history
    setCommandHistory(prev => [
      ...prev,
      {
        command,
        output: '', // Empty output while loading
      },
    ]);
    
    // Process the command
    const output = await processCommand(command);
    
    // Update the last command with the output
    setCommandHistory(prev => {
      const updated = [...prev];
      updated[updated.length - 1].output = output;
      return updated;
    });
    
    // Clear input
    setInputValue('');
  };

  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#0B1120] border border-[#2FFFD1] rounded-lg overflow-hidden flex flex-col h-full">
        {/* Terminal Header */}
        <div className="bg-[#071118] px-4 py-2 flex justify-between items-center border-b border-[#2FFFD1]">
          <div className="flex items-center space-x-2">
            <TerminalIcon size={16} className="text-purple-400" />
            <span className="font-medium text-sm">Nex4 Terminal</span>
            {!walletConnected && (
              <div className="ml-4 bg-orange-500/20 text-orange-400 text-xs px-2 py-0.5 rounded-full flex items-center">
                <AlertTriangle size={12} className="mr-1" />
                Limited Access Mode
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {/* Network Selector */}
            <div className="flex items-center">
              <span className="text-xs text-gray-400 mr-2">Network:</span>
              <select 
                value={terminalState.network}
                onChange={(e) => {
                  const newNetwork = e.target.value as 'mainnet-beta' | 'devnet' | 'testnet';
                  // Update terminal state
                  setTerminalState({
                    ...terminalState,
                    network: newNetwork
                  });
                  // Execute the CLI command equivalent for UI-based selection
                  const command = `solana config set --url ${newNetwork}`;
                  // Add to command history
                  setCommandHistory(prev => [
                    ...prev,
                    {
                      command,
                      output: `Config updated to ${newNetwork}`,
                    },
                  ]);
                }}
                className="bg-[#0B1120] text-gray-300 text-xs rounded px-2 py-1 border border-[#2FFFD1] focus:outline-none focus:ring-1 focus:ring-[#2FFFD1]"
              >
                <option value="mainnet-beta">mainnet</option>
                <option value="devnet">devnet</option>
                <option value="testnet">testnet</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => processCommand('clear')}
                title="Clear Terminal"
              >
                <RefreshCw size={14} />
              </button>
              <button 
                className="text-gray-400 hover:text-white transition-colors"
                onClick={() => navigator.clipboard.writeText(commandHistory.map(cmd => `$ ${cmd.command}\n${cmd.output}`).join('\n'))}
                title="Copy Terminal Output"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Terminal Output */}
        <div 
          ref={terminalRef}
          className="flex-grow bg-[#0B1120] p-4 overflow-y-auto font-mono text-sm"
          onClick={focusInput}
        >
          {commandHistory.map((entry, index) => (
            <div key={index} className="mb-3">
              {/* Command */}
              <div className="flex items-center text-green-400 mb-1">
                <ChevronRight size={16} className="mr-1" />
                <span>{entry.command}</span>
              </div>
              
              {/* Output */}
              <div className={`pl-6 ${entry.isError ? 'text-red-400' : 'text-gray-300'}`}>
                {entry.output}
              </div>
            </div>
          ))}
          
          {/* Current Input Line */}
          <div className="flex items-center text-green-400">
            <ChevronRight size={16} className="mr-1" />
            <form onSubmit={handleSubmit} className="flex-grow">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-transparent outline-none w-full text-green-400"
                autoFocus
                disabled={isLoading}
              />
            </form>
            {isLoading && (
              <div className="animate-spin ml-2">
                <RefreshCw size={14} className="text-purple-400" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
