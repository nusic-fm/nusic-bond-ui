import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router";
import Footer from "../../../components/Footer";

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
      <Box pt={2}>
        <img
          src="/images/markets/opensea.jpg"
          alt="opeansea"
          style={{ borderRadius: "50%" }}
          height="100px"
        />
        <Typography align="center">Opensea</Typography>
        <Typography
          align="center"
          fontStyle="italic"
          fontSize="12px"
          style={{ opacity: 0.6 }}
        >
          Selected
        </Typography>
      </Box>
      <Box mt={6}>
        <Typography align="center">Coming soon...</Typography>
        <Box display="flex" mt={2}>
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <img
              src={`/images/markets/market${id}.jpg`}
              alt={`${id}`}
              style={{ borderRadius: "50%", margin: "8px" }}
              height="100px"
            />
          ))}
        </Box>
      </Box>
      <Footer>
        <Button
          variant="contained"
          color="primary"
          onClick={onBondInformationClick}
        >
          Continue to Bond Information
        </Button>
      </Footer>
    </Box>
  );
};

export default MarketPlace;
