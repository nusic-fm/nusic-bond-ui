import { useWeb3React } from "@web3-react/core";
import contractAddresses from "../constants/contracts";
import { useBondNFTManagerContract } from "./useContract";
import { BigNumber } from "@ethersproject/bignumber";
import { ethers } from "ethers";
import { abi as USDCMock } from "../abis/USDCMock.json";
import { abi as NotesNFTManagerAbi } from "../abis/NotesNFTManager.json";
import { Marketing } from "../state";

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
  // assetPoolAddress: string;
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
      NotesNFTManagerAbi,
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

  // function issueNotes(string memory _artistName, address _artistAddress, string memory _youtubeSongId, string memory _soundchartsSongId, string memory _songstatsSongId,
  // string memory _chartmetricSongId,
  //   uint256 _price, uint256 _numberOfTokens, string memory _notesName, string memory _notesSymbol,
  //   ListenersDetails memory listenersDetails, InfluencerDetails memory influencerDetails) public

  const issueNotes = async (
    _artistName: string,
    _artistAddress: string,
    _youtubeSongId: string,
    _soundchartsSongId: string,
    _songstatsSongId: string,
    _chartmetricSongId: string,
    _price: number,
    _numberOfTokens: number,
    _notesName: string,
    _notesSymbol: string,
    listenersData: ListenersDetails,
    influencerDetails: Marketing
  ) => {
    const dep = await managerContract.deployed();

    const tx = await dep.issueNotes(
      _artistName,
      _artistAddress,
      _youtubeSongId,
      _soundchartsSongId,
      _songstatsSongId,
      _chartmetricSongId,
      _price,
      BigNumber.from(_numberOfTokens.toString()),
      _notesName,
      _notesSymbol,
      listenersData,
      influencerDetails,
      {
        from: account,
        gasLimit: 12500000,
        gasPrice: 3000000000,
      }
    );
    return tx;
  };

  async function* mintNftBonds(
    nftAddress: string,
    noOfTokens: number,
    _price: number,
    _userSigner: any
  ) {
    const simpleAlchemyProvider = new ethers.providers.AlchemyProvider(
      "maticmum",
      process.env.REACT_APP_ALCHEMY
    );
    const signer = new ethers.Wallet(
      process.env.REACT_APP_PK as string,
      simpleAlchemyProvider
    );
    const usdcContract = new ethers.Contract(
      contractAddresses.USDCMock[80001],
      USDCMock,
      signer
    );
    const approveTx = await usdcContract.approve(nftAddress, _price);
    await approveTx.wait();
    yield 1;

    const managerContract = new ethers.Contract(
      contractAddresses.BondNFTManager[80001],
      NotesNFTManagerAbi,
      _userSigner
    );
    const tx = await managerContract.mintNFTNotes(nftAddress, _price);
    yield tx;
  }

  const getBondConfigs = async () => {
    // await library.ready;
    // const dep = await managerContract.deployed();
    const provider = new ethers.providers.AlchemyProvider(
      "maticmum",
      process.env.REACT_APP_ALCHEMY
    );
    const contract = new ethers.Contract(
      contractAddresses.BondNFTManager[80001],
      NotesNFTManagerAbi,
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
    issueNotes,
    createAssetPool,
    // issueBond,
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
