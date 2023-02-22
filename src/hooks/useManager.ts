import { useWeb3React } from "@web3-react/core";
import contractAddresses from "../constants/contracts";
import { useBondNFTManagerContract } from "./useContract";
import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";
import { abi as BondNFTManagerAbi } from "../abis/BondNFTManager.json";

interface NftInfo {
  nftAddress: string;
  name: string;
  symbol: string;
  bio: string;
  spotifyUrl: string;
}
export interface ListenersDetails {
  spotifyStreamCount: BigNumber;
  youtubeViewsCount: BigNumber;
  assetPoolAddress: string;
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
  const { account, library } = useWeb3React();

  const managerContract = useBondNFTManagerContract(
    contractAddresses.BondNFTManager[80001]
  );

  const createAssetPool = async (bondValue: number): Promise<any> => {
    if (!account) {
      alert("Kindly connect your wallet!");
      return;
    }
    const contract = new ethers.Contract(
      contractAddresses.BondNFTManager[80001],
      BondNFTManagerAbi,
      library.getSigner()
    );
    const tx = await contract.createAssetPool(
      ethers.utils.parseEther(bondValue.toString())
    );
    return tx;
    // const dep = await managerContract.deployed();
    // return await dep.createAssetPool(
    //   ethers.utils.parseEther(bondValue.toString()),
    //   {
    //     from: account,
    //   }
    // );
  };

  const getAssetpoolsOfUserByIndex = async (
    index: number
  ): Promise<null | string> => {
    const dep = await managerContract.deployed();
    try {
      const userAssetPoolInfo = await dep.userAssetPools(account, index);
      return userAssetPoolInfo.assetPoolAddress;
    } catch (e) {
      console.error(e);
      return null;
    }
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
    _youtubeId: string,
    _soundChartId: string,
    _songStatId: string,
    // _artistId: string,
    // _channelId: string,
    _fundingAmount: number,
    _numberOfYears: number,
    _numberOfBonds: number,
    _facevalue: number,
    _bondName: string,
    _bondSymbol: string,
    listenersData: ListenersDetails
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
      _youtubeId,
      _soundChartId,
      _songStatId,
      ethers.utils.parseEther(_fundingAmount.toString()),
      BigNumber.from(_numberOfYears.toString()),
      BigNumber.from(_numberOfBonds.toString()),
      ethers.utils.parseEther(_facevalue.toString()),
      _bondName,
      _bondSymbol,
      listenersData,
      {
        from: account,
        gasLimit: 12500000,
        gasPrice: 3000000000,
      }
    );
    return tx;
  };

  const mintNftBonds = async (nftAddress: string) => {
    const dep = await managerContract.deployed();
    const tx = await dep.mintNFTBond(nftAddress, {
      from: account,
      gasLimit: 12500000,
      gasPrice: 3000000000,
    });
    return tx;
  };

  const getBondConfigs = async () => {
    // await library.ready;
    // const dep = await managerContract.deployed();
    const provider = new ethers.providers.AlchemyProvider(
      "maticmum",
      process.env.REACT_APP_ALCHEMY
    );
    const contract = new ethers.Contract(
      contractAddresses.BondNFTManager[80001],
      BondNFTManagerAbi,
      provider
    );
    const bondsLength = await contract.nftBondLengthForUser(account);
    const bondConfigPromises = [];
    for (let i = 0; i < bondsLength.toNumber(); i++) {
      bondConfigPromises.push(contract.userBondConfigs(account, i));
    }
    if (bondConfigPromises) {
      try {
        return await Promise.all(bondConfigPromises);
      } catch (e) {
        return [];
      }
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
    getAssetpoolsOfUserByIndex,
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
