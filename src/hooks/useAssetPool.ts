import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { getApContract } from "../utils/contractHelpers";
import useWeb3Provider from "./useWeb3Provider";

export interface ApData {
  currentQuarter: string;
  expectedNextPaymentBlock: string;
}
const useAssetPool = () => {
  const { library } = useWeb3React();
  const provider = useWeb3Provider();

  const getApBalance = async (apAddress: string): Promise<string> => {
    await library.ready;
    if (library) {
      try {
        const balance = await library.getBalance(apAddress);
        return ethers.utils.formatEther(balance);
      } catch (e) {
        console.error(e);
        return "0";
      }
    } else {
      alert("Connect your wallet to continue...");
      return "0";
    }
  };

  const getApData = async (apAddress: string): Promise<ApData> => {
    const contract = getApContract(apAddress, provider.getSigner());
    const currentQuarter = await contract.currentQuarter();
    const expectedNextPaymentBlock = await contract.expectedNextPaymentBlock();
    return {
      currentQuarter: currentQuarter.toString(),
      expectedNextPaymentBlock: expectedNextPaymentBlock.toString(),
    };
  };

  return { getApBalance, getApData };
};

export default useAssetPool;
