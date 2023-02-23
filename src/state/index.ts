import { atom } from "recoil";

export interface AssetPoolInfo {
  nftBondName: string;
  nftBondSymbol: string;
  spotifyId: string;
  youtubeUrl: string;
  youtubeId: string;
  soundChartId: string;
  songStatId: string;
  artistName: string;
  nftMarketPlace: string;
  collateralAmount: number;
  currencyId: number;
  termInYears: number;
  faceValue: number;
  individualBondValue: number;
  isCollateralDeposited: boolean;
  apAddress: string;
  nftAddress: string;
  noOfBonds: number;
  youtubeSubscribers: number;
  spotifyListeners: number;
}

export const pendingAssetPoolInfo = atom<null | AssetPoolInfo>({
  key: "pendingAssetPoolInfo",
  default: null,
});

export interface SongStreamingInfo {
  spotifyId: string;
  youtubeUrl: string;
  youtubeId: string;
  soundChartId: string;
  songStatId: string;
  artistName: string;
  youtubeViews: number;
  spotifyListeners: number;
  songImageUrl: string;
}

export const songStreamingInfo = atom<null | SongStreamingInfo>({
  key: "songStreamingInfo",
  default: null,
});

// export const pendingAssetPoolInfo = atom<null | AssetPoolInfo>({
//   key: "pendingAssetPoolInfo",
//   default: null,
// });export const pendingAssetPoolInfo = atom<null | AssetPoolInfo>({
//   key: "pendingAssetPoolInfo",
//   default: null,
// });
