import { useWeb3React } from "@web3-react/core";
import { getApContract } from "../utils/contractHelpers";

const useAssetPool = () => {
  const { library, account } = useWeb3React();

  const getApBalance = async (nftAddress: string): Promise<number> => {
    await library.ready;
    if (library) {
      try {
        const AssetPoolContract = getApContract(nftAddress, library);
        const dep = await AssetPoolContract.deployed();
        const balance = await dep.balanceOf(account);
        return (parseInt(balance.toString()) / 10) ^ 18;
      } catch (e) {
        console.error(e);
        return 0;
      }
    } else {
      alert("Connect your wallet to continue...");
      return 0;
    }
  };

  return { getApBalance };
};

export default useAssetPool;
