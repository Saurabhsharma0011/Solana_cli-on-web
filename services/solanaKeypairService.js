const { Keypair } = require('@solana/web3.js');

function generateSolanaKeypair() {
  try {
    const keypair = Keypair.generate();
    
    return {
      publicKey: keypair.publicKey.toString(),
      secretKey: Buffer.from(keypair.secretKey).toString('base64')
    };
  } catch (error) {
    console.error('Error generating Solana keypair:', error);
    throw error;
  }
}

module.exports = {
  generateSolanaKeypair
};
