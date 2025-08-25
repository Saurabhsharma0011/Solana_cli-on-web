import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Copy, ChevronRight, RefreshCw } from 'lucide-react';

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
}

const Terminal = () => {
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandEntry[]>([
    {
      command: 'welcome',
      output: (
        <div className="text-green-400 mb-2">
          <div className="mb-1">Welcome to Nex4 Terminal - Solana CLI in your browser</div>
          <div className="text-gray-400 text-sm">
            Type <span className="text-yellow-300">help</span> to see available commands
          </div>
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
    network: 'mainnet-beta'
  });

  // Available CLI commands
  const availableCommands = {
    help: () => (
      <div className="space-y-1">
        <div className="text-yellow-300 font-semibold">Available Commands:</div>
        <div><span className="text-purple-400">solana balance</span> - Check SOL balance</div>
        <div><span className="text-purple-400">solana validators</span> - List active validators</div>
        <div><span className="text-purple-400">solana block-height</span> - Get current block height</div>
        <div><span className="text-purple-400">solana epoch-info</span> - Get current epoch information</div>
        <div><span className="text-purple-400">solana transaction-count</span> - Get current transaction count</div>
        <div><span className="text-purple-400">solana slot</span> - Get current slot</div>
        <div><span className="text-purple-400">solana supply</span> - Get current SOL supply</div>
        <div><span className="text-purple-400">solana -h</span> - Show solana command help</div>
        <div><span className="text-purple-400">solana --version</span> - Show Solana CLI version</div>
        <div><span className="text-purple-400">solana config set</span> - Set Solana configuration</div>
        <div><span className="text-purple-400">solana config get</span> - Get Solana configuration</div>
        <div><span className="text-purple-400">solana-keygen new</span> - Generate new keypair</div>
        <div><span className="text-purple-400">solana-keygen pubkey</span> - Show public key</div>
        <div><span className="text-purple-400">sh -c curl -sSfL https://release.solana.com/stable/install</span> - Install Solana CLI</div>
        <div><span className="text-purple-400">apt-get install solana-cli</span> - Install Solana CLI on Debian/Ubuntu</div>
        <div><span className="text-purple-400">clear</span> - Clear terminal</div>
        <div><span className="text-purple-400">help</span> - Show this help menu</div>
      </div>
    ),
    clear: () => {
      setCommandHistory([]);
      return '';
    },
    'solana balance': () => {
      if (!terminalState.solanaCliInstalled) {
        return (
          <div className="text-red-400">
            Error: Solana CLI not found. Install it first with <span className="text-yellow-300">sh -c &quot;curl -sSfL https://release.solana.com/stable/install | sh&quot;</span>
          </div>
        );
      }
      
      if (!terminalState.keypair) {
        return 'No keypair found. Generate one first with solana-keygen new';
      }
      return `Balance: 1000.000000000 SOL for address ${terminalState.keypair.publicKey}`;
    },
    'solana validators': () => {
      if (!terminalState.solanaCliInstalled) {
        return (
          <div className="text-red-400">
            Error: Solana CLI not found. Install it first with <span className="text-yellow-300">sh -c &quot;curl -sSfL https://release.solana.com/stable/install | sh&quot;</span>
          </div>
        );
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
        return (
          <div className="text-red-400">
            Error: Solana CLI not found. Install it first with <span className="text-yellow-300">sh -c &quot;curl -sSfL https://release.solana.com/stable/install | sh&quot;</span>
          </div>
        );
      }
      
      return 'Current Block Height: 172,391,847';
    },
    'solana epoch-info': () => {
      if (!terminalState.solanaCliInstalled) {
        return (
          <div className="text-red-400">
            Error: Solana CLI not found. Install it first with <span className="text-yellow-300">sh -c &quot;curl -sSfL https://release.solana.com/stable/install | sh&quot;</span>
          </div>
        );
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
        return (
          <div className="text-red-400">
            Error: Solana CLI not found. Install it first with <span className="text-yellow-300">sh -c &quot;curl -sSfL https://release.solana.com/stable/install | sh&quot;</span>
          </div>
        );
      }
      
      return 'Transaction Count: 186,539,402,837';
    },
    'solana slot': () => {
      if (!terminalState.solanaCliInstalled) {
        return (
          <div className="text-red-400">
            Error: Solana CLI not found. Install it first with <span className="text-yellow-300">sh -c &quot;curl -sSfL https://release.solana.com/stable/install | sh&quot;</span>
          </div>
        );
      }
      
      return 'Current Slot: 149891349';
    },
    'solana supply': () => {
      if (!terminalState.solanaCliInstalled) {
        return (
          <div className="text-red-400">
            Error: Solana CLI not found. Install it first with <span className="text-yellow-300">sh -c &quot;curl -sSfL https://release.solana.com/stable/install | sh&quot;</span>
          </div>
        );
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
        return (
          <div className="text-red-400">
            Error: Solana CLI not found. Install it first with <span className="text-yellow-300">sh -c &quot;curl -sSfL https://release.solana.com/stable/install | sh&quot;</span>
          </div>
        );
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
        </div>
      );
    },
    'solana --version': () => {
      if (!terminalState.solanaCliInstalled) {
        return (
          <div className="text-red-400">
            Error: Solana CLI not found. Install it first with <span className="text-yellow-300">sh -c &quot;curl -sSfL https://release.solana.com/stable/install | sh&quot;</span>
          </div>
        );
      }
      return 'solana-cli 1.17.5 (src:devbuild; feat:3488713168)';
    },
    
    'solana config get': () => {
      if (!terminalState.solanaCliInstalled) {
        return (
          <div className="text-red-400">
            Error: Solana CLI not found. Install it first with <span className="text-yellow-300">sh -c &quot;curl -sSfL https://release.solana.com/stable/install | sh&quot;</span>
          </div>
        );
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
        return (
          <div className="text-red-400">
            Error: Solana CLI not found. Install it first with <span className="text-yellow-300">sh -c &quot;curl -sSfL https://release.solana.com/stable/install | sh&quot;</span>
          </div>
        );
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
        return (
          <div className="text-red-400">
            Error: Solana CLI not found. Install it first with <span className="text-yellow-300">sh -c &quot;curl -sSfL https://release.solana.com/stable/install | sh&quot;</span>
          </div>
        );
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
          <div className="text-yellow-300">Generating a new keypair</div>
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
        </div>
      );
    },
    
    'solana-keygen pubkey': () => {
      if (!terminalState.solanaCliInstalled) {
        return (
          <div className="text-red-400">
            Error: Solana CLI not found. Install it first with <span className="text-yellow-300">sh -c &quot;curl -sSfL https://release.solana.com/stable/install | sh&quot;</span>
          </div>
        );
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
          <div className="text-gray-400">==&gt; Downloading https://github.com/solana-labs/solana/releases/download/v1.17.5/solana-release-x86_64-apple-darwin.tar.bz2</div>
          <div className="text-gray-400">==&gt; Downloading from https://github-releases.githubusercontent.com/solana-release-x86_64-apple-darwin.tar.bz2</div>
          <div className="text-gray-400">######################################################################## 100.0%</div>
          <div className="text-gray-400">==&gt; Installing solana</div>
          <div className="text-gray-400">==&gt; Caveats</div>
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

    // If command starts with solana but isn't recognized
    if (cmdLower.startsWith('solana')) {
      if (!terminalState.solanaCliInstalled) {
        return (
          <div className="text-red-400">
            Error: Solana CLI not found. Install it first with <span className="text-yellow-300">sh -c &quot;curl -sSfL https://release.solana.com/stable/install | sh&quot;</span>
          </div>
        );
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
        return (
          <div className="text-red-400">
            Error: Solana CLI not found. Install it first with <span className="text-yellow-300">sh -c &quot;curl -sSfL https://release.solana.com/stable/install | sh&quot;</span>
          </div>
        );
      }
      
      return (
        <div className="text-red-400">
          Error: Unknown solana-keygen command. Available commands: new, pubkey.
        </div>
      );
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
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-lg overflow-hidden flex flex-col h-full">
        {/* Terminal Header */}
        <div className="bg-[#1E293B] px-4 py-2 flex justify-between items-center border-b border-[#334155]">
          <div className="flex items-center space-x-2">
            <TerminalIcon size={16} className="text-purple-400" />
            <span className="font-medium text-sm">Nex4 Terminal</span>
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
        
        {/* Terminal Output */}
        <div 
          ref={terminalRef}
          className="flex-grow bg-[#0F172A] p-4 overflow-y-auto font-mono text-sm"
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
