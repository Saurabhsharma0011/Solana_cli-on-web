// CoinGecko API service for Solana price data
const COINGECKO_API_BASE = process.env.NEXT_PUBLIC_COINGECKO_API_URL || 'https://api.coingecko.com/api/v3';
const SOLANA_ID = 'solana';

export interface SolanaPrice {
  currentPrice: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  lastUpdated: string;
}

export const getSolanaPrice = async (): Promise<SolanaPrice> => {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/${SOLANA_ID}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
    );
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      currentPrice: data.market_data.current_price.usd,
      priceChange24h: data.market_data.price_change_24h_in_currency.usd,
      priceChangePercentage24h: data.market_data.price_change_percentage_24h,
      lastUpdated: data.market_data.last_updated,
    };
  } catch (error) {
    console.error('Error fetching Solana price:', error);
    return {
      currentPrice: 0,
      priceChange24h: 0,
      priceChangePercentage24h: 0,
      lastUpdated: new Date().toISOString(),
    };
  }
};
