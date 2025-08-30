import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ChevronRight, Code, Copy, Terminal, Play } from "lucide-react";
import ApiTester from "../components/docs/ApiTester";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function DocsPage() {
  return (
    <div className={`${geistSans.className} ${geistMono.className} font-sans`}>
      <Layout title="NEX4 Documentation - Interactive Solana Guides" description="Comprehensive Solana documentation with runnable code examples directly in your browser.">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Interactive Documentation</h1>
            <p className="text-gray-400">
              Comprehensive guides and examples for Solana development with runnable code snippets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-[#1E293B] border border-[#334155] rounded-lg p-4 sticky top-24">
                <h3 className="font-medium mb-4 text-lg">Documentation</h3>
                <nav className="space-y-1">
                  <a href="#getting-started" className="flex items-center text-purple-400 py-2 px-3 bg-purple-400/10 rounded-md">
                    <ChevronRight size={16} className="mr-2" />
                    Getting Started
                  </a>
                  <a href="#cli-commands" className="flex items-center text-gray-300 hover:text-purple-400 transition-colors py-2 px-3 hover:bg-[#0F172A] rounded-md">
                    <ChevronRight size={16} className="mr-2" />
                    CLI Commands
                  </a>
                  <a href="#api-routes" className="flex items-center text-gray-300 hover:text-purple-400 transition-colors py-2 px-3 hover:bg-[#0F172A] rounded-md">
                    <ChevronRight size={16} className="mr-2" />
                    API Routes
                  </a>
                  <a href="#web3js" className="flex items-center text-gray-300 hover:text-purple-400 transition-colors py-2 px-3 hover:bg-[#0F172A] rounded-md">
                    <ChevronRight size={16} className="mr-2" />
                    Web3.js Examples
                  </a>
                  <a href="#smart-contracts" className="flex items-center text-gray-300 hover:text-purple-400 transition-colors py-2 px-3 hover:bg-[#0F172A] rounded-md">
                    <ChevronRight size={16} className="mr-2" />
                    Smart Contracts
                  </a>
                  <a href="#advanced" className="flex items-center text-gray-300 hover:text-purple-400 transition-colors py-2 px-3 hover:bg-[#0F172A] rounded-md">
                    <ChevronRight size={16} className="mr-2" />
                    Advanced Topics
                  </a>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div id="getting-started" className="bg-[#1E293B] border border-[#334155] rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Getting Started with Solana</h2>
                <p className="text-gray-300 mb-6">
                  Solana is a high-performance blockchain platform designed for decentralized applications and marketplaces.
                  This guide will walk you through the basics of Solana development using the NEX4 platform.
                </p>
                
                <h3 className="text-xl font-medium mb-4">Your First Solana Connection</h3>
                <p className="text-gray-300 mb-4">
                  Let&apos;s start by connecting to the Solana network and checking the current SOL balance of an address.
                </p>
                
                <div className="mb-6">
                  <Tabs defaultValue="js">
                    <div className="flex items-center justify-between mb-2">
                      <TabsList className="bg-[#0F172A] p-1 rounded-md">
                        <TabsTrigger value="js" className="px-3 py-1 rounded data-[state=active]:bg-purple-600 data-[state=active]:text-white">JavaScript</TabsTrigger>
                        <TabsTrigger value="cli" className="px-3 py-1 rounded data-[state=active]:bg-purple-600 data-[state=active]:text-white">CLI</TabsTrigger>
                      </TabsList>
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-white transition-colors">
                          <Copy size={14} />
                        </button>
                        <button className="bg-purple-600 hover:bg-purple-700 transition-colors p-1 rounded">
                          <Play size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <TabsContent value="js" className="bg-[#0B1120] p-4 rounded-md font-mono text-sm">
                      <pre className="text-gray-300">
{`import { Connection, PublicKey } from '@solana/web3.js';

// Connect to the Solana devnet
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

// Define the wallet address to check
const address = new PublicKey('8YLKoCu8rFzBGkzgCbpSTk3DHmpwMwoeZ1qrisXQDmw');

async function checkBalance() {
  const balance = await connection.getBalance(address);
  console.log(\`The balance of \${address} is \${balance / 1000000000} SOL\`);
}

checkBalance();`}
                      </pre>
                    </TabsContent>
                    
                    <TabsContent value="cli" className="bg-[#0B1120] p-4 rounded-md font-mono text-sm">
                      <pre className="text-gray-300">
{`# Check balance using Solana CLI
solana balance 8YLKoCu8rFzBGkzgCbpSTk3DHmpwMwoeZ1qrisXQDmw --url https://api.devnet.solana.com

# Check current slot
solana slot --url https://api.devnet.solana.com`}
                      </pre>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="border border-[#334155] rounded-md p-4 bg-[#0F172A]">
                  <div className="flex items-center mb-2">
                    <Terminal size={16} className="text-purple-400 mr-2" />
                    <span className="font-medium">Terminal Output</span>
                  </div>
                  <div className="font-mono text-sm text-gray-300">
                    The balance of 8YLKoCu8rFzBGkzgCbpSTk3DHmpwMwoeZ1qrisXQDmw is 1.5 SOL
                  </div>
                </div>
              </div>
              
              <div id="cli-commands" className="bg-[#1E293B] border border-[#334155] rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Common CLI Commands</h2>
                <p className="text-gray-300 mb-6">
                  The Solana CLI provides powerful tools for interacting with the Solana blockchain.
                  Here are some common commands you can use in the NEX4 Terminal.
                </p>
                
                <div className="space-y-4">
                  <div className="border border-[#334155] rounded-md p-4">
                    <div className="flex items-center mb-2">
                      <Code size={16} className="text-purple-400 mr-2" />
                      <span className="font-medium">solana balance [address]</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Check the SOL balance of a wallet address. If no address is provided, it shows the balance of the connected wallet.
                    </p>
                  </div>
                  
                  <div className="border border-[#334155] rounded-md p-4">
                    <div className="flex items-center mb-2">
                      <Code size={16} className="text-purple-400 mr-2" />
                      <span className="font-medium">solana validators</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Display information about the current validators in the Solana network, including their voting power and commission.
                    </p>
                  </div>
                  
                  <div className="border border-[#334155] rounded-md p-4">
                    <div className="flex items-center mb-2">
                      <Code size={16} className="text-purple-400 mr-2" />
                      <span className="font-medium">solana epoch-info</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Get information about the current epoch, including progress and slot range.
                    </p>
                  </div>
                  
                  <div className="border border-[#334155] rounded-md p-4">
                    <div className="flex items-center mb-2">
                      <Code size={16} className="text-purple-400 mr-2" />
                      <span className="font-medium">solana slot</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Get the current slot number, which represents the current state of the blockchain.
                    </p>
                  </div>
                </div>
              </div>
              
              <div id="api-routes" className="bg-[#1E293B] border border-[#334155] rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">API Routes</h2>
                <p className="text-gray-300 mb-6">
                  Test our API routes using GET and POST methods. This interactive tool lets you send requests and view responses in real-time.
                </p>
                
                <h3 className="text-xl font-medium mb-4">Available API Endpoints</h3>
                <div className="space-y-4 mb-8">
                  <div className="border border-[#334155] rounded-md p-4">
                    <div className="flex items-center mb-2">
                      <Code size={16} className="text-purple-400 mr-2" />
                      <span className="font-medium">/api/hello</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      A simple API that returns a greeting message. Supports both GET and POST methods.
                    </p>
                  </div>
                  
                  <div className="border border-[#334155] rounded-md p-4">
                    <div className="flex items-center mb-2">
                      <Code size={16} className="text-purple-400 mr-2" />
                      <span className="font-medium">/api/user</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      User API endpoint. GET returns a sample user. POST creates a new user (requires &quot;name&quot; field).
                    </p>
                  </div>
                </div>
                
                <ApiTester />
              </div>
              
              <div className="text-center">
                <Link href="/terminal" className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg text-base font-medium transition-colors">
                  <Terminal size={16} className="mr-2" />
                  Try Commands in Terminal
                </Link>
              </div>
              
              <div id="smart-contracts" className="bg-[#1E293B] border border-[#334155] rounded-lg p-6 mb-8 mt-8">
                <h2 className="text-2xl font-semibold mb-4">Solana Smart Contracts</h2>
                <p className="text-gray-300 mb-6">
                  Build, test, and deploy Solana smart contracts directly from your browser. Our integrated development environment 
                  allows you to write Rust-based Solana programs and deploy them to the Solana blockchain.
                </p>
                
                <h3 className="text-xl font-medium mb-4">Your First Smart Contract</h3>
                <p className="text-gray-300 mb-4">
                  Let&apos;s create a simple counter program that can be incremented or decremented through transactions.
                </p>
                
                <div className="mb-6">
                  <Tabs defaultValue="rust">
                    <div className="flex items-center justify-between mb-2">
                      <TabsList className="bg-[#0F172A] p-1 rounded-md">
                        <TabsTrigger value="rust" className="px-3 py-1 rounded data-[state=active]:bg-purple-600 data-[state=active]:text-white">Rust</TabsTrigger>
                        <TabsTrigger value="client" className="px-3 py-1 rounded data-[state=active]:bg-purple-600 data-[state=active]:text-white">Client</TabsTrigger>
                      </TabsList>
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-400 hover:text-white transition-colors">
                          <Copy size={14} />
                        </button>
                        <Link href="/contracts">
                          <button className="bg-purple-600 hover:bg-purple-700 transition-colors p-1 rounded">
                            <Play size={14} />
                          </button>
                        </Link>
                      </div>
                    </div>
                    
                    <TabsContent value="rust" className="bg-[#0B1120] p-4 rounded-md font-mono text-sm">
                      <pre className="text-gray-300">
{`// counter.rs - A simple Solana program

use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
    program_error::ProgramError,
};

// Declare program entrypoint
entrypoint!(process_instruction);

// Program entrypoint implementation
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Counter program entrypoint");
    
    // Get account iterator
    let accounts_iter = &mut accounts.iter();
    
    // Get the account to update
    let account = next_account_info(accounts_iter)?;
    
    // Verify account ownership
    if account.owner != program_id {
        msg!("Account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }
    
    // Get instruction type from the first byte
    let instruction_type = instruction_data.get(0).ok_or(ProgramError::InvalidInstructionData)?;
    
    // Handle instructions
    match instruction_type {
        // Increment
        0 => {
            msg!("Incrementing counter");
            let mut data = account.try_borrow_mut_data()?;
            let counter = if data.len() >= 4 {
                let bytes = [data[0], data[1], data[2], data[3]];
                u32::from_le_bytes(bytes)
            } else {
                0
            };
            let new_counter = counter.checked_add(1).ok_or(ProgramError::InvalidInstructionData)?;
            data[0..4].copy_from_slice(&new_counter.to_le_bytes());
        },
        // Decrement
        1 => {
            msg!("Decrementing counter");
            let mut data = account.try_borrow_mut_data()?;
            let counter = if data.len() >= 4 {
                let bytes = [data[0], data[1], data[2], data[3]];
                u32::from_le_bytes(bytes)
            } else {
                0
            };
            let new_counter = counter.checked_sub(1).ok_or(ProgramError::InvalidInstructionData)?;
            data[0..4].copy_from_slice(&new_counter.to_le_bytes());
        },
        _ => {
            msg!("Invalid instruction");
            return Err(ProgramError::InvalidInstructionData);
        }
    }
    
    Ok(())
}`}
                      </pre>
                    </TabsContent>
                    
                    <TabsContent value="client" className="bg-[#0B1120] p-4 rounded-md font-mono text-sm">
                      <pre className="text-gray-300">
{`// JavaScript client to interact with the counter program
import { 
  Connection, 
  PublicKey,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
  Keypair
} from '@solana/web3.js';

// Connect to the Solana devnet
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

// Program ID (replace with your deployed program ID)
const programId = new PublicKey('CounterProgramID111111111111111111111111111');

// Counter account (replace with your counter account public key)
const counterAccount = new PublicKey('CounterAccount1111111111111111111111111111');

// Wallet for sending transactions
const wallet = Keypair.generate(); // In a real app, this would be your wallet

// Function to increment the counter
async function incrementCounter() {
  const instruction = new TransactionInstruction({
    keys: [
      { pubkey: counterAccount, isSigner: false, isWritable: true }
    ],
    programId,
    data: Buffer.from([0]) // Instruction to increment (0)
  });

  const transaction = new Transaction().add(instruction);
  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [wallet]
  );
  
  console.log('Increment transaction signature:', signature);
  return signature;
}

// Function to decrement the counter
async function decrementCounter() {
  const instruction = new TransactionInstruction({
    keys: [
      { pubkey: counterAccount, isSigner: false, isWritable: true }
    ],
    programId,
    data: Buffer.from([1]) // Instruction to decrement (1)
  });

  const transaction = new Transaction().add(instruction);
  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [wallet]
  );
  
  console.log('Decrement transaction signature:', signature);
  return signature;
}

// Function to read the current counter value
async function getCounterValue() {
  const accountInfo = await connection.getAccountInfo(counterAccount);
  if (!accountInfo || !accountInfo.data) {
    return 0;
  }
  
  const counterValue = new DataView(accountInfo.data.buffer).getUint32(0, true);
  console.log('Current counter value:', counterValue);
  return counterValue;
}`}
                      </pre>
                    </TabsContent>
                  </Tabs>
                </div>
                
                <div className="bg-purple-600/10 border border-purple-600/30 rounded-md p-4 mb-6">
                  <h4 className="font-medium text-purple-400 mb-2">Try It Yourself</h4>
                  <p className="text-sm text-gray-300">
                    Head to our <Link href="/contracts" className="text-purple-400 hover:underline">Smart Contract IDE</Link> to write, 
                    compile, and deploy your own Solana programs directly from your browser. 
                    You can also test your contracts with our integrated tools.
                  </p>
                </div>
                
                <h3 className="text-xl font-medium mb-4">Smart Contract Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border border-[#334155] rounded-md p-4 bg-[#0F172A] hover:border-purple-400/50 transition-colors">
                    <h4 className="font-medium mb-2">Token Program</h4>
                    <p className="text-sm text-gray-300 mb-3">
                      Create your own SPL token with customizable features like mint authority, decimals, and more.
                    </p>
                    <Link href="/contracts?template=token" className="text-purple-400 hover:underline text-sm">
                      Use Template →
                    </Link>
                  </div>
                  
                  <div className="border border-[#334155] rounded-md p-4 bg-[#0F172A] hover:border-purple-400/50 transition-colors">
                    <h4 className="font-medium mb-2">NFT Minting</h4>
                    <p className="text-sm text-gray-300 mb-3">
                      A program for creating and minting NFTs on Solana with Metaplex integration.
                    </p>
                    <Link href="/contracts?template=nft" className="text-purple-400 hover:underline text-sm">
                      Use Template →
                    </Link>
                  </div>
                  
                  <div className="border border-[#334155] rounded-md p-4 bg-[#0F172A] hover:border-purple-400/50 transition-colors">
                    <h4 className="font-medium mb-2">Staking Program</h4>
                    <p className="text-sm text-gray-300 mb-3">
                      Create a staking program with rewards distribution and locking periods.
                    </p>
                    <Link href="/contracts?template=staking" className="text-purple-400 hover:underline text-sm">
                      Use Template →
                    </Link>
                  </div>
                  
                  <div className="border border-[#334155] rounded-md p-4 bg-[#0F172A] hover:border-purple-400/50 transition-colors">
                    <h4 className="font-medium mb-2">Escrow Service</h4>
                    <p className="text-sm text-gray-300 mb-3">
                      Build a secure escrow service for trustless transactions between parties.
                    </p>
                    <Link href="/contracts?template=escrow" className="text-purple-400 hover:underline text-sm">
                      Use Template →
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="mt-16 p-4 border border-yellow-500/30 bg-yellow-500/10 rounded-lg">
                <p className="text-center text-yellow-400">
                  <strong>Note:</strong> Currently the platform is on devnet but after all tests the website will go live to mainnet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
