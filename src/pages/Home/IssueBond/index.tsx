import { Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import Footer from "../../../components/Footer";

const useStyles = makeStyles({
  box: {
    backgroundColor: "white",
    borderRadius: 6,
  },
});

const IssueBond = () => {
  const classes = useStyles();

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
              <Typography color="black">Blackpink</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="black" fontWeight="600">
                Spotify ID
              </Typography>
              <Typography color="black"></Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography fontWeight="600" color="black">
                Youtube URL
              </Typography>
              <Typography color="black"></Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography fontWeight="600" color="black">
                Audius ID
              </Typography>
              <Typography color="black"></Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography fontWeight="600" color="black">
                NFT Marketplace
              </Typography>
              <Typography color="black"></Typography>
            </Box>
          </Box>
        </Box>
        <Box flexBasis="30%">
          <Box className={classes.box} p={2}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="black" fontWeight="600">
                Collateral Deposit
              </Typography>
              <Typography color="black"></Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="black" fontWeight="600">
                Term
              </Typography>
              <Typography color="black"></Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="black" fontWeight="600">
                Face Value
              </Typography>
              <Typography color="black"></Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="black" fontWeight="600">
                Individual Bond Value
              </Typography>
              <Typography color="black"></Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography color="black" fontWeight="600">
                No of Bond Segments
              </Typography>
              <Typography color="black"></Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer>
        <Button variant="contained" color="primary">
          Mint NFT Bond
        </Button>
      </Footer>
    </Box>
  );
};

export default IssueBond;
