import { useWeb3React } from "@web3-react/core";
import contractAddresses from "../constants/contracts";
import { useBondNFTManagerContract } from "./useContract";
import { BigNumber } from "@ethersproject/bignumber";

interface NftInfo {
  nftAddress: string;
  name: string;
  symbol: string;
  bio: string;
  spotifyUrl: string;
}

export interface IssueBondParams {
  _artistName: string;
  _artistId: string;
  _channelId: string;
  _audiusArtistId: string;
  _fundingAmount: number;
  _numberOfYears: number;
  _numberOfBonds: number;
  _facevalue: number;
  _bondName: string;
  _bondSymbol: string;
  _assetPoolAddress: string;
}

export const useApManager = () => {
  const { account } = useWeb3React();
  const { library } = useWeb3React();
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

  const issueBond = async (
    _artistName: string,
    _artistId: string,
    _channelId: string,
    _audiusArtistId: string,
    _fundingAmount: number,
    _numberOfYears: number,
    _numberOfBonds: number,
    _facevalue: number,
    _bondName: string,
    _bondSymbol: string,
    _assetPoolAddress: string
  ) => {
    const dep = await managerContract.deployed();

    // const tx = await dep.estimateGas.issueBond(
    //   _artistName,
    //   _artistId,
    //   _channelId,
    //   _audiusArtistId,
    //   _fundingAmount,
    //   _numberOfYears,
    //   _numberOfBonds,
    //   _facevalue,
    //   _bondName,
    //   _bondSymbol,
    //   _assetPoolAddress,
    //   {
    //     from: account,
    //     gasLimit: 12500000,
    //     gasPrice: 1000000000,
    //   }
    // );
    const tx = await dep.issueBond(
      _artistName,
      _artistId,
      _channelId,
      _audiusArtistId,
      BigNumber.from(_fundingAmount.toString()),
      BigNumber.from(_numberOfYears.toString()),
      BigNumber.from(_numberOfBonds.toString()),
      BigNumber.from(_facevalue.toString()),
      _bondName,
      _bondSymbol,
      _assetPoolAddress,
      {
        from: account,
        gasLimit: 12500000,
        gasPrice: 1000000000,
      }
    );
    return tx;
  };

  const mintNftBonds = async (nftAddress: string) => {
    const dep = await managerContract.deployed();
    const tx = await dep.mintNFTBond(nftAddress, {
      from: account,
      gasLimit: 12500000,
      gasPrice: 1000000000,
    });
    return tx;
  };

  const getBondConfigs = async () => {
    await library.ready;
    const dep = await managerContract.deployed();
    const bondsLength = await managerContract.nftBondLengthForUser(account);
    const bondConfigPromises = [];
    for (let i = 0; i < bondsLength; i++) {
      bondConfigPromises.push(dep.userBondConfigs(account, i));
    }
    if (bondConfigPromises) {
      return await Promise.all(bondConfigPromises);
    }
    return [];
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
    issueBond,
    mintNftBonds,
    getBondConfigs,
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
