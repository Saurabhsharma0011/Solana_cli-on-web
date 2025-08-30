use solana_sdk::signature::{Keypair, Signer};
use solana_sdk::pubkey::Pubkey;
use base64::{encode, decode};
use rand::rngs::OsRng;
use std::error::Error;
use std::convert::TryFrom;

// Generate a new random Solana keypair
pub fn generate_keypair() -> Keypair {
    Keypair::generate(&mut OsRng)
}

// Generate keypair as a JSON string
pub fn generate_keypair_json() -> String {
    let keypair = generate_keypair();
    let secret_key_bytes = keypair.to_bytes();
    let pubkey_string = keypair.pubkey().to_string();
    let secret_key_base64 = encode(&secret_key_bytes);
    
    format!(r#"{{
  "pubkey": "{}",
  "secretKey": "{}"
}}"#, pubkey_string, secret_key_base64)
}

// Generate a keypair from a base58 seed phrase
pub fn keypair_from_base58(base58_string: &str) -> Result<Keypair, Box<dyn Error>> {
    let bytes = bs58::decode(base58_string).into_vec()?;
    let keypair = Keypair::from_bytes(&bytes)?;
    Ok(keypair)
}

// Generate a keypair from a base64 string
pub fn keypair_from_base64(base64_string: &str) -> Result<Keypair, Box<dyn Error>> {
    let bytes = decode(base64_string)?;
    let keypair = Keypair::from_bytes(&bytes)?;
    Ok(keypair)
}

// Recover public key from private key
pub fn pubkey_from_bytes(bytes: &[u8]) -> Result<Pubkey, Box<dyn Error>> {
    if bytes.len() != 64 && bytes.len() != 32 {
        return Err("Invalid key length".into());
    }
    
    if bytes.len() == 64 {
        // This is a full keypair, extract just the public key
        let keypair = Keypair::from_bytes(bytes)?;
        Ok(keypair.pubkey())
    } else {
        // This is just a public key
        Ok(Pubkey::try_from(bytes)?)
    }
}

// Get the associated token account address for a given wallet and token mint
pub fn get_associated_token_address(wallet_address: &str, token_mint: &str) -> Result<String, Box<dyn Error>> {
    let wallet_pubkey = Pubkey::try_from(bs58::decode(wallet_address).into_vec()?.as_slice())?;
    let token_mint_pubkey = Pubkey::try_from(bs58::decode(token_mint).into_vec()?.as_slice())?;
    
    let (associated_token_address, _) = spl_associated_token_account::get_associated_token_address_with_program_id(
        &wallet_pubkey,
        &token_mint_pubkey,
        &spl_token::id(),
    );
    
    Ok(associated_token_address.to_string())
}
