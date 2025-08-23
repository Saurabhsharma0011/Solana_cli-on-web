import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Copy, ChevronRight, RefreshCw } from 'lucide-react';

// Define the types for our command history
interface CommandEntry {
  command: string;
  output: string | JSX.Element;
  isError?: boolean;
}

const Terminal = () => {
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandEntry[]>([
    {
      command: 'welcome',
      output: (
        <div className="text-green-400 mb-2">
          <div className="mb-1">Welcome to TESTING dev Terminal - Solana CLI in your browser</div>
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
        <div><span className="text-purple-400">clear</span> - Clear terminal</div>
        <div><span className="text-purple-400">help</span> - Show this help menu</div>
      </div>
    ),
    clear: () => {
      setCommandHistory([]);
      return '';
    },
    'solana balance': () => 'Balance: 1000.000000000 SOL',
    'solana validators': () => (
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
    ),
    'solana block-height': () => 'Current Block Height: 172,391,847',
    'solana epoch-info': () => (
      <div className="space-y-1">
        <div>Current Epoch: 347</div>
        <div>Slot: 149891349</div>
        <div>Slots in Epoch: 432000</div>
        <div>Epoch Progress: 94.7%</div>
      </div>
    ),
    'solana transaction-count': () => 'Transaction Count: 186,539,402,837',
    'solana slot': () => 'Current Slot: 149891349',
    'solana supply': () => (
      <div className="space-y-1">
        <div>Total Supply: 555,000,000 SOL</div>
        <div>Circulating Supply: 424,394,685 SOL</div>
        <div>Non-Circulating Supply: 130,605,315 SOL</div>
      </div>
    ),
    'solana -h': () => (
      <div className="space-y-1">
        <div className="text-yellow-300 font-semibold">Solana CLI Usage:</div>
        <div><span className="text-purple-400">solana balance [address]</span> - Get wallet balance</div>
        <div><span className="text-purple-400">solana validators</span> - Show validator info</div>
        <div><span className="text-purple-400">solana transaction-count</span> - Get current transaction count</div>
        <div><span className="text-purple-400">solana slot</span> - Get current slot</div>
        <div><span className="text-purple-400">solana block-height</span> - Get current block height</div>
        <div><span className="text-purple-400">solana epoch-info</span> - Get current epoch information</div>
        <div><span className="text-purple-400">solana supply</span> - Get current SOL supply</div>
      </div>
    ),
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
    const normalizedCmd = cmd.trim().toLowerCase();
    
    // Simulate network delay
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsLoading(false);

    if (normalizedCmd === '') {
      return '';
    }

    // Check if the command exists
    const commandHandler = Object.entries(availableCommands).find(
      ([key]) => normalizedCmd === key || normalizedCmd.startsWith(`${key} `)
    );

    if (commandHandler) {
      return commandHandler[1]();
    }

    // If command starts with solana but isn't recognized
    if (normalizedCmd.startsWith('solana')) {
      return (
        <div className="text-red-400">
          Error: Unknown solana command. Type <span className="text-yellow-300">solana -h</span> for available commands.
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
            <span className="font-medium text-sm">TESTING dev Terminal</span>
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
