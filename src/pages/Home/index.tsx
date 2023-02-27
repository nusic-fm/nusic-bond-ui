import { Box, Button, Typography } from "@mui/material";
// import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useRecoilState } from "recoil";
import ArtistInfo from "../../components/ArtistInfo";
import BondInfo from "../../components/BondInfo";
import IssueBond from "../../components/IssueBond";
import Promotion from "../../components/Promotion";
import SongInfo from "../../components/SongInfo";
// import { useHistory } from "react-router";
// import { Route, Switch, useLocation } from "react-router-dom";
import StepperFlow from "../../components/StepperFlow";
import {
  bondInfoState,
  nftInfoState,
  songStreamingInfoState,
} from "../../state";
// import BondInfoForm from "./BondInfoForm";
// import DepositCollateral from "./DepositCollateral";
// import IssueBond from "./IssueBond";
// import MarketPlace from "./MarketPlace";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#17172F",
    minHeight: "calc(100vh - 65px)",
    width: "100%",
  },
  section: {
    backgroundColor: "#EBF4FD",
    margin: "20px",
    padding: "30px",
    borderRadius: 6,
    width: "262px",
    height: "264px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  summary: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 4,
    width: "100%",
  },
});

// const steps = [
//   // "Get Started",
//   // "Marketplace",
//   "Bond Information",
//   "Deposit",
//   "Issue Bond",
// ];

// const getActivePath = (pathname: string) => {
//   // if (pathname === "/home/mint") {
//   //   return 1;
//   // } else
//   if (pathname.includes("bond-info")) {
//     return 0;
//   } else if (pathname.includes("deposit")) {
//     return 1;
//   } else if (pathname.includes("issue-bond")) {
//     return 2;
//   }
// };

const Home = () => {
  // const history = useHistory();
  const classes = useStyles();
  // const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [_songStreamingInfo] = useRecoilState(songStreamingInfoState);
  const [_nftInfo] = useRecoilState(nftInfoState);
  const [_bondInfo] = useRecoilState(bondInfoState);

  const goToNextPage = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <Box className={classes.root}>
      <Box display={"flex"} p={2}>
        <Box flexBasis={"10%"}>
          <StepperFlow currentStep={currentStep} />
        </Box>
        <Box display={"flex"} flexDirection="column" pt={4} flexBasis="60%">
          {currentStep === 0 && <SongInfo goToNextPage={goToNextPage} />}
          {currentStep === 1 && <ArtistInfo goToNextPage={goToNextPage} />}
          {currentStep === 2 && <BondInfo goToNextPage={goToNextPage} />}
          {currentStep === 3 && <Promotion goToNextPage={goToNextPage} />}
          {currentStep === 4 && <IssueBond goToNextPage={goToNextPage} />}
        </Box>
        {_songStreamingInfo && (
          <Box flexBasis="30%">
            <Typography variant="h6">Value Summary</Typography>
            <Box className={classes.summary} height={"400px"} p={2} mt={2}>
              <Box display="flex" p={1} pb={0}>
                <Typography
                  fontWeight="600"
                  flexBasis={"50%"}
                  color="rgb(207, 207, 207)"
                >
                  Spotify ID
                </Typography>
                <Typography>{_songStreamingInfo?.spotifyId}</Typography>
              </Box>
              <Box display="flex" p={1} pb={0}>
                <Typography
                  fontWeight="600"
                  flexBasis={"50%"}
                  color="rgb(207, 207, 207)"
                >
                  Youtube ID
                </Typography>
                <Typography>{_songStreamingInfo?.youtubeId}</Typography>
              </Box>
              {_nftInfo && (
                <>
                  <Box display="flex" p={1} pb={0}>
                    <Typography
                      fontWeight="600"
                      flexBasis={"50%"}
                      color="rgb(207, 207, 207)"
                    >
                      NFT Name
                    </Typography>
                    <Typography>{_nftInfo.nftName}</Typography>
                  </Box>
                  <Box display="flex" p={1} pb={0}>
                    <Typography
                      fontWeight="600"
                      flexBasis={"50%"}
                      color="rgb(207, 207, 207)"
                    >
                      NFT Symbol
                    </Typography>
                    <Typography>{_nftInfo.nftSymbol}</Typography>
                  </Box>
                </>
              )}
              {_bondInfo && (
                <>
                  <Box display="flex" p={1} pb={0}>
                    <Typography
                      fontWeight="600"
                      flexBasis={"50%"}
                      color="rgb(207, 207, 207)"
                    >
                      Face Value
                    </Typography>
                    <Typography>{_bondInfo.faceValue}</Typography>
                  </Box>
                  <Box display="flex" p={1} pb={0}>
                    <Typography
                      fontWeight="600"
                      flexBasis={"50%"}
                      color="rgb(207, 207, 207)"
                    >
                      Term (years)
                    </Typography>
                    <Typography>{_bondInfo.termYears}</Typography>
                  </Box>
                </>
              )}
              {/* <Box display="flex" p={1} pb={0}>
              <Typography fontWeight="bold" flexBasis={"50%"}>
                SpotifyId
              </Typography>
              <Typography>{_songStreamingInfo?.spotifyId}</Typography>
            </Box>
            <Box display="flex" p={1} pb={0}>
              <Typography fontWeight="bold" flexBasis={"50%"}>
                SpotifyId
              </Typography>
              <Typography>{_songStreamingInfo?.spotifyId}</Typography>
            </Box> */}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
