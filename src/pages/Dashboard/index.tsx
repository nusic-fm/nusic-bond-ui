import { Box, Chip, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import DashboardRow from "../../container/DashboardRow";
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
  const [bonds, setBonds] = useState<Partial<AssetPoolInfo>[]>();
  const { getBondConfigs } = useApManager();
  const { account } = useWeb3React();

  useEffect(() => {
    if (account) {
      fetchUserBondConfigs();
    }
  }, [account]);
  const fetchUserBondConfigs = async () => {
    try {
      const configs = await getBondConfigs();
      if (configs.length) {
        const _bonds: Partial<AssetPoolInfo>[] = configs.map((config: any) => ({
          artistName: config.artistName,
          spotifyId: config.artistId,
          faceValue: config.faceValue.toString(),
          individualBondValue: config.fundingAmount.toString(),
          termInYears: config.numberOfYears.toString(),
          nftAddress: config.nftAddress.toString(),
        }));
        setBonds(_bonds);
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
        {bonds?.map((bond) => {
          return <DashboardRow key={bond.spotifyId} bond={bond} />;
        })}
      </Box>
    </Box>
  );
};

export default Dashboard;
