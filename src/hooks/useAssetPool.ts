import { useWeb3React } from "@web3-react/core";

const useAssetPool = () => {
  const { library } = useWeb3React();

  const getApBalance = async (apAddress: string): Promise<number> => {
    await library.ready;
    if (library) {
      try {
        const balance = await library.getBalance(apAddress);
        return parseInt(balance.toString()) / (10 ^ 18);
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
