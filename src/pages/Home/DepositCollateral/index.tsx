import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useWeb3React } from "@web3-react/core";
import { useHistory } from "react-router";
import Footer from "../../../components/Footer";
import useAuth from "../../../hooks/useAuth";

const DepositCollateral = () => {
  const { account } = useWeb3React();
  const { login } = useAuth();
  const history = useHistory();

  const onDepositClick = () => {
    if (account) {
      history.push("/home/mint/opensea/issue-bond");
    } else {
      login();
    }
  };
  return (
    <Box pt={4}>
      <Typography variant="h4" fontWeight="600" align="center">
        Deposit
      </Typography>
      <Typography variant="h4" fontWeight="600" align="center"></Typography>
      <Box display="flex" justifyContent="center" m={4}>
        <Box
          display="flex"
          justifyContent="space-between"
          style={{ backgroundColor: "white", borderRadius: 4 }}
          p={2}
        >
          <Box>
            <Typography color="black" fontWeight="600">
              Collateral Deposit
            </Typography>
            <Typography color="black" variant="caption">
              for Q1 year 0
            </Typography>
          </Box>
          <Box>
            <Typography color="black" ml={10}>
              5000 DAI
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box mt={6} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={onDepositClick}>
          {account ? "Deposit collateral" : "Connect Wallet"}
        </Button>
      </Box>
      {account && (
        <Typography
          mt={1}
          align="center"
          fontStyle="italic"
          style={{ opacity: "0.8" }}
        >
          Wallet Connected
        </Typography>
      )}
      <Footer>
        <Button variant="contained" color="primary" onClick={onDepositClick}>
          Continue to Summary
        </Button>
      </Footer>
    </Box>
  );
};

export default DepositCollateral;
