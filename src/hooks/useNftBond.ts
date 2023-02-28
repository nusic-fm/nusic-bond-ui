import { ethers } from "ethers";
import { NFTData } from "../container/DashboardRow";
import { abi as NotesNftAbi } from "../abis/NotesNFT.json";

const useNftBond = () => {
  // const { library } = useWeb3React();

  const getNFTData = async (nftAddress: string): Promise<null | NFTData> => {
    // await library.ready;
    // if (library) {
    try {
      const provider = new ethers.providers.AlchemyProvider(
        "maticmum",
        process.env.REACT_APP_ALCHEMY
      );
      const nftBondContract = new ethers.Contract(
        nftAddress,
        NotesNftAbi,
        provider
      );
      const name = await nftBondContract.name();
      const symbol = await nftBondContract.symbol();
      let tokenUri = "";
      try {
        // tokenUri = await nftBondContract.tokenURI(BigNumber.from("0"));
      } catch (e) {
        console.log("tokenUri: ", e);
      }

      return {
        name,
        symbol,
        tokenUri,
        nftAddress,
      };
    } catch (e) {
      console.error(e);
      return null;
    }
    // }
    // else {
    //   alert("Connect your wallet to continue...");
    //   return null;
    // }
  };

  return { getNFTData };
};

export default useNftBond;
