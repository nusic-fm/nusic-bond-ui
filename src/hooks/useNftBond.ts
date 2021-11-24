import { useWeb3React } from "@web3-react/core";
import { NFTData } from "../container/DashboardRow";
import { getBondNFTContract } from "../utils/contractHelpers";

const useNftBond = () => {
  const { library } = useWeb3React();

  const getNFTData = async (nftAddress: string): Promise<null | NFTData> => {
    await library.ready;
    if (library) {
      try {
        const NFTBondContract = getBondNFTContract(nftAddress, library);
        const dep = await NFTBondContract.deployed();
        const name = await dep.name();
        const symbol = await dep.symbol();
        // const tokenUri = await dep.getTokenURI(0);

        return {
          name,
          symbol,
          tokenUri: "",
        };
      } catch (e) {
        console.error(e);
        return null;
      }
    } else {
      alert("Connect your wallet to continue...");
      return null;
    }
  };

  return { getNFTData };
};

export default useNftBond;
