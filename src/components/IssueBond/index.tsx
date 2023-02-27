import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { BigNumber } from "ethers";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useApManager } from "../../hooks/useManager";
import {
  songStreamingInfoState,
  nftInfoState,
  bondInfoState,
  // AssetPoolInfo,
} from "../../state";

type Props = { goToNextPage: () => void };

const IssueBond = ({ goToNextPage }: Props) => {
  const [processMode, setProcessMode] = useState(0);
  const { issueBond, mintNftBonds } = useApManager();
  const [_songStreamingInfo] = useRecoilState(songStreamingInfoState);
  const [_nftInfo] = useRecoilState(nftInfoState);
  const [_bondInfo] = useRecoilState(bondInfoState);
  const history = useHistory();

  const onIssueBondClick = async () => {
    if (_songStreamingInfo && _nftInfo && _bondInfo) {
      try {
        setProcessMode(1);
        console.log("noOfBonds: ", _bondInfo.noOfBonds);
        // (string memory _artistName, string memory _youtubeSongId, string memory _soundchartsSongId, string memory _songstatsSongId,
        //   uint256 _fundingAmount, uint256 _numberOfYears, uint256 _numberOfBonds,
        //   uint256 _facevalue, string memory _bondName, string memory _bondSymbol,
        //   ListenersDetails memory listenersDetails) public returns(address nftAddress)
        const tx = await issueBond(
          _songStreamingInfo.artistName,
          _songStreamingInfo.youtubeId,
          _songStreamingInfo.soundChartId,
          _songStreamingInfo.songStatId,
          // _pendingAssetPoolInfo.spotifyId,
          // _pendingAssetPoolInfo.youtubeUrl,
          // _pendingAssetPoolInfo.collateralAmount,
          1,
          // _bondInfo.termYears,
          1, // TODO
          _bondInfo.noOfBonds || 1,
          _bondInfo.faceValue,
          _nftInfo.nftName,
          _nftInfo.nftSymbol,
          {
            spotifyStreamCount: BigNumber.from(
              _songStreamingInfo.spotifyListeners
            ),
            youtubeViewsCount: BigNumber.from(_songStreamingInfo.youtubeViews),
            assetPoolAddress: "",
            //_songStreamingInfo.apAddress,
          }
        );
        const receipt = await tx.wait();
        console.log({ receipt });
        let nftAddress = receipt.events[0].address;
        // const poolInfo: AssetPoolInfo = {
        //   ..._pendingAssetPoolInfo,
        //   nftAddress,
        // };
        // setPendingAssetPoolInfo(poolInfo);
        // try {
        //   const metadataRes = await axios.post(METADATA_URL, {
        //     data: { nftBondAddress: nftAddress },
        //   });
        //   console.log(metadataRes);
        // } catch (e) {
        //   console.log("metadata: ", e);
        // }
        setProcessMode(2);
        try {
          const nftTx = await mintNftBonds(nftAddress);
          const nftReceipt = await nftTx.wait();
          console.log({ nftReceipt });
          // const _poolInfo = {
          //   ..._pendingAssetPoolInfo,
          //   nftAddress,
          // };
          // setPendingAssetPoolInfo(_poolInfo);
        } catch (e) {
          console.log("mint bonds: ", e);
        }
        history.push("/dashboard");
      } catch (e) {
        console.error(e);
      }
    }
  };
  return (
    <Stack>
      <Box>
        <Grid container>
          <Grid item md={2}></Grid>
          <Grid item md={8}>
            <Box mt={8} display="flex">
              <Stepper activeStep={processMode - 1} orientation="vertical">
                <Step>
                  <StepLabel>
                    <Box display="flex" alignItems="center" fontSize="24px">
                      Issuing NFT Bond
                      <Box ml={3}>
                        {processMode === 1 && (
                          <CircularProgress color="info" size={20} />
                        )}
                      </Box>
                    </Box>
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    <Box display="flex" alignItems="center" fontSize="24px">
                      Minting your NFT music Bond
                      <Box ml={3}>
                        {processMode === 2 && (
                          <CircularProgress color="info" size={20} />
                        )}
                      </Box>
                    </Box>
                  </StepLabel>
                </Step>
              </Stepper>
            </Box>
          </Grid>
          <Grid item md={2}></Grid>
        </Grid>
      </Box>
    </Stack>
  );
};

export default IssueBond;
