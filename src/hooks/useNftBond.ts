import { ethers } from "ethers";
import { abi as NotesNftAbi } from "../abis/NotesNFT.json";
import { NotesInfo } from "../state";

const useNftBond = () => {
  // const { library } = useWeb3React();

  const getNFTData = async (nftAddress: string): Promise<null | NotesInfo> => {
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
      const artistName = await nftBondContract.artistName();

      const price = await nftBondContract.price();
      const promoOne = await nftBondContract.promotionOneBalance();
      const promoTwo = await nftBondContract.promotionTwoBalance();
      return {
        name,
        symbol,
        artistName,
        price: price.div(1e6).toNumber(),
        promoOnePrice: promoOne.div(1e6).toString(),
        promoTwoPrice: promoTwo.div(1e6).toString(),
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
