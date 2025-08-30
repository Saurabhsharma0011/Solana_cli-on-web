import { Keypair, Connection, PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import type { NextApiRequest, NextApiResponse } from 'next';

// Define response data type
type ResponseData = {
  publicKey: string;
  secretKey: string;
  keypairBase58: string;
  privateKeyArray: number[];
  mnemonic: string | null;
  network: string;
  balance?: number;
} | {
  error: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get network from request
    const { network } = req.body;
    const validNetwork = network === 'mainnet-beta' || network === 'devnet' || network === 'testnet' 
      ? network 
      : 'devnet'; // Default to devnet if invalid

    // Generate a new Solana keypair
    const keypair = Keypair.generate();
    
    // Get the keypair details
    const publicKey = keypair.publicKey.toString();
    const secretKey = bs58.encode(keypair.secretKey);
    const privateKeyArray = Array.from(keypair.secretKey);
    
    // Connect to the appropriate Solana network
    let balance = 0;
    try {
      const connection = new Connection(
        validNetwork === 'mainnet-beta'
          ? 'https://api.mainnet-beta.solana.com'
          : validNetwork === 'devnet'
          ? 'https://api.devnet.solana.com'
          : 'https://api.testnet.solana.com',
        'confirmed'
      );
      
      // Get the current balance
      balance = await connection.getBalance(new PublicKey(publicKey)) / 1_000_000_000; // Convert lamports to SOL
    } catch (balanceError) {
      console.error('Error fetching balance:', balanceError);
      // Continue without balance info if there's an error
    }

    // Return the keypair with network info
    return res.status(200).json({
      publicKey,
      secretKey,
      keypairBase58: secretKey,
      privateKeyArray,
      mnemonic: null, // We're not generating a mnemonic here
      network: validNetwork,
      balance
    });
  } catch (error) {
    console.error('Error generating Solana keypair:', error);
    return res.status(500).json({ error: 'Failed to generate keypair' });
  }
}
