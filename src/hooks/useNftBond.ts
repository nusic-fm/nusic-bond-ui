import { useWeb3React } from "@web3-react/core";
import { BigNumber } from "ethers";
import { NFTData } from "../container/DashboardRow";
import { getBondNFTContract } from "../utils/contractHelpers";

const useNftBond = () => {
  const { library } = useWeb3React();

  const getNFTData = async (nftAddress: string): Promise<null | NFTData> => {
    await library.ready;
    if (library) {
      try {
        const nftBondContract = getBondNFTContract(nftAddress, library);
        const name = await nftBondContract.name();
        const symbol = await nftBondContract.symbol();
        let tokenUri = "";
        try {
          tokenUri = await nftBondContract.tokenURI(BigNumber.from("0"));
        } catch (e) {
          console.log("tokenUri: ", e);
        }

        return {
          name,
          symbol,
          tokenUri,
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
