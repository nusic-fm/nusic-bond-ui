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
  chartmetricId: string;
  artistName: string;
  youtubeViews: number;
  spotifyListeners: number;
  songImageUrl: string;
}

export const songStreamingInfoState = atom<null | SongStreamingInfo>({
  key: "songStreamingInfo",
  default: null,
});

export interface NftInfo {
  nftName: string;
  nftSymbol: string;
}
export const nftInfoState = atom<null | NftInfo>({
  key: "nftInfo",
  default: null,
});

export interface BondInfo {
  // termYears: number;
  faceValue: number;
  noOfBonds: number;
}
export const bondInfoState = atom<null | BondInfo>({
  key: "bondInfo",
  default: null,
});
export interface Marketing {
  influencerOne: string;
  influencerTwo: string;
  influencerOneShare: string;
  influencerTwoShare: string;
}
export const marketingState = atom<null | Marketing>({
  key: "marketing",
  default: null,
});

export interface Income {
  rows: number[];
  columns: string[];
}
export const incomeState = atom<null | Income>({
  key: "income",
  default: null,
});

// export const pendingAssetPoolInfo = atom<null | AssetPoolInfo>({
//   key: "pendingAssetPoolInfo",
//   default: null,
// });
