import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import type { NextApiRequest, NextApiResponse } from 'next';

// Define response data type
type ResponseData = {
  success: boolean;
  signature?: string;
  amount?: number;
  balance?: number;
  network?: string;
  message?: string;
} | {
  error: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { address, amount = 1, network = 'devnet' } = req.body;

    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    // Validate network (airdrop only works on devnet and testnet)
    if (network !== 'devnet' && network !== 'testnet') {
      return res.status(400).json({ 
        error: 'Airdrops are only available on devnet or testnet' 
      });
    }

    // Validate amount (maximum 2 SOL per request)
    const solAmount = parseFloat(amount.toString());
    if (isNaN(solAmount) || solAmount <= 0) {
      return res.status(400).json({ error: 'Amount must be a positive number' });
    }

    const airdropAmount = Math.min(solAmount, 2) * LAMPORTS_PER_SOL;

    // Set up the network connection
    const endpoint = network === 'devnet' 
      ? 'https://api.devnet.solana.com' 
      : 'https://api.testnet.solana.com';

    // Create a connection to the Solana network
    const connection = new Connection(endpoint, 'confirmed');

    // Parse the public key from the address
    const publicKey = new PublicKey(address);

    // Request the airdrop
    const signature = await connection.requestAirdrop(publicKey, airdropAmount);
    
    // Wait for confirmation
    await connection.confirmTransaction(signature);

    // Get updated balance
    const balance = await connection.getBalance(publicKey);
    const solBalance = balance / LAMPORTS_PER_SOL;

    // Return success response
    return res.status(200).json({
      success: true,
      signature,
      amount: airdropAmount / LAMPORTS_PER_SOL,
      balance: solBalance,
      network,
      message: `Successfully airdropped ${airdropAmount / LAMPORTS_PER_SOL} SOL to ${address}`
    });
  } catch (error: unknown) {
    console.error('Error performing airdrop:', error);
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Failed to perform airdrop' 
    });
  }
}
