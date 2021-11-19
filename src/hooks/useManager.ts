import { useWeb3React } from "@web3-react/core";
import contractAddresses from "../constants/contracts";
import { useBondNFTManagerContract } from "./useContract";

interface NftInfo {
  nftAddress: string;
  name: string;
  symbol: string;
  bio: string;
  spotifyUrl: string;
}

export const useApManager = () => {
  const { account } = useWeb3React();
  const managerContract = useBondNFTManagerContract(
    contractAddresses.BondNFTManager[42]
  );

  const createAssetPool = async (bondValue: number): Promise<any> => {
    if (!account) {
      alert("Kindly connect your wallet!");
      return;
    }
    const dep = await managerContract.deployed();
    return await dep.createAssetPool(bondValue, {
      from: account,
    });
  };

  const checkPendingAssetPool = async (apAddress: string): Promise<boolean> => {
    const dep = await managerContract.deployed();
    // TODO remove 0
    try {
      const userAssetPoolInfo = await dep.userAssetPools(account, 0);
      return true;
    } catch (e) {
      console.error(e);
      return true;
    }
    // return userAssetPoolInfo.assetPoolAddress === apAddress;
  };

  const createNft = async (
    name: string,
    symbol: string,
    bio: string,
    spotifyUrl: string
  ): Promise<any> => {
    const dep = await managerContract.deployed();
    return await dep.createNft(name, symbol, bio, spotifyUrl, {
      from: account,
    });
  };

  const getTotalNoOfAps = async (): Promise<number> => {
    const apLength = await managerContract.allAssetPoolsLength();
    return parseInt(apLength.toString());
  };

  const getTotalNoOfNfts = async (): Promise<number> => {
    const apLength = await managerContract.allNftLength();
    return parseInt(apLength.toString());
  };

  const getArtistAps = async (): Promise<string> => {
    const pools = await managerContract.getArtistAps({
      from: account,
    });
    return pools.toString();
  };

  const getArtistNfts = async (address?: NftInfo[]): Promise<NftInfo[]> => {
    const pools = await managerContract.getArtistNfts(address, {
      from: account,
    });
    return pools;
  };

  const getAllAps = async (): Promise<string[]> => {
    const noOfAps = await getTotalNoOfAps();
    const apAddressesPromise = [];
    for (let i = 0; i < noOfAps; i++) {
      const assetPoolAddress = await managerContract.allAssetPools(i);
      apAddressesPromise.push(assetPoolAddress);
    }
    const allAssetPools = await Promise.all(apAddressesPromise);
    return allAssetPools;
  };

  const getAllNfts = async (): Promise<string[]> => {
    const noOfNfts = await getTotalNoOfNfts();
    const nftAddressesPromise = [];
    for (let i = 0; i < noOfNfts; i++) {
      const nftAddress = await managerContract.allNfts(i);
      nftAddressesPromise.push(nftAddress);
    }
    const allNfts = await Promise.all(nftAddressesPromise);
    return allNfts;
  };

  return {
    createAssetPool,
    checkPendingAssetPool,
    createNft,
    getTotalNoOfAps,
    getTotalNoOfNfts,
    getArtistAps,
    getArtistNfts,
    getAllAps,
    getAllNfts,
  };
};
