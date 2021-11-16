import { Box, Typography } from "@mui/material";

const BondInfoForm = () => {
  return (
    <Box pt={4}>
      <Typography variant="h4" fontWeight="600" align="center">
        NFT Bond Information
      </Typography>
      <Typography pt={2} align="center">
        Fill in the following information for your NFT bond. The following
        information is used to determine the face value of your NFT bond
      </Typography>
    </Box>
  );
};

export default BondInfoForm;
