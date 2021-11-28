import contractAddresses from "../constants/contracts";
import { useRatingContract } from "./useContract";
import { BigNumber } from "@ethersproject/bignumber";

export const useRating = () => {
  const ratingContract = useRatingContract(contractAddresses.RatingEngine["4"]);

  const getRating = async (apAddress: string): Promise<string> => {
    const rating = await ratingContract.allocateRatingByAssetPoolAddress(
      apAddress,
      BigNumber.from("2")
    );
    return rating as string;
  };

  return { getRating };
};
