import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

const DepositCollateral = () => {
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
        <Button variant="contained" color="primary">
          Deposit collateral
        </Button>
      </Box>
    </Box>
  );
};

export default DepositCollateral;
