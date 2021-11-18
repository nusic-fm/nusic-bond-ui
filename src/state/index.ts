import { atom, selector } from "recoil";

export interface AssetPoolInfo {
  spotifyId: string;
  youtubeUrl: string;
  artistName: string;
  nftMarketPlace: string;
  collateralAmount: number;
  currencyId: number;
  termInYears: number;
  faceValue: number;
  individualBondValue: number;
  isCollateralDeposited: boolean;
}

export const pendingAssetPoolInfo = atom<null | AssetPoolInfo>({
  key: "pendingAssetPoolInfo",
  default: null,
});
