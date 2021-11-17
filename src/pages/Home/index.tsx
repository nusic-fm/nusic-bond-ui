import { Box, makeStyles } from "@material-ui/core";
import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useHistory } from "react-router";
import { Route, Switch, useLocation } from "react-router-dom";
import BondInfoForm from "./BondInfoForm";
import DepositCollateral from "./DepositCollateral";
import MarketPlace from "./MarketPlace";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#17172F",
    minHeight: "calc(100vh - 65px)",
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
}));

const steps = [
  "Get Started",
  "Marketplace",
  "Bond Information",
  "Deposit",
  "Issue Bond",
];

const getActivePath = (pathname: string) => {
  if (pathname === "/home/mint") {
    return 1;
  } else if (pathname.includes("bond-info")) {
    return 2;
  } else if (pathname.includes("deposit")) {
    return 3;
  } else if (pathname.includes("issue-bond")) {
    return 4;
  }
};

const Home = () => {
  const history = useHistory();
  const classes = useStyles();
  const location = useLocation();

  const activeStep = getActivePath(location.pathname);

  const onMintNftClick = () => {
    history.push("/home/mint");
  };

  return (
    <Box className={classes.root}>
      <Box display="flex" justifyContent="center" pt={4}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Switch>
        <Route exact path="/home/">
          <>
            <Box pt={4}>
              <Typography variant="h4" fontWeight="600" align="center">
                I'm looking to...
              </Typography>
            </Box>
            <Box
              pt={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box className={classes.section}>
                <Typography color="#A3188F" fontWeight="bold" fontSize="13px">
                  FOR ARTISTS
                </Typography>
                <Typography color="black" fontWeight="bold">
                  Mint NFT Bond
                </Typography>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={onMintNftClick}
                >
                  Get Started
                </Button>
              </Box>
              <Box className={classes.section}>
                <Box>
                  <Typography
                    color="#A3188F"
                    fontWeight="bold"
                    align="center"
                    fontSize="13px"
                  >
                    FOR MUSIC LOVERS
                  </Typography>
                  <Typography
                    color="#A3188F"
                    fontWeight="bold"
                    align="center"
                    fontSize="13px"
                  >
                    FOR INVESTORS
                  </Typography>
                </Box>
                <Typography color="black" fontWeight="bold">
                  Buy NFT Music
                </Typography>
                <Button color="primary" variant="contained">
                  Get Started
                </Button>
              </Box>
              <Box className={classes.section}>
                <Typography color="#A3188F" fontWeight="bold" fontSize="13px">
                  FOR MARKETPLACES
                </Typography>
                <Typography color="black" fontWeight="bold">
                  Offer NFT Music Bonds
                </Typography>
                <Button color="primary" variant="contained">
                  Get Started
                </Button>
              </Box>
            </Box>
          </>
        </Route>
        <Route exact path="/home/mint/">
          <MarketPlace />
        </Route>
        <Route exact path="/home/mint/opensea/bond-info">
          <BondInfoForm />
        </Route>
        <Route exact path="/home/mint/opensea/deposit">
          <DepositCollateral />
        </Route>
      </Switch>
    </Box>
  );
};

export default Home;
