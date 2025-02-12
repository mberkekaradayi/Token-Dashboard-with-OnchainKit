import { Alchemy, Network } from "alchemy-sdk";
import { ethers } from "ethers";

export interface TokenData {
  name: string;
  symbol: string;
  quantity: string;
}

export const fetchBaseToken = async (
  walletAddress: string
): Promise<TokenData[]> => {
  const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

  if (!apiKey) {
    console.error("Alchemy API key is not configured");
    return [];
  }

  const alchemy = new Alchemy({
    apiKey,
    network: Network.BASE_MAINNET,
  });

  try {
    const balances = await alchemy.core.getTokenBalances(walletAddress);

    const tokenDataPromises = balances.tokenBalances.map(async (token) => {
      const metadata = await alchemy.core.getTokenMetadata(
        token.contractAddress
      );

      // Convert balance from wei to decimal
      const quantity = ethers.formatUnits(
        token.tokenBalance || "0",
        metadata.decimals || 18
      );
      return {
        name: metadata.name || "Unknown Token",
        symbol: metadata.symbol || "UNKNOWN",
        quantity: parseFloat(quantity).toFixed(4),
      };
    });

    const tokenData = await Promise.all(tokenDataPromises);

    // Filter out tokens with 0 balance
    return tokenData.filter((token) => parseFloat(token.quantity) > 0);
  } catch (error) {
    console.error("Error fetching token balances:", error);
    return [];
  }
};
