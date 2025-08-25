// Helius API Service for Solana balance and transactions
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

// Get environment variables
const HELIUS_API_KEY = process.env.NEXT_PUBLIC_HELIUS_API_KEY || '3ee67958-27d3-4195-9266-904e42e8ecdd';
const HELIUS_RPC_URL = process.env.NEXT_PUBLIC_HELIUS_RPC_URL || `https://rpc.helius.xyz/?api-key=${HELIUS_API_KEY}`;
const HELIUS_API_URL = process.env.NEXT_PUBLIC_HELIUS_API_URL || 'https://api.helius.xyz/v0';

// Function to get a connection based on the network
export const getConnection = (network: 'mainnet' | 'devnet'): Connection => {
  const endpoint = network === 'mainnet' 
    ? HELIUS_RPC_URL 
    : 'https://api.devnet.solana.com';
  
  return new Connection(endpoint);
};

// Get wallet balance from Helius RPC
export const getWalletBalance = async (
  address: string, 
  network: 'mainnet' | 'devnet'
): Promise<number> => {
  try {
    const connection = getConnection(network);
    const publicKey = new PublicKey(address);
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL; // Convert lamports to SOL
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    return 0;
  }
};

// Interface for transaction data
export interface TransactionData {
  signature: string;
  blockTime: number;
  slot: number;
  fee: number;
  status: 'success' | 'failed';
  type: string;
}

// Interface for enhanced transaction data
export interface EnhancedTransactionData extends TransactionData {
  amount?: number;
  fromAddress?: string;
  toAddress?: string;
  tokenInfo?: {
    symbol: string;
    name: string;
    decimals: number;
  };
}

// Get enhanced transaction data using Helius API directly
export const getEnhancedTransactions = async (
  address: string,
  network: 'mainnet' | 'devnet',
  limit: number = 10
): Promise<EnhancedTransactionData[]> => {
  if (network === 'devnet') {
    // Fall back to regular transaction fetching for devnet
    return getWalletTransactions(address, network, limit);
  }

  try {
    const url = `${HELIUS_API_URL}/addresses/${address}/transactions?api-key=${HELIUS_API_KEY}&limit=${limit}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Helius API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Transform Helius API response to our interface
    return data.map((tx: any) => {
      let amount = 0;
      let fromAddress = '';
      let toAddress = '';
      let tokenInfo = undefined;
      
      // Extract more details based on transaction type
      if (tx.type === 'TRANSFER' || tx.type === 'TOKEN_TRANSFER') {
        amount = tx.amount || 0;
        fromAddress = tx.sourceAddress || '';
        toAddress = tx.destinationAddress || '';
        
        if (tx.tokenTransfers && tx.tokenTransfers.length > 0) {
          tokenInfo = {
            symbol: tx.tokenTransfers[0].symbol || '',
            name: tx.tokenTransfers[0].name || '',
            decimals: tx.tokenTransfers[0].decimals || 0
          };
        }
      }
      
      return {
        signature: tx.signature,
        blockTime: tx.timestamp || 0,
        slot: tx.slot || 0,
        fee: tx.fee ? tx.fee / LAMPORTS_PER_SOL : 0,
        status: tx.err ? 'failed' as const : 'success' as const,
        type: tx.type || 'unknown',
        amount,
        fromAddress,
        toAddress,
        tokenInfo,
      };
    });
  } catch (error) {
    console.error('Error fetching enhanced wallet transactions:', error);
    // Fall back to regular transaction fetching
    return getWalletTransactions(address, network, limit);
  }
};

// Get recent transactions for a wallet from Helius
export const getWalletTransactions = async (
  address: string,
  network: 'mainnet' | 'devnet',
  limit: number = 10
): Promise<TransactionData[]> => {
  try {
    const connection = getConnection(network);
    const publicKey = new PublicKey(address);
    
    // Get signatures of recent transactions
    const signatures = await connection.getSignaturesForAddress(
      publicKey,
      { limit }
    );
    
    // Get transaction details
    const transactions = await Promise.all(
      signatures.map(async (sig) => {
        const tx = await connection.getTransaction(sig.signature);
        return {
          signature: sig.signature,
          blockTime: sig.blockTime || 0,
          slot: sig.slot,
          fee: tx?.meta?.fee ? tx.meta.fee / LAMPORTS_PER_SOL : 0,
          status: sig.err ? 'failed' as const : 'success' as const,
          type: determineTransactionType(tx),
        };
      })
    );
    
    return transactions;
  } catch (error) {
    console.error('Error fetching wallet transactions:', error);
    return [];
  }
};

// Helper function to determine transaction type
const determineTransactionType = (transaction: any): string => {
  // This is a simplified version. In a production app, you would
  // have more detailed logic to determine transaction types
  if (!transaction) return 'unknown';
  
  const programIds = transaction.transaction.message.programIds?.map(
    (id: any) => id.toString()
  );
  
  if (programIds?.includes('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')) {
    return 'token';
  } else if (programIds?.includes('11111111111111111111111111111111')) {
    return 'system';
  } else {
    return 'other';
  }
};
