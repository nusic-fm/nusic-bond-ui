import { Box, Button, Typography } from "@mui/material";
// import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import ArtistInfo from "../../components/ArtistInfo";
import BondInfo from "../../components/BondInfo";
import IssueBond from "../../components/IssueBond";
import SongInfo from "../../components/SongInfo";
// import { useHistory } from "react-router";
// import { Route, Switch, useLocation } from "react-router-dom";
import StepperFlow from "../../components/StepperFlow";
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

  const goToNextPage = () => {
    setCurrentStep(currentStep + 1);
  };

  return (
    <Box className={classes.root}>
      <Box display={"flex"} p={2}>
        <Box flexBasis={"10%"}>
          <StepperFlow currentStep={currentStep} />
        </Box>
        <Box display={"flex"} flexDirection="column" pt={4} width="100%">
          {currentStep === 0 && <SongInfo goToNextPage={goToNextPage} />}
          {currentStep === 1 && <ArtistInfo goToNextPage={goToNextPage} />}
          {currentStep === 2 && <BondInfo goToNextPage={goToNextPage} />}
          {currentStep === 3 && <Button onClick={goToNextPage}>Next</Button>}
          {currentStep === 4 && <IssueBond goToNextPage={goToNextPage} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
