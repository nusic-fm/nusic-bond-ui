import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

// Data feeds on polygon
export const dataFeedsForUsd: { [key: string]: string } = {
  // Polygon mainnet
  // ETH: "0x4dD6655Ad5ed7C06c882f496E3f42acE5766cb89",
  // UST: "0x9b2cC933A82C36f8907AF960734C642f491f7ded",
  // BTC: "0x9b489F7Fffa89EA450E3121603e79d9093a9396E",
  // DAI: "0x62439095489Eb5dE4572de632248682c09a05Ad4",
  ETH: "0x8FAcAE210C796Bcac7afE147b622FFc1064629f6",
  // BTC: "0xcfC478F46c12a72dc2c249df3d74E520e0893a4C",
  // DAI: "0xD4dE4aA254c1bD4C969F355331D99FB4ABDf6B8E",
  // LINK: "0xe1c4120ea7b1D3B8378AF07a1AF4A19701f8d1e3",
};

const abi = ["function latestAnswer() view returns (uint)"];

const usePrice = () => {
  const { library } = useWeb3React();

  const getPrice = async (currencyTickerOnUsd: string): Promise<number> => {
    if (library) {
      try {
        const contract = new ethers.Contract(
          dataFeedsForUsd[currencyTickerOnUsd],
          abi,
          library
        );
        const price = await contract.latestAnswer();
        // Figured it from data feeds: 100000000
        return parseInt(price.toString()) / 100000000;
      } catch (e) {
        console.error("Not connected polygon: Price feeds not available");
        return 0;
      }
    } else {
      alert("Connect your wallet to continue...");
      return 0;
    }
  };

  return { getPrice };
};

export default usePrice;
