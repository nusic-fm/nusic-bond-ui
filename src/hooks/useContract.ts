import { useMemo } from "react";
import useWeb3Provider from "../hooks/useWeb3Provider";
import {
  getBondNFTManagerContract,
  // getAuditoryAssetPoolContract,
  // getAuditoryRouterContract,
  // getAuditoryNftContract,
  // getERC20Contract,
} from "../utils/contractHelpers";

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useBondNFTManagerContract = (address: string) => {
  const provider = useWeb3Provider();
  return useMemo(
    () => getBondNFTManagerContract(address, provider.getSigner()),
    [address, provider]
  );
};

// export const useAuditoryAssetPoolContract = (address: string) => {
//   const provider = useWeb3Provider();
//   return useMemo(
//     () => getAuditoryAssetPoolContract(address, provider.getSigner()),
//     [address, provider]
//   );
// };

// export const useAuditoryAssetRouterContract = (address: string) => {
//   const provider = useWeb3Provider();
//   return useMemo(
//     () => getAuditoryRouterContract(address, provider.getSigner()),
//     [address, provider]
//   );
// };

// export const useAuditoryNftContract = (address: string) => {
//   const provider = useWeb3Provider();
//   return useMemo(
//     () => getAuditoryNftContract(address, provider.getSigner()),
//     [address, provider]
//   );
// };

// //  Tokens

// export const useERC20 = (address: string) => {
//   const provider = useWeb3Provider();
//   return useMemo(
//     () => getERC20Contract(address, provider.getSigner()),
//     [address, provider]
//   );
// };
