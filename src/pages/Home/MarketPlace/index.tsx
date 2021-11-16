import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router";

const MarketPlace = () => {
  const history = useHistory();
  const onBondInformationClick = () => {
    history.push("/home/mint/opensea/bond-info");
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Typography variant="h4" fontWeight="600" align="center" pt={4}>
        Select a Marketplace
      </Typography>
      <Typography pt={2}>
        This will be the marketplace wher you mint your NFT bond
      </Typography>
      <Box pt={4}>
        <Box pt={4}></Box>
        <Button
          variant="contained"
          color="primary"
          onClick={onBondInformationClick}
        >
          Continue to Bond Information
        </Button>
      </Box>
      <Box mt={6}>
        <Typography>Coming soon...</Typography>
      </Box>
    </Box>
  );
};

export default MarketPlace;
