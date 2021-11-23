import {
  Box,
  Button,
  Chip,
  Table,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useApManager } from "../../hooks/useManager";
import { AssetPoolInfo } from "../../state";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#17172F",
    minHeight: "calc(100vh - 65px)",
    width: "100%",
  },
});
const Dashboard = () => {
  const classes = useStyles();
  const [bond, setBond] = useState<Partial<AssetPoolInfo>>();
  const { getBondConfigs } = useApManager();

  useEffect(() => {
    setTimeout(fetchUserBondConfigs, 500);
  }, []);
  const fetchUserBondConfigs = async () => {
    try {
      const config = await getBondConfigs();
      if (config) {
        setBond({
          artistName: config.artistName,
          spotifyId: config.artistId,
          faceValue: config.faceValue.toString(),
          individualBondValue: config.fundingAmount.toString(),
          termInYears: config.numberOfYears.toString(),
          nftAddress: config.nftAddress.toString(),
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Box className={classes.root} p={4} pl={20} pr={20}>
      <Typography variant="h5" fontWeight={400}>
        Dashboard
      </Typography>
      <Box pt={4}>
        <Box
          m={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>My NFT Music Bonds</Typography>
          <Typography>
            Available Reward <Chip variant="outlined" label="8.63419 Claim" />
          </Typography>
        </Box>
        <Box m={2} display="flex" alignItems="center">
          <Box>
            <img
              src="https://ipfs.io/ipfs/QmaJ5oKx9QzeFxaJLiuTKzsfRoaujjRd7n3ux6zKXxTkci/Nusic%20Bond%20Fractals/NusicFractal-01.svg"
              alt="nft"
              height="250px"
            />
          </Box>
          <Box
            ml={8}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "6px",
            }}
            flexGrow={1}
          >
            <Table>
              <TableRow>
                <TableCell>
                  <Box p={1} mr={8}>
                    <Typography fontWeight="600" pb={1}>
                      Asset Name
                    </Typography>
                    <Typography>{bond?.artistName || "-"}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box p={1} mr={8}>
                    <Typography fontWeight="600" pb={1}>
                      Face Value
                    </Typography>
                    <Typography>${bond?.faceValue || "-"}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box p={1} mr={8}>
                    <Typography fontWeight="600" pb={1}>
                      Average Quarter
                    </Typography>
                    <Typography>{bond?.individualBondValue || "-"}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box p={1}>
                    <Typography fontWeight="600" pb={1}>
                      Rating
                    </Typography>
                    <Typography>-</Typography>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Box p={1}>
                    <Typography fontWeight="600" pb={1}>
                      Symbol
                    </Typography>
                    <Typography>-</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box p={1}>
                    <Typography fontWeight="600" pb={1}>
                      Term
                    </Typography>
                    <Typography>{bond?.termInYears || "-"}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box p={1}>
                    <Typography fontWeight="600" pb={1}>
                      Asset Pool
                    </Typography>
                    <Typography>-</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box p={1}>
                    <Typography fontWeight="600" pb={1}>
                      Outstanding
                    </Typography>
                    <Typography>-</Typography>
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Box p={1}>
                    <Typography fontWeight="600" pb={1}>
                      Coupon
                    </Typography>
                    <Typography>-</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box p={1}>
                    <Typography fontWeight="600" pb={1}>
                      Yeild Maximizer
                    </Typography>
                    <Typography>-</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box p={1}>
                    <Typography fontWeight="600" pb={1}>
                      $NUSIC APY
                    </Typography>
                    <Typography>-</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box p={1}>
                    <Typography fontWeight="600" pb={1}>
                      Next Deposit
                    </Typography>
                    <Typography>-</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            </Table>
          </Box>
        </Box>
        <Box
          m={2}
          mt={4}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "6px",
          }}
          display="flex"
        >
          <Table>
            <TableRow>
              <TableCell>
                <Box>
                  <Typography>Next Deposit Amount</Typography>
                  <Typography fontWeight="600">ETH -</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  <Typography>Due in</Typography>
                  <Typography fontWeight="600">-</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  <Typography>Coupon Rate</Typography>
                  <Typography fontWeight="600">%</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  <Button variant="contained" color="primary">
                    Deposit Now
                  </Button>
                </Box>
              </TableCell>
              <TableCell>
                <Box>
                  <Button color="secondary">Boost Rating</Button>
                </Box>
              </TableCell>
            </TableRow>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
