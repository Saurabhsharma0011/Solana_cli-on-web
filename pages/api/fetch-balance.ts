import { Connection, PublicKey } from '@solana/web3.js';
import type { NextApiRequest, NextApiResponse } from 'next';

// Define response data type
type ResponseData = {
  balance: number;
  network: string;
} | {
  error: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { address, network = 'mainnet-beta' } = req.body;

    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    // Set up the network connection
    let endpoint: string;
    switch (network) {
      case 'devnet':
        endpoint = 'https://api.devnet.solana.com';
        break;
      case 'testnet':
        endpoint = 'https://api.testnet.solana.com';
        break;
      case 'mainnet-beta':
      default:
        endpoint = 'https://api.mainnet-beta.solana.com';
        break;
    }

    // Create a connection to the Solana network
    const connection = new Connection(endpoint, 'confirmed');

    // Parse the public key from the address
    const publicKey = new PublicKey(address);

    // Fetch the balance
    const balance = await connection.getBalance(publicKey);

    // Convert lamports to SOL (1 SOL = 1,000,000,000 lamports)
    const solBalance = balance / 1_000_000_000;

    // Return the balance
    return res.status(200).json({
      balance: solBalance,
      network
    });
  } catch (error) {
    console.error('Error fetching balance:', error);
    return res.status(500).json({ error: 'Failed to fetch balance' });
  }
}
