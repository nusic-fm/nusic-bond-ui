import { BigNumber } from "@ethersproject/bignumber";
import {
  Button,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { useRecoilState } from "recoil";
import Footer from "../../../components/Footer";
import { METADATA_URL } from "../../../constants";
import { useApManager } from "../../../hooks/useManager";
import { AssetPoolInfo, pendingAssetPoolInfo } from "../../../state";

const useStyles = makeStyles({
  box: {
    backgroundColor: "white",
    borderRadius: 6,
  },
});

const IssueBond = () => {
  const classes = useStyles();
  const history = useHistory();
  const [_pendingAssetPoolInfo, setPendingAssetPoolInfo] =
    useRecoilState(pendingAssetPoolInfo);
  const { issueBond, mintNftBonds } = useApManager();

  const [processMode, setProcessMode] = useState(0);

  const onIssueBondClick = async () => {
    if (_pendingAssetPoolInfo) {
      try {
        // setProcessMode(1);
        console.log("noOfBonds: ", _pendingAssetPoolInfo.noOfBonds);
        const tx = await issueBond(
          _pendingAssetPoolInfo.artistName,
          _pendingAssetPoolInfo.spotifyId,
          _pendingAssetPoolInfo.youtubeUrl,
          _pendingAssetPoolInfo.collateralAmount,
          _pendingAssetPoolInfo.termInYears,
          _pendingAssetPoolInfo.noOfBonds || 1,
          _pendingAssetPoolInfo.faceValue,
          _pendingAssetPoolInfo.nftBondName,
          _pendingAssetPoolInfo.nftBondSymbol,
          {
            spotifyListeners: BigNumber.from(
              _pendingAssetPoolInfo.spotifyListeners
            ),
            youtubeSubscribers: BigNumber.from(
              _pendingAssetPoolInfo.youtubeSubscribers
            ),
            assetPoolAddress: _pendingAssetPoolInfo.apAddress,
          }
        );
        const receipt = await tx.wait();
        console.log({ receipt });
        let nftAddress = receipt.events[0].address;
        const poolInfo: AssetPoolInfo = {
          ..._pendingAssetPoolInfo,
          nftAddress,
        };
        setPendingAssetPoolInfo(poolInfo);
        try {
          const metadataRes = await axios.post(METADATA_URL, {
            data: { nftBondAddress: nftAddress },
          });
          console.log(metadataRes);
        } catch (e) {
          console.log("metadata: ", e);
        }
        setProcessMode(2);
        try {
          const nftTx = await mintNftBonds(nftAddress);
          const nftReceipt = await nftTx.wait();
          console.log({ nftReceipt });
          const _poolInfo = {
            ..._pendingAssetPoolInfo,
            nftAddress,
          };
          setPendingAssetPoolInfo(_poolInfo);
        } catch (e) {
          console.log("mint bonds: ", e);
        }
        history.push("/dashboard");
      } catch (e) {
        console.error(e);
      }
    }
  };
  if (processMode) {
    return (
      <Box mt={8} display="flex" justifyContent="center">
        <Stepper activeStep={processMode - 1} orientation="vertical">
          <Step>
            <StepLabel>
              <Box display="flex" alignItems="center" fontSize="24px">
                Issueing NFT Bond
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
    );
  }
  return (
    <Box mt={4}>
      <Typography variant="h4" align="center" mb={4}>
        Summary
      </Typography>
      <Box display="flex" justifyContent="center">
        <Box flexBasis="40%" mr={5}>
          <Box className={classes.box} p={2}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography fontWeight="600" color="black">
                Artist Name
              </Typography>
              <Typography color="black">
                {_pendingAssetPoolInfo?.artistName}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="black" fontWeight="600">
                Spotify ID
              </Typography>
              <Typography color="black">
                {_pendingAssetPoolInfo?.spotifyId}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography fontWeight="600" color="black">
                Youtube URL
              </Typography>
              <Typography color="black">
                {_pendingAssetPoolInfo?.youtubeUrl}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography fontWeight="600" color="black">
                NFT Marketplace
              </Typography>
              <Typography color="black">
                {_pendingAssetPoolInfo?.nftMarketPlace}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box flexBasis="30%">
          <Box className={classes.box} p={2}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="black" fontWeight="600">
                Collateral Deposit
              </Typography>
              <Typography color="black">
                {_pendingAssetPoolInfo?.collateralAmount}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="black" fontWeight="600">
                Term
              </Typography>
              <Typography color="black">
                {_pendingAssetPoolInfo?.termInYears}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="black" fontWeight="600">
                Face Value
              </Typography>
              <Typography color="black">
                ${_pendingAssetPoolInfo?.faceValue}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="black" fontWeight="600">
                Individual Bond Value
              </Typography>
              <Typography color="black">
                ${_pendingAssetPoolInfo?.individualBondValue}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="black" fontWeight="600">
                No of Bond Segments
              </Typography>
              <Typography color="black">
                {Math.floor(
                  (_pendingAssetPoolInfo?.faceValue || 0) /
                    (_pendingAssetPoolInfo?.individualBondValue || 0)
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer>
        <Button variant="contained" color="primary" onClick={onIssueBondClick}>
          Mint NFT Bond
        </Button>
      </Footer>
    </Box>
  );
};

export default IssueBond;
