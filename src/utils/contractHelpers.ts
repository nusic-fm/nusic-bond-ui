import { ethers } from "ethers";
import { simpleRpcProvider } from "./providers";

// ABI
// import { abi as AuditoryAssetPoolAbi } from "../abis/AuditoryAssetPool.json";
// import { abi as AuditoryRouterAbi } from "../abis/AuditoryRouter.json";
import { abi as BondNFTManagerAbi } from "../abis/BondNFTManager.json";
import { abi as BondNFTAbi } from "../abis/BondNFT.json";
import { abi as ApAbi } from "../abis/AssetPool.json";
// import { abi as AuditoryNftApi } from "../abis/AuditoryNft.json";

// import ERC20Abi from "../abis/ERC20-custom.json";

const getContract = (
  abi: any,
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  const signerOrProvider = signer ?? simpleRpcProvider;
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getBondNFTManagerContract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(BondNFTManagerAbi, address, signer);
};

export const getBondNFTContract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(BondNFTAbi, address, signer);
};

export const getApContract = (
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return getContract(ApAbi, address, signer);
};

// export const getAuditoryAssetPoolContract = (
//   address: string,
//   signer?: ethers.Signer | ethers.providers.Provider
// ) => {
//   return getContract(AuditoryAssetPoolAbi, address, signer);
// };
// export const getAuditoryRouterContract = (
//   address: string,
//   signer?: ethers.Signer | ethers.providers.Provider
// ) => {
//   return getContract(AuditoryRouterAbi, address, signer);
// };
// export const getAuditoryNftContract = (
//   address: string,
//   signer?: ethers.Signer | ethers.providers.Provider
// ) => {
//   return getContract(AuditoryNftApi, address, signer);
// };
// export const getERC20Contract = (
//   address: string,
//   signer?: ethers.Signer | ethers.providers.Provider
// ) => {
//   return getContract(ERC20Abi, address, signer);
// };
